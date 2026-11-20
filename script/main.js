function buttonStyler(){
    const loginButtonElement = document.getElementById("login-button");

    loginButtonElement.style.color = "white";
    loginButtonElement.style.backgroundColor = "blue";

}

function buttonStyleResetter(){
    const loginButtonTag = document.getElementById("login-button");
    loginButtonTag.style.color = "rgb(18, 110, 239)";
    loginButtonTag.style.backgroundColor = "white"

}

function fullNameShower(e){
    e.preventDefault();
    const firstNameValue = document.getElementById("fName").value;
    const lastNameValue = document.getElementById("lName").value;

    const resultValue = firstNameValue + " " + lastNameValue;

    const resultTag = document.createElement('div');
    resultTag.id = "result-id";
    resultTag.textContent = resultValue;


    const formTag = document.getElementById('form-tag');
    const isResultTagAvailable = document.getElementById('result-id');
    if(!isResultTagAvailable){
        formTag.appendChild(resultTag);
    }else{
       document.getElementById('result-id').textContent =  resultValue;
    }

    // style change

    resultTag.style.color = "white";
    resultTag.style.backgroundColor = "blue";
    resultTag.style.padding = "8px";
    resultTag.style.fontFamily = "cursive";

    // Make inputs empty
    document.getElementById("fName").value = "";
    document.getElementById("lName").value = "";

}