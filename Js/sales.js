/**
 * Sales & Marketing Dashboard JavaScript
 * This file contains all the functionality for the Sales & Marketing section
 */

document.addEventListener("DOMContentLoaded", function () {
  initSalesMarketingDashboard();
});

/**
 * Initialize the Sales & Marketing Dashboard
 */
function initSalesMarketingDashboard() {
  // Initialize tabs
  initSalesTabs();

  // Initialize period filter buttons
  initSalesPeriodFilter();

  // Initialize chart type toggle
  initChartTypeToggle();

  // Initialize region view toggle
  initRegionViewToggle();

  // Initialize charts
  initSalesCharts();

  // Set up date filter
  setupDateFilter();

  // Set up export button
  setupExportButton();

  // Initialize Marketing Campaigns functionality
  initMarketingCampaigns();

  // Initialize Customer Analytics functionality
  initCustomerAnalytics();

  // Initialize Distribution Channels functionality
  initDistributionChannels();
}

/**
 * Initialize the tabs in the Sales & Marketing section
 */
function initSalesTabs() {
  const tabButtons = document.querySelectorAll(".sales-tab-btn");
  const tabPanes = document.querySelectorAll(".sales-tab-pane");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons and panes
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabPanes.forEach((pane) => pane.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Show corresponding tab pane
      const tabId = this.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");

      // Special handling for distribution channels tab
      if (tabId === "distribution-channels") {
        // Reinitialize charts with a slight delay to ensure DOM is ready
        setTimeout(() => {
          initDistributionCharts();

          // Force window resize event to redraw charts
          window.dispatchEvent(new Event("resize"));
        }, 300);
      }
    });
  });
}

/**
 * Initialize the period filter buttons
 */
function initSalesPeriodFilter() {
  const periodButtons = document.querySelectorAll(".sales-period-btn");

  periodButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      periodButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Update charts based on selected period
      const period = this.getAttribute("data-period");
      updateChartsForPeriod(period);
    });
  });
}

/**
 * Initialize the chart type toggle (line/bar)
 */
function initChartTypeToggle() {
  const chartTypeButtons = document.querySelectorAll(".sales-chart-type-btn");

  chartTypeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      chartTypeButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Update chart type
      const chartType = this.getAttribute("data-chart-type");
      updateRevenueChartType(chartType);
    });
  });
}

/**
 * Initialize the region view toggle (chart/table)
 */
function initRegionViewToggle() {
  const viewButtons = document.querySelectorAll(".sales-chart-view-btn");
  const chartView = document.querySelector(".sales-region-chart-view");
  const tableView = document.querySelector(".sales-region-table-view");

  viewButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      viewButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Show corresponding view
      const view = this.getAttribute("data-view");
      if (view === "chart") {
        chartView.style.display = "block";
        tableView.style.display = "none";
      } else {
        chartView.style.display = "none";
        tableView.style.display = "block";
      }
    });
  });
}

/**
 * Initialize all charts in the Sales & Marketing section
 */
