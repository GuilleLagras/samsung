    const pintarCarrito= ()=> {
    modalContainer.innerHTML="";
    modalContainer.style.display="flex"
    
    const modalHeader = document.createElement("div");
    modalHeader.className= "modal-header"
    modalHeader.innerHTML=`
    <h1 class"moda-header.title">SAMSUNG</h1>
    `;
    modalContainer.append (modalHeader);

    const modalbutton= document.createElement("h1");
    modalbutton.innerText=" ⬅️ Volver a la tienda";
    modalbutton.className="modal-header-button";

    modalbutton.addEventListener("click", ()=> {
        modalContainer.style.display="none";
    })

    modalHeader.append(modalbutton);

    //-----Carrito impreso----

    carrito.forEach((product) => {
        let carritoContent = document.createElement("div");
        carritoContent.className= "modal-content";
        carritoContent.innerHTML= `
        <img src="${product.img}">
        <h3>Modelo ${product.modelo}</h3>
        <p>Memoria ${product.memoria}</p>
        <p>Camara ${product.camara}</p>
        <p>Precio $ ${product.precio} </p>
        <span class ="restar"> ➖ </span>
        <span class ="sumar"> ➕ </span>
        <p> Cantidad ${product.cantidad} </p>
        <p> Total ${product.cantidad * product.precio} </p>
    `;
    modalContainer.append(carritoContent);

    //--- sumar productos al carrito---

    let restar = carritoContent.querySelector(".restar")



restar.addEventListener ("click", seguroRestar)
    function seguroRestar (){
        Swal.fire({
            title: 'Seguro q desea quitar este producto?',
            text: "Si lo borras , no podras volver atras",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, quitar del carrito!'
            }).then((result) => {
            if (result.isConfirmed && product.cantidad!==1 && product.cantidad--)  {
            Swal.fire(
                'Listo!', 'Este producto se quito de tu carrito.', 'success'
            )
            }
            saveLocal();
            pintarCarrito();
            })
    }

    let sumar = carritoContent.querySelector(".sumar")

    sumar.addEventListener ("click", () =>{
            product.cantidad++;
            saveLocal();
            pintarCarrito();
    });

    //---Eliminar celulares---



    let eliminar=document.createElement("span");

    eliminar.innerHTML="❌"
    eliminar.className="delete-product"
    carritoContent.append(eliminar);
    eliminar.addEventListener ("click", eliminarProducto)
    });
    
    // ------Total compra----
    
    const total= carrito.reduce((acc,el) => acc +el.precio* el.cantidad,0);

    const totalCompra = document.createElement("div")
    totalCompra.className= "total-content"
    totalCompra.innerHTML = `Total a pagar : ${total}$`;
    modalContainer.append(totalCompra);
    modalContainer.append(irApagar)
    };
    
    verCarrito.addEventListener("click" , pintarCarrito);
    const eliminarProducto=()=> {
    const foundId =carrito.find((element) => element.id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    })
    carritoCounter();//resta productos del numero del carrito
    saveLocal();
    pintarCarrito();
};
//---Numero en el carrito ---

const carritoCounter = () => {
    cantidadCarrito.style.display= "block";

    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength))

    cantidadCarrito.innerText= JSON.parse(localStorage.getItem("carritoLength"))
};
carritoCounter();


//----- ir a pagar---
const irApagar =  document.createElement("span")
irApagar.className="irApagar"
irApagar.innerHTML =`
<a href="pages/pagar.html" target="_blank">Ir a Pagar</a>
`
