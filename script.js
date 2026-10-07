 const openRequestBtn = document.getElementById("openRequestBtn");

const requestForm = document.getElementById("requestForm");

const cancelBtn = document.getElementById("cancelBtn");

const submitBtn = document.getElementById("submitBtn");

const employeeName = document.getElementById("employeeName");

const requestType = document.getElementById("requestType");

const requestTitle = document.getElementById("requestTitle");

const description = document.getElementById("description");

const priority = document.getElementById("priority");

const requestsTable = document.getElementById("requestsTable");

const totalRequests = document.getElementById("totalRequests");

const newRequests = document.getElementById("newRequests");

const inProgressRequests = document.getElementById("inProgressRequests");

const completedRequests = document.getElementById("completedRequests");

/* Open Form */

openRequestBtn.addEventListener("click", function () {

    requestForm.style.display = "block";

});

/* Cancel */

cancelBtn.addEventListener("click", function () {

    requestForm.style.display = "none";

});

/* Add New Request */

submitBtn.addEventListener("click", function () {

    if (

        employeeName.value.trim() === "" ||

        requestType.value === "" ||

        requestTitle.value.trim() === "" ||

        description.value.trim() === "" ||

        priority.value === ""

    ) {

        alert("Please complete all fields.");

        return;

    }

    const newRow = document.createElement("tr");

    newRow.setAttribute("data-status", "New");

    newRow.innerHTML = `

        <td>${employeeName.value}</td>

        <td>${requestTitle.value}</td>

        <td>${requestType.value}</td>

        <td>${priority.value}</td>

        <td>

            <select class="status-select">

                <option value="New" selected>

                    New

                </option>

                <option value="In Progress">

                    In Progress

                </option>

                <option value="Completed">

                    Completed

                </option>

            </select>

        </td>

        <td>

            <button

                class="delete-btn"

                type="button">

                Delete

            </button>

        </td>

    `;

    requestsTable.appendChild(newRow);

    /* Clear Form */

    employeeName.value = "";

    requestType.value = "";

    requestTitle.value = "";

    description.value = "";

    priority.value = "";

    /* Close Form */

    requestForm.style.display = "none";

    updateDashboard();

    alert("Request submitted successfully!");

});

/* Delete Request */

requestsTable.addEventListener("click", function (event) {

    if (event.target.classList.contains("delete-btn")) {

        const row = event.target.closest("tr");

        const confirmDelete = confirm(

            "Are you sure you want to delete this request?"

        );

        if (confirmDelete) {

            row.remove();

            updateDashboard();

        }

    }

});

/* Change Status */

requestsTable.addEventListener("change", function (event) {

    if (event.target.classList.contains("status-select")) {

        const row = event.target.closest("tr");

        row.setAttribute(

            "data-status",

            event.target.value

        );

        updateDashboard();

    }

});

/* Update Dashboard */

function updateDashboard() {

    const rows = requestsTable.querySelectorAll("tr");

    let newCount = 0;

    let inProgressCount = 0;

    let completedCount = 0;

    rows.forEach(function (row) {

        const status = row.getAttribute("data-status");

        if (status === "New") {

            newCount++;

        } else if (status === "In Progress") {

            inProgressCount++;

        } else if (status === "Completed") {

            completedCount++;

        }

    });

    totalRequests.textContent = rows.length;

    newRequests.textContent = newCount;

    inProgressRequests.textContent = inProgressCount;
 completedRequests.textContent = completedCount;

}