function initSalesCharts() {
  // Revenue Trends Chart
  const revenueTrendsCtx = document.getElementById("revenueTrendsChart");
  if (revenueTrendsCtx) {
    window.revenueTrendsChart = new Chart(revenueTrendsCtx, {
      type: "line",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "Revenue (₹)",
            data: [
              65000, 72000, 68000, 75000, 82000, 87000, 92000, 88000, 94000,
              98000, 105000, 112000,
            ],
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            borderWidth: 2,
            tension: 0.3,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            mode: "index",
            intersect: false,
            callbacks: {
              label: function (context) {
                return `Revenue: ₹${context.raw.toLocaleString()}`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return "₹" + value.toLocaleString();
              },
            },
            grid: {
              display: true,
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }

  // Sales by Region Chart
  const salesByRegionCtx = document.getElementById("salesByRegionChart");
  if (salesByRegionCtx) {
    window.salesByRegionChart = new Chart(salesByRegionCtx, {
      type: "pie",
      data: {
        labels: ["North", "South", "East", "West", "Central"],
        datasets: [
          {
            data: [28, 24, 20, 18, 10],
            backgroundColor: [
              "#3b82f6",
              "#10b981",
              "#f59e0b",
              "#8b5cf6",
              "#ef4444",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
            labels: {
              boxWidth: 12,
              padding: 15,
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.label}: ${context.raw}%`;
              },
            },
          },
        },
      },
    });
  }

  // Sales Comparison Chart
  const salesComparisonCtx = document.getElementById("salesComparisonChart");
  if (salesComparisonCtx) {
    window.salesComparisonChart = new Chart(salesComparisonCtx, {
      type: "bar",
      data: {
        labels: ["Milk", "Yogurt/Curd", "Paneer", "Ghee", "Butter", "Cheese"],
        datasets: [
          {
            label: "Current Period",
            data: [262000, 192500, 169600, 123200, 87600, 40350],
            backgroundColor: "#3b82f6",
            borderRadius: 4,
          },
          {
            label: "Previous Period",
            data: [235800, 178000, 152640, 115500, 82000, 35000],
            backgroundColor: "#94a3b8",
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            mode: "index",
            intersect: false,
            callbacks: {
              label: function (context) {
                return `${
                  context.dataset.label
                }: ₹${context.raw.toLocaleString()}`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return "₹" + value.toLocaleString();
              },
            },
            grid: {
              display: true,
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }
}

/**
 * Update charts based on selected period
 */
function updateChartsForPeriod(period) {
  // Sample data for different periods
  const revenueData = {
    daily: [28500, 32000, 29800, 31500, 33200, 30800, 27500],
    weekly: [185000, 195000, 210000, 205000],
    monthly: [875250, 920000, 980000, 1050000, 1120000, 1080000],
    yearly: [10500000, 12000000, 13500000, 15000000, 16200000],
  };

  const labels = {
    daily: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    weekly: ["Week 1", "Week 2", "Week 3", "Week 4"],
    monthly: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    yearly: ["2019", "2020", "2021", "2022", "2023"],
  };

  // Update Revenue Trends Chart
  if (window.revenueTrendsChart) {
    window.revenueTrendsChart.data.labels = labels[period];
    window.revenueTrendsChart.data.datasets[0].data = revenueData[period];
    window.revenueTrendsChart.update();
  }

  // Update other charts as needed
  // ...
}

/**
 * Update Revenue Chart type (line/bar)
 */
function updateRevenueChartType(chartType) {
  if (window.revenueTrendsChart) {
    window.revenueTrendsChart.config.type = chartType;

    // Adjust styling based on chart type
    if (chartType === "line") {
      window.revenueTrendsChart.data.datasets[0].tension = 0.3;
      window.revenueTrendsChart.data.datasets[0].fill = true;
    } else {
      window.revenueTrendsChart.data.datasets[0].tension = 0;
      window.revenueTrendsChart.data.datasets[0].fill = false;
      window.revenueTrendsChart.data.datasets[0].borderRadius = 4;
    }

    window.revenueTrendsChart.update();
  }
}

/**
 * Set up date filter functionality
 */
function setupDateFilter() {
  const applyDateFilterBtn = document.getElementById("applyDateFilter");
  const startDateInput = document.getElementById("salesStartDate");
  const endDateInput = document.getElementById("salesEndDate");

  if (applyDateFilterBtn && startDateInput && endDateInput) {
    // Set default dates (current month)
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    startDateInput.valueAsDate = firstDay;
    endDateInput.valueAsDate = lastDay;

    applyDateFilterBtn.addEventListener("click", function () {
      const startDate = startDateInput.value;
      const endDate = endDateInput.value;

      if (startDate && endDate) {
        // In a real application, you would fetch data for the selected date range
        // For now, we'll just show an alert
        alert(`Date filter applied: ${startDate} to ${endDate}`);

        // You would then update the charts with the new data
        // updateChartsWithDateRange(startDate, endDate);
      } else {
        alert("Please select both start and end dates");
      }
    });
  }
}

/**
 * Set up export button functionality
 */
function setupExportButton() {
  const exportBtn = document.querySelector(".sales-export-btn");

  if (exportBtn) {
    exportBtn.addEventListener("click", function () {
      // In a real application, you would implement export functionality
      // For now, we'll just show an alert
      alert("Export functionality will be implemented in the next phase");
    });
  }
}

/**
 * Initialize Marketing Campaigns functionality
 */
function initMarketingCampaigns() {
  // Initialize campaign filter buttons
  initCampaignFilter();

  // Initialize campaign view toggle
  initCampaignViewToggle();

  // Initialize campaign charts
  initCampaignCharts();

  // Set up campaign search
  setupCampaignSearch();

  // Set up campaign modal
  setupCampaignModal();

  // Set up campaign actions
  setupCampaignActions();

  // Set up campaign pagination
  setupCampaignPagination();
}

/**
 * Initialize campaign filter buttons
 */
function initCampaignFilter() {
  const filterButtons = document.querySelectorAll(".campaign-filter-btn");
  const campaignRows = document.querySelectorAll(".campaign-row");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Filter campaigns
      const filter = this.getAttribute("data-filter");

      campaignRows.forEach((row) => {
        if (filter === "all" || row.getAttribute("data-status") === filter) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    });
  });
}

/**
 * Initialize campaign view toggle
 */
function initCampaignViewToggle() {
  const viewButtons = document.querySelectorAll(".campaign-view-btn");
  const performanceView = document.getElementById("campaign-performance-view");
  const budgetView = document.getElementById("campaign-budget-view");

  if (viewButtons.length && performanceView && budgetView) {
    viewButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        viewButtons.forEach((btn) => btn.classList.remove("active"));

        // Add active class to clicked button
        this.classList.add("active");

        // Show corresponding view
        const view = this.getAttribute("data-view");
        if (view === "performance") {
          performanceView.classList.add("active");
          budgetView.classList.remove("active");
        } else {
          performanceView.classList.remove("active");
          budgetView.classList.add("active");
        }
      });
    });
  }
}

/**
 * Initialize campaign charts
 */
function initCampaignCharts() {
  // Campaign Performance Chart
  const campaignPerformanceCtx = document.getElementById(
    "campaignPerformanceChart"
  );
  if (campaignPerformanceCtx) {
    window.campaignPerformanceChart = new Chart(campaignPerformanceCtx, {
      type: "bar",
      data: {
        labels: [
          "Farm Fresh Digital",
          "Organic Milk Print",
          "Dairy Farm Open Day",
          "Local Radio",
          "Summer Discount",
        ],
        datasets: [
          {
            label: "ROI (%)",
            data: [245, 180, 195, 210, 235],
            backgroundColor: "#3b82f6",
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `ROI: ${context.raw}%`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Return on Investment (%)",
            },
            grid: {
              display: true,
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }

  // Campaign Budget Chart
  const campaignBudgetCtx = document.getElementById("campaignBudgetChart");
  if (campaignBudgetCtx) {
    window.campaignBudgetChart = new Chart(campaignBudgetCtx, {
      type: "doughnut",
      data: {
        labels: [
          "Digital",
          "Print",
          "TV",
          "Radio",
          "Events",
          "Partnerships",
          "Promotions",
        ],
        datasets: [
          {
            data: [75000, 45000, 120000, 25000, 35000, 50000, 30000],
            backgroundColor: [
              "#3b82f6",
              "#8b5cf6",
              "#ef4444",
              "#f59e0b",
              "#10b981",
              "#0ea5e9",
              "#ec4899",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
            labels: {
              boxWidth: 12,
              padding: 15,
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const value = context.raw;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = Math.round((value / total) * 100);
                return `${
                  context.label
                }: ₹${value.toLocaleString()} (${percentage}%)`;
              },
            },
          },
        },
      },
    });
  }

  // Audience Demographics Chart
  const audienceDemographicsCtx = document.getElementById(
    "audienceDemographicsChart"
  );
  if (audienceDemographicsCtx) {
    window.audienceDemographicsChart = new Chart(audienceDemographicsCtx, {
      type: "pie",
      data: {
        labels: ["18-24", "25-34", "35-44", "45-54", "55+"],
        datasets: [
          {
            data: [15, 30, 25, 20, 10],
            backgroundColor: [
              "#3b82f6",
              "#10b981",
              "#f59e0b",
              "#8b5cf6",
              "#ef4444",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
            labels: {
              boxWidth: 12,
              padding: 10,
              font: {
                size: 11,
              },
            },
          },
        },
      },
    });
  }

  // Audience Geography Chart
  const audienceGeographyCtx = document.getElementById(
    "audienceGeographyChart"
  );
  if (audienceGeographyCtx) {
    window.audienceGeographyChart = new Chart(audienceGeographyCtx, {
      type: "bar",
      data: {
        labels: ["Urban", "Suburban", "Rural"],
        datasets: [
          {
            label: "Distribution",
            data: [45, 30, 25],
            backgroundColor: ["#3b82f6", "#10b981", "#f59e0b"],
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return value + "%";
              },
            },
            grid: {
              display: true,
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }

  // Audience Preferences Chart
  const audiencePreferencesCtx = document.getElementById(
    "audiencePreferencesChart"
  );
  if (audiencePreferencesCtx) {
    window.audiencePreferencesChart = new Chart(audiencePreferencesCtx, {
      type: "radar",
      data: {
        labels: ["Milk", "Yogurt", "Paneer", "Ghee", "Butter", "Cheese"],
        datasets: [
          {
            label: "Preference Score",
            data: [85, 75, 65, 60, 55, 40],
            backgroundColor: "rgba(59, 130, 246, 0.2)",
            borderColor: "#3b82f6",
            pointBackgroundColor: "#3b82f6",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "#3b82f6",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: {
              display: true,
            },
            suggestedMin: 0,
            suggestedMax: 100,
          },
        },
      },
    });
  }

  // Audience Channels Chart
  const audienceChannelsCtx = document.getElementById("audienceChannelsChart");
  if (audienceChannelsCtx) {
    window.audienceChannelsChart = new Chart(audienceChannelsCtx, {
      type: "bar",
      data: {
        labels: [
          "Social Media",
          "Website",
          "Email",
          "In-store",
          "Mobile App",
          "Print",
        ],
        datasets: [
          {
            label: "Engagement",
            data: [65, 55, 40, 35, 30, 20],
            backgroundColor: "#3b82f6",
            borderRadius: 4,
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return value + "%";
              },
            },
            grid: {
              display: true,
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          y: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }
}

/**
 * Set up campaign search functionality
 */
function setupCampaignSearch() {
  const searchInput = document.getElementById("campaignSearch");
  const searchBtn = document.querySelector(".campaign-search-btn");
  const campaignRows = document.querySelectorAll(".campaign-row");

  if (searchInput && searchBtn) {
    const performSearch = () => {
      const searchTerm = searchInput.value.toLowerCase().trim();

      campaignRows.forEach((row) => {
        const campaignName = row
          .querySelector(".campaign-title")
          .textContent.toLowerCase();
        const campaignType = row
          .querySelector("td:nth-child(2)")
          .textContent.toLowerCase();

        if (
          campaignName.includes(searchTerm) ||
          campaignType.includes(searchTerm)
        ) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    };

    searchBtn.addEventListener("click", performSearch);

    searchInput.addEventListener("keyup", function (e) {
      if (e.key === "Enter") {
        performSearch();
      }
    });
  }
}

/**
 * Set up campaign modal functionality
 */
function setupCampaignModal() {
  const addCampaignBtn = document.getElementById("addCampaignBtn");
  const campaignModal = document.getElementById("campaignModal");
  const closeModalBtn = document.querySelector(".campaign-modal-close");
  const cancelBtn = document.querySelector(".campaign-modal-btn.secondary");
  const saveBtn = document.querySelector(".campaign-modal-btn.primary");
  const campaignForm = document.getElementById("campaignForm");

  if (addCampaignBtn && campaignModal) {
    // Open modal
    addCampaignBtn.addEventListener("click", function () {
      campaignModal.classList.add("active");
    });

    // Close modal functions
    const closeModal = () => {
      campaignModal.classList.remove("active");
      if (campaignForm) {
        campaignForm.reset();
      }
    };

    // Close modal when clicking close button
    if (closeModalBtn) {
      closeModalBtn.addEventListener("click", closeModal);
    }

    // Close modal when clicking cancel button
    if (cancelBtn) {
      cancelBtn.addEventListener("click", closeModal);
    }

    // Close modal when clicking outside
    campaignModal.addEventListener("click", function (e) {
      if (e.target === campaignModal) {
        closeModal();
      }
    });

    // Save campaign
    if (saveBtn && campaignForm) {
      saveBtn.addEventListener("click", function () {
        // In a real application, you would validate and save the form data
        // For now, we'll just show an alert and close the modal
        alert("Campaign saved successfully!");
        closeModal();
      });
    }
  }
}

/**
 * Set up campaign actions functionality
 */
function setupCampaignActions() {
  const actionButtons = document.querySelectorAll(".campaign-action-btn");

  actionButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const action = this.getAttribute("title");
      const campaignName =
        this.closest("tr").querySelector(".campaign-title").textContent;

      // In a real application, you would implement the actual functionality
      // For now, we'll just show an alert
      alert(`${action} for campaign: ${campaignName}`);
    });
  });

  // Set up export button
  const exportBtn = document.querySelector(".campaign-export-btn");
  if (exportBtn) {
    exportBtn.addEventListener("click", function () {
      alert(
        "Campaign data export functionality will be implemented in the next phase"
      );
    });
  }
}

/**
 * Set up campaign pagination functionality
 */
function setupCampaignPagination() {
  const paginationButtons = document.querySelectorAll(
    ".campaign-pagination-btn"
  );

  paginationButtons.forEach((button) => {
    if (!button.disabled) {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        paginationButtons.forEach((btn) => btn.classList.remove("active"));

        // Add active class to clicked button
        this.classList.add("active");

        // In a real application, you would implement pagination
        // For now, we'll just show an alert
        const page = this.textContent;
        if (page !== "") {
          alert(`Navigating to page ${page}`);
        }
      });
    }
  });
}

/**
 * Initialize Customer Analytics functionality
 */
function initCustomerAnalytics() {
  // Initialize customer period filter
  initCustomerPeriodFilter();

  // Initialize customer segment selector
  initCustomerSegmentSelector();

  // Initialize customer view toggle
  initCustomerViewToggle();

  // Initialize customer demographics tabs
  initCustomerDemographicsTabs();

  // Initialize customer charts
  initCustomerCharts();

  // Set up customer table functionality
  setupCustomerTable();

  // Set up customer feedback functionality
  setupCustomerFeedback();
}

/**
 * Initialize customer period filter
 */
function initCustomerPeriodFilter() {
  const periodButtons = document.querySelectorAll(".customer-period-btn");

  periodButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      periodButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Update charts based on selected period
      const period = this.getAttribute("data-period");
      updateCustomerChartsForPeriod(period);
    });
  });
}

/**
 * Initialize customer segment selector
 */
function initCustomerSegmentSelector() {
  const segmentSelect = document.querySelector(".customer-segment-select");

  if (segmentSelect) {
    segmentSelect.addEventListener("change", function () {
      const segment = this.value;
      updateCustomerChartsForSegment(segment);
    });
  }
}

/**
 * Initialize customer view toggle
 */
function initCustomerViewToggle() {
  const viewButtons = document.querySelectorAll(".customer-view-btn");

  viewButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      viewButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Update chart based on selected view
      const view = this.getAttribute("data-view");
      updateCustomerGrowthView(view);
    });
  });
}

/**
 * Initialize customer demographics tabs
 */
function initCustomerDemographicsTabs() {
  const tabButtons = document.querySelectorAll(".customer-demographics-tab");
  const tabContents = document.querySelectorAll(
    ".customer-demographics-tab-content"
  );

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Show corresponding tab content
      const tabId = this.getAttribute("data-tab") + "-tab";
      document.getElementById(tabId).classList.add("active");
    });
  });
}

/**
 * Initialize customer charts
 */
function initCustomerCharts() {
  // Customer Growth Chart
  const customerGrowthCtx = document.getElementById("customerGrowthChart");
  if (customerGrowthCtx) {
    window.customerGrowthChart = new Chart(customerGrowthCtx, {
      type: "line",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "New Customers",
            data: [120, 145, 132, 155, 180, 170, 190, 210, 185, 195, 220, 240],
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            borderWidth: 2,
            tension: 0.3,
            fill: true,
          },
          {
            label: "Returning Customers",
            data: [320, 340, 360, 375, 390, 410, 430, 450, 470, 490, 510, 530],
            borderColor: "#10b981",
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            borderWidth: 2,
            tension: 0.3,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: {
              boxWidth: 12,
              padding: 15,
            },
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: true,
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }

  // Customer Segments Chart
  const customerSegmentsCtx = document.getElementById("customerSegmentsChart");
  if (customerSegmentsCtx) {
    window.customerSegmentsChart = new Chart(customerSegmentsCtx, {
      type: "doughnut",
      data: {
        labels: [
          "Retail Customers",
          "Wholesale Buyers",
          "Distributors",
          "Institutions",
        ],
        datasets: [
          {
            data: [45, 30, 15, 10],
            backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.label}: ${context.raw}%`;
              },
            },
          },
        },
        cutout: "65%",
      },
    });
  }

  // Customer Age Chart
  const customerAgeCtx = document.getElementById("customerAgeChart");
  if (customerAgeCtx) {
    window.customerAgeChart = new Chart(customerAgeCtx, {
      type: "bar",
      data: {
        labels: ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"],
        datasets: [
          {
            label: "Customers by Age",
            data: [15, 30, 25, 18, 8, 4],
            backgroundColor: "#3b82f6",
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.raw}% of customers`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return value + "%";
              },
            },
            grid: {
              display: true,
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }

  // Customer Location Chart
  const customerLocationCtx = document.getElementById("customerLocationChart");
  if (customerLocationCtx) {
    window.customerLocationChart = new Chart(customerLocationCtx, {
      type: "pie",
      data: {
        labels: ["Urban", "Suburban", "Rural"],
        datasets: [
          {
            data: [55, 30, 15],
            backgroundColor: ["#3b82f6", "#10b981", "#f59e0b"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
            labels: {
              boxWidth: 12,
              padding: 10,
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.label}: ${context.raw}%`;
              },
            },
          },
        },
      },
    });
  }

  // Customer Type Chart
  const customerTypeCtx = document.getElementById("customerTypeChart");
  if (customerTypeCtx) {
    window.customerTypeChart = new Chart(customerTypeCtx, {
      type: "bar",
      data: {
        labels: ["Individual", "Small Business", "Corporate", "Government"],
        datasets: [
          {
            label: "Customers by Type",
            data: [60, 25, 10, 5],
            backgroundColor: "#3b82f6",
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.raw}% of customers`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return value + "%";
              },
            },
            grid: {
              display: true,
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }

  // Purchase Frequency Chart
  const purchaseFrequencyCtx = document.getElementById(
    "purchaseFrequencyChart"
  );
  if (purchaseFrequencyCtx) {
    window.purchaseFrequencyChart = new Chart(purchaseFrequencyCtx, {
      type: "bar",
      data: {
        labels: ["Daily", "Weekly", "Bi-weekly", "Monthly", "Quarterly"],
        datasets: [
          {
            label: "Purchase Frequency",
            data: [15, 35, 25, 20, 5],
            backgroundColor: "#3b82f6",
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.raw}% of customers`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return value + "%";
              },
            },
            grid: {
              display: true,
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }

  // Product Preferences Chart
  const productPreferencesCtx = document.getElementById(
    "productPreferencesChart"
  );
  if (productPreferencesCtx) {
    window.productPreferencesChart = new Chart(productPreferencesCtx, {
      type: "pie",
      data: {
        labels: ["Milk", "Yogurt/Curd", "Paneer", "Ghee", "Butter", "Cheese"],
        datasets: [
          {
            data: [40, 20, 15, 12, 8, 5],
            backgroundColor: [
              "#3b82f6",
              "#10b981",
              "#f59e0b",
              "#8b5cf6",
              "#ef4444",
              "#ec4899",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
            labels: {
              boxWidth: 12,
              padding: 10,
              font: {
                size: 11,
              },
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.label}: ${context.raw}%`;
              },
            },
          },
        },
      },
    });
  }

  // Purchase Time Chart
  const purchaseTimeCtx = document.getElementById("purchaseTimeChart");
  if (purchaseTimeCtx) {
    window.purchaseTimeChart = new Chart(purchaseTimeCtx, {
      type: "line",
      data: {
        labels: ["6am", "8am", "10am", "12pm", "2pm", "4pm", "6pm", "8pm"],
        datasets: [
          {
            label: "Purchase Volume",
            data: [10, 25, 15, 20, 15, 18, 30, 12],
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            borderWidth: 2,
            tension: 0.3,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: true,
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }

  // Payment Methods Chart
  const paymentMethodsCtx = document.getElementById("paymentMethodsChart");
  if (paymentMethodsCtx) {
    window.paymentMethodsChart = new Chart(paymentMethodsCtx, {
      type: "doughnut",
      data: {
        labels: ["UPI", "Credit Card", "Debit Card", "Cash", "Net Banking"],
        datasets: [
          {
            data: [40, 25, 15, 12, 8],
            backgroundColor: [
              "#3b82f6",
              "#10b981",
              "#f59e0b",
              "#8b5cf6",
              "#ef4444",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
            labels: {
              boxWidth: 12,
              padding: 10,
              font: {
                size: 11,
              },
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.label}: ${context.raw}%`;
              },
            },
          },
        },
        cutout: "60%",
      },
    });
  }

  // Feedback Categories Chart
  const feedbackCategoriesCtx = document.getElementById(
    "feedbackCategoriesChart"
  );
  if (feedbackCategoriesCtx) {
    window.feedbackCategoriesChart = new Chart(feedbackCategoriesCtx, {
      type: "bar",
      data: {
        labels: [
          "Product Quality",
          "Delivery",
          "Packaging",
          "Price",
          "Customer Service",
        ],
        datasets: [
          {
            label: "Feedback Categories",
            data: [45, 20, 15, 12, 8],
            backgroundColor: "#3b82f6",
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.raw}% of feedback`;
              },
            },
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return value + "%";
              },
            },
            grid: {
              display: true,
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          y: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }

  // Sentiment Analysis Chart
  const sentimentAnalysisCtx = document.getElementById(
    "sentimentAnalysisChart"
  );
  if (sentimentAnalysisCtx) {
    window.sentimentAnalysisChart = new Chart(sentimentAnalysisCtx, {
      type: "doughnut",
      data: {
        labels: ["Positive", "Neutral", "Negative"],
        datasets: [
          {
            data: [78, 15, 7],
            backgroundColor: ["#10b981", "#f59e0b", "#ef4444"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.label}: ${context.raw}%`;
              },
            },
          },
        },
        cutout: "70%",
      },
    });
  }
}

