const toggleBtn = document.getElementById("toggleSidebar");
const sidebar = document.getElementById("sidebar");
const bellIcon = document.getElementById("bellIcon");
const dropdown = document.getElementById("notificationDropdown");
const modeIcon = document.getElementById("modeIcon");
const mainContent = document.getElementById("mainContent");
const qualityControlContent = document.getElementById("qualityControlContent");
const crmSection = document.getElementById("crmSection");
const salesMarketingSection = document.getElementById("salesMarketingSection");
const inventorySection = document.getElementById("inventorySection");
const productionSection = document.getElementById("productionSection");
const inventorysSection = document.getElementById("inventorysSection");
const investmentSection = document.getElementById("investmentSection");
const accountSettingsSection = document.getElementById(
  "accountSettingsSection"
);

// Toggle sidebar
toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
  mainContent.classList.toggle("collapsed");
  qualityControlContent.classList.toggle("collapsed");
  crmSection.classList.toggle("collapsed");
  salesMarketingSection.classList.toggle("collapsed");
  inventorySection.classList.toggle("collapsed");
  productionSection.classList.toggle("collapsed");
  inventorysSection.classList.toggle("collapsed");
  investmentSection.classList.toggle("collapsed");
  accountSettingsSection.classList.toggle("collapsed");

  // Redraw charts if quality control section is visible
  setTimeout(() => {
    if (qualityControlContent.style.display === "block") {
      if (typeof setupQualityControlCharts === "function") {
        setupQualityControlCharts();
      }
    }
  }, 300);
});

// Sidebar active link toggle and section switching
const links = document.querySelectorAll(".sidebar ul li a");
const contentSections = document.querySelectorAll(".content-section");

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    // Remove active class from all links
    links.forEach((l) => l.classList.remove("active"));

    // Add active class to clicked link
    link.classList.add("active");

    // Get the target section ID
    const targetId = link.getAttribute("data-target");
    console.log("Switching to section:", targetId);

    // Hide all content sections
    contentSections.forEach((section) => {
      section.style.display = "none";
    });

    // Show the target section
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.style.display = "block";
      console.log("Section displayed:", targetId);
    } else {
      console.error("Target section not found:", targetId);
    }
  });
});

// Toggle notification dropdown
bellIcon.addEventListener("click", () => {
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
});

// Hide dropdown when clicking outside
window.addEventListener("click", function (e) {
  if (!bellIcon.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.style.display = "none";
  }
});

function enableDarkMode() {
  document.body.classList.add("dark-mode");
  localStorage.setItem("darkMode", "enabled");
  modeIcon.classList.remove("fa-moon");
  modeIcon.classList.add("fa-sun");
}

function disableDarkMode() {
  document.body.classList.remove("dark-mode");
  localStorage.setItem("darkMode", "disabled");
  modeIcon.classList.remove("fa-sun");
  modeIcon.classList.add("fa-moon");
}

// Load mode on page load
if (localStorage.getItem("darkMode") === "enabled") {
  enableDarkMode();
} else {
  disableDarkMode();
}

modeIcon.addEventListener("click", () => {
  if (document.body.classList.contains("dark-mode")) {
    disableDarkMode();
  } else {
    enableDarkMode();
  }

  // Redraw charts with appropriate colors for the current mode
  setTimeout(() => {
    if (
      document.getElementById("qualityControlContent").style.display === "block"
    ) {
      setupQualityControlCharts();
    }
  }, 100);
});

// Milk Production Chart (Bar Chart)
const milkProdCtx = document
  .getElementById("milkProductionChart")
  .getContext("2d");
new Chart(milkProdCtx, {
  type: "bar",
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
        label: "Milk Production (Liters)",
        data: [
          12000, 15000, 18000, 21000, 24000, 26000, 25000, 23000, 22000, 20000,
          18000, 16000,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)", // Jan - Red
          "rgba(54, 162, 235, 0.7)", // Feb - Blue
          "rgba(255, 206, 86, 0.7)", // Mar - Yellow
          "rgba(75, 192, 192, 0.7)", // Apr - Teal
          "rgba(153, 102, 255, 0.7)", // May - Purple
          "rgba(255, 159, 64, 0.7)", // Jun - Orange
          "rgba(199, 199, 199, 0.7)", // Jul - Gray
          "rgba(83, 102, 255, 0.7)", // Aug - Indigo
          "rgba(78, 205, 196, 0.7)", // Sep - Turquoise
          "rgba(255, 99, 71, 0.7)", // Oct - Tomato
          "rgba(144, 238, 144, 0.7)", // Nov - Light Green
          "rgba(255, 182, 193, 0.7)", // Dec - Pink
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(199, 199, 199, 1)",
          "rgba(83, 102, 255, 1)",
          "rgba(78, 205, 196, 1)",
          "rgba(255, 99, 71, 1)",
          "rgba(144, 238, 144, 1)",
          "rgba(255, 182, 193, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Liters",
        },
      },
    },
  },
});

// Milk Quality Composition (Pie Chart)
const milkQualityCtx = document
  .getElementById("milkQualityChart")
  .getContext("2d");
new Chart(milkQualityCtx, {
  type: "pie",
  data: {
    labels: ["Fat Content", "Protein", "Lactose", "Minerals", "Water"],
    datasets: [
      {
        data: [4.5, 3.2, 4.8, 0.7, 86.8],
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
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

// Revenue Sources (Doughnut Chart)
const revenueCtx = document.getElementById("revenueChart").getContext("2d");
new Chart(revenueCtx, {
  type: "doughnut",
  data: {
    labels: ["Fresh Milk", "Cheese", "Yogurt", "Butter", "Other Products"],
    datasets: [
      {
        data: [65, 15, 10, 7, 3],
        backgroundColor: [
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 99, 132, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
    },
  },
});

// Monthly Sales Trend (Line Chart)
const salesTrendCtx = document
  .getElementById("salesTrendChart")
  .getContext("2d");
new Chart(salesTrendCtx, {
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
        label: "Sales Revenue (₹)",
        data: [
          1200000, 1300000, 1250000, 1400000, 1500000, 1600000, 1550000,
          1650000, 1700000, 1800000, 1750000, 1850000,
        ],
        fill: false,
        borderColor: "rgba(153, 102, 255, 1)",
        tension: 0.4,
        pointBackgroundColor: [
          "rgba(255, 99, 132, 1)", // Jan - Red
          "rgba(54, 162, 235, 1)", // Feb - Blue
          "rgba(255, 206, 86, 1)", // Mar - Yellow
          "rgba(75, 192, 192, 1)", // Apr - Teal
          "rgba(153, 102, 255, 1)", // May - Purple
          "rgba(255, 159, 64, 1)", // Jun - Orange
          "rgba(199, 199, 199, 1)", // Jul - Gray
          "rgba(83, 102, 255, 1)", // Aug - Indigo
          "rgba(78, 205, 196, 1)", // Sep - Turquoise
          "rgba(255, 99, 71, 1)", // Oct - Tomato
          "rgba(144, 238, 144, 1)", // Nov - Light Green
          "rgba(255, 182, 193, 1)", // Dec - Pink
        ],
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: "Revenue (₹)",
        },
      },
    },
  },
});

// Feed Consumption (Bar Chart)
const feedConsumptionCtx = document
  .getElementById("feedConsumptionChart")
  .getContext("2d");
new Chart(feedConsumptionCtx, {
  type: "bar",
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
        label: "Feed Consumption (kg)",
        data: [
          8000, 8500, 9000, 9500, 10000, 10500, 11000, 11500, 11000, 10500,
          10000, 9500,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)", // Jan - Red
          "rgba(54, 162, 235, 0.7)", // Feb - Blue
          "rgba(255, 206, 86, 0.7)", // Mar - Yellow
          "rgba(75, 192, 192, 0.7)", // Apr - Teal
          "rgba(153, 102, 255, 0.7)", // May - Purple
          "rgba(255, 159, 64, 0.7)", // Jun - Orange
          "rgba(199, 199, 199, 0.7)", // Jul - Gray
          "rgba(83, 102, 255, 0.7)", // Aug - Indigo
          "rgba(78, 205, 196, 0.7)", // Sep - Turquoise
          "rgba(255, 99, 71, 0.7)", // Oct - Tomato
          "rgba(144, 238, 144, 0.7)", // Nov - Light Green
          "rgba(255, 182, 193, 0.7)", // Dec - Pink
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(199, 199, 199, 1)",
          "rgba(83, 102, 255, 1)",
          "rgba(78, 205, 196, 1)",
          "rgba(255, 99, 71, 1)",
          "rgba(144, 238, 144, 1)",
          "rgba(255, 182, 193, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Kilograms",
        },
      },
    },
  },
});

