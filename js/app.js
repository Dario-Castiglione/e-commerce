import {products} from "./products.js";

const wrapper = document.querySelectorAll("#wrapper")
const orderElement = document.querySelector('#order');
const cart = document.querySelector(".cart span")
let totalCart = localStorage.getItem("totalPrice");


//--------------------------Local storage
function loadStorage(){
    if (totalCart == undefined || null) localStorage.setItem("totalPrice", 0)
    totalCart = parseInt(localStorage.getItem("totalPrice"))
    cart.textContent = `🛒 ${totalCart} $`
}
function saveStorage(key, attribute){
    localStorage.setItem(key, attribute)
}
//--------------------------Add to cart
const addToCart = (element,card) => {
    element.addEventListener("click", () => {
    totalCart += parseInt(card.price)
    saveStorage("totalPrice",totalCart)
    cart.textContent = `🛒 ${totalCart} $`     
})}
//----------------------------Render
function render(array){

    wrapper[0].textContent= ""
    
    array.map( (card) => {
     const element = document.createElement("div");
     const imgElement = document.createElement("img");
     const imgFirstP = document.createElement("p");
     const imgSecondP = document.createElement("p");
     imgElement.src = card.image;
     imgElement.alt = card.title;
     imgElement.title = card.category;
     imgFirstP.textContent = card.title;
     imgSecondP.textContent = `${card.price} $`;
     element.className = "card";
     imgSecondP.setAttribute("id", "price")
     element.setAttribute("identify", card.id)
     element.appendChild(imgElement)
     element.appendChild(imgFirstP)
     element.appendChild(imgSecondP)
     wrapper[0].appendChild(element)
     addToCart(element, card)
     
   })
}
//------------------------------order
function orderByPrice(a, b){
    if ( a.price < b.price ){
        return -1;
      }
      if ( a.price > b.price ){
        return 1;
      }
      return 0;}

function orderByScore(a, b){
    if ( a.rating.rate < b.rating.rate ){
        return -1;
      }
      if ( a.rating.rate > b.rating.rate ){
        return 1;
      }
      return 0;}

function order(array){
    orderElement.addEventListener('change', (e) => {
        if (orderElement.value === "prezzo" ) array = array.sort(orderByPrice) 
        if (orderElement.value === "punteggio" ) array = array.sort(orderByScore)
        render(products)
    })}
//------------------------START


document.addEventListener("DOMContentLoaded", ()=>{
loadStorage()
render(products)
cart.textContent = `🛒 ${totalCart} $`
order(products)

})