/**
 * Update customer charts based on selected period
 */
function updateCustomerChartsForPeriod(period) {
  // Sample data for different periods
  const growthData = {
    30: {
      new: [
        25, 30, 28, 35, 32, 38, 40, 42, 38, 45, 48, 50, 55, 52, 58, 60, 65, 62,
        68, 70, 72, 68, 75, 78, 80, 82, 78, 85, 88, 90,
      ],
      returning: [
        120, 125, 130, 128, 135, 140, 142, 145, 150, 148, 155, 160, 158, 165,
        170, 168, 175, 180, 178, 185, 190, 188, 195, 200, 198, 205, 210, 208,
        215, 220,
      ],
    },
    90: {
      new: [120, 145, 132, 155, 180, 170, 190, 210, 185, 195, 220, 240],
      returning: [320, 340, 360, 375, 390, 410, 430, 450, 470, 490, 510, 530],
    },
    180: {
      new: [720, 780, 840, 900, 960, 1020],
      returning: [1800, 1920, 2040, 2160, 2280, 2400],
    },
    365: {
      new: [1500, 1800, 2100, 2400],
      returning: [4000, 4500, 5000, 5500],
    },
  };

  const labels = {
    30: Array.from({ length: 30 }, (_, i) => (i + 1).toString()),
    90: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    180: ["Jan-Feb", "Mar-Apr", "May-Jun", "Jul-Aug", "Sep-Oct", "Nov-Dec"],
    365: ["Q1", "Q2", "Q3", "Q4"],
  };

  // Update Customer Growth Chart
  if (window.customerGrowthChart) {
    window.customerGrowthChart.data.labels = labels[period];
    window.customerGrowthChart.data.datasets[0].data = growthData[period].new;
    window.customerGrowthChart.data.datasets[1].data =
      growthData[period].returning;
    window.customerGrowthChart.update();
  }

  // Update other charts as needed
  // ...
}

