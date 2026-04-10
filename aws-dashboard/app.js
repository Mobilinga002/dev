(function () {
  'use strict';

  // ============================================
  // STATE
  // ============================================
  var state = {
    normalizedData: null,
    selectedServices: [],
    sortColumn: 'month',
    sortDirection: 'asc',
    chartInstances: {
      bar: null,
      doughnut: null
    }
  };

  // ============================================
  // COLOR PALETTE
  // ============================================
  var COLORS = [
    '#ff9900', '#146eb4', '#1b8901', '#d13212',
    '#7b2e8e', '#0073bb', '#c7511f', '#067d68',
    '#8c6d1f', '#dd6b10', '#3f8624', '#b0084d',
    '#5e6b70', '#2ea597', '#8b5cf6', '#e11d48'
  ];

  var MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // ============================================
  // CSV PARSER
  // ============================================
  var CSVParser = {
    parse: function (file) {
      return new Promise(function (resolve, reject) {
        Papa.parse(file, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: function (results) {
            if (results.errors.length > 0 && results.data.length === 0) {
              reject(new Error('CSV parsing failed: ' + results.errors[0].message));
              return;
            }
            try {
              var format = CSVParser.detectFormat(results.meta.fields);
              var normalized;
              if (format === 'wide') {
                normalized = CSVParser.normalizeWide(results.data, results.meta.fields);
              } else {
                normalized = CSVParser.normalizeLong(results.data, results.meta.fields);
              }
              CSVParser.computeTotals(normalized);
              resolve(normalized);
            } catch (e) {
              reject(e);
            }
          },
          error: function (err) {
            reject(new Error('Failed to read CSV file: ' + err.message));
          }
        });
      });
    },

    detectFormat: function (headers) {
      var datePattern = /^20\d{2}-\d{2}/;
      var dateColumns = headers.filter(function (h) { return datePattern.test(h); });
      if (dateColumns.length >= 2) {
        return 'wide';
      }
      return 'long';
    },

    normalizeWide: function (rows, headers) {
      var datePattern = /^20\d{2}-\d{2}/;
      var months = headers.filter(function (h) { return datePattern.test(h); }).sort();
      var serviceCol = headers.find(function (h) { return !datePattern.test(h); });
      var services = [];
      var data = {};

      rows.forEach(function (row) {
        var service = row[serviceCol];
        if (!service) return;
        var serviceName = String(service).trim();
        if (serviceName.toLowerCase() === 'total') return;

        if (services.indexOf(serviceName) === -1) {
          services.push(serviceName);
        }
        data[serviceName] = {};
        months.forEach(function (m) {
          var val = parseFloat(row[m]) || 0;
          data[serviceName][m] = val;
        });
      });

      return { months: months, services: services.sort(), data: data, totals: {} };
    },

    normalizeLong: function (rows, headers) {
      var dateCol = CSVParser.findColumn(headers, ['date', 'month', 'start', 'timeperiod', 'period', 'start date']);
      var serviceCol = CSVParser.findColumn(headers, ['service', 'servicename', 'service name', 'product', 'linkedaccountname']);
      var costCol = CSVParser.findColumn(headers, ['cost', 'amount', 'unblendedcost', 'unblended cost', 'totalcost', 'total cost', 'blendedcost', 'netunblendedcost']);

      if (!dateCol || !serviceCol || !costCol) {
        throw new Error(
          'Could not detect CSV columns. Expected columns for Date, Service, and Cost. ' +
          'Found headers: ' + headers.join(', ')
        );
      }

      var monthsSet = {};
      var servicesSet = {};
      var data = {};

      rows.forEach(function (row) {
        var rawDate = String(row[dateCol] || '').trim();
        var month = rawDate.substring(0, 7); // "2025-01" from "2025-01" or "2025-01-01"
        var service = String(row[serviceCol] || '').trim();
        var cost = parseFloat(row[costCol]) || 0;

        if (!month || !service || month.length < 7) return;
        if (service.toLowerCase() === 'total') return;

        monthsSet[month] = true;
        servicesSet[service] = true;

        if (!data[service]) data[service] = {};
        data[service][month] = (data[service][month] || 0) + cost;
      });

      var months = Object.keys(monthsSet).sort();
      var services = Object.keys(servicesSet).sort();

      return { months: months, services: services, data: data, totals: {} };
    },

    findColumn: function (headers, candidates) {
      for (var i = 0; i < candidates.length; i++) {
        for (var j = 0; j < headers.length; j++) {
          if (headers[j].toLowerCase().trim() === candidates[i]) {
            return headers[j];
          }
        }
      }
      // Partial match fallback
      for (var i = 0; i < candidates.length; i++) {
        for (var j = 0; j < headers.length; j++) {
          if (headers[j].toLowerCase().trim().indexOf(candidates[i]) !== -1) {
            return headers[j];
          }
        }
      }
      return null;
    },

    computeTotals: function (normalized) {
      var byMonth = {};
      var byService = {};
      var grand = 0;

      normalized.services.forEach(function (service) {
        var serviceTotal = 0;
        normalized.months.forEach(function (month) {
          var val = (normalized.data[service] && normalized.data[service][month]) || 0;
          byMonth[month] = (byMonth[month] || 0) + val;
          serviceTotal += val;
        });
        byService[service] = serviceTotal;
        grand += serviceTotal;
      });

      normalized.totals = { byMonth: byMonth, byService: byService, grand: grand };
    }
  };

  // ============================================
  // DATA PROCESSOR
  // ============================================
  var DataProcessor = {
    getFilteredData: function (data, serviceFilter) {
      if (!serviceFilter || serviceFilter.length === 0) return data;

      var filtered = {
        months: data.months,
        services: serviceFilter,
        data: {},
        totals: {}
      };

      serviceFilter.forEach(function (s) {
        if (data.data[s]) filtered.data[s] = data.data[s];
      });

      CSVParser.computeTotals(filtered);
      return filtered;
    },

    getSummaryStats: function (data) {
      var totals = data.totals;
      var monthEntries = Object.entries(totals.byMonth);
      var highestEntry = monthEntries.reduce(function (max, entry) {
        return entry[1] > max[1] ? entry : max;
      }, ['', 0]);

      var activeMonths = monthEntries.filter(function (e) { return e[1] > 0; }).length;

      return {
        totalCost: totals.grand,
        avgMonthlyCost: activeMonths > 0 ? totals.grand / activeMonths : 0,
        highestMonth: highestEntry[0],
        highestMonthCost: highestEntry[1],
        serviceCount: data.services.length
      };
    },

    getTableRows: function (data) {
      var rows = [];
      data.services.forEach(function (service) {
        data.months.forEach(function (month) {
          var cost = (data.data[service] && data.data[service][month]) || 0;
          if (cost > 0) {
            rows.push({ month: month, service: service, cost: cost });
          }
        });
      });
      return rows;
    },

    sortRows: function (rows, column, direction) {
      var mult = direction === 'asc' ? 1 : -1;
      return rows.slice().sort(function (a, b) {
        if (column === 'cost') {
          return (a.cost - b.cost) * mult;
        }
        var va = a[column] || '';
        var vb = b[column] || '';
        return va.localeCompare(vb) * mult;
      });
    },

    formatCurrency: function (value) {
      return '$' + value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },

    formatMonth: function (monthStr) {
      var parts = monthStr.split('-');
      var monthIndex = parseInt(parts[1], 10) - 1;
      if (monthIndex >= 0 && monthIndex < 12) {
        return MONTH_NAMES[monthIndex] + ' ' + parts[0];
      }
      return monthStr;
    },

    formatMonthShort: function (monthStr) {
      var parts = monthStr.split('-');
      var monthIndex = parseInt(parts[1], 10) - 1;
      if (monthIndex >= 0 && monthIndex < 12) {
        return MONTH_NAMES[monthIndex].substring(0, 3);
      }
      return monthStr;
    }
  };

  // ============================================
  // CHART RENDERER
  // ============================================
  var ChartRenderer = {
    renderBarChart: function (canvasId, data) {
      if (state.chartInstances.bar) {
        state.chartInstances.bar.destroy();
      }

      var ctx = document.getElementById(canvasId).getContext('2d');
      var labels = data.months.map(function (m) { return DataProcessor.formatMonthShort(m); });

      var datasets = data.services.map(function (service, i) {
        return {
          label: service,
          data: data.months.map(function (m) {
            return (data.data[service] && data.data[service][m]) || 0;
          }),
          backgroundColor: COLORS[i % COLORS.length],
          borderRadius: 3,
          borderSkipped: false
        };
      });

      state.chartInstances.bar = new Chart(ctx, {
        type: 'bar',
        data: { labels: labels, datasets: datasets },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                usePointStyle: true,
                padding: 16,
                font: { size: 12 }
              }
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return context.dataset.label + ': ' + DataProcessor.formatCurrency(context.parsed.y);
                },
                footer: function (tooltipItems) {
                  var sum = tooltipItems.reduce(function (s, item) { return s + item.parsed.y; }, 0);
                  return 'Total: ' + DataProcessor.formatCurrency(sum);
                }
              }
            }
          },
          scales: {
            x: {
              stacked: true,
              grid: { display: false }
            },
            y: {
              stacked: true,
              beginAtZero: true,
              ticks: {
                callback: function (value) {
                  return '$' + value.toLocaleString();
                }
              },
              grid: { color: '#eee' }
            }
          }
        }
      });
    },

    renderDoughnutChart: function (canvasId, data) {
      if (state.chartInstances.doughnut) {
        state.chartInstances.doughnut.destroy();
      }

      var ctx = document.getElementById(canvasId).getContext('2d');
      var labels = data.services;
      var values = data.services.map(function (s) { return data.totals.byService[s] || 0; });
      var colors = data.services.map(function (_, i) { return COLORS[i % COLORS.length]; });

      state.chartInstances.doughnut = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
            data: values,
            backgroundColor: colors,
            borderWidth: 2,
            borderColor: '#fff',
            hoverOffset: 8
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                usePointStyle: true,
                padding: 14,
                font: { size: 12 },
                generateLabels: function (chart) {
                  var dataset = chart.data.datasets[0];
                  var total = dataset.data.reduce(function (s, v) { return s + v; }, 0);
                  return chart.data.labels.map(function (label, i) {
                    var value = dataset.data[i];
                    var pct = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                    return {
                      text: label + ' (' + pct + '%)',
                      fillStyle: dataset.backgroundColor[i],
                      hidden: false,
                      index: i,
                      pointStyle: 'circle'
                    };
                  });
                }
              }
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  var total = context.dataset.data.reduce(function (s, v) { return s + v; }, 0);
                  var pct = total > 0 ? ((context.parsed / total) * 100).toFixed(1) : 0;
                  return context.label + ': ' + DataProcessor.formatCurrency(context.parsed) + ' (' + pct + '%)';
                }
              }
            }
          },
          cutout: '55%'
        }
      });
    }
  };

  // ============================================
  // UI MODULE
  // ============================================
  var UI = {
    init: function () {
      UI.setupDragDrop();
      UI.setupFileInput();
      UI.setupChangeFileBtn();
      UI.setupErrorClose();
      UI.setupSorting();
      UI.setupFilterDropdown();
    },

    setupDragDrop: function () {
      var dropZone = document.getElementById('drop-zone');

      dropZone.addEventListener('dragenter', function (e) {
        e.preventDefault();
        dropZone.classList.add('drag-over');
      });

      dropZone.addEventListener('dragover', function (e) {
        e.preventDefault();
        dropZone.classList.add('drag-over');
      });

      dropZone.addEventListener('dragleave', function (e) {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
      });

      dropZone.addEventListener('drop', function (e) {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        var files = e.dataTransfer.files;
        if (files.length > 0) {
          UI.handleFile(files[0]);
        }
      });

      dropZone.addEventListener('click', function () {
        document.getElementById('file-input').click();
      });
    },

    setupFileInput: function () {
      document.getElementById('file-input').addEventListener('change', function (e) {
        if (e.target.files.length > 0) {
          UI.handleFile(e.target.files[0]);
        }
      });
    },

    setupChangeFileBtn: function () {
      document.getElementById('change-file-btn').addEventListener('click', function () {
        document.getElementById('upload-section').classList.remove('collapsed');
        document.getElementById('change-file-btn').style.display = 'none';
        document.querySelectorAll('.dashboard-content').forEach(function (el) {
          el.style.display = 'none';
        });
      });
    },

    setupErrorClose: function () {
      document.getElementById('error-close').addEventListener('click', function () {
        document.getElementById('error-banner').style.display = 'none';
      });
    },

    setupSorting: function () {
      document.querySelectorAll('th.sortable').forEach(function (th) {
        th.addEventListener('click', function () {
          var column = th.getAttribute('data-sort');

          document.querySelectorAll('th.sortable').forEach(function (t) {
            t.classList.remove('sort-active', 'sort-asc', 'sort-desc');
          });

          if (state.sortColumn === column) {
            state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
          } else {
            state.sortColumn = column;
            state.sortDirection = 'asc';
          }

          th.classList.add('sort-active', 'sort-' + state.sortDirection);
          UI.updateDashboard();
        });
      });
    },

    setupFilterDropdown: function () {
      var filterBtn = document.getElementById('filter-btn');
      var filterMenu = document.getElementById('filter-menu');

      filterBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        filterMenu.classList.toggle('open');
      });

      document.addEventListener('click', function (e) {
        if (!filterMenu.contains(e.target) && e.target !== filterBtn) {
          filterMenu.classList.remove('open');
        }
      });
    },

    handleFile: function (file) {
      if (!file.name.toLowerCase().endsWith('.csv')) {
        UI.showError('Please upload a CSV file.');
        return;
      }

      UI.hideError();

      CSVParser.parse(file).then(function (data) {
        state.normalizedData = data;
        state.selectedServices = [];
        state.sortColumn = 'month';
        state.sortDirection = 'asc';
        UI.showDashboard();
      }).catch(function (err) {
        UI.showError(err.message);
      });
    },

    showDashboard: function () {
      document.getElementById('upload-section').classList.add('collapsed');
      document.getElementById('change-file-btn').style.display = '';

      document.querySelectorAll('.dashboard-content').forEach(function (el) {
        el.style.display = '';
      });

      UI.populateServiceFilter();
      UI.updateDashboard();
    },

    updateDashboard: function () {
      var data = DataProcessor.getFilteredData(state.normalizedData, state.selectedServices);

      UI.updateSummaryCards(data);
      ChartRenderer.renderBarChart('bar-chart', data);
      ChartRenderer.renderDoughnutChart('doughnut-chart', data);
      UI.renderTable(data);
    },

    updateSummaryCards: function (data) {
      var stats = DataProcessor.getSummaryStats(data);

      document.getElementById('total-cost').textContent = DataProcessor.formatCurrency(stats.totalCost);
      document.getElementById('avg-cost').textContent = DataProcessor.formatCurrency(stats.avgMonthlyCost);
      document.getElementById('highest-month').textContent = DataProcessor.formatMonth(stats.highestMonth);
      document.getElementById('highest-month-cost').textContent = DataProcessor.formatCurrency(stats.highestMonthCost);
      document.getElementById('service-count').textContent = stats.serviceCount;
    },

    populateServiceFilter: function () {
      var menu = document.getElementById('filter-menu');
      menu.innerHTML = '';

      var allData = state.normalizedData;

      allData.services.forEach(function (service) {
        var label = document.createElement('label');
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = service;
        checkbox.checked = state.selectedServices.length === 0 || state.selectedServices.indexOf(service) !== -1;

        checkbox.addEventListener('change', function () {
          UI.handleFilterChange();
        });

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(service));
        menu.appendChild(label);
      });

      // Actions row
      var actions = document.createElement('div');
      actions.className = 'filter-actions';

      var selectAll = document.createElement('button');
      selectAll.className = 'filter-action-btn';
      selectAll.textContent = 'Select All';
      selectAll.addEventListener('click', function (e) {
        e.stopPropagation();
        menu.querySelectorAll('input[type="checkbox"]').forEach(function (cb) { cb.checked = true; });
        UI.handleFilterChange();
      });

      var clearAll = document.createElement('button');
      clearAll.className = 'filter-action-btn';
      clearAll.textContent = 'Clear All';
      clearAll.addEventListener('click', function (e) {
        e.stopPropagation();
        menu.querySelectorAll('input[type="checkbox"]').forEach(function (cb) { cb.checked = false; });
        UI.handleFilterChange();
      });

      actions.appendChild(selectAll);
      actions.appendChild(clearAll);
      menu.appendChild(actions);
    },

    handleFilterChange: function () {
      var checkboxes = document.querySelectorAll('#filter-menu input[type="checkbox"]');
      var selected = [];
      var total = 0;

      checkboxes.forEach(function (cb) {
        total++;
        if (cb.checked) selected.push(cb.value);
      });

      state.selectedServices = selected.length === total ? [] : selected;

      var filterBtn = document.getElementById('filter-btn');
      if (state.selectedServices.length === 0 || state.selectedServices.length === total) {
        filterBtn.textContent = 'All Services';
      } else if (state.selectedServices.length === 1) {
        filterBtn.textContent = state.selectedServices[0];
      } else {
        filterBtn.textContent = state.selectedServices.length + ' Services';
      }

      UI.updateDashboard();
    },

    renderTable: function (data) {
      var rows = DataProcessor.getTableRows(data);
      rows = DataProcessor.sortRows(rows, state.sortColumn, state.sortDirection);

      var tbody = document.getElementById('table-body');
      tbody.innerHTML = '';

      var total = 0;
      rows.forEach(function (row) {
        var tr = document.createElement('tr');

        var tdMonth = document.createElement('td');
        tdMonth.textContent = DataProcessor.formatMonth(row.month);
        tr.appendChild(tdMonth);

        var tdService = document.createElement('td');
        tdService.textContent = row.service;
        tr.appendChild(tdService);

        var tdCost = document.createElement('td');
        tdCost.className = 'cost-cell';
        tdCost.textContent = DataProcessor.formatCurrency(row.cost);
        tr.appendChild(tdCost);

        tbody.appendChild(tr);
        total += row.cost;
      });

      document.getElementById('table-total').innerHTML = '<strong>' + DataProcessor.formatCurrency(total) + '</strong>';
    },

    showError: function (message) {
      var banner = document.getElementById('error-banner');
      document.getElementById('error-message').textContent = message;
      banner.style.display = '';
    },

    hideError: function () {
      document.getElementById('error-banner').style.display = 'none';
    }
  };

  // ============================================
  // INIT
  // ============================================
  document.addEventListener('DOMContentLoaded', function () {
    UI.init();
  });
})();
