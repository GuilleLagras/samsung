//-----Obtener datos----

const formulario = document.getElementById("form");

const nombre = document.getElementById("firstName");
const apellido = document.getElementById("lastName");
const email = document.getElementById("email");
const monto = document.getElementById("amount");
const cuotas = document.getElementById("fees");


const montoFinal = document.getElementById("finalAmount");
const cuotasFinales = document.getElementById("finalFees");
const intereses = document.getElementById("interests");
const totalADevolver = document.getElementById("totalAmount");
const guardarInfo = document.getElementById("simulate")


//----Financiacion-----

const tasa = 0.24; 

formulario.addEventListener('submit', (e) => {
    e.preventDefault()

    const cuotaPrestamo = obtenerCuotaPrestamo()
    const total = obtenerTotal(cuotaPrestamo)
    pintarPrestamo(total)
});

// Obtener cuota del préstamo

const obtenerCuotaPrestamo = () => {
    const cuotaPrestamo = tasa * monto.value / (1 - (1 + tasa)**-cuotas.value)
    return cuotaPrestamo
};

// Obtenemos el total a devolver

const obtenerTotal = (cuotaPrestamo) => {
    const total = Math.ceil(cuotaPrestamo) * cuotas.value
    return total
};



// Pintar los datos en el DOM

const pintarPrestamo = (total) => {
    montoFinal.innerText = monto.value
    cuotasFinales.innerText = cuotas.value
    intereses.innerText = total - monto.value
    totalADevolver.innerText = total
};


// Guardar la info --> storage y JSON


const presupuestos =[]

guardarInfo.addEventListener('click', () =>{

    const inpunombre = document.getElementById("firstName");
    const inputapellido = document.getElementById("lastName");
    const inputemail = document.getElementById("email");
    const inputmontoFinal = document.getElementById("finalAmount");
    const inputcuotasFinales = document.getElementById("finalFees");
    const inputIntereses = document.getElementById("interests");
    const inputtotalADevolver = document.getElementById("totalAmount");

    const nombre = inpunombre.value
    const apellido = inputapellido.value
    const email = inputemail.value
    const montoFinal= inputmontoFinal.value
    const intereses= inputIntereses.value 
    const totalADevolver= inputtotalADevolver.value
    const cuotasFinales = inputcuotasFinales.value

const arrayPresupuesto ={
    id: presupuestos +1,
    nombre: nombre,
    apellido: apellido,
    email:email,
    presupuestosFinal: montoFinal,
    cuotasFinales :cuotasFinales,
    intereses:intereses,
    totalADevolver:totalADevolver
}

presupuestos.push(arrayPresupuesto)


const presupuestosJSON= JSON.stringify(presupuestos)
localStorage.setItem('presupuestos', presupuestosJSON)
})
console.log (presupuestos)