/**
 * Update customer charts based on selected segment
 */
function updateCustomerChartsForSegment(segment) {
  // In a real application, you would fetch data for the selected segment
  // For now, we'll just show an alert
  console.log(`Filtering data for segment: ${segment}`);

  // You would then update the charts with the new data
  // updateChartsWithSegmentData(segment);
}

/**
 * Update customer growth view (growth/retention)
 */
function updateCustomerGrowthView(view) {
  if (window.customerGrowthChart) {
    if (view === "growth") {
      window.customerGrowthChart.data.datasets[0].label = "New Customers";
      window.customerGrowthChart.data.datasets[1].label = "Returning Customers";

      // Sample data for growth view
      window.customerGrowthChart.data.datasets[0].data = [
        120, 145, 132, 155, 180, 170, 190, 210, 185, 195, 220, 240,
      ];
      window.customerGrowthChart.data.datasets[1].data = [
        320, 340, 360, 375, 390, 410, 430, 450, 470, 490, 510, 530,
      ];
    } else {
      window.customerGrowthChart.data.datasets[0].label = "Retention Rate";
      window.customerGrowthChart.data.datasets[1].label = "Churn Rate";

      // Sample data for retention view
      window.customerGrowthChart.data.datasets[0].data = [
        75, 76, 78, 77, 79, 80, 81, 80, 82, 83, 82, 84,
      ];
      window.customerGrowthChart.data.datasets[1].data = [
        25, 24, 22, 23, 21, 20, 19, 20, 18, 17, 18, 16,
      ];
    }

    window.customerGrowthChart.update();
  }
}

