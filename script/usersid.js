let users = [
    { userid: 102 },
    { userid: 102 },
    { userid: 104 },
    { userid: 105 },
    { userid: 106 }
];

let id = 104;

for (let i = 0; i < users.length; i++) {
    if (users[i].userid === id) {
        console.log(String(i).padStart(3, "0"));
    }
}