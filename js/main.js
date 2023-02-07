//---traer de HTML---
const tiendaSamsung = document.getElementById("tiendaSamsung");
const verCarrito = document.getElementById("verCarrito")
const modalContainer = document.getElementById("modal-container")
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse (localStorage.getItem("Compra")) || []; // get localstorage


celulares.forEach((celus)=> {
    let content = document.createElement("div");
    content.className="cards"
    content.innerHTML =`
    <img src ="${celus.img}">
    <h3> ${celus.modelo}</h3>
    <h3> ${celus.camara}</h3>
    <h3> ${celus.memoria}</h3>
    <p class ="price">${celus.precio}$ </p>
    `;
    tiendaSamsung.append(content)

    let comprar = document.createElement("button")
    comprar.innerText= "Agregar al carrito";
    comprar.className="comprar"

    content.append(comprar);

comprar.addEventListener("click", ( )=>{

    const repetir = carrito.some((repetirProduct) => repetirProduct.id === celus.id);

    if(repetir){
        carrito.map((prod) => {
            if(prod.id === celus.id){
                prod.cantidad++;
            }
        });
    }else{
        carrito.push({
            id:celus.id,
            img:celus.img,
            modelo:celus.modelo,
            memoria:celus.memoria,
            camara:celus.camara,
            precio:celus.precio,
            cantidad:celus.cantidad
            });
    }
    carritoCounter();
    saveLocal();
    }); 
});


//---comienzo localStorage
//set
const saveLocal = () => {
    localStorage.setItem("Compra",JSON.stringify(carrito));
}