/**
 * Set up customer table functionality
 */
function setupCustomerTable() {
  // Set up top customers filter
  const topFilter = document.querySelector(".customer-top-filter");
  if (topFilter) {
    topFilter.addEventListener("change", function () {
      const filterValue = this.value;
      // In a real application, you would fetch and display data based on the filter
      console.log(`Filtering top customers by: ${filterValue}`);
    });
  }

  // Set up view all customers button
  const viewAllBtn = document.querySelector(".customer-view-all-btn");
  if (viewAllBtn) {
    viewAllBtn.addEventListener("click", function () {
      // In a real application, you would navigate to a full customers list
      alert("Navigating to full customers list");
    });
  }

  // Set up pagination
  const paginationButtons = document.querySelectorAll(
    ".customer-pagination-btn"
  );
  paginationButtons.forEach((button) => {
    if (!button.disabled) {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        paginationButtons.forEach((btn) => btn.classList.remove("active"));

        // Add active class to clicked button
        this.classList.add("active");

        // In a real application, you would implement pagination
        const page = this.textContent;
        if (page !== "") {
          console.log(`Navigating to page ${page}`);
        }
      });
    }
  });
}

/**
 * Set up customer feedback functionality
 */
function setupCustomerFeedback() {
  // Set up view all feedback button
  const viewAllFeedbackBtn = document.querySelector(
    ".customer-view-all-feedback-btn"
  );
  if (viewAllFeedbackBtn) {
    viewAllFeedbackBtn.addEventListener("click", function () {
      // In a real application, you would navigate to a full feedback list
      alert("Navigating to full feedback list");
    });
  }

  // Set up export button
  const exportBtn = document.querySelector(".customer-export-btn");
  if (exportBtn) {
    exportBtn.addEventListener("click", function () {
      // In a real application, you would implement export functionality
      alert("Exporting customer analytics report");
    });
  }
}

