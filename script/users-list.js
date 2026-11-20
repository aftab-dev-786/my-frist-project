
function createOrUpdateUser(et){

    et.preventDefault();

    const formUserId = document.getElementById('form-user-id').textContent;

    if(!formUserId){

        // Create

        const collectedFistName = document.getElementById('first-name').value;
        const collectedLastName = document.getElementById('last-name').value;
        const collectedMobileNumber = document.getElementById('mobile-number').value;
        const collectedEmail = document.getElementById('email').value;
        const collectedAdhar = document.getElementById('adhar-number').value;

        const userObject = {
            userId : collectedMobileNumber + "-" + collectedAdhar,
            firstName: collectedFistName,
            lastName: collectedLastName,
            mobileNumber: collectedMobileNumber,
            email: collectedEmail,
            adharNumber: collectedAdhar,

            // Admission Status
            admissionStatus: "Pending"
        }

        // storageInfo

        const storageUsers = localStorage.getItem("users");

        if(!storageUsers){

            const storageUsersArray = [userObject];

            localStorage.setItem("users", JSON.stringify(storageUsersArray));

        }else{

            const resultUsersArray = JSON.parse(storageUsers);

            resultUsersArray.push(userObject);

            localStorage.setItem("users", JSON.stringify(resultUsersArray));

        }

        // Make empty

        document.getElementById('first-name').value = "";
        document.getElementById('last-name').value = "";
        document.getElementById('mobile-number').value = "";
        document.getElementById('email').value = "";
        document.getElementById('adhar-number').value = "";

        populateTable();

    }else{

        // Update

        const collectedFistName = document.getElementById('first-name').value;
        const collectedLastName = document.getElementById('last-name').value;
        const collectedMobileNumber = document.getElementById('mobile-number').value;
        const collectedEmail = document.getElementById('email').value;
        const collectedAdhar = document.getElementById('adhar-number').value;

        const storageUsers = JSON.parse(localStorage.getItem("users"));

        let result = [];

        for(let i = 0; i < storageUsers.length; i++){

            if(storageUsers[i].userId === formUserId){

                const userObject = {
                    userId : formUserId,
                    firstName: collectedFistName,
                    lastName: collectedLastName,
                    mobileNumber: collectedMobileNumber,
                    email: collectedEmail,
                    adharNumber: collectedAdhar,

                    // Previous status preserve
                    admissionStatus: storageUsers[i].admissionStatus || "Pending"
                };

                result.push(userObject);

            }else{

                result.push(storageUsers[i]);

            }

        }

        localStorage.setItem("users", JSON.stringify(result));

        // Make empty

        document.getElementById('first-name').value = "";
        document.getElementById('last-name').value = "";
        document.getElementById('mobile-number').value = "";
        document.getElementById('email').value = "";
        document.getElementById('adhar-number').value = "";
        document.getElementById('form-user-id').textContent = "";

        populateTable();

    }

    return;

}


// EDIT USER

function editRowUser(ev){

    const inputUserId = ev.srcElement.id;

    const storageUsers = JSON.parse(localStorage.getItem("users")) || [];

    let userObject = {};

    for(let i = 0; i < storageUsers.length; i++){

        if(storageUsers[i].userId === inputUserId){

            userObject = storageUsers[i];

        }

    }

    // fill

    document.getElementById('first-name').value = userObject.firstName;
    document.getElementById('last-name').value = userObject.lastName;
    document.getElementById('mobile-number').value = userObject.mobileNumber;
    document.getElementById('email').value = userObject.email;
    document.getElementById('adhar-number').value = userObject.adharNumber;

    const userIdDiv = document.getElementById("form-user-id");

    userIdDiv.textContent = userObject.userId;

}


// DELETE

function deleteRowuser(e){

    const rowInputId = e.srcElement.id;

    const result = [];

    const storageUsers = JSON.parse(localStorage.getItem("users")) || [];

    for(let i = 0; i < storageUsers.length; i++){

        if(storageUsers[i].userId != rowInputId){

            result.push(storageUsers[i]);

        }

    }

    localStorage.setItem("users", JSON.stringify(result));

    populateTable();

}


// ADMISSION STATUS UPDATE

function updateAdmissionStatus(event){

    const userId = event.target.id;

    const newStatus = event.target.value;

    const storageUsers = JSON.parse(localStorage.getItem("users")) || [];

    for(let i = 0; i < storageUsers.length; i++){

        if(storageUsers[i].userId === userId){

            storageUsers[i].admissionStatus = newStatus;

            break;

        }

    }

    localStorage.setItem("users", JSON.stringify(storageUsers));

    console.log("Admission Status Updated:", newStatus);

}


// CREATE TABLE ROW

function createTableRow(rowData){

    const rowRoot = document.createElement('div');

    rowRoot.classList.add('users-table-row');

    const userIdDiv = document.createElement('div');
    userIdDiv.textContent = rowData.userId;

    const firstNameDiv = document.createElement('div');
    firstNameDiv.textContent = rowData.firstName;

    const lastNameDiv = document.createElement('div');
    lastNameDiv.textContent = rowData.lastName;

    const MobileNumberDiv = document.createElement('div');
    MobileNumberDiv.textContent = rowData.mobileNumber;

    const emailDiv = document.createElement('div');
    emailDiv.textContent = rowData.email;

    const adharNumberDiv = document.createElement('div');
    adharNumberDiv.textContent = rowData.adharNumber;


    // Admission Status Selector

    const statusDiv = document.createElement('div');

    const statusSelect = document.createElement('select');

    statusSelect.id = rowData.userId;

    const statusOptions = ["Pending", "OK", "Cancel"];

    for(let i = 0; i < statusOptions.length; i++){

        const option = document.createElement('option');

        option.value = statusOptions[i];

        option.textContent = statusOptions[i];

        statusSelect.appendChild(option);

    }

    statusSelect.value = rowData.admissionStatus || "Pending";

    statusSelect.addEventListener('change', updateAdmissionStatus);

    statusDiv.appendChild(statusSelect);


    // Edit Button

    const editButton = document.createElement('button');

    editButton.textContent = "Edit";

    editButton.id = rowData.userId;

    editButton.addEventListener('click', editRowUser);


    // Delete Button

    const deleteButton = document.createElement('button');

    deleteButton.textContent = "Delete";

    deleteButton.id = rowData.userId;

    deleteButton.addEventListener('click', deleteRowuser);


    // Append

    rowRoot.appendChild(userIdDiv);
    rowRoot.appendChild(firstNameDiv);
    rowRoot.appendChild(lastNameDiv);
    rowRoot.appendChild(MobileNumberDiv);
    rowRoot.appendChild(emailDiv);
    rowRoot.appendChild(adharNumberDiv);

    // Admission Status append
    rowRoot.appendChild(statusDiv);

    rowRoot.appendChild(editButton);
    rowRoot.appendChild(deleteButton);

    return rowRoot;

}


// POPULATE TABLE

function populateTable(){

    // Storage

    const usersFromStorage = localStorage.getItem("users");
    const usersfromstorageJson = JSON.parse(usersFromStorage) || [];


    // Table HTML

    const tableDataRoot = document.createElement('div');

    for(let i = 0; i < usersfromstorageJson.length; i++){

        const tableRow = createTableRow(usersfromstorageJson[i]);

        tableDataRoot.appendChild(tableRow);

    }
    // HTML replaceChild

    console.log(tableDataRoot);

    document.getElementById("table-data").replaceChildren(tableDataRoot);

}
// PAGE LOAD

window.addEventListener('DOMContentLoaded', populateTable);