document.addEventListener("DOMContentLoaded", function () {
  const sidebarLinks = document.querySelectorAll("#sidebar a[data-target]");
  const contentSections = document.querySelectorAll(".content-section");

  // Raw Milk Inventory Modal Elements
  const openModalBtn = document.getElementById("openModalBtn");
  const newBatchModal = document.getElementById("newBatchModal");
  const invsbatchForm = document.getElementById("invsbatchForm");
  const milkInventoryTable = document.getElementById("milkInventoryTable");
  const closeModalBtn = document.querySelector(".invsclose");

  sidebarLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove active state from all links
      sidebarLinks.forEach((link) => link.classList.remove("active"));
      this.classList.add("active");

      // Get the target content ID
      const targetId = this.getAttribute("data-target");

      // Show only the selected section
      contentSections.forEach((section) => {
        if (section.id === targetId) {
          section.style.display = "block";
        } else {
          section.style.display = "none";
        }
      });
    });
  });

  // Raw Milk Inventory Modal Functionality
  if (openModalBtn && newBatchModal) {
    // Open modal when the "New Batch" button is clicked
    openModalBtn.addEventListener("click", function () {
      newBatchModal.style.display = "block";

      // Set default date to current date and time
      const now = new Date();
      const dateTimeStr = now.toISOString().slice(0, 16);
      document.getElementById("collectionDate").value = dateTimeStr;
    });

    // Close modal when the X is clicked
    if (closeModalBtn) {
      closeModalBtn.addEventListener("click", function () {
        newBatchModal.style.display = "none";
      });
    }

    // Close modal when clicking outside of it
    window.addEventListener("click", function (event) {
      if (event.target === newBatchModal) {
        newBatchModal.style.display = "none";
      }
    });

    // Handle form submission
    if (invsbatchForm) {
      invsbatchForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get form values
        const collectionDate = document.getElementById("collectionDate").value;
        const quantity = document.getElementById("quantity").value;
        const fatContent = document.getElementById("fatContent").value;
        const sourceFarm = document.getElementById("sourceFarm").value;
        const storageTank = document.getElementById("storageTank").value;
        const status = document.getElementById("status").value;

        // Format the date for display
        const formattedDate = new Date(collectionDate)
          .toISOString()
          .split("T")[0];

        // Generate a batch ID (format: MILK-MMDD-XX)
        const date = new Date(collectionDate);
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        // Get the number of existing rows to determine the new batch number
        const rows = milkInventoryTable.querySelectorAll("tbody tr");
        const batchNum = rows.length + 1;
        const batchId = `MILK-${month}${day}-${String(batchNum).padStart(
          2,
          "0"
        )}`;

        // Create new row HTML
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
          <td>${batchId}</td>
          <td>${formattedDate}</td>
          <td>${quantity}</td>
          <td>${fatContent}%</td>
          <td>${sourceFarm}</td>
          <td>${storageTank}</td>
          <td><span class="status ${status}">${
          status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")
        }</span></td>
          <td>
            <button class="btn-icon view-btn" title="Details">
              <i class="fas fa-eye"></i>
            </button>
            <button class="btn-icon dispose-btn" title="Dispose">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        `;

        // Add the new row to the table
        milkInventoryTable.querySelector("tbody").prepend(newRow);

        // Close the modal
        newBatchModal.style.display = "none";

        // Reset the form
        invsbatchForm.reset();
      });
    }
  }

  // Production Batch Management
  const addBatchBtn = document.getElementById("addBatchBtn");
  const batchModal = document.getElementById("batchModal");
  const closeBatchModal = document.getElementById("closeBatchModal");
  const cancelBatchBtn = document.getElementById("cancelBatchBtn");
  const batchForm = document.getElementById("batchForm");
  const batchTableBody = document.getElementById("batchTableBody");

  // Function to generate next batch ID
  function generateNextBatchId() {
    const batchRows = batchTableBody.querySelectorAll("tr");
    let maxBatchNumber = 1000; // Default starting number

    if (batchRows.length > 0) {
      // Extract all batch IDs and find the maximum
      const batchIds = Array.from(batchRows).map((row) => {
        const batchIdCell = row.cells[0].textContent;
        // Extract the numeric part from batch ID (e.g., "B1003" -> 1003)
        const match = batchIdCell.match(/B(\d+)/);
        return match ? parseInt(match[1]) : 0;
      });

      maxBatchNumber = Math.max(...batchIds);
    }

    // Increment the maximum batch number and format it
    return `B${maxBatchNumber + 1}`;
  }

  // Open batch modal and generate batch ID
  if (addBatchBtn) {
    addBatchBtn.addEventListener("click", function () {
      // Generate and set the next batch ID
      const batchIdInput = document.getElementById("batchId");
      if (batchIdInput) {
        batchIdInput.value = generateNextBatchId();
      }

      // Reset form fields except batch ID
      const formFields = batchForm.querySelectorAll(
        "input:not(#batchId), select"
      );
      formFields.forEach((field) => {
        if (field.type === "date") {
          // Set default date to today for start date
          if (field.id === "startDate") {
            const today = new Date().toISOString().split("T")[0];
            field.value = today;
          } else {
            field.value = "";
          }
        } else {
          field.value = "";
        }
      });

      // Show the modal
      batchModal.style.display = "block";
    });
  }

  // Close batch modal when clicking X
  if (closeBatchModal) {
    closeBatchModal.addEventListener("click", function () {
      batchModal.style.display = "none";
    });
  }

  // Close batch modal when clicking Cancel button
  if (cancelBatchBtn) {
    cancelBatchBtn.addEventListener("click", function () {
      batchModal.style.display = "none";
    });
  }

  // Close batch modal when clicking outside
  window.addEventListener("click", function (event) {
    if (event.target === batchModal) {
      batchModal.style.display = "none";
    }
  });

  // Handle batch form submission
  if (batchForm) {
    batchForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const batchId = document.getElementById("batchId").value;
      const productType = document.getElementById("productType").value;
      const startDate = document.getElementById("startDate").value;
      const endDate = document.getElementById("endDate").value || "-";
      const quantity = document.getElementById("quantity").value;
      const status = document.getElementById("status").value;
      const qualityCheck =
        document.getElementById("qualityCheck").value || "Pending";

      // Create new table row
      const newRow = document.createElement("tr");

      // Format status and quality check classes
      const statusClass = status.toLowerCase().replace(/\s+/g, "-");
      const qualityClass =
        qualityCheck === "Passed"
          ? "excellent"
          : qualityCheck === "Failed"
          ? "failed"
          : "pending";

      // Set row HTML
      newRow.innerHTML = `
        <td>${batchId}</td>
        <td>${productType}</td>
        <td>${startDate}</td>
        <td>${endDate}</td>
        <td>${quantity}</td>
        <td><span class="status ${statusClass}">${status}</span></td>
        <td><span class="rating ${qualityClass}">${qualityCheck}</span></td>
        <td>
          <button class="btn-icon">
            <i class="fas fa-eye"></i>
          </button>
          <button class="btn-icon">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn-icon delete-batch-btn">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      `;

      // Add delete functionality to the new row
      const deleteBtn = newRow.querySelector(".delete-batch-btn");
      deleteBtn.addEventListener("click", function () {
        if (confirm("Are you sure you want to delete this batch?")) {
          newRow.remove();
        }
      });

      // Add the new row to the table
      batchTableBody.appendChild(newRow);

      // Close the modal
      batchModal.style.display = "none";
    });
  }

  // Add delete functionality to existing batch rows
  const deleteBatchBtns = document.querySelectorAll(".delete-batch-btn");
  deleteBatchBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      if (confirm("Are you sure you want to delete this batch?")) {
        const row = this.closest("tr");
        row.remove();
      }
    });
  });

  // Production Line Report Modal
  const viewFullReportBtn = document.getElementById("viewFullReportBtn");
  const productionReportModal = document.getElementById(
    "productionReportModal"
  );
  const closeProductionReportModal = document.getElementById(
    "closeProductionReportModal"
  );

  if (viewFullReportBtn && productionReportModal) {
    // Open modal when View Full Report button is clicked
    viewFullReportBtn.addEventListener("click", function () {
      productionReportModal.style.display = "block";
      initProductionLinePerformanceChart();
    });

    // Close modal when X is clicked
    if (closeProductionReportModal) {
      closeProductionReportModal.addEventListener("click", function () {
        productionReportModal.style.display = "none";
      });
    }

    // Close modal when clicking outside
    window.addEventListener("click", function (event) {
      if (event.target == productionReportModal) {
        productionReportModal.style.display = "none";
      }
    });
  }

  // Initialize Production Line Performance Chart
  function initProductionLinePerformanceChart() {
    const ctx = document.getElementById("productionLinePerformanceChart");

    // Only initialize if the chart doesn't exist yet
    if (ctx && !ctx.chart) {
      ctx.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
          datasets: [
            {
              label: "Filtration Efficiency",
              data: [98.2, 98.5, 99.0, 98.8, 99.2, 99.2],
              borderColor: "#4dabf7",
              tension: 0.2,
              fill: false,
            },
            {
              label: "Pasteurization Efficiency",
              data: [97.5, 98.0, 98.2, 98.5, 98.5, 98.5],
              borderColor: "#f03e3e",
              tension: 0.2,
              fill: false,
            },
            {
              label: "Homogenization Efficiency",
              data: [95.0, 94.5, 93.0, 91.5, 89.0, 87.0],
              borderColor: "#f59f00",
              tension: 0.2,
              fill: false,
            },
            {
              label: "Packaging Efficiency",
              data: [96.5, 97.0, 97.2, 97.5, 97.8, 97.8],
              borderColor: "#2b8a3e",
              tension: 0.2,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "Production Line Efficiency Trends (Last 6 Weeks)",
              font: {
                size: 16,
              },
            },
            tooltip: {
              mode: "index",
              intersect: false,
            },
          },
          scales: {
            y: {
              min: 85,
              max: 100,
              title: {
                display: true,
                text: "Efficiency (%)",
              },
            },
            x: {
              title: {
                display: true,
                text: "Time Period",
              },
            },
          },
        },
      });
    }
  }
});

// Milk Procurement Donut Chart
new Chart(document.getElementById("milkDonutChart"), {
  type: "doughnut",
  data: {
    labels: ["Cow Milk", "Buffalo Milk", "Other"],
    datasets: [
      {
        data: [45, 30, 25],
        backgroundColor: ["#4db6ac", "#81c784", "#ffb74d"],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  },
});

// Sales Revenue Bar Chart
new Chart(document.getElementById("salesBarChart"), {
  type: "bar",
  data: {
    labels: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6"],
    datasets: [
      {
        label: "Revenue (in $K)",
        data: [80, 90, 65, 75, 60, 85],
        backgroundColor: "#4fc3f7",
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

// Customer Satisfaction Chart (Horizontal Bar)
new Chart(document.getElementById("satisfactionChart"), {
  type: "bar",
  data: {
    labels: ["Customer Satisfaction"],
    datasets: [
      {
        label: "Satisfaction %",
        data: [85],
        backgroundColor: "#81c784",
      },
    ],
  },
  options: {
    indexAxis: "y",
    responsive: true,
    scales: {
      x: {
        max: 100,
        beginAtZero: true,
      },
    },
  },
});

// Add this script to your page or JS file
document.addEventListener("DOMContentLoaded", function () {
  // Initialize production volume chart
  const volumeCtx = document
    .getElementById("productionVolumeChart")
    .getContext("2d");
  const productionVolumeChart = new Chart(volumeCtx, {
    type: "bar",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Milk Processed (L)",
          data: [1850, 2100, 1950, 2240, 2300, 1800, 1650],
          backgroundColor: "#4dabf7",
          borderColor: "#4dabf7",
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
              return context.dataset.label + ": " + context.raw + " liters";
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Liters",
          },
        },
        x: {
          title: {
            display: true,
            text: "Day of Week",
          },
        },
      },
    },
  });

  // Initialize quality trends chart
  const qualityCtx = document
    .getElementById("qualityTrendsChart")
    .getContext("2d");
  const qualityTrendsChart = new Chart(qualityCtx, {
    type: "line",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Quality Pass Rate (%)",
          data: [98.5, 97.8, 99.1, 98.9, 99.3, 98.2, 97.5],
          backgroundColor: "rgba(43, 138, 62, 0.1)",
          borderColor: "#2b8a3e",
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
          callbacks: {
            label: function (context) {
              return context.dataset.label + ": " + context.raw + "%";
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: false,
          min: 95,
          max: 100,
          title: {
            display: true,
            text: "Pass Rate %",
          },
        },
        x: {
          title: {
            display: true,
            text: "Day of Week",
          },
        },
      },
    },
  });

  // Period toggle functionality
  const periodButtons = document.querySelectorAll(".chart-period");
  periodButtons.forEach((button) => {
    button.addEventListener("click", function () {
      periodButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Here you would typically fetch new data based on period
      // For demo, we'll just update the current charts with random data
      const period = this.dataset.period;
      updateChartData(productionVolumeChart, qualityTrendsChart, period);
    });
  });

  function updateChartData(volumeChart, qualityChart, period) {
    // This is just for demonstration - in a real app you would fetch real data
    let labels, volumeData, qualityData;

    if (period === "day") {
      labels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
      volumeData = Array.from(
        { length: 24 },
        () => Math.floor(Math.random() * 200) + 50
      );
      qualityData = Array.from({ length: 24 }, () => 95 + Math.random() * 4);
    } else if (period === "week") {
      labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      volumeData = labels.map(() => Math.floor(Math.random() * 1000) + 1000);
      qualityData = labels.map(() => 96 + Math.random() * 3);
    } else {
      // month
      labels = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);
      volumeData = labels.map(() => Math.floor(Math.random() * 1200) + 800);
      qualityData = labels.map(() => 95 + Math.random() * 4);
    }

    volumeChart.data.labels = labels;
    volumeChart.data.datasets[0].data = volumeData;
    volumeChart.update();

    qualityChart.data.labels = labels;
    qualityChart.data.datasets[0].data = qualityData;
    qualityChart.update();
  }

  const investmentCtx = document
    .getElementById("investmentDistributionChart")
    .getContext("2d");
  const investmentChart = new Chart(investmentCtx, {
    type: "bar",
    data: {
      labels: [
        "Cattle",
        "Equipment",
        "Infrastructure",
        "Technology",
        "Feed",
        "Other",
      ],
      datasets: [
        {
          label: "Investment (₹ Lakhs)",
          data: [85, 120, 45, 22, 18, 10],
          backgroundColor: [
            "rgba(54, 162, 235, 0.7)",
            "rgba(255, 99, 132, 0.7)",
            "rgba(75, 192, 192, 0.7)",
            "rgba(255, 206, 86, 0.7)",
            "rgba(153, 102, 255, 0.7)",
            "rgba(201, 203, 207, 0.7)",
          ],
          borderColor: [
            "rgba(54, 162, 235, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(201, 203, 207, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "Investment by Category (Current Year)",
          font: {
            size: 16,
          },
        },
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Amount (₹ Lakhs)",
          },
        },
      },
    },
  });

  // Funding Sources Chart (Pie Chart)
  const fundingCtx = document
    .getElementById("fundingSourcesChart")
    .getContext("2d");
  const fundingChart = new Chart(fundingCtx, {
    type: "pie",
    data: {
      labels: [
        "Bank Loan",
        "Govt. Subsidy",
        "Personal Investment",
        "Private Investors",
      ],
      datasets: [
        {
          data: [150, 25, 75, 30],
          backgroundColor: [
            "rgba(25, 113, 194, 0.7)",
            "rgba(43, 138, 62, 0.7)",
            "rgba(230, 119, 0, 0.7)",
            "rgba(134, 46, 156, 0.7)",
          ],
          borderColor: [
            "rgba(25, 113, 194, 1)",
            "rgba(43, 138, 62, 1)",
            "rgba(230, 119, 0, 1)",
            "rgba(134, 46, 156, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "Funding Sources Breakdown",
          font: {
            size: 16,
          },
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const label = context.label || "";
              const value = context.raw || 0;
              const total = context.dataset.data.reduce(
                (acc, data) => acc + data,
                0
              );
              const percentage = Math.round((value / total) * 100);
              return `${label}: ₹${value} Lakh (${percentage}%)`;
            },
          },
        },
      },
    },
  });

  // Filter functionality
  document
    .getElementById("chartFilter")
    .addEventListener("change", function () {
      // In a real app, you would update chart data based on the selected filter
      console.log("Filter changed to:", this.value);
    });

  // Quality Control Charts
  const setupQualityControlCharts = () => {
    console.log("Setting up quality control charts");

    // Clear any existing charts to prevent duplicates
    const existingMilkChart = Chart.getChart("milkDonutChart");
    if (existingMilkChart) existingMilkChart.destroy();

    const existingSalesChart = Chart.getChart("salesBarChart");
    if (existingSalesChart) existingSalesChart.destroy();

    // Get current mode for proper color scheme
    const isDarkMode = document.body.classList.contains("dark-mode");
    const textColor = isDarkMode ? "#f1f5f9" : "#1e293b";
    const gridColor = isDarkMode
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(0, 0, 0, 0.1)";

    // Milk Procurement Distribution Donut Chart
    const milkDonutCtx = document
      .getElementById("milkDonutChart")
      ?.getContext("2d");
    if (milkDonutCtx) {
      new Chart(milkDonutCtx, {
        type: "doughnut",
        data: {
          labels: ["Farm A", "Farm B", "Farm C", "Farm D", "Other Farms"],
          datasets: [
            {
              data: [35, 25, 20, 15, 5],
              backgroundColor: [
                "rgba(54, 162, 235, 0.9)",
                "rgba(75, 192, 192, 0.9)",
                "rgba(255, 206, 86, 0.9)",
                "rgba(153, 102, 255, 0.9)",
                "rgba(255, 159, 64, 0.9)",
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
                color: document.body.classList.contains("dark-mode")
                  ? "#f1f5f9"
                  : "#1e293b",
                font: {
                  size: 12,
                  weight: "bold",
                },
              },
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const label = context.label || "";
                  const value = context.raw || 0;
                  const total = context.dataset.data.reduce(
                    (acc, data) => acc + data,
                    0
                  );
                  const percentage = Math.round((value / total) * 100);
                  return `${label}: ${percentage}% (${value}%)`;
                },
              },
            },
          },
        },
      });
    }

    // Sales Revenue Bar Chart
    const salesBarCtx = document
      .getElementById("salesBarChart")
      ?.getContext("2d");
    if (salesBarCtx) {
      new Chart(salesBarCtx, {
        type: "bar",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "2024",
              data: [120, 150, 180, 170, 160, 190],
              backgroundColor: "rgba(54, 162, 235, 0.9)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
            {
              label: "2025",
              data: [150, 170, 200, 190, 210, 230],
              backgroundColor: "rgba(75, 192, 192, 0.9)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Revenue (₹ thousands)",
                color: document.body.classList.contains("dark-mode")
                  ? "#f1f5f9"
                  : "#1e293b",
              },
              ticks: {
                color: document.body.classList.contains("dark-mode")
                  ? "#f1f5f9"
                  : "#1e293b",
              },
              grid: {
                color: document.body.classList.contains("dark-mode")
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.1)",
              },
            },
            x: {
              ticks: {
                color: document.body.classList.contains("dark-mode")
                  ? "#f1f5f9"
                  : "#1e293b",
              },
              grid: {
                color: document.body.classList.contains("dark-mode")
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.1)",
              },
            },
          },
          plugins: {
            legend: {
              labels: {
                color: document.body.classList.contains("dark-mode")
                  ? "#f1f5f9"
                  : "#1e293b",
                font: {
                  size: 12,
                  weight: "bold",
                },
              },
            },
          },
        },
      });
    }
  };

  // Initialize quality control charts
  setupQualityControlCharts();

  // Update charts when window is resized
  window.addEventListener("resize", () => {
    if (
      document.getElementById("qualityControlContent").style.display === "block"
    ) {
      setupQualityControlCharts();
    }
  });

  // Update charts when sidebar is toggled
  toggleBtn.addEventListener("click", () => {
    setTimeout(() => {
      if (
        document.getElementById("qualityControlContent").style.display ===
        "block"
      ) {
        // Force chart redraw with proper dimensions
        setupQualityControlCharts();

        // Force a second redraw after layout has settled
        setTimeout(() => {
          setupQualityControlCharts();
        }, 300);
      }
    }, 100);
  });

  // Update chart colors when toggling dark mode
  modeIcon.addEventListener("click", () => {
    // Wait for the DOM to update with the new mode
    setTimeout(() => {
      // Destroy existing charts and recreate them with the new theme
      setupQualityControlCharts();
    }, 100);
  });

  // Initialize quality control section when clicking on the sidebar link
  const qualityControlLink = document.querySelector(
    'a[data-target="qualityControlContent"]'
  );
  if (qualityControlLink) {
    qualityControlLink.addEventListener("click", () => {
      // Wait for the section to be displayed
      setTimeout(() => {
        setupQualityControlCharts();
      }, 100);
    });
  }
});