/**
 * Handle window resize to redraw charts
 */
window.addEventListener("resize", function () {
  // Sales charts
  if (window.revenueTrendsChart) {
    window.revenueTrendsChart.resize();
  }

  if (window.salesByRegionChart) {
    window.salesByRegionChart.resize();
  }

  if (window.salesComparisonChart) {
    window.salesComparisonChart.resize();
  }

  // Campaign charts
  if (window.campaignPerformanceChart) {
    window.campaignPerformanceChart.resize();
  }

  if (window.campaignBudgetChart) {
    window.campaignBudgetChart.resize();
  }

  if (window.audienceDemographicsChart) {
    window.audienceDemographicsChart.resize();
  }

  if (window.audienceGeographyChart) {
    window.audienceGeographyChart.resize();
  }

  if (window.audiencePreferencesChart) {
    window.audiencePreferencesChart.resize();
  }

  if (window.audienceChannelsChart) {
    window.audienceChannelsChart.resize();
  }

  // Customer Analytics charts
  if (window.customerGrowthChart) {
    window.customerGrowthChart.resize();
  }

  if (window.customerSegmentsChart) {
    window.customerSegmentsChart.resize();
  }

  if (window.customerAgeChart) {
    window.customerAgeChart.resize();
  }

  if (window.customerLocationChart) {
    window.customerLocationChart.resize();
  }

  if (window.customerTypeChart) {
    window.customerTypeChart.resize();
  }

  if (window.purchaseFrequencyChart) {
    window.purchaseFrequencyChart.resize();
  }

  if (window.productPreferencesChart) {
    window.productPreferencesChart.resize();
  }

  if (window.purchaseTimeChart) {
    window.purchaseTimeChart.resize();
  }

  if (window.paymentMethodsChart) {
    window.paymentMethodsChart.resize();
  }

  if (window.feedbackCategoriesChart) {
    window.feedbackCategoriesChart.resize();
  }

  if (window.sentimentAnalysisChart) {
    window.sentimentAnalysisChart.resize();
  }

  // Distribution Channels charts
  if (window.distributionChannelChart) {
    window.distributionChannelChart.resize();
  }

  if (window.distributionMixChart) {
    window.distributionMixChart.resize();
  }

  if (window.distributionRegionChart) {
    window.distributionRegionChart.resize();
  }

  if (window.distributionStateChart) {
    window.distributionStateChart.resize();
  }

  if (window.distributionCityChart) {
    window.distributionCityChart.resize();
  }

  if (window.deliveryTimeChart) {
    window.deliveryTimeChart.resize();
  }

  if (window.orderFulfillmentChart) {
    window.orderFulfillmentChart.resize();
  }

  if (window.productFreshnessChart) {
    window.productFreshnessChart.resize();
  }

  if (window.distributionCostChart) {
    window.distributionCostChart.resize();
  }

  if (window.vehicleUtilizationChart) {
    window.vehicleUtilizationChart.resize();
  }

  if (window.scheduleAdherenceChart) {
    window.scheduleAdherenceChart.resize();
  }
});

/**
 * Initialize Distribution Channels functionality
 */
function initDistributionChannels() {
  // Check if we're on the distribution channels tab
  const distributionTab = document.getElementById("distribution-channels");
  if (!distributionTab) return;

  // Add a click event to the distribution channels tab button to ensure charts render
  const distributionTabBtn = document.querySelector(
    '.sales-tab-btn[data-tab="distribution-channels"]'
  );
  if (distributionTabBtn) {
    distributionTabBtn.addEventListener("click", function () {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        // Initialize distribution charts
        initDistributionCharts();
      }, 100);
    });
  }

  // Initialize distribution period filter
  initDistributionPeriodFilter();

  // Initialize distribution type selector
  initDistributionTypeSelector();

  // Initialize distribution view toggle
  initDistributionViewToggle();

  // Initialize distribution geo tabs
  initDistributionGeoTabs();

  // Initialize distribution charts
  initDistributionCharts();

  // Set up distribution partners table functionality
  setupDistributionPartnersTable();

  // Set up distribution optimization functionality
  setupDistributionOptimization();
}

/**
 * Initialize distribution period filter
 */
function initDistributionPeriodFilter() {
  const periodButtons = document.querySelectorAll(".distribution-period-btn");

  periodButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      periodButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Update charts based on selected period
      const period = this.getAttribute("data-period");
      updateDistributionChartsForPeriod(period);
    });
  });
}

/**
 * Initialize distribution type selector
 */
function initDistributionTypeSelector() {
  const typeSelect = document.querySelector(".distribution-type-select");

  if (typeSelect) {
    typeSelect.addEventListener("change", function () {
      const type = this.value;
      updateDistributionChartsForType(type);
    });
  }
}

/**
 * Initialize distribution view toggle
 */
function initDistributionViewToggle() {
  const viewButtons = document.querySelectorAll(".distribution-view-btn");

  viewButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      viewButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Update chart based on selected view
      const view = this.getAttribute("data-view");
      updateDistributionChannelView(view);
    });
  });
}

