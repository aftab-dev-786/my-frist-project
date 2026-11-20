showReadWriteItems();
window.addEventListener("storage", showReadWriteItems)

function getAllValuesFromstorage(){
    const allValues = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = JSON.parse(localStorage.getItem(key));
        allValues[key] = value
    } 
    
    return allValues;
}


function cardCreator(value){
    const cardDiv = document.createElement('div');
    const nonRetailPriceDiv =  document.createElement('div');
    const retailPriceDiv =  document.createElement('div');
    const fruitDiv =  document.createElement('div');

    nonRetailPriceDiv.textContent = "Non Retail Price: "+ value.nonRetailP;
    retailPriceDiv.textContent = "Retail Price: "+value.retailP;
    fruitDiv.textContent = "Fruit Name: " + value.fruit;
    
    cardDiv.appendChild(nonRetailPriceDiv);
    cardDiv.appendChild(retailPriceDiv);
    cardDiv.appendChild(fruitDiv);

    // style
    cardDiv.style.width = "300px";
    cardDiv.style.backgroundColor = "blue";
    cardDiv.style.padding = "10px";
    cardDiv.style.margin = "0px 0px 20px 10px";
     cardDiv.style.color = "white"

    return cardDiv

}

function finalDivCreator(data){
    const dataEntries = Object.keys(data);
    const mainDiv = document.createElement("div");
    for(let i = 0; i < dataEntries.length; i++ ){
        const card = cardCreator(data[dataEntries[i]]);
        mainDiv.appendChild(card);
    }

   return mainDiv;

}

function showReadWriteItems(){
    // Storage data get
    const allData = getAllValuesFromstorage();

    // Each Item -> Card
    const finalDiv = finalDivCreator(allData);
    
    // Append
     const listLocation = document.getElementById('item-read-write');
    listLocation.replaceChildren(finalDiv);

}


function addFruit(e){
    e.preventDefault();
    const nonRetailPrice = document.getElementById('form-add-non-retail-price').value;
    const retailPrice = document.getElementById('form-add-retail-price').value;
    const selectedFruit = document.getElementById("form-add-fruit").value;

    const storageValue = {
        nonRetailP: nonRetailPrice, 
        retailP: retailPrice, 
        fruit: selectedFruit
    }

    const storageValueString = JSON.stringify(storageValue)

    localStorage.setItem(selectedFruit, storageValueString)

    showReadWriteItems();
}