// Customer Relation Management Form Section
document.addEventListener("DOMContentLoaded", function () {
  const farmerModal = document.getElementById("farmerModal");
  const addFarmerBtn = document.getElementById("addFarmerBtn");
  const farmerCloseBtn = document.querySelector("#farmerModal .close");
  const farmerForm = document.getElementById("farmerForm");

  // Input elements
  const nameInput = document.getElementById("name");
  const locationInput = document.getElementById("location");
  const contactInput = document.getElementById("contact");

  // Error elements
  const nameError = document.getElementById("name-error");
  const locationError = document.getElementById("location-error");
  const contactError = document.getElementById("contact-error");

  // Open modal
  addFarmerBtn.addEventListener("click", function () {
    farmerModal.style.display = "block";
    contactInput.value = "+91 "; // Initialize with proper format
  });

  // Close modal
  farmerCloseBtn.addEventListener("click", function () {
    farmerModal.style.display = "none";
    resetForm();
  });

  // Close when clicking outside
  window.addEventListener("click", function (event) {
    if (event.target == farmerModal) {
      farmerModal.style.display = "none";
      resetForm();
    }
  });

  // Name validation - only letters, no spaces
  nameInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^A-Za-z]/g, "");
    if (this.value.length < 3) {
      nameError.textContent = "Minimum 3 characters required";
      nameError.style.display = "block";
    } else {
      nameError.style.display = "none";
    }
  });

  // Location validation - only letters, no spaces
  locationInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^A-Za-z]/g, "");
    if (this.value.length < 3) {
      locationError.textContent = "Minimum 3 characters required";
      locationError.style.display = "block";
    } else {
      locationError.style.display = "none";
    }
  });

  // Contact number validation
  contactInput.addEventListener("input", function () {
    // Get current cursor position
    const cursorPosition = this.selectionStart;

    // Remove any non-digit characters (except + at start)
    let newValue = this.value;
    if (newValue.startsWith("+")) {
      const afterPlus = newValue.substring(1).replace(/\D/g, "");
      newValue = "+" + afterPlus;
    } else {
      newValue = newValue.replace(/\D/g, "");
    }

    // Ensure it starts with +91 and has space after
    if (!newValue.startsWith("+91 ")) {
      // If user is typing the first digits after +91
      if (newValue.startsWith("+91") && newValue.length > 3) {
        // Insert space after +91
        newValue = "+91 " + newValue.substring(3);
      } else if (!newValue.startsWith("+91")) {
        // Force +91 prefix
        newValue = "+91 " + newValue.replace(/^\+?\d{0,2}/, "");
      }
    }

    // If we have digits after +91 space, validate first digit is 6-9
    if (newValue.length > 4) {
      const firstDigit = newValue[4]; // Character after "+91 "
      if (!/[6-9]/.test(firstDigit)) {
        // Remove invalid starting digit
        newValue = "+91 " + newValue.substring(4).replace(/^[^6-9]/, "");
        contactError.textContent =
          "Number must start with 6,7,8 or 9 after +91";
        contactError.style.display = "block";
      } else {
        contactError.style.display = "none";
      }
    }

    // Limit to 14 characters (+91 + space + 10 digits)
    if (newValue.length > 14) {
      newValue = newValue.substring(0, 14);
    }

    // Update the value
    this.value = newValue;

    // Restore cursor position (adjusting for any removed characters)
    this.setSelectionRange(cursorPosition, cursorPosition);

    // Validate length
    const digits = newValue.substring(4); // Get digits after "+91 "
    if (digits.length < 10) {
      contactError.textContent = "Exactly 10 digits required after +91";
      contactError.style.display = "block";
    } else {
      contactError.style.display = "none";
    }
  });

  // Prevent paste of non-numeric content
  contactInput.addEventListener("paste", function (e) {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text/plain").replace(/\D/g, "");
    document.execCommand("insertText", false, pasteData);
  });

  // Form submission
  farmerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validate all fields
    let isValid = true;

    if (nameInput.value.length < 2) {
      nameError.textContent = "Please enter a valid name (min 2 letters)";
      nameError.style.display = "block";
      isValid = false;
    }

    if (locationInput.value.length < 2) {
      locationError.textContent =
        "Please enter a valid location (min 2 letters)";
      locationError.style.display = "block";
      isValid = false;
    }

    // Updated contact validation
    const contactValue = contactInput.value;
    if (
      contactValue.length !== 14 || // +91 + space + 10 digits
      !contactValue.startsWith("+91 ") ||
      !/[6-9]/.test(contactValue[4]) || // First digit after space should be 6-9
      contactValue.substring(4).length !== 10
    ) {
      contactError.textContent =
        "Please enter a valid 10-digit number starting with 6-9 after +91";
      contactError.style.display = "block";
      isValid = false;
    }

    if (!isValid) return;

    // Get form values
    const table = document.getElementById("farmersTable");
    // Get all existing IDs from the table (skip header row)
    const existingIds = Array.from(table.rows)
      .slice(1)
      .map((row) => parseInt(row.cells[0].textContent));
    // Find the maximum existing ID or default to 1002 if no rows exist
    const maxId = existingIds.length > 0 ? Math.max(...existingIds) : 1002;
    const newId = maxId + 1;

    // Determine rating class
    const ratingClass = parseFloat(qualityRating) >= 4.5 ? "excellent" : "good";

    // Create new table row
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${newId}</td>
      <td>${name}</td>
      <td>${location}</td>
      <td>${contact}</td>
      <td>${cattleCount}</td>
      <td>${dailySupply} L/day</td>
      <td><span class="rating ${ratingClass}">${qualityRating}/5</span></td>
      <td>
        <button class="btn-icon">
          <i class="fas fa-phone"></i>
        </button>
        <button class="btn-icon">
          <i class="fas fa-envelope"></i>
        </button>
        <button class="btn-icon delete-farmer-btn">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    `;

    // Add to table
    document.querySelector("#farmersTable tbody").appendChild(newRow);

    // Add delete event to new button
    newRow
      .querySelector(".delete-farmer-btn")
      .addEventListener("click", handleDeleteFarmer);

    // Reset form and close modal
    resetForm();
    farmerModal.style.display = "none";

    alert("Customer added successfully!");
  });

  function resetForm() {
    farmerForm.reset();
    contactInput.value = "+91 "; // Reset to country code with space
    document.querySelectorAll(".validation-error").forEach((el) => {
      el.style.display = "none";
    });
  }

  function handleDeleteFarmer(e) {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this customer?")) {
      this.closest("tr").remove();
    }
  }

  // Add delete events to existing buttons
  document
    .querySelectorAll(".delete-farmer-btn, .delete-btn")
    .forEach((btn) => {
      btn.addEventListener("click", handleDeleteFarmer);
    });
});

// Customer Support Form Section
document.addEventListener("DOMContentLoaded", function () {
  const newTicketBtn = document.getElementById("newTicketBtn");
  const ticketModal = document.getElementById("ticketModal");
  const closeModalBtns = document.querySelectorAll(".close-modal");
  const ticketForm = document.getElementById("ticketForm");
  const ticketsTable = document.getElementById("ticketsTable");
  const statusFilter = document.getElementById("statusFilter");

  // Farmer name validation elements
  const farmerNameInput = document.getElementById("farmerName");
  const farmerNameError = document.getElementById("farmerName-error");

  // Open modal
  newTicketBtn.addEventListener("click", function () {
    ticketModal.classList.add("active");
  });

  // Close modal
  closeModalBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      ticketModal.classList.remove("active");
      ticketForm.reset();
      farmerNameError.style.display = "none";
    });
  });

  // Close modal when clicking outside
  ticketModal.addEventListener("click", function (e) {
    if (e.target === ticketModal) {
      ticketModal.classList.remove("active");
      ticketForm.reset();
      farmerNameError.style.display = "none";
    }
  });

  // Farmer name validation
  farmerNameInput.addEventListener("input", function () {
    // Remove any non-alphabetic characters
    this.value = this.value.replace(/[^A-Za-z]/g, "");

    // Validate length
    if (this.value.length < 3) {
      farmerNameError.textContent = "Minimum 3 alphabetic characters required";
      farmerNameError.style.display = "block";
    } else {
      farmerNameError.style.display = "none";
    }
  });

  // Prevent paste of invalid content
  farmerNameInput.addEventListener("paste", function (e) {
    e.preventDefault();
    const pasteData = e.clipboardData
      .getData("text/plain")
      .replace(/[^A-Za-z]/g, "");
    document.execCommand("insertText", false, pasteData);
  });

  // Form submission
  ticketForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validate farmer name
    if (farmerNameInput.value.length < 2) {
      farmerNameError.textContent =
        "Please enter a valid farmer name (min 2 letters)";
      farmerNameError.style.display = "block";
      return;
    }

    // Get form values
    const farmerName = farmerNameInput.value;
    const issueType = document.getElementById("issueType").value;
    const priority = document.getElementById("priority").value;
    const date = document.getElementById("date").value;

    // Generate new ticket ID
    const lastTicketId =
      ticketsTable.querySelector("tbody tr:last-child td:first-child")
        ?.textContent || "#DFT1003";
    const newIdNum = parseInt(lastTicketId.substring(5)) + 1;
    const newTicketId = `#DFT100${newIdNum}`;

    // Create new row
    const newRow = document.createElement("tr");
    newRow.setAttribute("data-status", "open");
    newRow.innerHTML = `
      <td>${newTicketId}</td>
      <td>${farmerName}</td>
      <td>${issueType}</td>
      <td><span class="priority ${priority}">${
      priority.charAt(0).toUpperCase() + priority.slice(1)
    }</span></td>
      <td>${date}</td>
      <td><span class="status open">Open</span></td>
      <td>
        <button class="btn-icon delete-ticket-btn">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    `;

    // Add to table
    ticketsTable.querySelector("tbody").appendChild(newRow);

    // Add delete event listener to the new button
    newRow
      .querySelector(".delete-ticket-btn")
      .addEventListener("click", handleDeleteTicket);

    // Close modal and reset form
    ticketModal.classList.remove("active");
    ticketForm.reset();
    farmerNameError.style.display = "none";

    // Show success message
    alert("Ticket created successfully!");
  });

  // Unified delete function
  function handleDeleteTicket(e) {
    e.stopPropagation();
    e.preventDefault();
    if (confirm("Are you sure you want to delete this ticket?")) {
      this.closest("tr").remove();
    }
  }

  // Status filter functionality
  statusFilter.addEventListener("change", function () {
    const status = this.value;
    const rows = ticketsTable.querySelectorAll("tbody tr");

    rows.forEach((row) => {
      if (status === "all" || row.getAttribute("data-status") === status) {
        row.style.display = "";
        row.classList.add("fade-in");
      } else {
        row.style.display = "none";
      }
    });
  });

  // Add delete functionality to all ticket rows (existing and new)
  ticketsTable.addEventListener("click", function (e) {
    if (e.target.closest(".delete-ticket-btn, .delete-btn")) {
      handleDeleteTicket(e);
    }
  });
});

