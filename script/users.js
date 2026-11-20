document.addEventListener("DOMContentLoaded", loadAndShowUsers);

//  Server se users ka data lane, Console mein dikhane aur Local Storage mein save karne ke liye
async function getUsers() {
    const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users', {
        
        headers: {
            "Content-Type": "application/json"
        }
    });

    const jsonData = await usersResponse.json();

    // Console mein data print karne ke liye
    console.log("Users Data:", jsonData);

    // Local Storage mein save karne ke liye (JSON ko string mein badalna zaroori hai)
    localStorage.setItem("savedUsers", JSON.stringify(jsonData));

    return jsonData;
}

//  Har ek user ka card banane ke liye

function userCard(userData) {
    const userDiv = document.createElement('div');
    const nameDiv = document.createElement('div');
    const emailDiv = document.createElement('div');
    const cityDiv = document.createElement('div');
    const addressDiv = document.createElement('div');

    // style

    userDiv.style.border = "2px solid black";
    userDiv.style.padding = "10px";
    userDiv.style.margin = "10px 0";

    nameDiv.style.fontSize = "18px";
    nameDiv.style.fontWeight = "bold";
   
    // Elements ke andar user ka data bharna
    nameDiv.textContent = `Name: ${userData.name}`;
    emailDiv.textContent = `Email: ${userData.email}`;
    cityDiv.textContent = `City: ${userData.address.city}`;
    addressDiv.textContent = `address:${userData.address}`;
     // Sabhi elements ko main card (userDiv) ke andar jodna
    userDiv.appendChild(nameDiv);
    userDiv.appendChild(emailDiv);
    userDiv.appendChild(cityDiv);
     userDiv.appendChild(addressDiv);
    return userDiv;
}

//  Saare users ko screen par dikhane ke liye

    async function loadAndShowUsers() {
    const users = await getUsers();

    const mainDiv = document.createElement('div');

    for (let i = 0; i < users.length; i++) {
        const card = userCard(users[i]);
        mainDiv.appendChild(card);
    }

    const containerDiv = document.getElementById('users');
    containerDiv.appendChild(mainDiv);
}
