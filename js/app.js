import {
    products
} from "./products.js";

const wrapper = document.querySelectorAll("#wrapper")
const orderElement = document.querySelector('#order');
const cart = document.querySelector(".cart span")
let totalCart = localStorage.getItem("totalPrice");


//--------------------------Local storage
function loadStorage() {
    if (totalCart == undefined || null) localStorage.setItem("totalPrice", 0)
    totalCart = parseInt(localStorage.getItem("totalPrice"))
    cart.textContent = `🛒 ${totalCart} $`
}

function saveStorage(key, attribute) {
    localStorage.setItem(key, attribute)
}
//--------------------------Add to cart
const addToCart = (element, card) => {
    element.addEventListener("click", () => {
        totalCart += parseInt(card.price)
        saveStorage("totalPrice", totalCart)
        cart.textContent = `🛒 ${totalCart} $`
    })
}
//----------------------------Render
function render(array) {

    wrapper[0].textContent = ""

    array.map((card) => {
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
function orderByPrice(a, b) {
    if (a.price < b.price) {
        return -1;
    }
    if (a.price > b.price) {
        return 1;
    }
    return 0;
}

function orderByScore(a, b) {
    if (a.rating.rate < b.rating.rate) {
        return -1;
    }
    if (a.rating.rate > b.rating.rate) {
        return 1;
    }
    return 0;
}

function order(array) {
    orderElement.addEventListener('change', (e) => {
        if (orderElement.value === "prezzo") array = array.sort(orderByPrice)
        if (orderElement.value === "punteggio") array = array.sort(orderByScore)
        render(products)
    })
}
//------------------------HERO
const heroImg = document.querySelector(".image-hero")


let counter = 1;
const img = ["https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
"https://images.unsplash.com/photo-1529720317453-c8da503f2051?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
]


setInterval(() => {
    heroImg.style.backgroundImage = `url(${img[counter]})`
    counter < img.length -1 ? counter++ : counter = 1
}, 3000);

//------------------------TESTIMONIAL

const testimonialWrap = document.querySelector(".testimonial")
import { dataTestimonial } from "./testimonial.js"
let counter_1 = 1;
let totTestimonial = 3


setInterval(() => {
    
    console.log(counter_1)
    testimonialWrap.innerHTML = 
    `        
    <div class="testimonial-card">
    <span>
    <img src=${dataTestimonial[counter_1].img} alt="">
    </span>
    <p class="testimonal-text">
    <strong>${dataTestimonial[counter_1].name}</strong> <br>
    <span>${dataTestimonial[counter_1].profession}</span>
    </p>
    <div class="stars">⭐⭐⭐⭐⭐</div>
    <p id="testimonial-text">${dataTestimonial[counter_1].description}</p>
    </div>
    `
    const testimonialCart = document.querySelector(".testimonial-card")
    setTimeout(() => {
        testimonialCart.style.animation = "disappear 1s ease";
        testimonialCart.style.left = "-150%";
    }, 4000);
    
    counter_1++
    if (counter_1 === totTestimonial  ) counter_1 = 0
    
}, 5000);
setTimeout(() => {
    const testimonialCart = document.querySelector(".testimonial-card")
    testimonialCart.style.animation = "disappear 1s ease";
    testimonialCart.style.left = "-150%";
}, 4000);

//------------------------MODALE CART
const modale = document.querySelector(".modale-cart")


cart.addEventListener("click", ()=>{
    modale.style.display="block";
    modale.style.height="300px";
    modale.style.padding="20px";
})
modale.addEventListener("mouseleave",()=>{
    modale.style.height="0";
    modale.style.padding="0";
    
    
    
})
//------------------------START

loadStorage()
render(products)
cart.textContent = `🛒 ${totalCart} $`
order(products)