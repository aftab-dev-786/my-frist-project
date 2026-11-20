function additem (){

const name = document.getElementById("item-name").value ;
const price = document.getElementById("item-price").value ;


const items = JSON.parse(localStorage.getitem("items")) ||[]


 items.push({
        name: name,
        price: price
    });

    localStorage.setItem("items", JSON.stringify(items));


}