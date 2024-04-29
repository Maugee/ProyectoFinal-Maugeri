class Indumentaria{
    constructor(id,nombre,precio,img){
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.img = img
        this.cantidad = 1
    }
}

const remera = new Indumentaria (1,"remera Hombre",22500,"img/remera.avif")
const remeraMujer = new Indumentaria (2,"remera Mujer",22500,"img/remeraMujer.avif")
const pantalonHombre = new Indumentaria (3,"pantalon Hombre",24800,"img/pantalonHombre.avif")
const pantalonMujer = new Indumentaria (4,"pantalon Mujer",24800,"img/pantalonMujer.avif")
const camperaHombre = new Indumentaria (5,"campera Hombre",26200,"img/camperaHombre.avif")
const camperaMujer = new Indumentaria (6,"campera Mujer",26200,"img/camperaMujer.avif")
const shortHombre = new Indumentaria (7,"short Hombre",18400,"img/shortHombre.avif")
const shortMujer = new Indumentaria (8,"short Mujer",18400,"img/shortMujer.avif")
const calzado = new Indumentaria (9,"zapatilas Nike",28000,"img/calzado.avif")
const calzado2 = new Indumentaria (10,"zapatilas Nike",29500,"img/calzado2.avif")
const calzado3 = new Indumentaria (11,"zapatilas Nike",30600,"img/calzado3.avif")
const calzado4 = new Indumentaria (12,"zapatilas Nike",32200,"img/calzado4.avif")

const productosTotal = [remera,remeraMujer,pantalonHombre,pantalonMujer,camperaHombre,camperaMujer,shortHombre,shortMujer,calzado,calzado2,calzado3,calzado4];
const productoIndumentaria = [remera,remeraMujer,pantalonHombre,pantalonMujer,camperaHombre,camperaMujer,shortHombre,shortMujer];
const productoCalzado = [calzado,calzado2,calzado3,calzado4];
const productoHombre = [remera,pantalonHombre,camperaHombre,shortHombre];
const productoMujer = [remeraMujer,pantalonMujer,camperaMujer,shortMujer];

let carrito = [];

if(localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito"))
}

const contenedorProductos = document.getElementById("contenedorProductos")

const mostrarProductos= ()=>{
    productosTotal.forEach(producto=>{
        const card = document.createElement("div")
        card.innerHTML=`
            <div class= "card">
                <img src= "${producto.img}" class="foto">
                <div class="bodyCard">
                    <h4>${producto.nombre}</h4>
                <div class="ver">
                    <p>$${producto.precio}</p>
                    <button id="agregarCarrito${producto.id}"><img src="img/carrito.png"></button>
                </div>
                </div>
            </div>
                    `

            contenedorProductos.appendChild(card)
        
        const botonAgregar = document.getElementById(`agregarCarrito${producto.id}`)
        botonAgregar.addEventListener("click", ()=>{
            agregarAlCarrito(producto.id)
        })
    })
}
mostrarProductos()


const agregarAlCarrito= (id)=>{
    const productoEnCarrito = carrito.find(producto=> producto.id === id)
    if(productoEnCarrito){
        productoEnCarrito.cantidad++
    }
    else{
        const producto = productosTotal.find(producto=> producto.id === id)
        carrito.push(producto)
    }

    localStorage.setItem("carrito", JSON.stringify(carrito))
    calcularTotal()
}

const contenedorCarrito = document.getElementById("contenedorCarrito")
const verCarrito = document.getElementById("verCarrito")

verCarrito.addEventListener("click", ()=>{
    if(carrito.length > 0){
        mostrarCarrito()
    }
    else{
        Swal.fire({
            title: "<strong>Cuidad</strong>",
            icon: "info",
            html: `
                No tienes productos Cargados
            `,
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: `
                <i class="fa fa-thumbs-up"></i> Ingresar Productos
            `
        });
    }
})

const mostrarCarrito = ()=>{
    contenedorCarrito.innerHTML= "";
    carrito.forEach(producto=>{
        const card = document.createElement("div")
        card.innerHTML=`
            <div class="carrito">
                <img src="${producto.img}">
                <div class="bodyCarrito">
                    <h4>${producto.nombre}</h4>
                    <p>$${producto.precio}</p>
                <div class="masMenos">
                    <button id="menos${producto.id}">-</button>
                    <p>${producto.cantidad}</p>
                    <button id="mas${producto.id}">+</button>
                </div>
                    <button class="eliminar" id="eliminarDelCarrito${producto.id}">Eliminar Producto</button>
                </div>
            </div>
                        `
            contenedorCarrito.appendChild(card)

            const botonEliminar = document.getElementById(`eliminarDelCarrito${producto.id}`)
            botonEliminar.addEventListener("click", ()=>{
                eliminarDelCarrito(producto.id)
            })

            const botonMenos = document.getElementById(`menos${producto.id}`)
            botonMenos.addEventListener("click", ()=>{
                const menos = carrito.find(eliminar=> eliminar.id === producto.id)
                if(menos){
                    menos.cantidad--
                    if(menos.cantidad === 0){
                        carrito = carrito.filter(sacar=> sacar.cantidad !== producto.cantidad)
                    }
                }

                localStorage.setItem("carrito", JSON.stringify(carrito))
                mostrarCarrito()
                calcularTotal()
            })

            const botonMas = document.getElementById(`mas${producto.id}`)
            botonMas.addEventListener("click", ()=>{
                const mas = carrito.find(agregar=> agregar.id === producto.id)
                if(mas){
                    mas.cantidad++
                }

                localStorage.setItem("carrito", JSON.stringify(carrito))
                mostrarCarrito()
                calcularTotal()
            })
        })
        calcularTotal()
}



