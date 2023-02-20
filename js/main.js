//---traer de HTML---
const tiendaSamsung = document.getElementById("tiendaSamsung");
const verCarrito = document.getElementById("verCarrito")
const modalContainer = document.getElementById("modal-container")
const cantidadCarrito = document.getElementById("cantidadCarrito");
const logo = './img/logo.png'
let carrito = JSON.parse (localStorage.getItem("Compra")) || []; // get localstorage


// Mensaje de bienvenida


    // Swal.fire({
    //     title: 'Bienvenido/a ',
    //     imageUrl:'img/logo.png' ,
    //     html:
    //         'Aqui encontraras las mejores ofertas sobre todos nuestros productos SAMSUNG, ',
    //     showCloseButton: true,
    //     focusConfirm: false,
    //     confirmButtonText:
    //     "Ingresar a la tienda",
    //     });


    (async () => {

        const { value: text } = await Swal.fire({
            title: 'Bienvenido/a a nuestra tienda online',
            imageUrl:'img/logo.png' ,
            input: 'text',
            inputLabel: 'Por favor, ingrese su nombre',
            inputPlaceholder: 'ingrese su nombre aqui'
        })
        if (text) {
            Swal.fire(`Bienvenido/a: ${text} ,
            Aqui encontraras las mejores ofertas sobre todos nuestros productos SAMSUNG`)
        }
        })()


//Funcion asincrona y promesas

const getProducts = async () =>{
const response = await fetch ("data.json");
const data = await response.json();
data.forEach((celus)=> {
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

    comprar.addEventListener ("click", apareceCarrito)
    function apareceCarrito (){
        
    Toastify({
        text: "Producto agregado al carrito de compras",
        duration: 3000,
        destination: './pages/pagar.html',
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
        background: "radial-gradient(circle, rgba(68,95,120,0.7455357142857143) 0%, rgba(0,0,0,0.9864320728291317) 100%)",
        },
        onClick: function(){} // Callback after click
        }).showToast();
    }


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
}

getProducts();


//---comienzo localStorage
//set
const saveLocal = () => {
    localStorage.setItem("Compra",JSON.stringify(carrito));
}