// Inventory & supply Raw Milk form details
document.addEventListener("DOMContentLoaded", function () {
  // Modal elements
  const entryModal = document.getElementById("entryModal");
  const newEntryBtn = document.getElementById("newEntryBtn");
  const closeBtn = document.querySelector("#entryModal .close");
  const inventoryForm = document.getElementById("inventoryForm");
  const inventoryTable = document.getElementById("inventoryTable");

  // Open modal
  newEntryBtn.addEventListener("click", function () {
    entryModal.style.display = "block";
    // Reset the form when opening modal
    inventoryForm.reset();
  });

  // Close modal
  closeBtn.addEventListener("click", function () {
    entryModal.style.display = "none";
  });

  // Close modal when clicking outside
  window.addEventListener("click", function (event) {
    if (event.target == entryModal) {
      entryModal.style.display = "none";
    }
  });

  // Form submission
  inventoryForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const collectionDate = document.getElementById("collectionDate").value;
    const quantity = parseFloat(document.getElementById("quantity").value);
    const fatContent = parseFloat(document.getElementById("fatContent").value);
    const sourceFarmer = document.getElementById("sourceFarmer").value;

    // Validate inputs
    if (isNaN(quantity)) {
      alert("Please enter a valid quantity");
      return;
    }
    if (isNaN(fatContent) || fatContent < 0 || fatContent > 100) {
      alert("Please enter a valid fat content between 0-100%");
      return;
    }

    // Generate Batch ID (MILK-MMDD-XX)
    const date = new Date(collectionDate);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const existingBatches = document.querySelectorAll(
      "#inventoryTable tbody tr"
    );
    const batchNumber = String(existingBatches.length + 1).padStart(2, "0");
    const batchId = `MILK-${month}${day}-${batchNumber}`;

    // Calculate expiry date (2 days after collection)
    const expiryDate = new Date(date);
    expiryDate.setDate(expiryDate.getDate() + 2);
    const expiryDateStr = expiryDate.toISOString().split("T")[0];

    // Determine status
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expiry = new Date(expiryDateStr);
    let status = "fresh";

    if (expiry < today) {
      status = "expired";
    } else if (expiry.getDate() - today.getDate() <= 1) {
      status = "warning";
    }

    // Create new row
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${batchId}</td>
      <td>${collectionDate}</td>
      <td>${quantity} L</td>
      <td>${fatContent}%</td>
      <td>${sourceFarmer}</td>
      <td>${expiryDateStr}</td>
      <td><span class="status ${status}">${
      status === "fresh"
        ? "Fresh"
        : status === "warning"
        ? "Near Expiry"
        : "Expired"
    }</span></td>
      <td><button class="btn-icon delete-entry"><i class="fas fa-trash"></i></button></td>
    `;

    // Add to table (at the End)
    inventoryTable.querySelector("tbody").appendChild(newRow);

    // Add delete event to new row
    newRow
      .querySelector(".delete-entry")
      .addEventListener("click", deleteEntry);

    // Reset form and close modal
    inventoryForm.reset();
    entryModal.style.display = "none";

    // Update summary cards
    updateSummaryCards();

    // Show success message
    alert("Inventory entry added successfully!");
  });

  // Delete entry function
  function deleteEntry() {
    if (confirm("Are you sure you want to delete this inventory entry?")) {
      this.closest("tr").remove();
      updateSummaryCards();
    }
  }

  // Add delete events to existing entries
  document.querySelectorAll(".delete-entry").forEach((btn) => {
    btn.addEventListener("click", deleteEntry);
  });

  // Function to update summary cards
  function updateSummaryCards() {
    const rows = document.querySelectorAll("#inventoryTable tbody tr");
    let totalQuantity = 0;
    let expiringSoonCount = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    rows.forEach((row) => {
      // Get quantity from the row (remove " L" and convert to number)
      const quantityText = row.cells[2].textContent.replace(" L", "");
      const quantity = parseFloat(quantityText) || 0;
      totalQuantity += quantity;

      // Check expiry status
      const expiryDate = new Date(row.cells[5].textContent);
      const statusText = row.cells[6].textContent.trim();

      // Calculate days until expiry
      const timeDiff = expiryDate - today;
      const daysUntilExpiry = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

      // Count expiring soon (within 1 day and not expired)
      if (daysUntilExpiry <= 1 && statusText !== "Expired") {
        expiringSoonCount++;
      }
    });

    // Update current stock card
    const currentStockElement = document.querySelector(
      ".dashboard-card:nth-child(1) h2"
    );
    currentStockElement.textContent = `${totalQuantity.toLocaleString()} L`;

    // Update percentage change (simple mock calculation)
    const percentageChange = calculatePercentageChange(totalQuantity);
    const changeElement = document.querySelector(
      ".dashboard-card:nth-child(1) p"
    );

    if (percentageChange > 0) {
      changeElement.innerHTML = `<i class="fas fa-arrow-up"></i> ${Math.abs(
        percentageChange
      )}% from yesterday`;
      changeElement.className = "green-text";
    } else if (percentageChange < 0) {
      changeElement.innerHTML = `<i class="fas fa-arrow-down"></i> ${Math.abs(
        percentageChange
      )}% from yesterday`;
      changeElement.className = "red-text";
    } else {
      changeElement.innerHTML = `<i class="fas fa-equals"></i> No change from yesterday`;
      changeElement.className = "";
    }

    // Update expiring batches card
    const expiringElement = document.querySelector(
      ".dashboard-card:nth-child(3) p"
    );
    if (expiringSoonCount > 0) {
      expiringElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${expiringSoonCount} batch${
        expiringSoonCount > 1 ? "es" : ""
      } expiring soon`;
      expiringElement.className = "red-text";
    } else {
      expiringElement.innerHTML = `<i class="fas fa-check-circle"></i> No batches expiring soon`;
      expiringElement.className = "green-text";
    }

    // Update average shelf life (fixed at 48 hours for this example)
    // You could calculate this based on your actual data if needed
    document.querySelector(".dashboard-card:nth-child(3) h2").textContent =
      "48 Hrs";
  }

  // Mock function to calculate percentage change
  function calculatePercentageChange(currentTotal) {
    // In a real app, you would compare with yesterday's total from your database
    // For this demo, we'll use a simple calculation
    const mockYesterdayTotal = currentTotal * 0.88; // Simulates 12% increase
    return (
      ((currentTotal - mockYesterdayTotal) / mockYesterdayTotal) *
      100
    ).toFixed(0);
  }

  // Initialize summary cards on first load
  updateSummaryCards();
});

// Maintenance Request System
document.addEventListener("DOMContentLoaded", function () {
  // Get maintenance modal elements
  const maintenanceModal = document.getElementById("maintenanceModal");
  const maintenanceBtn = document.getElementById("requestMaintenanceBtn");
  const maintenanceForm = document.getElementById("maintenanceForm");
  const cancelMaintenanceBtn = document.getElementById("cancelMaintenanceBtn");
  const maintenanceTable = document.getElementById("maintenanceTable");

  // Initialize maintenance request ID counter
  let maintenanceIdCounter = 4; // Starting from M004 since we have 3 example rows

  // Open maintenance modal when request button is clicked
  if (maintenanceBtn) {
    maintenanceBtn.addEventListener("click", function () {
      if (maintenanceModal) {
        // Set today's date as default
        const today = new Date().toISOString().split("T")[0];
        document.getElementById("requestDate").value = today;

        // Set default status to "Pending"
        document.getElementById("maintenanceStatus").value = "Pending";

        // Clear other form fields
        document.getElementById("equipmentName").value = "";
        document.getElementById("requestedBy").value = "";
        document.getElementById("issueDescription").value = "";
        document.getElementById("priority").value = "";

        // Show the modal
        maintenanceModal.style.display = "block";
      }
    });
  }

  // Close maintenance modal when cancel button is clicked
  if (cancelMaintenanceBtn) {
    cancelMaintenanceBtn.addEventListener("click", function () {
      if (maintenanceModal) {
        maintenanceModal.style.display = "none";
      }
    });
  }

  // Close maintenance modal when X is clicked
  if (maintenanceModal) {
    const closeBtn = maintenanceModal.querySelector(".close");
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        maintenanceModal.style.display = "none";
      });
    }

    // Close modal when clicking outside
    window.addEventListener("click", function (event) {
      if (event.target == maintenanceModal) {
        maintenanceModal.style.display = "none";
      }
    });
  }

  // Handle maintenance form submission
  if (maintenanceForm) {
    maintenanceForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const equipmentName = document.getElementById("equipmentName").value;
      const requestedBy = document.getElementById("requestedBy").value;
      const issueDescription =
        document.getElementById("issueDescription").value;
      const priority = document.getElementById("priority").value;
      const requestDate = document.getElementById("requestDate").value;
      const status = document.getElementById("maintenanceStatus").value;

      // Generate maintenance ID (format: M001, M002, etc.)
      const maintenanceId =
        "M" + maintenanceIdCounter.toString().padStart(3, "0");
      maintenanceIdCounter++;

      // Determine status class
      let statusClass = "";
      switch (status) {
        case "Pending":
          statusClass = "pending";
          break;
        case "In Progress":
          statusClass = "in-progress";
          break;
        case "Completed":
          statusClass = "completed";
          break;
        case "Cancelled":
          statusClass = "cancelled";
          break;
        default:
          statusClass = "pending";
      }

      // Determine priority class
      let priorityClass = "";
      switch (priority) {
        case "High":
          priorityClass = "high";
          break;
        case "Medium":
          priorityClass = "medium";
          break;
        case "Low":
          priorityClass = "low";
          break;
        default:
          priorityClass = "medium";
      }

      // Create new table row
      if (maintenanceTable) {
        const tbody = maintenanceTable.querySelector("tbody");
        if (tbody) {
          const newRow = document.createElement("tr");
          newRow.innerHTML = `
            <td>${maintenanceId}</td>
            <td>${equipmentName}</td>
            <td>${issueDescription}</td>
            <td><span class="status ${priorityClass}">${priority}</span></td>
            <td>${requestedBy}</td>
            <td>${requestDate}</td>
            <td><span class="status ${statusClass}">${status}</span></td>
            <td>
              <button class="btn-icon edit-maintenance"><i class="fas fa-edit"></i></button>
              <button class="btn-icon delete-maintenance"><i class="fas fa-trash"></i></button>
            </td>
          `;

          // Add event listeners to the new buttons
          const editBtn = newRow.querySelector(".edit-maintenance");
          const deleteBtn = newRow.querySelector(".delete-maintenance");

          if (editBtn) {
            editBtn.addEventListener("click", function () {
              // Populate form with row data for editing
              document.getElementById("equipmentName").value = equipmentName;
              document.getElementById("requestedBy").value = requestedBy;
              document.getElementById("issueDescription").value =
                issueDescription;
              document.getElementById("priority").value = priority;
              document.getElementById("requestDate").value = requestDate;
              document.getElementById("maintenanceStatus").value = status;

              // Show the modal
              maintenanceModal.style.display = "block";

              // Remove the old row when submitted (will be replaced with updated info)
              maintenanceForm.onsubmit = function (e) {
                e.preventDefault();
                tbody.removeChild(newRow);
                // Reset the form submission handler
                maintenanceForm.onsubmit = null;
                // Trigger the normal submission
                maintenanceForm.dispatchEvent(new Event("submit"));
              };
            });
          }

          if (deleteBtn) {
            deleteBtn.addEventListener("click", function () {
              if (
                confirm(
                  "Are you sure you want to delete this maintenance request?"
                )
              ) {
                tbody.removeChild(newRow);
              }
            });
          }

          // Add the new row to the table
          tbody.appendChild(newRow);
        }
      }

      // Close the modal and reset the form
      maintenanceModal.style.display = "none";
      maintenanceForm.reset();
    });
  }

  // Add event listeners to existing edit and delete buttons
  const existingEditBtns = document.querySelectorAll(".edit-maintenance");
  const existingDeleteBtns = document.querySelectorAll(".delete-maintenance");

  existingEditBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const row = this.closest("tr");
      if (row && maintenanceModal) {
        // Get data from the row
        const cells = row.cells;
        const equipmentName = cells[1].textContent;
        const issueDescription = cells[2].textContent;
        const priority = cells[3].querySelector(".status").textContent;
        const requestedBy = cells[4].textContent;
        const requestDate = cells[5].textContent;
        const status = cells[6].querySelector(".status").textContent;

        // Populate form with row data
        document.getElementById("equipmentName").value = equipmentName;
        document.getElementById("requestedBy").value = requestedBy;
        document.getElementById("issueDescription").value = issueDescription;
        document.getElementById("priority").value = priority;
        document.getElementById("requestDate").value = requestDate;
        document.getElementById("maintenanceStatus").value = status;

        // Show the modal
        maintenanceModal.style.display = "block";

        // Remove the old row when submitted (will be replaced with updated info)
        maintenanceForm.onsubmit = function (e) {
          e.preventDefault();
          row.remove();
          // Reset the form submission handler
          maintenanceForm.onsubmit = null;
          // Trigger the normal submission
          maintenanceForm.dispatchEvent(new Event("submit"));
        };
      }
    });
  });

  existingDeleteBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const row = this.closest("tr");
      if (
        row &&
        confirm("Are you sure you want to delete this maintenance request?")
      ) {
        row.remove();
      }
    });
  });
});

