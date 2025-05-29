/**
 * Dairy Farm CRM Module
 * Handles customer management, search, filtering, and purchase history
 */

document.addEventListener("DOMContentLoaded", function () {
  // Initialize CRM functionality when the page loads
  initCRM();
});

/**
 * Initialize CRM functionality
 */
function initCRM() {
  // Sample customer data (in a real application, this would come from a database)
  const customers = [
    {
      id: "CUST001",
      name: "Rajesh Kumar",
      contact: "+91 98765 43210",
      email: "rajesh.kumar@example.com",
      type: "wholesale",
      location: "Chennai, TN",
      address: "123 Main Street, Anna Nagar",
      city: "Chennai",
      state: "Tamil Nadu",
      pincode: "600040",
      lastOrder: "2025-04-15",
      status: "active",
      preferences: "Prefers morning delivery, Regular A2 milk customer",
    },
    {
      id: "CUST002",
      name: "Priya Sharma",
      contact: "+91 87654 32109",
      email: "priya.sharma@example.com",
      type: "retail",
      location: "Bangalore, KA",
      address: "456 Park Avenue, Indiranagar",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560038",
      lastOrder: "2025-04-20",
      status: "active",
      preferences: "Interested in organic products",
    },
    {
      id: "CUST003",
      name: "Venkat Distributors",
      contact: "+91 76543 21098",
      email: "info@venkatdist.com",
      type: "distributor",
      location: "Hyderabad, TS",
      address: "789 Business Park, Hitech City",
      city: "Hyderabad",
      state: "Telangana",
      pincode: "500081",
      lastOrder: "2025-04-18",
      status: "active",
      preferences: "Bulk orders twice a week",
    },
    {
      id: "CUST004",
      name: "Lakshmi Dairy Supplies",
      contact: "+91 65432 10987",
      email: "orders@lakshmidairy.com",
      type: "wholesale",
      location: "Coimbatore, TN",
      address: "101 Industrial Area, Peelamedu",
      city: "Coimbatore",
      state: "Tamil Nadu",
      pincode: "641004",
      lastOrder: "2025-04-10",
      status: "inactive",
      preferences: "Requires refrigerated transport",
    },
    {
      id: "CUST005",
      name: "Ananya Reddy",
      contact: "+91 54321 09876",
      email: "ananya.reddy@example.com",
      type: "retail",
      location: "Chennai, TN",
      address: "234 Lake View, T Nagar",
      city: "Chennai",
      state: "Tamil Nadu",
      pincode: "600017",
      lastOrder: "2025-04-22",
      status: "new",
      preferences: "Prefers evening delivery",
    },
    {
      id: "CUST006",
      name: "Krishna Enterprises",
      contact: "+91 43210 98765",
      email: "contact@krishnaent.com",
      type: "distributor",
      location: "Madurai, TN",
      address: "567 Commercial Street, Mattuthavani",
      city: "Madurai",
      state: "Tamil Nadu",
      pincode: "625007",
      lastOrder: "2025-04-05",
      status: "active",
      preferences: "Weekly bulk orders",
    },
    {
      id: "CUST007",
      name: "Sanjay Patel",
      contact: "+91 32109 87654",
      email: "sanjay.patel@example.com",
      type: "retail",
      location: "Bangalore, KA",
      address: "890 Residency Road, Shantinagar",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560025",
      lastOrder: "2025-04-21",
      status: "active",
      preferences: "Interested in ghee and paneer products",
    },
    {
      id: "CUST008",
      name: "Tamil Nadu Hotels Association",
      contact: "+91 21098 76543",
      email: "procurement@tnhotels.org",
      type: "wholesale",
      location: "Chennai, TN",
      address: "432 Hospitality Tower, Nungambakkam",
      city: "Chennai",
      state: "Tamil Nadu",
      pincode: "600034",
      lastOrder: "2025-04-17",
      status: "active",
      preferences: "Large volume orders for multiple hotels",
    },
  ];

  // Sample purchase history data
  const purchaseHistory = {
    CUST001: [
      {
        orderId: "ORD-2025-0415-001",
        date: "2025-04-15",
        products: "Full Cream Milk, Butter",
        quantity: "50L, 10kg",
        amount: "₹4,500",
        status: "completed",
        details: {
          orderDate: "2025-04-15 08:30 AM",
          status: "Completed",
          paymentMethod: "Bank Transfer",
          deliveryAddress: "123 Main Street, Anna Nagar, Chennai, TN - 600040",
          items: [
            {
              product: "Full Cream Milk",
              unitPrice: "₹60/L",
              quantity: "50L",
              total: "₹3,000",
            },
            {
              product: "Butter",
              unitPrice: "₹150/kg",
              quantity: "10kg",
              total: "₹1,500",
            },
          ],
          subtotal: "₹4,500",
          tax: "₹225",
          total: "₹4,725",
        },
      },
      {
        orderId: "ORD-2025-0408-003",
        date: "2025-04-08",
        products: "Toned Milk, Yogurt",
        quantity: "40L, 20kg",
        amount: "₹3,800",
        status: "completed",
        details: {
          orderDate: "2025-04-08 09:15 AM",
          status: "Completed",
          paymentMethod: "Bank Transfer",
          deliveryAddress: "123 Main Street, Anna Nagar, Chennai, TN - 600040",
          items: [
            {
              product: "Toned Milk",
              unitPrice: "₹50/L",
              quantity: "40L",
              total: "₹2,000",
            },
            {
              product: "Yogurt",
              unitPrice: "₹90/kg",
              quantity: "20kg",
              total: "₹1,800",
            },
          ],
          subtotal: "₹3,800",
          tax: "₹190",
          total: "₹3,990",
        },
      },
      {
        orderId: "ORD-2025-0401-002",
        date: "2025-04-01",
        products: "Full Cream Milk, Paneer",
        quantity: "50L, 15kg",
        amount: "₹5,250",
        status: "completed",
        details: {
          orderDate: "2025-04-01 08:45 AM",
          status: "Completed",
          paymentMethod: "Bank Transfer",
          deliveryAddress: "123 Main Street, Anna Nagar, Chennai, TN - 600040",
          items: [
            {
              product: "Full Cream Milk",
              unitPrice: "₹60/L",
              quantity: "50L",
              total: "₹3,000",
            },
            {
              product: "Paneer",
              unitPrice: "₹150/kg",
              quantity: "15kg",
              total: "₹2,250",
            },
          ],
          subtotal: "₹5,250",
          tax: "₹262.50",
          total: "₹5,512.50",
        },
      },
    ],
    CUST002: [
      {
        orderId: "ORD-2025-0420-001",
        date: "2025-04-20",
        products: "Organic Milk, Ghee",
        quantity: "10L, 2kg",
        amount: "₹1,600",
        status: "completed",
        details: {
          orderDate: "2025-04-20 17:30 PM",
          status: "Completed",
          paymentMethod: "UPI",
          deliveryAddress:
            "456 Park Avenue, Indiranagar, Bangalore, KA - 560038",
          items: [
            {
              product: "Organic Milk",
              unitPrice: "₹80/L",
              quantity: "10L",
              total: "₹800",
            },
            {
              product: "Ghee",
              unitPrice: "₹400/kg",
              quantity: "2kg",
              total: "₹800",
            },
          ],
          subtotal: "₹1,600",
          tax: "₹80",
          total: "₹1,680",
        },
      },
      {
        orderId: "ORD-2025-0413-002",
        date: "2025-04-13",
        products: "Organic Milk, Yogurt",
        quantity: "10L, 5kg",
        amount: "₹1,250",
        status: "completed",
        details: {
          orderDate: "2025-04-13 18:00 PM",
          status: "Completed",
          paymentMethod: "UPI",
          deliveryAddress:
            "456 Park Avenue, Indiranagar, Bangalore, KA - 560038",
          items: [
            {
              product: "Organic Milk",
              unitPrice: "₹80/L",
              quantity: "10L",
              total: "₹800",
            },
            {
              product: "Yogurt",
              unitPrice: "₹90/kg",
              quantity: "5kg",
              total: "₹450",
            },
          ],
          subtotal: "₹1,250",
          tax: "₹62.50",
          total: "₹1,312.50",
        },
      },
    ],
    CUST003: [
      {
        orderId: "ORD-2025-0418-001",
        date: "2025-04-18",
        products: "Full Cream Milk, Toned Milk, Butter",
        quantity: "500L, 300L, 50kg",
        amount: "₹55,500",
        status: "completed",
        details: {
          orderDate: "2025-04-18 10:00 AM",
          status: "Completed",
          paymentMethod: "Bank Transfer",
          deliveryAddress:
            "789 Business Park, Hitech City, Hyderabad, TS - 500081",
          items: [
            {
              product: "Full Cream Milk",
              unitPrice: "₹60/L",
              quantity: "500L",
              total: "₹30,000",
            },
            {
              product: "Toned Milk",
              unitPrice: "₹50/L",
              quantity: "300L",
              total: "₹15,000",
            },
            {
              product: "Butter",
              unitPrice: "₹150/kg",
              quantity: "50kg",
              total: "₹7,500",
            },
          ],
          subtotal: "₹52,500",
          tax: "₹2,625",
          total: "₹55,125",
        },
      },
    ],
  };

  // DOM elements
  const customerTableBody = document.getElementById("customerTableBody");
  const customerSearchInput = document.getElementById("customerSearchInput");
  const customerTypeFilter = document.getElementById("customerTypeFilter");
  const customerStatusFilter = document.getElementById("customerStatusFilter");
  const resetFiltersBtn = document.getElementById("resetFiltersBtn");
  const addCustomerBtn = document.getElementById("addCustomerBtn");
  const customerFormModal = document.getElementById("customerFormModal");
  const closeCustomerFormBtn = document.getElementById("closeCustomerFormBtn");
  const cancelCustomerFormBtn = document.getElementById(
    "cancelCustomerFormBtn"
  );
  const customerForm = document.getElementById("customerForm");
  const deleteConfirmModal = document.getElementById("deleteConfirmModal");
  const closeDeleteConfirmBtn = document.getElementById(
    "closeDeleteConfirmBtn"
  );
  const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");
  const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
  const purchaseHistoryModal = document.getElementById("purchaseHistoryModal");
  const closePurchaseHistoryBtn = document.getElementById(
    "closePurchaseHistoryBtn"
  );
  const customerNameHeader = document.getElementById("customerNameHeader");
  const purchaseHistoryTableBody = document.getElementById(
    "purchaseHistoryTableBody"
  );
  const totalOrdersValue = document.getElementById("totalOrdersValue");
  const totalSpentValue = document.getElementById("totalSpentValue");
  const avgOrderValue = document.getElementById("avgOrderValue");
  const firstPurchaseDate = document.getElementById("firstPurchaseDate");
  const orderDetailsModal = document.getElementById("orderDetailsModal");
  const closeOrderDetailsBtn = document.getElementById("closeOrderDetailsBtn");
  const orderIdHeader = document.getElementById("orderIdHeader");
  const orderDateValue = document.getElementById("orderDateValue");
  const orderStatusValue = document.getElementById("orderStatusValue");
  const paymentMethodValue = document.getElementById("paymentMethodValue");
  const deliveryAddressValue = document.getElementById("deliveryAddressValue");
  const orderItemsTableBody = document.getElementById("orderItemsTableBody");
  const orderSubtotalValue = document.getElementById("orderSubtotalValue");
  const orderTaxValue = document.getElementById("orderTaxValue");
  const orderTotalValue = document.getElementById("orderTotalValue");

  // Current state
  let currentCustomers = [...customers];
  let currentPage = 1;
  let itemsPerPage = 5;
  let sortField = "name";
  let sortDirection = "asc";
  let editingCustomerId = null;

  // Initialize the customer table
  renderCustomerTable();

  // Event listeners for search and filters
  customerSearchInput.addEventListener("input", filterCustomers);
  customerTypeFilter.addEventListener("change", filterCustomers);
  customerStatusFilter.addEventListener("change", filterCustomers);
  resetFiltersBtn.addEventListener("click", resetFilters);

  // Add click outside to close modals
  setupModalOutsideClickHandlers();

  // Event listeners for customer form
  addCustomerBtn.addEventListener("click", () => openCustomerForm());
  closeCustomerFormBtn.addEventListener("click", closeCustomerForm);
  cancelCustomerFormBtn.addEventListener("click", closeCustomerForm);
  customerForm.addEventListener("submit", saveCustomer);

  // Event listeners for delete confirmation
  closeDeleteConfirmBtn.addEventListener("click", closeDeleteConfirm);
  cancelDeleteBtn.addEventListener("click", closeDeleteConfirm);
  confirmDeleteBtn.addEventListener("click", deleteCustomer);

  // Event listeners for purchase history
  if (closePurchaseHistoryBtn) {
    closePurchaseHistoryBtn.addEventListener("click", closePurchaseHistory);
  } else {
    console.error("closePurchaseHistoryBtn element not found");
  }

  // Event listeners for order details
  if (closeOrderDetailsBtn) {
    closeOrderDetailsBtn.addEventListener("click", closeOrderDetails);
  } else {
    console.error("closeOrderDetailsBtn element not found");
  }

  // Initialize Order Management
  initOrderManagement();

  /**
   * Render the customer table with current data and filters
   */
  function renderCustomerTable() {
    // Clear the table
    customerTableBody.innerHTML = "";

    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedCustomers = currentCustomers.slice(startIndex, endIndex);

    // Check if there are customers to display
    if (paginatedCustomers.length === 0) {
      const noDataRow = document.createElement("tr");
      noDataRow.innerHTML = `<td colspan="8" class="text-center">No customers found</td>`;
      customerTableBody.appendChild(noDataRow);
      return;
    }

    // Add customer rows
    paginatedCustomers.forEach((customer) => {
      const row = document.createElement("tr");

      // Format the status badge
      let statusBadge = "";
      if (customer.status === "active") {
        statusBadge = '<span class="status-badge active">Active</span>';
      } else if (customer.status === "inactive") {
        statusBadge = '<span class="status-badge inactive">Inactive</span>';
      } else if (customer.status === "new") {
        statusBadge = '<span class="status-badge new">New</span>';
      }

      // Format the customer type
      let customerType = "";
      if (customer.type === "retail") {
        customerType = "Retail";
      } else if (customer.type === "wholesale") {
        customerType = "Wholesale";
      } else if (customer.type === "distributor") {
        customerType = "Distributor";
      }

      row.innerHTML = `
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.contact}</td>
                <td>${customerType}</td>
                <td>${customer.location}</td>
                <td>${formatDate(customer.lastOrder)}</td>
                <td>${statusBadge}</td>
                <td>
                    <div class="crm-action-buttons">
                        <button class="crm-action-btn view" title="View Purchase History" data-id="${
                          customer.id
                        }">
                            <i class="fas fa-history"></i>
                        </button>
                        <button class="crm-action-btn edit" title="Edit Customer" data-id="${
                          customer.id
                        }">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="crm-action-btn delete" title="Delete Customer" data-id="${
                          customer.id
                        }">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </td>
            `;

      customerTableBody.appendChild(row);
    });

    // Add event listeners to action buttons
    document.querySelectorAll(".crm-action-btn.view").forEach((btn) => {
      btn.addEventListener("click", () =>
        viewPurchaseHistory(btn.getAttribute("data-id"))
      );
    });

    document.querySelectorAll(".crm-action-btn.edit").forEach((btn) => {
      btn.addEventListener("click", () =>
        editCustomer(btn.getAttribute("data-id"))
      );
    });

    document.querySelectorAll(".crm-action-btn.delete").forEach((btn) => {
      btn.addEventListener("click", () =>
        openDeleteConfirm(btn.getAttribute("data-id"))
      );
    });

    // Update pagination info
    updatePagination();
  }

  /**
   * Filter customers based on search input and filter selections
   */
  function filterCustomers() {
    const searchTerm = customerSearchInput.value.toLowerCase();
    const typeFilter = customerTypeFilter.value;
    const statusFilter = customerStatusFilter.value;

    currentCustomers = customers.filter((customer) => {
      // Search term filter
      const matchesSearch =
        customer.id.toLowerCase().includes(searchTerm) ||
        customer.name.toLowerCase().includes(searchTerm) ||
        customer.contact.toLowerCase().includes(searchTerm) ||
        customer.location.toLowerCase().includes(searchTerm);

      // Type filter
      const matchesType = typeFilter === "all" || customer.type === typeFilter;

      // Status filter
      const matchesStatus =
        statusFilter === "all" || customer.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });

    // Reset to first page when filtering
    currentPage = 1;

    // Re-render the table
    renderCustomerTable();
  }

  /**
   * Reset all filters to default values
   */
  function resetFilters() {
    customerSearchInput.value = "";
    customerTypeFilter.value = "all";
    customerStatusFilter.value = "all";

    // Reset to original customer list
    currentCustomers = [...customers];
    currentPage = 1;

    // Re-render the table
    renderCustomerTable();
  }

  /**
   * Update pagination controls and information
   */
  function updatePagination() {
    const totalPages = Math.ceil(currentCustomers.length / itemsPerPage);
    const paginationInfo = document.getElementById("paginationInfo");
    const prevPageBtn = document.getElementById("prevPageBtn");
    const nextPageBtn = document.getElementById("nextPageBtn");

    paginationInfo.textContent = `Page ${currentPage} of ${totalPages || 1}`;

    // Enable/disable previous button
    if (currentPage <= 1) {
      prevPageBtn.disabled = true;
    } else {
      prevPageBtn.disabled = false;
      prevPageBtn.onclick = () => {
        currentPage--;
        renderCustomerTable();
      };
    }

    // Enable/disable next button
    if (currentPage >= totalPages) {
      nextPageBtn.disabled = true;
    } else {
      nextPageBtn.disabled = false;
      nextPageBtn.onclick = () => {
        currentPage++;
        renderCustomerTable();
      };
    }
  }

  /**
   * Open the customer form for adding a new customer
   */
  function openCustomerForm() {
    // Reset the form
    customerForm.reset();
    document.getElementById("customerId").value = "";
    document.getElementById("customerFormTitle").textContent =
      "Add New Customer";
    editingCustomerId = null;

    // Show the modal
    customerFormModal.style.display = "block";
  }

  /**
   * Open the customer form for editing an existing customer
   */
  function editCustomer(customerId) {
    const customer = customers.find((c) => c.id === customerId);
    if (!customer) return;

    // Fill the form with customer data
    document.getElementById("customerId").value = customer.id;
    document.getElementById("customerName").value = customer.name;
    document.getElementById("customerType").value = customer.type;
    document.getElementById("customerPhone").value = customer.contact;
    document.getElementById("customerEmail").value = customer.email || "";
    document.getElementById("customerAddress").value = customer.address;
    document.getElementById("customerCity").value = customer.city;
    document.getElementById("customerState").value = customer.state;
    document.getElementById("customerPincode").value = customer.pincode;
    document.getElementById("customerPreferences").value =
      customer.preferences || "";

    // Update form title
    document.getElementById("customerFormTitle").textContent = "Edit Customer";
    editingCustomerId = customerId;

    // Show the modal
    customerFormModal.style.display = "block";
  }

  /**
   * Close the customer form modal
   */
  function closeCustomerForm() {
    // Add the closing animation class
    customerFormModal.classList.add("modal-closing");

    // Wait for animation to complete before hiding
    setTimeout(() => {
      customerFormModal.style.display = "none";
      customerFormModal.classList.remove("modal-closing");
    }, 200);
  }

  /**
   * Save customer data from the form
   */
  function saveCustomer(event) {
    event.preventDefault();

    // Get form data
    const formData = {
      name: document.getElementById("customerName").value,
      type: document.getElementById("customerType").value,
      contact: document.getElementById("customerPhone").value,
      email: document.getElementById("customerEmail").value,
      address: document.getElementById("customerAddress").value,
      city: document.getElementById("customerCity").value,
      state: document.getElementById("customerState").value,
      pincode: document.getElementById("customerPincode").value,
      preferences: document.getElementById("customerPreferences").value,
    };

    if (editingCustomerId) {
      // Update existing customer
      const index = customers.findIndex((c) => c.id === editingCustomerId);
      if (index !== -1) {
        customers[index] = {
          ...customers[index],
          ...formData,
          location: `${formData.city}, ${formData.state
            .substring(0, 2)
            .toUpperCase()}`,
        };
      }
    } else {
      // Add new customer
      const newCustomer = {
        id: generateCustomerId(),
        ...formData,
        location: `${formData.city}, ${formData.state
          .substring(0, 2)
          .toUpperCase()}`,
        lastOrder: "-",
        status: "new",
      };

      customers.push(newCustomer);
    }

    // Close the form and update the table
    closeCustomerForm();
    currentCustomers = [...customers];
    renderCustomerTable();
  }

  /**
   * Generate a new customer ID
   */
  function generateCustomerId() {
    const lastId =
      customers.length > 0
        ? parseInt(customers[customers.length - 1].id.replace("CUST", ""))
        : 0;
    return `CUST${String(lastId + 1).padStart(3, "0")}`;
  }

  /**
   * Open the delete confirmation modal
   */
  function openDeleteConfirm(customerId) {
    document.getElementById("deleteCustomerId").value = customerId;
    deleteConfirmModal.style.display = "block";
  }

  /**
   * Close the delete confirmation modal
   */
  function closeDeleteConfirm() {
    // Add the closing animation class
    deleteConfirmModal.classList.add("modal-closing");

    // Wait for animation to complete before hiding
    setTimeout(() => {
      deleteConfirmModal.style.display = "none";
      deleteConfirmModal.classList.remove("modal-closing");
    }, 200);
  }

  /**
   * Delete a customer
   */
  function deleteCustomer() {
    const customerId = document.getElementById("deleteCustomerId").value;
    const index = customers.findIndex((c) => c.id === customerId);

    if (index !== -1) {
      customers.splice(index, 1);
      currentCustomers = [...customers];
      renderCustomerTable();
    }

    closeDeleteConfirm(); // This now includes the animation
  }

  /**
   * View purchase history for a customer
   */
  function viewPurchaseHistory(customerId) {
    console.log("Viewing purchase history for customer ID:", customerId);

    const customer = customers.find((c) => c.id === customerId);
    if (!customer) {
      console.error("Customer not found:", customerId);
      return;
    }

    console.log("Customer found:", customer.name);

    // Update customer name in header
    if (customerNameHeader) {
      customerNameHeader.textContent = customer.name;
    } else {
      console.error("customerNameHeader element not found");
      return;
    }

    // Get purchase history for this customer
    const history = purchaseHistory[customerId] || [];
    console.log("Purchase history:", history);

    // Clear the table
    purchaseHistoryTableBody.innerHTML = "";

    // Check if there is purchase history
    if (history.length === 0) {
      const noDataRow = document.createElement("tr");
      noDataRow.innerHTML = `<td colspan="7" class="text-center">No purchase history found</td>`;
      purchaseHistoryTableBody.appendChild(noDataRow);

      // Update stats
      totalOrdersValue.textContent = "0";
      totalSpentValue.textContent = "₹0";
      avgOrderValue.textContent = "₹0";
      firstPurchaseDate.textContent = "-";
    } else {
      // Add purchase history rows
      history.forEach((order) => {
        const row = document.createElement("tr");

        // Format the status badge
        let statusBadge = "";
        if (order.status === "completed") {
          statusBadge = '<span class="status-badge completed">Completed</span>';
        } else if (order.status === "pending") {
          statusBadge = '<span class="status-badge pending">Pending</span>';
        } else if (order.status === "cancelled") {
          statusBadge = '<span class="status-badge cancelled">Cancelled</span>';
        }

        row.innerHTML = `
                    <td>${order.orderId}</td>
                    <td>${formatDate(order.date)}</td>
                    <td>${order.products}</td>
                    <td>${order.quantity}</td>
                    <td>${order.amount}</td>
                    <td>${statusBadge}</td>
                    <td>
                        <div class="crm-action-buttons">
                            <button class="crm-action-btn view" title="View Order Details" data-id="${
                              order.orderId
                            }">
                                <i class="fas fa-eye"></i>
                            </button>
                        </div>
                    </td>
                `;

        purchaseHistoryTableBody.appendChild(row);
      });

      // Add event listeners to view buttons
      document
        .querySelectorAll("#purchaseHistoryTableBody .crm-action-btn.view")
        .forEach((btn) => {
          btn.addEventListener("click", () =>
            viewOrderDetails(customerId, btn.getAttribute("data-id"))
          );
        });

      // Calculate and update stats
      const totalOrders = history.length;

      // Extract amounts and convert to numbers
      const amounts = history.map((order) => {
        const amountStr = order.amount.replace("₹", "").replace(",", "");
        return parseFloat(amountStr);
      });

      const totalSpent = amounts.reduce((sum, amount) => sum + amount, 0);
      const avgOrder = totalSpent / totalOrders;

      // Sort dates to find the first purchase
      const dates = history.map((order) => new Date(order.date));
      const firstDate = new Date(Math.min(...dates));

      // Update stats
      totalOrdersValue.textContent = totalOrders;
      totalSpentValue.textContent = `₹${totalSpent.toLocaleString("en-IN")}`;
      avgOrderValue.textContent = `₹${avgOrder.toLocaleString("en-IN", {
        maximumFractionDigits: 2,
      })}`;
      firstPurchaseDate.textContent = formatDate(
        firstDate.toISOString().split("T")[0]
      );
    }

    // Show the purchase history modal
    console.log("Showing purchase history modal");

    const purchaseHistoryModal = document.getElementById(
      "purchaseHistoryModal"
    );
    if (purchaseHistoryModal) {
      purchaseHistoryModal.style.display = "block";
    } else {
      console.error("purchaseHistoryModal element not found");
    }
  }

  /**
   * Close the purchase history modal
   */
  function closePurchaseHistory() {
    console.log("Closing purchase history modal");

    const purchaseHistoryModal = document.getElementById(
      "purchaseHistoryModal"
    );
    if (purchaseHistoryModal) {
      // Add the closing animation class
      purchaseHistoryModal.classList.add("modal-closing");

      // Wait for animation to complete before hiding
      setTimeout(() => {
        purchaseHistoryModal.style.display = "none";
        purchaseHistoryModal.classList.remove("modal-closing");
      }, 200);
    } else {
      console.error("purchaseHistoryModal element not found");
    }
  }

  /**
   * View order details
   */
  function viewOrderDetails(customerId, orderId) {
    const history = purchaseHistory[customerId] || [];
    const order = history.find((o) => o.orderId === orderId);

    if (!order || !order.details) return;

    // Update order details in the modal
    orderIdHeader.textContent = order.orderId;
    orderDateValue.textContent = order.details.orderDate;
    orderStatusValue.textContent = order.details.status;
    paymentMethodValue.textContent = order.details.paymentMethod;
    deliveryAddressValue.textContent = order.details.deliveryAddress;

    // Clear the items table
    orderItemsTableBody.innerHTML = "";

    // Add order items
    order.details.items.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${item.product}</td>
                <td>${item.unitPrice}</td>
                <td>${item.quantity}</td>
                <td>${item.total}</td>
            `;
      orderItemsTableBody.appendChild(row);
    });

    // Update totals
    orderSubtotalValue.textContent = order.details.subtotal;
    orderTaxValue.textContent = order.details.tax;
    orderTotalValue.textContent = order.details.total;

    // Show the modal
    orderDetailsModal.style.display = "block";
  }

  /**
   * Close the order details modal
   */
  function closeOrderDetails() {
    // Add the closing animation class
    orderDetailsModal.classList.add("modal-closing");

    // Wait for animation to complete before hiding
    setTimeout(() => {
      orderDetailsModal.style.display = "none";
      orderDetailsModal.classList.remove("modal-closing");
    }, 200);
  }

  /**
   * Format a date string to a more readable format
   */
  function formatDate(dateString) {
    if (!dateString || dateString === "-") return "-";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-IN", options);
  }

  /**
   * Setup event handlers to close modals when clicking outside of them
   */
  function setupModalOutsideClickHandlers() {
    // Get all modals
    const modals = [
      { element: customerFormModal, closeFunction: closeCustomerForm },
      { element: deleteConfirmModal, closeFunction: closeDeleteConfirm },
      { element: purchaseHistoryModal, closeFunction: closePurchaseHistory },
      { element: orderDetailsModal, closeFunction: closeOrderDetails },
      {
        element: document.getElementById("createOrderModal"),
        closeFunction: closeCreateOrderModal,
      },
      {
        element: document.getElementById("modifyOrderModal"),
        closeFunction: closeModifyOrderModal,
      },
      {
        element: document.getElementById("cancelOrderModal"),
        closeFunction: closeCancelOrderModal,
      },
    ];

    // Add click event listener to each modal
    modals.forEach((modal) => {
      if (modal.element) {
        modal.element.addEventListener("click", function (event) {
          // If the click is directly on the modal background (not on its content)
          if (event.target === modal.element) {
            modal.closeFunction();
          }
        });

        // Prevent clicks on modal content from closing the modal
        const modalContent = modal.element.querySelector(".crm-modal-content");
        if (modalContent) {
          modalContent.addEventListener("click", function (event) {
            // Stop the event from bubbling up to the modal background
            event.stopPropagation();
          });
        }
      }
    });

    console.log("Modal outside click handlers have been set up");
  }

  /**
   * Initialize Order Management functionality
   */
  function initOrderManagement() {
    // Get DOM elements
    const orderTabBtns = document.querySelectorAll(".order-tab-btn");
    const orderTabPanes = document.querySelectorAll(".order-tab-pane");
    const createOrderBtn = document.getElementById("createOrderBtn");
    const closeCreateOrderBtn = document.getElementById("closeCreateOrderBtn");
    const cancelCreateOrderBtn = document.getElementById(
      "cancelCreateOrderBtn"
    );
    const closeModifyOrderBtn = document.getElementById("closeModifyOrderBtn");
    const cancelModifyOrderBtn = document.getElementById(
      "cancelModifyOrderBtn"
    );
    const closeCancelOrderBtn = document.getElementById("closeCancelOrderBtn");
    const backToCancelOrderBtn = document.getElementById(
      "backToCancelOrderBtn"
    );
    const confirmCancelOrderBtn = document.getElementById(
      "confirmCancelOrderBtn"
    );
    const cancelReason = document.getElementById("cancelReason");
    const otherReasonContainer = document.getElementById(
      "otherReasonContainer"
    );
    const addOrderItemBtn = document.getElementById("addOrderItemBtn");
    const createOrderModal = document.getElementById("createOrderModal");
    const modifyOrderModal = document.getElementById("modifyOrderModal");
    const cancelOrderModal = document.getElementById("cancelOrderModal");

    // Initialize charts if they exist
    initOrderCharts();

    // Tab switching functionality
    if (orderTabBtns) {
      orderTabBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
          // Remove active class from all tabs
          orderTabBtns.forEach((b) => b.classList.remove("active"));
          orderTabPanes.forEach((p) => p.classList.remove("active"));

          // Add active class to clicked tab
          this.classList.add("active");

          // Show corresponding content
          const tabId = this.getAttribute("data-tab");
          const tabContent = document.getElementById(tabId);
          if (tabContent) {
            tabContent.classList.add("active");
          }
        });
      });
    }

    // Create Order button
    if (createOrderBtn) {
      createOrderBtn.addEventListener("click", function () {
        if (createOrderModal) {
          createOrderModal.style.display = "block";
        }
      });
    }

    // Create Order Form submission
    const createOrderForm = document.getElementById("createOrderForm");
    if (createOrderForm) {
      createOrderForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get form values
        const customerName = document.getElementById("orderCustomer").value;
        const orderDate = document.getElementById("orderDate").value;
        const formattedDate = formatDate(orderDate);

        // Add order to the daily orders table
        addOrderToTable(customerName, formattedDate);

        // Close the modal
        closeCreateOrderModal();
      });
    }

    // Close Create Order Modal
    if (closeCreateOrderBtn) {
      closeCreateOrderBtn.addEventListener("click", closeCreateOrderModal);
    }

    // Cancel Create Order button
    if (cancelCreateOrderBtn) {
      cancelCreateOrderBtn.addEventListener("click", closeCreateOrderModal);
    }

    // Close Modify Order Modal
    if (closeModifyOrderBtn) {
      closeModifyOrderBtn.addEventListener("click", closeModifyOrderModal);
    }

    // Cancel Modify Order button
    if (cancelModifyOrderBtn) {
      cancelModifyOrderBtn.addEventListener("click", closeModifyOrderModal);
    }

    // Close Cancel Order Modal
    if (closeCancelOrderBtn) {
      closeCancelOrderBtn.addEventListener("click", closeCancelOrderModal);
    }

    // Back button in Cancel Order Modal
    if (backToCancelOrderBtn) {
      backToCancelOrderBtn.addEventListener("click", closeCancelOrderModal);
    }

    // Confirm Cancel Order button
    if (confirmCancelOrderBtn) {
      confirmCancelOrderBtn.addEventListener("click", function () {
        // Here you would implement the actual order cancellation logic
        alert("Order has been cancelled successfully");
        closeCancelOrderModal();
      });
    }

    // Cancel reason dropdown change
    if (cancelReason) {
      cancelReason.addEventListener("change", function () {
        if (this.value === "other" && otherReasonContainer) {
          otherReasonContainer.style.display = "block";
        } else if (otherReasonContainer) {
          otherReasonContainer.style.display = "none";
        }
      });
    }

    // Add Order Item button
    if (addOrderItemBtn) {
      addOrderItemBtn.addEventListener("click", addOrderItem);
    }

    // Setup action buttons for orders
    setupOrderActionButtons();
  }

  /**
   * Initialize Order Charts
   */
  function initOrderCharts() {
    // Check if Chart is available
    if (typeof Chart === "undefined") {
      console.error("Chart.js is not loaded");
      return;
    }

    // Weekly Orders Chart
    const weeklyOrdersChartEl = document.getElementById("weeklyOrdersChart");
    if (weeklyOrdersChartEl) {
      try {
        new Chart(weeklyOrdersChartEl, {
          type: "line",
          data: {
            labels: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            datasets: [
              {
                label: "Orders",
                data: [42, 38, 45, 40, 48, 52, 20],
                borderColor: "#3b82f6",
                backgroundColor: "rgba(59, 130, 246, 0.1)",
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
      } catch (error) {
        console.error("Error creating weekly orders chart:", error);
      }
    }

    // Monthly Orders Chart
    const monthlyOrdersChartEl = document.getElementById("monthlyOrdersChart");
    if (monthlyOrdersChartEl) {
      try {
        new Chart(monthlyOrdersChartEl, {
          type: "bar",
          data: {
            labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
            datasets: [
              {
                label: "Orders",
                data: [285, 320, 350, 290],
                backgroundColor: "rgba(59, 130, 246, 0.7)",
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
      } catch (error) {
        console.error("Error creating monthly orders chart:", error);
      }
    }
  }

  /**
   * Setup action buttons for orders
   */
  function setupOrderActionButtons() {
    // View Order buttons
    const viewButtons = document.querySelectorAll(".view-btn");
    if (viewButtons) {
      viewButtons.forEach((btn) => {
        btn.addEventListener("click", function () {
          const orderId =
            this.closest("tr").querySelector("td:first-child").textContent;
          viewOrderDetails(orderId);
        });
      });
    }

    // Modify Order buttons
    const modifyButtons = document.querySelectorAll(".modify-btn");
    if (modifyButtons) {
      modifyButtons.forEach((btn) => {
        btn.addEventListener("click", function () {
          const orderId =
            this.closest("tr").querySelector("td:first-child").textContent;
          showModifyOrderModal(orderId);
        });
      });
    }

    // Cancel Order buttons
    const cancelButtons = document.querySelectorAll(".cancel-btn");
    if (cancelButtons) {
      cancelButtons.forEach((btn) => {
        btn.addEventListener("click", function () {
          const orderId =
            this.closest("tr").querySelector("td:first-child").textContent;
          showCancelOrderModal(orderId);
        });
      });
    }

    // Reorder buttons
    const reorderButtons = document.querySelectorAll(".reorder-btn");
    if (reorderButtons) {
      reorderButtons.forEach((btn) => {
        btn.addEventListener("click", function () {
          const orderId =
            this.closest("tr").querySelector("td:first-child").textContent;
          reorderFromPrevious(orderId);
        });
      });
    }
  }

  /**
   * View order details
   */
  function viewOrderDetails(orderId) {
    // In a real application, you would fetch the order details from the server
    // For now, we'll just show the order details modal with sample data

    // Set the order ID in the header
    document.getElementById("orderIdHeader").textContent = orderId;

    // Set sample values
    document.getElementById("orderDateValue").textContent = "15 Jun 2023";
    document.getElementById("orderStatusValue").textContent = "Delivered";
    document.getElementById("paymentMethodValue").textContent = "UPI";
    document.getElementById("deliveryAddressValue").textContent =
      "123, Koramangala, Bangalore";

    // Clear previous items
    const orderItemsTableBody = document.getElementById("orderItemsTableBody");
    if (orderItemsTableBody) {
      orderItemsTableBody.innerHTML = "";

      // Add sample items
      const items = [
        {
          product: "Full Cream Milk",
          price: "₹60",
          quantity: 2,
          total: "₹120",
        },
        { product: "Butter", price: "₹80", quantity: 1, total: "₹80" },
      ];

      items.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${item.product}</td>
          <td>${item.price}</td>
          <td>${item.quantity}</td>
          <td>${item.total}</td>
        `;
        orderItemsTableBody.appendChild(row);
      });
    }

    // Set order totals
    document.getElementById("orderSubtotalValue").textContent = "₹200";
    document.getElementById("orderTaxValue").textContent = "₹10";
    document.getElementById("orderTotalValue").textContent = "₹210";

    // Show the modal
    const orderDetailsModal = document.getElementById("orderDetailsModal");
    if (orderDetailsModal) {
      orderDetailsModal.style.display = "block";
    }
  }

  /**
   * Show modify order modal
   */
  function showModifyOrderModal(orderId) {
    // Set the order ID
    document.getElementById("modifyOrderId").textContent = orderId;

    // In a real application, you would fetch the current order details
    // and populate the form fields

    // For now, we'll just show the modal with empty fields
    const modifyOrderModal = document.getElementById("modifyOrderModal");
    if (modifyOrderModal) {
      modifyOrderModal.style.display = "block";
    }
  }

  /**
   * Show cancel order modal
   */
  function showCancelOrderModal(orderId) {
    // Set the order ID
    document.getElementById("cancelOrderId").value = orderId;

    // Show the modal
    const cancelOrderModal = document.getElementById("cancelOrderModal");
    if (cancelOrderModal) {
      cancelOrderModal.style.display = "block";
    }
  }

  /**
   * Reorder from previous order
   */
  function reorderFromPrevious(orderId) {
    // In a real application, you would fetch the previous order details
    // and pre-populate the create order form

    // For now, we'll just show an alert
    alert(`Creating new order based on ${orderId}`);

    // Show the create order modal
    const createOrderModal = document.getElementById("createOrderModal");
    if (createOrderModal) {
      createOrderModal.style.display = "block";
    }
  }

  /**
   * Add a new order item row
   */
  function addOrderItem() {
    const orderItemsContainer = document.querySelector(
      ".order-items-container"
    );
    if (orderItemsContainer) {
      const newRow = document.createElement("div");
      newRow.className = "order-item-row";
      newRow.innerHTML = `
        <div class="order-item-product">
          <input type="text" class="order-product-input" placeholder="Enter product name" />
        </div>
        <div class="order-item-price">
          <input type="number" class="order-price-input" placeholder="Price" value="0" />
        </div>
        <div class="order-item-quantity">
          <input type="number" class="order-quantity-input" placeholder="Qty" min="1" value="1" />
        </div>
        <div class="order-item-total">
          <input type="text" class="order-total-input" placeholder="Total" value="₹0" readonly />
        </div>
        <div class="order-item-actions">
          <button type="button" class="order-item-remove"><i class="fas fa-trash"></i></button>
        </div>
      `;

      orderItemsContainer.appendChild(newRow);

      // Add event listener to the remove button
      const removeBtn = newRow.querySelector(".order-item-remove");
      if (removeBtn) {
        removeBtn.addEventListener("click", function () {
          newRow.remove();
          updateOrderTotal();
        });
      }

      // Add event listeners for price and quantity changes
      const priceInput = newRow.querySelector(".order-price-input");
      const quantityInput = newRow.querySelector(".order-quantity-input");

      if (priceInput) {
        priceInput.addEventListener("input", function () {
          updateItemTotal(newRow);
        });
      }

      if (quantityInput) {
        quantityInput.addEventListener("input", function () {
          updateItemTotal(newRow);
        });
      }
    }
  }

  /**
   * Update item price based on manual input
   * Note: This function is kept for backward compatibility but is no longer used
   */
  function updateItemPrice(row) {
    // With manual input, this function is no longer needed
    // We'll just update the total
    updateItemTotal(row);
  }

  /**
   * Update item total based on price and quantity
   */
  function updateItemTotal(row) {
    const priceInput = row.querySelector(".order-price-input");
    const quantityInput = row.querySelector(".order-quantity-input");
    const totalInput = row.querySelector(".order-total-input");

    if (priceInput && quantityInput && totalInput) {
      const price = parseFloat(priceInput.value) || 0;
      const quantity = parseInt(quantityInput.value) || 0;
      const total = price * quantity;

      totalInput.value = `₹${total.toFixed(2)}`;

      // Update the order total
      updateOrderTotal();
    }
  }

  /**
   * Update the order total
   */
  function updateOrderTotal() {
    const totalInputs = document.querySelectorAll(".order-total-input");
    const subtotalElement = document.getElementById("orderSubtotal");
    const taxElement = document.getElementById("orderTax");
    const deliveryFeeElement = document.getElementById("deliveryFee");
    const totalElement = document.getElementById("orderTotal");

    if (subtotalElement && taxElement && deliveryFeeElement && totalElement) {
      let subtotal = 0;

      totalInputs.forEach((input) => {
        subtotal += parseFloat(input.value.replace("₹", "")) || 0;
      });

      const taxRate = 0.05; // 5%
      const tax = Math.round(subtotal * taxRate);
      const deliveryFee = 20; // Fixed delivery fee
      const total = subtotal + tax + deliveryFee;

      subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
      taxElement.textContent = `₹${tax.toFixed(2)}`;
      deliveryFeeElement.textContent = `₹${deliveryFee.toFixed(2)}`;
      totalElement.textContent = `₹${total.toFixed(2)}`;
    }
  }

  /**
   * Close the create order modal
   */
  function closeCreateOrderModal() {
    const createOrderModal = document.getElementById("createOrderModal");
    if (createOrderModal) {
      // Add the closing animation class
      createOrderModal.classList.add("modal-closing");

      // Wait for animation to complete before hiding
      setTimeout(() => {
        createOrderModal.style.display = "none";
        createOrderModal.classList.remove("modal-closing");
      }, 200);
    }
  }

  /**
   * Close the modify order modal
   */
  function closeModifyOrderModal() {
    const modifyOrderModal = document.getElementById("modifyOrderModal");
    if (modifyOrderModal) {
      // Add the closing animation class
      modifyOrderModal.classList.add("modal-closing");

      // Wait for animation to complete before hiding
      setTimeout(() => {
        modifyOrderModal.style.display = "none";
        modifyOrderModal.classList.remove("modal-closing");
      }, 200);
    }
  }

  /**
   * Close the cancel order modal
   */
  function closeCancelOrderModal() {
    const cancelOrderModal = document.getElementById("cancelOrderModal");
    if (cancelOrderModal) {
      // Add the closing animation class
      cancelOrderModal.classList.add("modal-closing");

      // Wait for animation to complete before hiding
      setTimeout(() => {
        cancelOrderModal.style.display = "none";
        cancelOrderModal.classList.remove("modal-closing");
      }, 200);
    }
  }

  /**
   * Add a new order to the daily orders table
   */
  function addOrderToTable(customerName, orderDate) {
    const dailyOrdersTable = document.getElementById("dailyOrdersTable");
    if (!dailyOrdersTable) return;

    const tbody = dailyOrdersTable.querySelector("tbody");
    if (!tbody) return;

    // Get order items
    const orderItems = [];
    const orderItemRows = document.querySelectorAll(".order-item-row");
    orderItemRows.forEach((row) => {
      const productInput = row.querySelector(".order-product-input");
      const quantityInput = row.querySelector(".order-quantity-input");

      if (productInput && quantityInput && productInput.value.trim() !== "") {
        const product = productInput.value;
        const quantity = quantityInput.value;
        orderItems.push(`${product} (${quantity})`);
      }
    });

    // Get total amount
    const totalElement = document.getElementById("orderTotal");
    const totalAmount = totalElement ? totalElement.textContent : "₹0";

    // Generate order ID
    const now = new Date();
    const orderId = `#ORD-${now.getFullYear()}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${now
      .getDate()
      .toString()
      .padStart(2, "0")}-${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")}`;

    // Create new row
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${orderId}</td>
      <td>${customerName}</td>
      <td>${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")} ${now.getHours() >= 12 ? "PM" : "AM"}</td>
      <td>${orderItems.join(", ") || "No items"}</td>
      <td>${totalAmount}</td>
      <td><span class="status-badge pending">Processing</span></td>
      <td class="action-buttons">
        <button class="action-btn view-btn" title="View Details"><i class="fas fa-eye"></i></button>
        <button class="action-btn modify-btn" title="Modify"><i class="fas fa-edit"></i></button>
        <button class="action-btn cancel-btn" title="Cancel"><i class="fas fa-times"></i></button>
      </td>
    `;

    // Add to table
    tbody.insertBefore(newRow, tbody.firstChild);

    // Update order count in summary card
    const todayOrdersValue = document.querySelector(
      "#daily-orders .order-summary-card:first-child .order-card-value"
    );
    if (todayOrdersValue) {
      const currentCount = parseInt(todayOrdersValue.textContent) || 0;
      todayOrdersValue.textContent = (currentCount + 1).toString();
    }

    // Update pending count in summary card
    const pendingOrdersValue = document.querySelector(
      "#daily-orders .order-summary-card:nth-child(3) .order-card-value"
    );
    if (pendingOrdersValue) {
      const currentCount = parseInt(pendingOrdersValue.textContent) || 0;
      pendingOrdersValue.textContent = (currentCount + 1).toString();
    }

    // Setup action buttons for the new row
    setupOrderActionButtons();

    // Show success message
    alert("Order created successfully!");
  }

  /**
   * Format a date string to a more readable format
   */
  function formatDate(dateStr) {
    if (!dateStr || dateStr === "-") return "-";

    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
}
