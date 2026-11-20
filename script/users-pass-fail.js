
let A1 = [101, 102, 103, 104, 105];
let A2 = [101, 109, 105];
let A3 = [102, 104];

let p1 = 0;
let f1 = 0;

for (let i = 0; i < A1.length; i++) {

    let id = A1[i];

    for (let j = 0; j < A2.length; j++) {

        if (A2[j] == id || A3.includes(id)) {
            p1++;
            break;
        }
    }
    if (!A2.includes(id) && !A3.includes(id)) {
        f1++;
    }
}
       console.log("pass=", p1);
       console.log("fail=", f1);