// Inventory & Supply Cattle Feed Form Details
document.addEventListener("DOMContentLoaded", function () {
  // Get modal elements
  const modal = document.getElementById("reorderModal");
  const btn = document.getElementById("reorderBtn");
  const form = document.getElementById("reorderForm");

  // Get the close span element - try multiple selectors to ensure we find it
  let span = modal ? modal.querySelector(".close") : null;
  if (!span && modal) {
    span = modal.querySelector(".modal-close");
  }
  if (!span && modal) {
    span = modal.querySelector("span.close");
  }

  // If we still don't have the span, let's create one
  if (!span && modal) {
    span = document.createElement("span");
    span.className = "close";
    span.innerHTML = "&times;";
    span.style.position = "absolute";
    span.style.right = "15px";
    span.style.top = "10px";
    span.style.fontSize = "24px";
    span.style.fontWeight = "bold";
    span.style.cursor = "pointer";

    // Add it to the modal
    const modalContent = modal.querySelector(".modal-content");
    if (modalContent) {
      modalContent.insertBefore(span, modalContent.firstChild);
    } else {
      modal.insertBefore(span, modal.firstChild);
    }
  }

  // Open modal when reorder button is clicked
  btn.onclick = function () {
    modal.style.display = "block";
  };

  // Close modal when X is clicked
  if (span) {
    // Remove any existing event listeners
    span.replaceWith(span.cloneNode(true));
    // Get the span again after replacing it
    span =
      modal.querySelector(".close") ||
      modal.querySelector(".modal-close") ||
      modal.querySelector("span.close");

    if (span) {
      // Add the event listener
      span.addEventListener("click", function () {
        console.log("Close button clicked");
        if (modal) modal.style.display = "none";
        if (form) form.reset(); // Reset the form when closing
      });

      // Make sure the span is visible and styled correctly
      span.style.display = "block";
      span.style.cursor = "pointer";
    }
  }

  // Add Current Stock and Status fields to the form if they don't exist
  if (form) {
    // Set up event listeners for the current stock field
    const currentStockField = document.getElementById("currentStock");
    const reorderLevelField = document.getElementById("reorderLevel");
    const statusSelect = document.getElementById("stockStatus");

    if (currentStockField && reorderLevelField && statusSelect) {
      // Function to update status based on current stock and reorder level
      const updateStatus = function () {
        const currentQty = parseFloat(currentStockField.value);
        const reorderQty = parseFloat(reorderLevelField.value);

        if (isNaN(currentQty) || currentQty <= 0) {
          statusSelect.value = "Out of Stock";
        } else if (currentQty < reorderQty) {
          statusSelect.value = "Low Stock";
        } else {
          statusSelect.value = "In Stock";
        }

        console.log(
          `Status updated: ${statusSelect.value} (Current: ${currentQty}, Reorder: ${reorderQty})`
        );
      };

      // Add event listeners to update status when values change
      currentStockField.addEventListener("input", updateStatus);
      reorderLevelField.addEventListener("input", updateStatus);

      // Initial status update
      updateStatus();
    }

    // We no longer need to create the status select field
    // since it's now included in the HTML

    // Check if a cancel button already exists
    let cancelBtn = document.getElementById("cancelBtn");

    // If no cancel button exists, create one
    if (!cancelBtn) {
      // Find the submit button to place the cancel button next to it
      const submitBtn = form.querySelector('button[type="submit"]');

      if (submitBtn) {
        // Create a new cancel button
        cancelBtn = document.createElement("button");
        cancelBtn.id = "cancelBtn";
        cancelBtn.type = "button"; // Important: type="button" prevents form submission
        cancelBtn.className = "btn btn-secondary";
        cancelBtn.style.marginRight = "10px";
        cancelBtn.textContent = "Cancel";

        // Insert the cancel button before the submit button
        submitBtn.parentNode.insertBefore(cancelBtn, submitBtn);
      }
    }

    // Add event listener to the cancel button
    if (cancelBtn) {
      cancelBtn.addEventListener("click", function (e) {
        modal.style.display = "none";
        form.reset(); // Reset the form when closing
      });
    }
  }

  // Close modal when clicking outside of it
  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      if (form) form.reset(); // Reset the form when closing
    }
  });

  // Handle form submission
  form.onsubmit = function (e) {
    e.preventDefault();

    // Get form values
    const itemName = document.getElementById("itemName").value;
    const category = document.getElementById("category").value;

    // Get the current stock value (now using the renamed field)
    const currentStockField = document.getElementById("currentStock");

    // Make sure we have a valid current stock value
    let currentStockValue = "";
    if (currentStockField && currentStockField.value) {
      currentStockValue = currentStockField.value;
    } else {
      currentStockValue = "0"; // Default to 0 if no value is available
    }

    // Format the current stock with kg unit
    const currentStock = currentStockValue + " kg";

    const reorderLevel = document.getElementById("reorderLevel").value + " kg";
    const supplier = document.getElementById("supplier").value;
    const lastOrdered = document.getElementById("lastOrdered").value;

    // Get status from select field if it exists, otherwise determine it automatically
    const statusSelectField = document.getElementById("stockStatus");
    let status, statusClass;

    if (statusSelectField) {
      status = statusSelectField.value;
      // Determine status class based on selected status
      switch (status) {
        case "In Stock":
          statusClass = "ok";
          break;
        case "Low Stock":
          statusClass = "low";
          break;
        case "Out of Stock":
          statusClass = "out";
          break;
        case "On Order":
          statusClass = "pending";
          break;
        default:
          statusClass = "ok";
      }
    } else {
      // Fall back to automatic determination based on current stock
      const currentQty = parseFloat(currentStockValue);
      const reorderQty = parseFloat(
        document.getElementById("reorderLevel").value
      );

      console.log(
        `Calculating status: Current Stock ${currentQty}, Reorder Level ${reorderQty}`
      );

      if (isNaN(currentQty) || isNaN(reorderQty)) {
        // Default values if parsing fails
        status = "In Stock";
        statusClass = "ok";
      } else if (currentQty <= 0) {
        status = "Out of Stock";
        statusClass = "out";
      } else if (currentQty < reorderQty) {
        status = "Low Stock";
        statusClass = "low";
      } else {
        status = "In Stock";
        statusClass = "ok";
      }
    }

    // Create new table row
    const table = document
      .getElementById("feedTable")
      .getElementsByTagName("tbody")[0];
    const newRow = table.insertRow();

    newRow.innerHTML = `
      <td>${itemName}</td>
      <td>${category}</td>
      <td>${currentStock}</td>
      <td>${reorderLevel}</td>
      <td>${supplier}</td>
      <td>${lastOrdered}</td>
      <td><span class="status ${statusClass}">${status}</span></td>
      <td>
        <button class="btn-icon delete-feed" data-has-listener="false">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    `;

    // Update total stock
    updateTotalStock();

    // Reset form and close modal
    form.reset();
    modal.style.display = "none";

    // Add event listeners to new buttons
    // Use setTimeout to ensure the DOM is updated before adding listeners
    setTimeout(function () {
      addDeleteListeners();
    }, 0);
  };

  // Add delete functionality with confirmation
  function addDeleteListeners() {
    // First, remove all existing listeners by cloning and replacing buttons
    const allDeleteButtons = document.querySelectorAll(".delete-feed");
    allDeleteButtons.forEach((button) => {
      const newButton = button.cloneNode(true);
      button.parentNode.replaceChild(newButton, button);
    });

    // Now add listeners to all buttons
    const deleteButtons = document.querySelectorAll(".delete-feed");
    deleteButtons.forEach((button) => {
      // Add the event listener
      button.addEventListener("click", function (e) {
        e.stopPropagation(); // Prevent event bubbling

        const row = this.closest("tr");
        if (!row) return; // Safety check

        const itemName = row.cells[0] ? row.cells[0].textContent : "this item";

        // Show confirmation dialog before deleting
        if (
          confirm(
            `Are you sure you want to delete "${itemName}" from the cattle feed inventory?`
          )
        ) {
          row.remove();
          updateTotalStock();
        }
      });
    });

    console.log(`Added delete listeners to ${deleteButtons.length} buttons`);
  }

  // Initialize delete buttons
  addDeleteListeners();

  // Function to update total stock
  function updateTotalStock() {
    const rows = document.querySelectorAll("#feedTable tbody tr");
    let total = 0;

    rows.forEach((row) => {
      if (row && row.cells && row.cells.length > 2) {
        const stockText = row.cells[2].textContent;
        // Extract numeric value from string (e.g., "150 kg" -> 150)
        // Use a regex to extract just the number part
        const stockMatch = stockText.match(/(\d+(\.\d+)?)/);
        const stockValue = stockMatch ? parseFloat(stockMatch[0]) : 0;
        total += isNaN(stockValue) ? 0 : stockValue;

        // Log for debugging
        console.log(`Row stock: ${stockText} -> ${stockValue}`);
      }
    });

    console.log(`Total stock calculated: ${total} kg`);

    const totalStockElement = document.getElementById("totalStock");
    if (totalStockElement) {
      totalStockElement.textContent = total.toLocaleString() + " kg";
    }

    // Update status based on total stock (assuming some threshold)
    const summaryStockStatus = document.getElementById("summaryStockStatus");
    if (summaryStockStatus) {
      if (total < 1000) {
        summaryStockStatus.innerHTML =
          '<i class="fas fa-exclamation-triangle"></i> Low stock';
        summaryStockStatus.className = "red-text";
      } else {
        summaryStockStatus.innerHTML =
          '<i class="fas fa-check-circle"></i> Stock OK';
        summaryStockStatus.className = "green-text";
      }
    }
  }

  // Customer Management Form Handling
  // Using an IIFE (Immediately Invoked Function Expression) to avoid conflicts
  (function () {
    // Wait for DOM to be fully loaded
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initCustomerForm);
    } else {
      initCustomerForm();
    }

    function initCustomerForm() {
      console.log("Initializing customer form");

      // Get the modal, button, and close button
      const modal = document.getElementById("farmerModal");
      if (!modal) {
        console.error("Farmer modal not found");
        return; // Exit if elements don't exist
      }

      const addBtn = document.getElementById("addFarmerBtn");
      if (!addBtn) {
        console.error("Add farmer button not found");
        return;
      }

      const closeBtn = modal.querySelector(".close");
      if (!closeBtn) {
        console.error("Close button not found");
      }

      const form = document.getElementById("farmerForm");
      if (!form) {
        console.error("Farmer form not found");
        return;
      }

      console.log("All form elements found");

      // Check if form is already initialized
      if (form.hasAttribute("data-initialized")) return;
      form.setAttribute("data-initialized", "true");

      // Contact number input field
      const contactInput = document.getElementById("contact");

      // Open modal when Add New Customer button is clicked
      addBtn.addEventListener("click", function () {
        modal.style.display = "block";
        // Set default value for contact field
        contactInput.value = "+91";
      });

      // Close modal when X is clicked
      closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
      });

      // Close modal when clicking outside of it
      window.addEventListener("click", function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      });

      // Format contact number as user types
      contactInput.addEventListener("input", function (e) {
        // Ensure the input always starts with +91
        if (!this.value.startsWith("+91")) {
          this.value = "+91" + this.value.replace("+91", "");
        }

        // Remove any non-digit characters after the +91 prefix
        let digits = this.value.substring(3).replace(/\D/g, "");

        // Limit to 10 digits after +91
        if (digits.length > 10) {
          digits = digits.substring(0, 10);
        }

        // Update the input value
        this.value = "+91" + digits;
      });

      // Handle form submission
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        console.log("Form submitted");

        try {
          // Get form values
          const name = document.getElementById("name").value;
          const location = document.getElementById("location").value;
          const contact = document.getElementById("contact").value;
          const cattleCount = document.getElementById("cattleCount").value;
          const dailySupply =
            document.getElementById("dailySupply").value + " L/day";
          const qualityRating = document.getElementById("qualityRating").value;

          console.log("Form values:", {
            name,
            location,
            contact,
            cattleCount,
            dailySupply,
            qualityRating,
          });

          // Basic validation
          if (!name || !location || !contact || !cattleCount || !dailySupply) {
            alert("Please fill in all required fields");
            return;
          }

          // Determine quality rating class
          let ratingClass = "average";
          if (qualityRating >= 4.5) {
            ratingClass = "excellent";
          } else if (qualityRating >= 4.0) {
            ratingClass = "good";
          } else if (qualityRating < 3.0) {
            ratingClass = "poor";
          }

          // Get the table
          const farmersTable = document.getElementById("farmersTable");
          console.log("Table element:", farmersTable);

          if (!farmersTable) {
            throw new Error("Farmers table not found");
          }

          // Get the tbody
          const tbody = farmersTable.getElementsByTagName("tbody")[0];
          console.log("Tbody element:", tbody);

          if (!tbody) {
            throw new Error("Table body not found");
          }

          // Find the highest ID
          let highestId = 1000;
          const rows = tbody.getElementsByTagName("tr");

          for (let i = 0; i < rows.length; i++) {
            if (rows[i].cells && rows[i].cells.length > 0) {
              const idText = rows[i].cells[0].textContent;
              const id = parseInt(idText);
              if (!isNaN(id) && id > highestId) {
                highestId = id;
              }
            }
          }

          // New ID
          const newId = highestId + 1;
          console.log("New ID:", newId);

          // Create new row HTML
          const rowHTML = `
                <td>${newId}</td>
                <td>${name}</td>
                <td>${location}</td>
                <td>${contact}</td>
                <td>${cattleCount}</td>
                <td>${dailySupply}</td>
                <td><span class="rating ${ratingClass}">${qualityRating}/5</span></td>
                <td>
                    <button class="btn-icon">
                        <i class="fas fa-phone"></i>
                    </button>
                    <button class="btn-icon">
                        <i class="fas fa-envelope"></i>
                    </button>
                    <button class="btn-icon delete-farmer-btn">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;

          // Create and insert the row
          const newRow = document.createElement("tr");
          newRow.innerHTML = rowHTML;
          tbody.appendChild(newRow);
          console.log("New row added:", newRow);

          // Add event listener to delete button
          const deleteBtn = newRow.querySelector(".delete-farmer-btn");
          if (deleteBtn) {
            deleteBtn.addEventListener("click", function () {
              if (confirm("Are you sure you want to delete this customer?")) {
                newRow.remove();
              }
            });
          }

          // Reset form and close modal
          form.reset();
          contactInput.value = "+91";
          modal.style.display = "none";

          // Show success message
          alert("Customer added successfully!");
        } catch (error) {
          console.error("Error in form submission:", error);
          alert("Error adding customer: " + error.message);
        }

        // Reset form and close modal
        form.reset();
        // Set default value for contact field again
        contactInput.value = "+91";
        modal.style.display = "none";

        // Show success message
        alert("Customer added successfully!");

        // Reset submission flag
        setTimeout(() => {
          isSubmitting = false;
        }, 100);

        // Add event listeners to new delete button - with improved error handling
        const deleteBtn = newRow.querySelector(".delete-farmer-btn");
        if (deleteBtn) {
          deleteBtn.addEventListener("click", function () {
            if (confirm("Are you sure you want to delete this customer?")) {
              newRow.remove();
            }
          });
        } else {
          console.error("Delete button not found in the new row");
        }
      });

      // Add delete functionality to existing farmer rows
      function setupDeleteButtons() {
        console.log("Setting up delete buttons");
        const deleteButtons = document.querySelectorAll(".delete-farmer-btn");
        console.log(`Found ${deleteButtons.length} delete buttons`);

        deleteButtons.forEach((button) => {
          // Remove any existing event listeners to prevent duplicates
          button.replaceWith(button.cloneNode(true));

          // Add fresh event listener
          button.addEventListener("click", function () {
            console.log("Delete button clicked");
            if (confirm("Are you sure you want to delete this customer?")) {
              const row = this.closest("tr");
              if (row) {
                row.remove();
                console.log("Row deleted");
              }
            }
          });
        });
      }

      // Call the setup function
      setupDeleteButtons();
    }
  })();
});

// PO Modal Form Details

document.addEventListener("DOMContentLoaded", function () {
  // PO Modal Elements
  const poModal = document.getElementById("poModal");
  const newPoBtn = document.getElementById("newPoBtn");
  const closePo = document.querySelector(".close-po");
  const poForm = document.getElementById("poForm");

  console.log("PO Modal Elements:", {
    poModal: poModal,
    newPoBtn: newPoBtn,
    closePo: closePo,
    poForm: poForm,
  });

  // Generate sequential PO number
  function generatePONumber() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    // Get the PO table
    const poTable = document.getElementById("poTable");
    if (!poTable) {
      console.error("PO Table not found when generating PO number!");
      return `PO-${month}${day}-003`; // Default if table not found
    }

    // Get all existing PO numbers
    const poNumbers = [];
    const rows = poTable.querySelectorAll("tbody tr");

    // We'll look for any PO number format (PO-MMDD-NNN or PO-NNNN-NNN)
    const poRegex = /PO-(\d{4})-(\d{3})/;

    rows.forEach((row) => {
      const poCell = row.cells[0];
      if (poCell) {
        const poText = poCell.textContent;
        console.log("Found PO:", poText);

        // Try to match the PO number format
        const match = poText.match(poRegex);
        if (match) {
          const num = parseInt(match[2], 10);
          if (!isNaN(num)) {
            poNumbers.push(num);
          }
        }
      }
    });

    console.log("Existing PO numbers:", poNumbers);

    // Find the highest number and increment
    let nextNum = 3; // Start with 3 as requested
    if (poNumbers.length > 0) {
      const maxNum = Math.max(...poNumbers);
      nextNum = Math.max(maxNum + 1, nextNum);
    }

    // Format with leading zeros (e.g., 001, 002, etc.)
    const formattedNum = String(nextNum).padStart(3, "0");
    const poNumber = `PO-${month}${day}-${formattedNum}`;

    console.log(`Generated PO number: ${poNumber}`);
    return poNumber;
  }

  // Open PO modal
  if (newPoBtn) {
    newPoBtn.addEventListener("click", function () {
      console.log("New PO button clicked");
      poModal.style.display = "block";
      // Set default order date to today
      document.getElementById("poOrderDate").valueAsDate = new Date();
    });
  } else {
    console.error("New PO button not found!");
  }

  // Close PO modal
  if (closePo) {
    closePo.addEventListener("click", function () {
      console.log("Close PO button clicked");
      poModal.style.display = "none";
    });
  } else {
    console.error("Close PO button not found!");
  }

  // Close modal when clicking outside
  window.addEventListener("click", function (event) {
    if (event.target === poModal) {
      poModal.style.display = "none";
    }
  });

  // Handle PO form submission
  if (poForm) {
    poForm.addEventListener("submit", function (e) {
      e.preventDefault();
      console.log("PO form submitted");

      try {
        // Get form values
        const supplier = document.getElementById("poSupplier").value;
        const items = document.getElementById("poItems").value;
        const orderDate = document.getElementById("poOrderDate").value;
        const deliveryDate = document.getElementById("poDeliveryDate").value;
        const amount = document.getElementById("poAmount").value;
        const status = document.getElementById("poStatus").value;

        console.log("Form values:", {
          supplier,
          items,
          orderDate,
          deliveryDate,
          amount,
          status,
        });

        // Create status display text based on value
        let statusText = "";
        switch (status) {
          case "in-progress":
            statusText = "Processing";
            break;
          case "shipped":
            statusText = "Shipped";
            break;
          case "in-transit":
            statusText = "In Transit";
            break;
          case "delivered":
            statusText = "Delivered";
            break;
        }

        // Create new table row
        const poTable = document.getElementById("poTable");
        console.log("PO Table:", poTable);

        if (!poTable) {
          console.error("PO Table not found!");
          return;
        }

        const tbody = poTable.querySelector("tbody");
        if (!tbody) {
          console.error("Table body not found!");
          return;
        }

        console.log("Found tbody:", tbody);

        const newRow = document.createElement("tr");
        const poNumber = generatePONumber();

        newRow.innerHTML = `
          <td>${poNumber}</td>
          <td>${supplier}</td>
          <td>${items}</td>
          <td>${orderDate}</td>
          <td>${deliveryDate}</td>
          <td>₹${parseInt(amount).toLocaleString("en-IN")}</td>
          <td><span class="status ${status}">${statusText}</span></td>
          <td><button class="btn-icon delete-feed"><i class="fas fa-trash"></i></button></td>
        `;

        console.log("Adding new row:", newRow);

        // Add row to table
        tbody.appendChild(newRow);
        console.log("Row added successfully");

        // Update pending orders count
        updatePendingOrders();

        // Reset form and close modal
        poForm.reset();

        // Set default order date to today for next time
        const orderDateInput = document.getElementById("poOrderDate");
        if (orderDateInput) {
          orderDateInput.valueAsDate = new Date();
        }

        // Hide the modal
        poModal.style.display = "none";

        // We don't need to add individual event listeners here
        // because we have a document-level event listener for all delete buttons

        // Show success message
        alert("Purchase Order created successfully!");
      } catch (error) {
        console.error("Error in form submission:", error);
        alert("Error creating Purchase Order: " + error.message);
      }
    });
  } else {
    console.error("PO form not found!");
  }

  // Delete row with confirmation - using event delegation
  document.addEventListener("click", function (e) {
    // Find if the click was on a delete button or its icon
    const deleteBtn = e.target.closest(".delete-feed");
    const trashIcon = e.target.closest(".fa-trash");

    if (deleteBtn || trashIcon) {
      // Get the table row
      const row = e.target.closest("tr");
      if (!row) return;

      // Check if this is in the PO table
      const table = row.closest("table");
      if (table && table.id === "poTable") {
        // Prevent event bubbling
        e.stopPropagation();

        // Confirm deletion
        if (confirm("Are you sure you want to delete this purchase order?")) {
          row.remove();
          updatePendingOrders();
        }
      }
    }
  });

  // Update pending orders count
  function updatePendingOrders() {
    console.log("Updating pending orders count");

    // Get the PO table
    const poTable = document.getElementById("poTable");
    if (!poTable) {
      console.error("PO Table not found in updatePendingOrders!");
      return;
    }

    // Count pending orders in the PO table
    const pendingCount = poTable.querySelectorAll(
      "tbody tr .status.in-progress"
    ).length;
    console.log("Pending orders count:", pendingCount);

    // Update the dashboard card
    const pendingElement = document.querySelector(
      ".dashboard-card:nth-child(1) h2"
    );
    if (pendingElement) {
      pendingElement.textContent = pendingCount;
      console.log("Updated pending element:", pendingElement);
    } else {
      console.error("Pending element not found!");
    }

    // Calculate total amount
    let totalAmount = 0;
    poTable.querySelectorAll("tbody tr").forEach((row) => {
      if (row.querySelector(".status.in-progress")) {
        const amountCell = row.cells[5].textContent;
        const amount = parseInt(amountCell.replace(/[^0-9]/g, ""));
        totalAmount += amount;
        console.log("Added amount:", amount, "Total:", totalAmount);
      }
    });

    const totalElement = document.querySelector(
      ".dashboard-card:nth-child(1) p"
    );
    if (totalElement) {
      totalElement.textContent = `₹${totalAmount.toLocaleString(
        "en-IN"
      )} total`;
    }
  }
});

// Delivery Modal Form Details
document.addEventListener("DOMContentLoaded", function () {
  const deliveryModal = document.getElementById("deliveryModal");
  const scheduleBtn = document.getElementById("scheduleBtn");
  const closeDelivery = document.querySelector(".close-delivery");
  const deliveryForm = document.getElementById("deliveryForm");
  const deliveryTableBody = document.getElementById("deliveryTableBody");

  // Track delivery count and date
  let deliveryCount = 1; // Start from 002 as you specified
  let lastDateKey = "";

  function generateDeliveryID() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const dateKey = `${month}${day}`;

    if (dateKey !== lastDateKey) {
      deliveryCount = 1; // reset count for new day
      lastDateKey = dateKey;
    }

    const countStr = String(deliveryCount).padStart(3, "0");
    const deliveryID = `DEL-${dateKey}-${countStr}`;
    deliveryCount++;
    return deliveryID;
  }

  scheduleBtn.addEventListener("click", function () {
    deliveryModal.style.display = "block";
  });

  closeDelivery.addEventListener("click", function () {
    deliveryModal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target === deliveryModal) {
      deliveryModal.style.display = "none";
    }
  });

  deliveryForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const destination = document.getElementById("deliveryDestination").value;
    const quantity = document.getElementById("deliveryQuantity").value;
    const vehicle = document.getElementById("deliveryVehicle").value;
    const driver = document.getElementById("deliveryDriver").value;
    const status = document.getElementById("deliveryStatus").value;

    const statusDisplay = {
      scheduled: { text: "Scheduled", class: "scheduled" },
      loading: { text: "Loading", class: "loading" },
      "in-transit": { text: "In Transit", class: "in-transit" },
      delivered: { text: "Delivered", class: "delivered" },
    };

    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${generateDeliveryID()}</td>
      <td>${destination}</td>
      <td>${quantity} L</td>
      <td>${vehicle}</td>
      <td>${driver}</td>
      <td><span class="status ${statusDisplay[status].class}">${
      statusDisplay[status].text
    }</span></td>
      <td><button class="btn-icon delete-feed"><i class="fas fa-trash"></i></button></td>
    `;

    deliveryTableBody.appendChild(newRow);
    deliveryForm.reset();
    deliveryModal.style.display = "none";
    alert("Delivery scheduled successfully!");
  });

  deliveryTableBody.addEventListener("click", function (e) {
    if (
      e.target.classList.contains("fa-trash") ||
      e.target.classList.contains("delete-feed")
    ) {
      if (confirm("Are you sure you want to delete this delivery?")) {
        const row = e.target.closest("tr");
        row.remove();
        alert("Delivery deleted successfully!");
      }
    }
  });
});