const eliminarDelCarrito= (id)=>{
    const producto = carrito.find(producto=> producto.id === id)
    const indice = carrito.indexOf(producto)
    carrito.splice(indice, 1)
    mostrarCarrito()

    localStorage.setItem("carrito", JSON.stringify(carrito))
}

const vaciarCarrito = document.getElementById("vaciarCarrito")
vaciarCarrito.addEventListener("click", ()=>{
    eliminarTodoElCarrito()
})

const eliminarTodoElCarrito= ()=>{
    carrito = []
    mostrarCarrito()

    localStorage.clear()
}


const total = document.getElementById("total")


const calcularTotal= ()=>{
    let compraTotal = 0
    carrito.forEach(producto=>{
        compraTotal += producto.precio * producto.cantidad
    })
    total.innerHTML=`Total$${compraTotal}`

}


const botonComprar = document.getElementById("comprar")
botonComprar.addEventListener("click", ()=>{
    if(carrito.length > 0){
        comprar()
    Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Gracias Por su Compra",
        showConfirmButton: false,
        timer: 1500
    });
    }
    else{
        Swal.fire({
            icon: "warning",
            title: "El carrito está vacío",
            text: "Agrega productos al carrito antes de comprar",
        })
    }
})

const comprar= ()=>{
    carrito = []
    mostrarCarrito()

    localStorage.clear()
}


const botonIndumentaria = document.getElementById("indumentaria")
botonIndumentaria.addEventListener("click", ()=>{
    contenedorProductos.innerHTML= ""
    productoIndumentaria.forEach(producto=>{
    const card = document.createElement("div")
    card.innerHTML=`
            <div class= "card">
                <img src= "${producto.img}" class="foto">
                <div class="bodyCard">
                    <h4>${producto.nombre}</h4>
                <div class="ver">
                    <p>$${producto.precio}</p>
                    <button id="agregarCarrito${producto.id}"><img src="img/carrito.png"></button>
                </div>
                </div>
            </div>
                    `
        contenedorProductos.appendChild(card)

        const botonAgregar = document.getElementById(`agregarCarrito${producto.id}`)
        botonAgregar.addEventListener("click", ()=>{
            agregarAlCarrito(producto.id)
        })
    })
})


const botonCalzado = document.getElementById("calzado")
botonCalzado.addEventListener("click", ()=>{
    contenedorProductos.innerHTML= ""
    productoCalzado.forEach(producto=>{
    const card = document.createElement("div")
    card.innerHTML=`
            <div class= "card">
                <img src= "${producto.img}" class="foto">
                <div class="bodyCard">
                    <h4>${producto.nombre}</h4>
                <div class="ver">
                    <p>$${producto.precio}</p>
                    <button id="agregarCarrito${producto.id}"><img src="img/carrito.png"></button>
                </div>
                </div>
            </div>
                    `
        contenedorProductos.appendChild(card)

        const botonAgregar = document.getElementById(`agregarCarrito${producto.id}`)
        botonAgregar.addEventListener("click", ()=>{
            agregarAlCarrito(producto.id)
        })
    })
})



const botonMujer = document.getElementById("mujer")
    botonMujer.addEventListener("click", ()=>{
    contenedorProductos.innerHTML= ""
    productoMujer.forEach(producto=>{
    const card = document.createElement("div")
    card.innerHTML=`
            <div class= "card">
                <img src= "${producto.img}" class="foto">
                <div class="bodyCard">
                    <h4>${producto.nombre}</h4>
                <div class="ver">
                    <p>$${producto.precio}</p>
                    <button id="agregarCarrito${producto.id}"><img src="img/carrito.png"></button>
                </div>
                </div>
            </div>
                    `
        contenedorProductos.appendChild(card)

        const botonAgregar = document.getElementById(`agregarCarrito${producto.id}`)
        botonAgregar.addEventListener("click", ()=>{
            agregarAlCarrito(producto.id)
        })
    })
})

const botonHombre = document.getElementById("hombre")
botonHombre.addEventListener("click", ()=>{
    contenedorProductos.innerHTML= ""
    productoHombre.forEach(producto=>{
    const card = document.createElement("div")
    card.innerHTML=`
            <div class= "card">
                <img src= "${producto.img}" class="foto">
                <div class="bodyCard">
                    <h4>${producto.nombre}</h4>
                <div class="ver">
                    <p>$${producto.precio}</p>
                    <button id="agregarCarrito${producto.id}"><img src="img/carrito.png"></button>
                </div>
                </div>
            </div>
                    `
        contenedorProductos.appendChild(card)

        const botonAgregar = document.getElementById(`agregarCarrito${producto.id}`)
        botonAgregar.addEventListener("click", ()=>{
            agregarAlCarrito(producto.id)
        })
    })
})


const botonCambio = document.getElementById("color")
botonCambio.addEventListener("click", ()=>{
    document.body.classList.toggle("cambio")
    if(document.body.classList.contains("blue")){
        localStorage.setItem("modo", "blue")
    }
    else{
        localStorage.setItem("modo", "light")
    }
})

const modo = localStorage.getItem("modo")
if(modo === "blue"){
    document.body.classList.add("blue")
}
else{
    document.body.classList.remove("blue")
}