/**
 * Initialize distribution geo tabs
 */
function initDistributionGeoTabs() {
  const tabButtons = document.querySelectorAll(".distribution-geo-tab");
  const tabContents = document.querySelectorAll(
    ".distribution-geo-tab-content"
  );

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Show corresponding tab content
      const tabId = this.getAttribute("data-tab") + "-tab";
      document.getElementById(tabId).classList.add("active");
    });
  });
}

/**
 * Initialize distribution charts
 */
function initDistributionCharts() {
  // Force redraw of chart containers to ensure proper rendering
  const chartContainers = document.querySelectorAll(
    ".distribution-chart-container, .distribution-mix-chart-container, " +
      ".distribution-geo-chart-container, .distribution-metrics-chart-container, " +
      ".distribution-optimization-chart-container"
  );

  chartContainers.forEach((container) => {
    // Force a reflow
    container.style.display = "none";
    container.offsetHeight; // Force a reflow
    container.style.display = "block";
  });
  // Distribution Channel Chart
  const distributionChannelCtx = document.getElementById(
    "distributionChannelChart"
  );
  if (distributionChannelCtx) {
    window.distributionChannelChart = new Chart(distributionChannelCtx, {
      type: "bar",
      data: {
        labels: [
          "Direct Sales",
          "Retail Partners",
          "Wholesale",
          "Online/E-commerce",
        ],
        datasets: [
          {
            label: "Volume (L)",
            data: [82500, 115000, 98000, 30250],
            backgroundColor: "#3b82f6",
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `Volume: ${context.raw.toLocaleString()} L`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return value.toLocaleString() + " L";
              },
            },
            grid: {
              display: true,
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }

  // Distribution Mix Chart
  const distributionMixCtx = document.getElementById("distributionMixChart");
  if (distributionMixCtx) {
    window.distributionMixChart = new Chart(distributionMixCtx, {
      type: "doughnut",
      data: {
        labels: [
          "Direct Sales",
          "Retail Partners",
          "Wholesale",
          "Online/E-commerce",
        ],
        datasets: [
          {
            data: [25, 35, 30, 10],
            backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.label}: ${context.raw}%`;
              },
            },
          },
        },
        cutout: "65%",
      },
    });
  }

  // Distribution Region Chart
  const distributionRegionCtx = document.getElementById(
    "distributionRegionChart"
  );
  if (distributionRegionCtx) {
    window.distributionRegionChart = new Chart(distributionRegionCtx, {
      type: "pie",
      data: {
        labels: ["North", "South", "East", "West", "Central"],
        datasets: [
          {
            data: [28, 32, 15, 20, 5],
            backgroundColor: [
              "#3b82f6",
              "#10b981",
              "#f59e0b",
              "#8b5cf6",
              "#ef4444",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
            labels: {
              boxWidth: 12,
              padding: 10,
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.label}: ${context.raw}%`;
              },
            },
          },
        },
      },
    });
  }

  // Distribution State Chart
  const distributionStateCtx = document.getElementById(
    "distributionStateChart"
  );
  if (distributionStateCtx) {
    window.distributionStateChart = new Chart(distributionStateCtx, {
      type: "bar",
      data: {
        labels: [
          "Maharashtra",
          "Tamil Nadu",
          "Karnataka",
          "Delhi NCR",
          "Gujarat",
          "Others",
        ],
        datasets: [
          {
            label: "Distribution by State",
            data: [22, 18, 15, 12, 10, 23],
            backgroundColor: "#3b82f6",
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.raw}% of distribution`;
              },
            },
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return value + "%";
              },
            },
            grid: {
              display: true,
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          y: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }

  // Distribution City Chart
  const distributionCityCtx = document.getElementById("distributionCityChart");
  if (distributionCityCtx) {
    window.distributionCityChart = new Chart(distributionCityCtx, {
      type: "bar",
      data: {
        labels: [
          "Mumbai",
          "Chennai",
          "Bangalore",
          "Delhi",
          "Hyderabad",
          "Pune",
          "Ahmedabad",
          "Others",
        ],
        datasets: [
          {
            label: "Distribution by City",
            data: [15, 12, 10, 9, 8, 7, 6, 33],
            backgroundColor: "#3b82f6",
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.raw}% of distribution`;
              },
            },
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return value + "%";
              },
            },
            grid: {
              display: true,
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          y: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }

  // Delivery Time Chart
  const deliveryTimeCtx = document.getElementById("deliveryTimeChart");
  if (deliveryTimeCtx) {
    window.deliveryTimeChart = new Chart(deliveryTimeCtx, {
      type: "line",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "Average Delivery Time (hours)",
            data: [6.8, 6.5, 6.2, 5.9, 5.7, 5.5, 5.3, 5.2, 5.0, 4.8, 4.7, 4.5],
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            borderWidth: 2,
            tension: 0.3,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            grid: {
              display: true,
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }

  // Order Fulfillment Chart
  const orderFulfillmentCtx = document.getElementById("orderFulfillmentChart");
  if (orderFulfillmentCtx) {
    window.orderFulfillmentChart = new Chart(orderFulfillmentCtx, {
      type: "line",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "Order Fulfillment Rate (%)",
            data: [
              92.5, 93.2, 94.0, 94.8, 95.5, 96.2, 96.8, 97.2, 97.5, 97.8, 98.0,
              98.2,
            ],
            borderColor: "#10b981",
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            borderWidth: 2,
            tension: 0.3,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            min: 90,
            max: 100,
            ticks: {
              callback: function (value) {
                return value + "%";
              },
            },
            grid: {
              display: true,
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }

  // Product Freshness Chart
  const productFreshnessCtx = document.getElementById("productFreshnessChart");
  if (productFreshnessCtx) {
    window.productFreshnessChart = new Chart(productFreshnessCtx, {
      type: "bar",
      data: {
        labels: [
          "Direct Sales",
          "Retail Partners",
          "Wholesale",
          "Online/E-commerce",
        ],
        datasets: [
          {
            label: "Average Freshness (days)",
            data: [1.2, 2.5, 3.1, 1.8],
            backgroundColor: "#3b82f6",
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Days from Production",
            },
            grid: {
              display: true,
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }

  // Distribution Cost Chart
  const distributionCostCtx = document.getElementById("distributionCostChart");
  if (distributionCostCtx) {
    window.distributionCostChart = new Chart(distributionCostCtx, {
      type: "bar",
      data: {
        labels: [
          "Direct Sales",
          "Retail Partners",
          "Wholesale",
          "Online/E-commerce",
        ],
        datasets: [
          {
            label: "Cost per Liter (₹)",
            data: [3.8, 4.2, 3.5, 5.8],
            backgroundColor: "#3b82f6",
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `₹${context.raw}/L`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return "₹" + value;
              },
            },
            grid: {
              display: true,
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }

  // Vehicle Utilization Chart
  const vehicleUtilizationCtx = document.getElementById(
    "vehicleUtilizationChart"
  );
  if (vehicleUtilizationCtx) {
    window.vehicleUtilizationChart = new Chart(vehicleUtilizationCtx, {
      type: "doughnut",
      data: {
        labels: ["Utilized Capacity", "Unused Capacity"],
        datasets: [
          {
            data: [78, 22],
            backgroundColor: ["#3b82f6", "#e2e8f0"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              boxWidth: 12,
              padding: 10,
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.label}: ${context.raw}%`;
              },
            },
          },
        },
        cutout: "70%",
      },
    });
  }

  // Schedule Adherence Chart
  const scheduleAdherenceCtx = document.getElementById(
    "scheduleAdherenceChart"
  );
  if (scheduleAdherenceCtx) {
    window.scheduleAdherenceChart = new Chart(scheduleAdherenceCtx, {
      type: "bar",
      data: {
        labels: [
          "On Time",
          "Early",
          "Late (< 1hr)",
          "Late (1-2hrs)",
          "Late (>2hrs)",
        ],
        datasets: [
          {
            label: "Delivery Schedule Adherence",
            data: [68, 12, 15, 4, 1],
            backgroundColor: [
              "#10b981",
              "#3b82f6",
              "#f59e0b",
              "#f97316",
              "#ef4444",
            ],
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.raw}% of deliveries`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return value + "%";
              },
            },
            grid: {
              display: true,
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }
}

/**
 * Update distribution charts based on selected period
 */
function updateDistributionChartsForPeriod(period) {
  // Sample data for different periods
  const channelData = {
    30: {
      direct: 25000,
      retail: 35000,
      wholesale: 30000,
      online: 10000,
    },
    90: {
      direct: 82500,
      retail: 115000,
      wholesale: 98000,
      online: 30250,
    },
    180: {
      direct: 165000,
      retail: 230000,
      wholesale: 196000,
      online: 60500,
    },
    365: {
      direct: 330000,
      retail: 460000,
      wholesale: 392000,
      online: 121000,
    },
  };

  // Update Distribution Channel Chart
  if (window.distributionChannelChart) {
    window.distributionChannelChart.data.datasets[0].data = [
      channelData[period].direct,
      channelData[period].retail,
      channelData[period].wholesale,
      channelData[period].online,
    ];
    window.distributionChannelChart.update();
  }

  // Update other charts as needed
  // ...
}

/**
 * Update distribution charts based on selected type
 */
function updateDistributionChartsForType(type) {
  // In a real application, you would fetch data for the selected type
  // For now, we'll just show an alert
  console.log(`Filtering data for channel type: ${type}`);

  // You would then update the charts with the new data
  // updateChartsWithTypeData(type);
}

/**
 * Update distribution channel view (volume/revenue)
 */
function updateDistributionChannelView(view) {
  if (window.distributionChannelChart) {
    if (view === "volume") {
      window.distributionChannelChart.data.datasets[0].label = "Volume (L)";

      // Sample data for volume view
      window.distributionChannelChart.data.datasets[0].data = [
        82500, 115000, 98000, 30250,
      ];

      window.distributionChannelChart.options.scales.y.ticks.callback =
        function (value) {
          return value.toLocaleString() + " L";
        };

      window.distributionChannelChart.options.plugins.tooltip.callbacks.label =
        function (context) {
          return `Volume: ${context.raw.toLocaleString()} L`;
        };
    } else {
      window.distributionChannelChart.data.datasets[0].label = "Revenue (₹)";

      // Sample data for revenue view
      window.distributionChannelChart.data.datasets[0].data = [
        4125000, 5750000, 4900000, 1512500,
      ];

      window.distributionChannelChart.options.scales.y.ticks.callback =
        function (value) {
          return "₹" + value.toLocaleString();
        };

      window.distributionChannelChart.options.plugins.tooltip.callbacks.label =
        function (context) {
          return `Revenue: ₹${context.raw.toLocaleString()}`;
        };
    }

    window.distributionChannelChart.update();
  }
}

/**
 * Set up distribution partners table functionality
 */
function setupDistributionPartnersTable() {
  // Set up partners filter
  const partnersFilter = document.querySelector(
    ".distribution-partners-filter"
  );
  if (partnersFilter) {
    partnersFilter.addEventListener("change", function () {
      const filterValue = this.value;
      // In a real application, you would fetch and display data based on the filter
      console.log(`Filtering partners by: ${filterValue}`);
    });
  }

  // Set up view all partners button
  const viewAllBtn = document.querySelector(".distribution-view-all-btn");
  if (viewAllBtn) {
    viewAllBtn.addEventListener("click", function () {
      // In a real application, you would navigate to a full partners list
      alert("Navigating to full distribution partners list");
    });
  }

  // Set up pagination
  const paginationButtons = document.querySelectorAll(
    ".distribution-pagination-btn"
  );
  paginationButtons.forEach((button) => {
    if (!button.disabled) {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        paginationButtons.forEach((btn) => btn.classList.remove("active"));

        // Add active class to clicked button
        this.classList.add("active");

        // In a real application, you would implement pagination
        const page = this.textContent;
        if (page !== "") {
          console.log(`Navigating to page ${page}`);
        }
      });
    }
  });
}

/**
 * Set up distribution optimization functionality
 */
function setupDistributionOptimization() {
  // Set up export button
  const exportBtn = document.querySelector(".distribution-export-btn");
  if (exportBtn) {
    exportBtn.addEventListener("click", function () {
      // In a real application, you would implement export functionality
      alert("Exporting distribution channels report");
    });
  }
}