// Account Settings Page Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Check if we're on the account settings page
  const accountSettingsSection = document.getElementById(
    "accountSettingsSection"
  );
  if (!accountSettingsSection) return;

  // Settings Navigation
  const settingsMenuItems = document.querySelectorAll(".settings-menu-item");
  const settingsPanels = document.querySelectorAll(".settings-panel");

  // Handle settings menu clicks
  settingsMenuItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove active class from all menu items
      settingsMenuItems.forEach((menuItem) =>
        menuItem.classList.remove("active")
      );

      // Add active class to clicked menu item
      this.classList.add("active");

      // Get target panel
      const targetPanelId = this.getAttribute("data-target");

      // Hide all panels
      settingsPanels.forEach((panel) => panel.classList.remove("active"));

      // Show target panel
      document.getElementById(targetPanelId).classList.add("active");
    });
  });

  // Profile Image Functionality
  const profileImageLarge = document.getElementById("profileImageLarge");
  const navbarProfileImage = document.getElementById("navbarProfileImg");
  const changePhotoBtn = document.getElementById("changePhotoBtn");
  const removePhotoBtn = document.getElementById("removePhotoBtn");
  const photoUpload = document.getElementById("photoUpload");

  // Default profile image
  const defaultProfileImage = "https://i.pravatar.cc/150?img=3";

  // Check if profile image is stored in localStorage
  if (localStorage.getItem("profileImage")) {
    profileImageLarge.src = localStorage.getItem("profileImage");
    if (navbarProfileImage) {
      navbarProfileImage.src = localStorage.getItem("profileImage");
    }
  }

  // Open file dialog when change photo button is clicked
  if (changePhotoBtn) {
    changePhotoBtn.addEventListener("click", function () {
      photoUpload.click();
    });
  }

  // Handle file selection
  if (photoUpload) {
    photoUpload.addEventListener("change", function () {
      if (this.files && this.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
          // Update profile image in settings
          profileImageLarge.src = e.target.result;

          // Update navbar profile image
          if (navbarProfileImage) {
            navbarProfileImage.src = e.target.result;
          }

          // Store in localStorage
          localStorage.setItem("profileImage", e.target.result);

          // Show success message
          alert("Profile picture updated successfully!");
        };

        reader.readAsDataURL(this.files[0]);
      }
    });
  }

  // Remove profile photo
  if (removePhotoBtn) {
    removePhotoBtn.addEventListener("click", function () {
      if (confirm("Are you sure you want to remove your profile picture?")) {
        // Reset to default image
        profileImageLarge.src = defaultProfileImage;

        // Update navbar profile image
        if (navbarProfileImage) {
          navbarProfileImage.src = defaultProfileImage;
        }

        // Remove from localStorage
        localStorage.removeItem("profileImage");

        // Reset file input
        if (photoUpload) {
          photoUpload.value = "";
        }

        alert("Profile picture removed.");
      }
    });
  }

  // Dark mode toggle in account settings
  const defaultDarkMode = document.getElementById("defaultDarkMode");
  if (defaultDarkMode) {
    // Set initial state based on current mode
    defaultDarkMode.checked = localStorage.getItem("darkMode") === "enabled";

    // Update localStorage when toggle changes
    defaultDarkMode.addEventListener("change", function () {
      if (this.checked) {
        localStorage.setItem("darkMode", "enabled");
        enableDarkMode();
      } else {
        localStorage.setItem("darkMode", "disabled");
        disableDarkMode();
      }
    });
  }

  // Form validation for profile information
  const profileForm = document.querySelector(".settings-form");
  if (profileForm) {
    const saveProfileBtn = profileForm.querySelector(".btn-primary");
    if (saveProfileBtn) {
      saveProfileBtn.addEventListener("click", function (e) {
        e.preventDefault();

        // Simple validation
        const fullName = document.getElementById("fullName");
        const email = document.getElementById("email");

        let isValid = true;

        if (fullName && fullName.value.trim() === "") {
          fullName.style.borderColor = "#ef4444";
          isValid = false;
        } else if (fullName) {
          fullName.style.borderColor = "";
        }

        if (email && email.value.trim() === "") {
          email.style.borderColor = "#ef4444";
          isValid = false;
        } else if (email) {
          email.style.borderColor = "";
        }

        if (isValid) {
          // Show success message
          alert("Profile information updated successfully!");
        }
      });
    }
  }

  // Password validation
  const passwordForm = document.querySelector(
    ".settings-card:nth-child(2) .settings-form"
  );
  if (passwordForm) {
    const updatePasswordBtn = passwordForm.querySelector(".btn-primary");
    if (updatePasswordBtn) {
      updatePasswordBtn.addEventListener("click", function (e) {
        e.preventDefault();

        const currentPassword = document.getElementById("currentPassword");
        const newPassword = document.getElementById("newPassword");
        const confirmPassword = document.getElementById("confirmPassword");

        let isValid = true;

        // Check if fields are empty
        if (currentPassword && currentPassword.value.trim() === "") {
          currentPassword.style.borderColor = "#ef4444";
          isValid = false;
        } else if (currentPassword) {
          currentPassword.style.borderColor = "";
        }

        if (newPassword && newPassword.value.trim() === "") {
          newPassword.style.borderColor = "#ef4444";
          isValid = false;
        } else if (newPassword) {
          newPassword.style.borderColor = "";
        }

        if (confirmPassword && confirmPassword.value.trim() === "") {
          confirmPassword.style.borderColor = "#ef4444";
          isValid = false;
        } else if (confirmPassword) {
          confirmPassword.style.borderColor = "";
        }

        // Check if passwords match
        if (
          newPassword &&
          confirmPassword &&
          newPassword.value !== confirmPassword.value
        ) {
          confirmPassword.style.borderColor = "#ef4444";
          alert("New passwords do not match!");
          isValid = false;
        }

        // Check password strength
        if (newPassword && newPassword.value.length < 8) {
          newPassword.style.borderColor = "#ef4444";
          alert("Password must be at least 8 characters long!");
          isValid = false;
        }

        if (isValid) {
          alert("Password updated successfully!");
          passwordForm.reset();
        }
      });
    }
  }

  // Team Members Management
  const addTeamMemberBtn = document.getElementById("addTeamMemberBtn");
  const teamMembersList = document.querySelector(".team-members-list");

  if (addTeamMemberBtn && teamMembersList) {
    addTeamMemberBtn.addEventListener("click", function () {
      // Create modal for adding team member
      const modal = document.createElement("div");
      modal.className = "modal";
      modal.style.display = "block";

      modal.innerHTML = `
        <div class="modal-content">
          <span class="close">&times;</span>
          <h3>Add Team Member</h3>
          <form id="addTeamMemberForm">
            <div class="form-group">
              <label for="memberName">Full Name</label>
              <input type="text" id="memberName" class="form-control" required>
            </div>
            <div class="form-group">
              <label for="memberEmail">Email Address</label>
              <input type="email" id="memberEmail" class="form-control" required>
            </div>
            <div class="form-group">
              <label for="memberPosition">Position</label>
              <input type="text" id="memberPosition" class="form-control" required>
            </div>
            <div class="form-group">
              <label for="memberRole">Role</label>
              <select id="memberRole" class="form-control">
                <option value="admin">Administrator</option>
                <option value="manager" selected>Manager</option>
                <option value="staff">Staff</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary">Add Member</button>
          </form>
        </div>
      `;

      document.body.appendChild(modal);

      // Close modal functionality
      const closeBtn = modal.querySelector(".close");
      closeBtn.addEventListener("click", function () {
        document.body.removeChild(modal);
      });

      // Form submission
      const form = modal.querySelector("#addTeamMemberForm");
      form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("memberName").value;
        const position = document.getElementById("memberPosition").value;
        const role = document.getElementById("memberRole").value;

        // Generate random avatar
        const avatarId = Math.floor(Math.random() * 70);

        // Create new team member element
        const newMember = document.createElement("div");
        newMember.className = "team-member";
        newMember.innerHTML = `
          <div class="team-member-info">
            <img src="https://i.pravatar.cc/40?img=${avatarId}" alt="Team Member" class="team-member-img">
            <div>
              <h4>${name}</h4>
              <p>${position}</p>
            </div>
          </div>
          <div class="team-member-role">
            <select class="form-control form-control-sm">
              <option value="admin" ${
                role === "admin" ? "selected" : ""
              }>Administrator</option>
              <option value="manager" ${
                role === "manager" ? "selected" : ""
              }>Manager</option>
              <option value="staff" ${
                role === "staff" ? "selected" : ""
              }>Staff</option>
              <option value="viewer" ${
                role === "viewer" ? "selected" : ""
              }>Viewer</option>
            </select>
          </div>
          <div class="team-member-actions">
            <button class="btn-icon"><i class="fas fa-envelope"></i></button>
            <button class="btn-icon remove-member"><i class="fas fa-times"></i></button>
          </div>
        `;

        // Add to team members list
        teamMembersList.appendChild(newMember);

        // Close modal
        document.body.removeChild(modal);

        // Show success message
        alert(`${name} has been added to the team.`);
      });
    });

    // Remove team member functionality
    teamMembersList.addEventListener("click", function (e) {
      if (e.target.closest(".remove-member")) {
        const teamMember = e.target.closest(".team-member");
        const memberName = teamMember.querySelector("h4").textContent;

        if (
          confirm(
            `Are you sure you want to remove ${memberName} from the team?`
          )
        ) {
          teamMember.remove();
          alert(`${memberName} has been removed from the team.`);
        }
      }
    });
  }

  // Farm Settings
  const saveFarmSettingsBtn = document.getElementById("saveFarmSettingsBtn");
  if (saveFarmSettingsBtn) {
    saveFarmSettingsBtn.addEventListener("click", function () {
      alert("Farm settings saved successfully!");
    });
  }

  // Account Preferences
  const savePreferencesBtn = document.getElementById("savePreferencesBtn");
  if (savePreferencesBtn) {
    savePreferencesBtn.addEventListener("click", function () {
      alert("Account preferences saved successfully!");
    });
  }

  // Export Data
  const exportDataBtn = document.getElementById("exportDataBtn");
  if (exportDataBtn) {
    exportDataBtn.addEventListener("click", function () {
      // Create sample data
      const userData = {
        profile: {
          name: document.getElementById("fullName").value || "Jayaprakash",
          email:
            document.getElementById("email").value ||
            "jayaprakash@dairyfarm.com",
          phone: document.getElementById("phone").value || "+91 9876543210",
          jobTitle: document.getElementById("jobTitle").value || "Farm Manager",
          bio:
            document.getElementById("bio").value ||
            "Experienced dairy farm manager",
        },
        farm: {
          name: document.getElementById("farmName")?.value || "ATS Dairy Farm",
          location:
            document.getElementById("farmLocation")?.value ||
            "Coimbatore, Tamil Nadu",
          size: document.getElementById("farmSize")?.value || "120",
          type: document.getElementById("farmType")?.value || "dairy",
          milkingSystem:
            document.getElementById("milkingSystem")?.value || "pipeline",
        },
        preferences: {
          language: document.getElementById("language")?.value || "en",
          timezone: document.getElementById("timezone")?.value || "IST",
          dateFormat:
            document.getElementById("dateFormat")?.value || "dd/mm/yyyy",
          darkMode:
            document.getElementById("defaultDarkMode")?.checked || false,
        },
        exportDate: new Date().toISOString(),
      };

      // Convert to JSON string
      const dataStr = JSON.stringify(userData, null, 2);

      // Create download link
      const dataUri =
        "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
      const exportFileDefaultName = "dairy_farm_data.json";

      const linkElement = document.createElement("a");
      linkElement.setAttribute("href", dataUri);
      linkElement.setAttribute("download", exportFileDefaultName);
      linkElement.click();

      alert("Data exported successfully!");
    });
  }

  // Danger zone functionality
  const deactivateAccountBtn = document.getElementById("deactivateAccountBtn");
  const deleteAccountBtn = document.getElementById("deleteAccountBtn");

  if (deactivateAccountBtn) {
    deactivateAccountBtn.addEventListener("click", function () {
      if (
        confirm(
          "Are you sure you want to deactivate your account? You can reactivate it later."
        )
      ) {
        alert("Account deactivated. You will be logged out.");
      }
    });
  }

  if (deleteAccountBtn) {
    deleteAccountBtn.addEventListener("click", function () {
      if (
        confirm(
          "WARNING: This action cannot be undone. Are you absolutely sure you want to delete your account and all associated data?"
        )
      ) {
        if (prompt("Type 'DELETE' to confirm account deletion:") === "DELETE") {
          alert("Account deleted. You will be redirected to the login page.");
        }
      }
    });
  }
});

// Production Manufacturing Form Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Get DOM elements
  const newBatchBtn = document.getElementById("newBatchBtn");
  const batchModal = document.getElementById("batchModal");
  const batchForm = document.getElementById("batchForm");
  const cancelForm = document.getElementById("cancelForm");
  const closeModal = document.querySelector(".pmclose-modal");
  const productionTableBody = document.getElementById("productionTableBody");

  // Show modal when New Batch button is clicked
  newBatchBtn.addEventListener("click", function () {
    batchModal.style.display = "block";
    batchForm.reset();

    // Set focus to first form element
    document.getElementById("product").focus();
  });

  // Close modal when X is clicked
  closeModal.addEventListener("click", function () {
    batchModal.style.display = "none";
  });

  // Close modal when Cancel is clicked
  cancelForm.addEventListener("click", function () {
    batchModal.style.display = "none";
  });

  // Close modal when clicking outside the modal content
  window.addEventListener("click", function (event) {
    if (event.target === batchModal) {
      batchModal.style.display = "none";
    }
  });

  // Handle form submission
  batchForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const product = document.getElementById("product").value;
    const startTime = document.getElementById("startTime").value;
    const quantity = document.getElementById("quantity").value;
    const qcStatus = document.getElementById("qcStatus").value;
    const packaging = document.getElementById("packaging").value;

    // Generate new Batch ID based on previous entries
    const batchId = generateNextBatchId();

    // Format the date for display
    const formattedDate = formatDateTime(startTime);

    // Create new table row
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${product}</td>
      <td>${batchId}</td>
      <td>${formattedDate}</td>
      <td>${Number(quantity).toLocaleString()} units</td>
      <td><span class="status ${qcStatus}">${
      qcStatus.charAt(0).toUpperCase() + qcStatus.slice(1)
    }</span></td>
      <td>${packaging}</td>
      <td>
        <button class="btn-icon delete-btn">
          <i class="fas fa-trash"></i>
        </button>
        <button class="btn-icon"><i class="fas fa-print"></i></button>
      </td>
    `;

    // Add the new row to the table
    productionTableBody.appendChild(newRow);

    // Hide the modal and reset the form
    batchModal.style.display = "none";
    batchForm.reset();

    // Add event listener to the new delete button
    newRow.querySelector(".delete-btn").addEventListener("click", deleteRow);
  });

  // Add event listeners to existing delete buttons
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", deleteRow);
  });

  // Function to delete a row with confirmation
  function deleteRow() {
    if (confirm("Are you sure you want to delete this batch?")) {
      const row = this.closest("tr");
      row.remove();
    }
  }

  // Helper function to format date
  function formatDateTime(dateTimeString) {
    if (!dateTimeString) return "";

    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    // Only show time if it's not midnight
    if (hours === "00" && minutes === "00") {
      return `${year}-${month}-${day}`;
    }
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  // Function to generate the next batch ID
  function generateNextBatchId() {
    // Get all existing batch IDs
    const batchIds = Array.from(
      document.querySelectorAll("tbody tr td:nth-child(2)")
    ).map((td) => td.textContent);

    if (batchIds.length === 0) {
      return "B-0425-001"; // Default if no batches exist
    }

    // Get the last batch ID
    const lastBatchId = batchIds[batchIds.length - 1];

    // Extract the numeric part and increment
    const match = lastBatchId.match(/B-(\d{4})-(\d{3})/);
    if (match) {
      const prefix = match[1];
      const number = parseInt(match[2], 10);
      const nextNumber = String(number + 1).padStart(3, "0");
      return `B-${prefix}-${nextNumber}`;
    }

    // Fallback if pattern doesn't match
    return `B-${new Date().getFullYear()}-001`;
  }
});

// Production Cleaning Form details
document.addEventListener("DOMContentLoaded", function () {
  // Get DOM elements
  const newCleaningCycleBtn = document.getElementById("newCleaningCycleBtn");
  const cleaningModal = document.getElementById("cleaningModal");
  const cleaningForm = document.getElementById("cleaningForm");
  const cancelCleaningForm = document.getElementById("cancelCleaningForm");
  const closeModal = document.querySelector(".cleaning-close-modal");
  const cleaningTableBody = document.getElementById("cleaningTableBody");

  // Show modal when New Cleaning Cycle button is clicked
  newCleaningCycleBtn.addEventListener("click", function () {
    cleaningModal.style.display = "block";
    cleaningForm.reset();

    // Set default dates
    const today = new Date().toISOString().split("T")[0];
    document.getElementById("lastCleaned").value = today;

    // Set next day as default for next due date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById("nextDue").value = tomorrow
      .toISOString()
      .split("T")[0];

    // Focus on first field
    document.getElementById("areaEquipment").focus();
  });

  // Close modal when X is clicked
  closeModal.addEventListener("click", function () {
    cleaningModal.style.display = "none";
  });

  // Close modal when Cancel is clicked
  cancelCleaningForm.addEventListener("click", function () {
    cleaningModal.style.display = "none";
  });

  // Close modal when clicking outside the modal content
  window.addEventListener("click", function (event) {
    if (event.target === cleaningModal) {
      cleaningModal.style.display = "none";
    }
  });

  // Handle form submission
  cleaningForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const areaEquipment = document.getElementById("areaEquipment").value;
    const lastCleaned = document.getElementById("lastCleaned").value;
    const nextDue = document.getElementById("nextDue").value;
    const method = document.getElementById("method").value;
    const status = document.getElementById("status").value;
    const verifiedBy = document.getElementById("verifiedBy").value || "-";

    // Create new table row
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${areaEquipment}</td>
      <td>${lastCleaned}</td>
      <td>${nextDue}</td>
      <td>${method}</td>
      <td><span class="status ${status.split(" ").join("-")}">${
      status.charAt(0).toUpperCase() + status.slice(1)
    }</span></td>
      <td>${verifiedBy}</td>
    `;

    // Add the new row to the table
    cleaningTableBody.appendChild(newRow);

    // Hide the modal and reset the form
    cleaningModal.style.display = "none";
    cleaningForm.reset();
  });

  // Add validation for date consistency
  document.getElementById("nextDue").addEventListener("change", function () {
    const lastCleaned = document.getElementById("lastCleaned").value;
    const nextDue = this.value;

    if (lastCleaned && nextDue && new Date(nextDue) < new Date(lastCleaned)) {
      alert("Next due date cannot be before last cleaned date");
      this.value = "";
    }
  });
});

// Inventory Raw Milk Form details
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("newBatchModal");
  const openModalBtn = document.getElementById("openModalBtn");
  const closeModalBtn = document.querySelector(".invsclose");
  const invsbatchForm = document.getElementById("invsbatchForm");
  const milkTable = document.getElementById("invmilkInventoryTable");

  openModalBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });

  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  function generateNextBatchId() {
    const rows = milkTable.querySelectorAll("tbody tr");
    if (rows.length === 0) {
      const date = new Date();
      return `MILK-${(date.getMonth() + 1).toString().padStart(2, "0")}${date
        .getDate()
        .toString()
        .padStart(2, "0")}-01`;
    }

    const lastBatchId = rows[rows.length - 1].cells[0].textContent;
    const parts = lastBatchId.split("-");
    const lastNumber = parseInt(parts[2]);
    const nextNumber = (lastNumber + 1).toString().padStart(2, "0");
    const monthDay = parts[1];
    return `MILK-${monthDay}-${nextNumber}`;
  }

  invsbatchForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const collectionDate = document.getElementById("collectionDate").value;
    const quantity = document.getElementById("quantity").value;
    const fatContent = document.getElementById("fatContent").value;
    const sourceFarm = document.getElementById("sourceFarm").value;
    const storageTank = document.getElementById("storageTank").value;
    const status = document.getElementById("status").value;

    const batchId = generateNextBatchId();
    const formattedDate = new Date(collectionDate).toISOString().split("T")[0];

    const newRow = document.createElement("tr");
    newRow.innerHTML = `
          <td>${batchId}</td>
          <td>${formattedDate}</td>
          <td>${quantity}</td>
          <td>${fatContent}%</td>
          <td>${sourceFarm}</td>
          <td>${storageTank}</td>
          <td><span class="status ${status}">${
      status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")
    }</span></td>
          <td>
            <button class="btn-icon view-btn" title="Details">
              <i class="fas fa-eye"></i>
            </button>
            <button class="btn-icon dispose-btn" title="Dispose">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        `;

    milkTable.querySelector("tbody").appendChild(newRow);
    invsbatchForm.reset();
    modal.style.display = "none";
    addRowEventListeners(newRow);
  });

  function addRowEventListeners(row) {
    row.querySelector(".view-btn").addEventListener("click", function () {
      alert("View details for batch: " + row.cells[0].textContent);
    });

    row.querySelector(".dispose-btn").addEventListener("click", function () {
      const batchId = row.cells[0].textContent;
      if (confirm(`Are you sure you want to dispose batch ${batchId}?`)) {
        row.remove();
        alert(`Batch ${batchId} has been disposed.`);
      }
    });
  }
});
