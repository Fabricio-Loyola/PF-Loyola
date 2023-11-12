let carritoVisible = false;


// Array de productos
const productos = [
    { titulo: "Ryzen 5 5500g", precio: 15000, imagenSrc: "./img/pexels-sebastiaan-stam-1097456.jpg" },
    { titulo: "Auriculares Gaming rosa", precio: 25000, imagenSrc: "./img/descarga.jpg" },
    { titulo: "Auriculares Gaming", precio: 35000, imagenSrc: "./img/1420-razer-blackshark-v2-x-auriculares-gaming-71-multiplataforma.webp" },
    { titulo: "Playstation 5", precio: 18000, imagenSrc: "./img/ps5.png" },
    { titulo: "Mouse gamer gx", precio: 32000, imagenSrc: "./img/mause-gamer-gx.jpg" },
    { titulo: "Iphone 14 256gb", precio: 18000, imagenSrc: "./img/iPhone_14_Midnight_PDP_Image_Position-1A_LAES.jpg" },
    { titulo: "Gabinete ATX", precio: 54000, imagenSrc: "./img/gabinete_ATX.jpg" },
    { titulo: "Monitor ASUS", precio: 32000, imagenSrc: "./img/monitor.png" },
    { titulo: "RTX 3090", precio: 42800, imagenSrc: "./img/81-GWj0nEkL._AC_SL1500_.jpg" },
];


function fetchData() {
    return fetch('productos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo cargar el archivo JSON.');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    fetchData().then(data => {
        productos = data;
        mostrarProductosEnDOM();
    });

    // Agregamos funcionalidad al botón pagar
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked);

    
}

function mostrarProductosEnDOM() {
    const contenedorItems = document.querySelector('.contenedor-items');
    productos.forEach((producto, index) => {
        const item = document.createElement('div');
        item.className = 'item';
        item.innerHTML = `
            <img src="${producto.imagenSrc}" width="100" alt="${producto.titulo}">
            <h3>${producto.titulo}</h3>
            <p>Precio: $${producto.precio.toFixed(2)}</p>
            <button class="boton-item">Agregar al carrito</button>
        `;
        const agregarAlCarritoButton = item.querySelector('.boton-item');
        agregarAlCarritoButton.addEventListener('click', () => agregarAlCarritoClicked(index));
        contenedorItems.appendChild(item);
    });
}

function ready() {
    fetchData().then(data => {

        console.log(data);

    });

    // Agregamos funcionalidad a los botones eliminar del carrito
    const botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for (let i = 0; i < botonesEliminarItem.length; i++) {
        const button = botonesEliminarItem[i];
        button.addEventListener('click', eliminarItemCarrito);
    }

    // Agrego funcionalidad al botón sumar cantidad
    const botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for (let i = 0; i < botonesSumarCantidad.length; i++) {
        const button = botonesSumarCantidad[i];
        button.addEventListener('click', sumarCantidad);
    }

    // Agrego funcionalidad al botón restar cantidad
    const botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for (let i = 0; i < botonesRestarCantidad.length; i++) {
        const button = botonesRestarCantidad[i];
        button.addEventListener('click', restarCantidad);
    }

    // Agregamos funcionalidad al botón Agregar al carrito
    const botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for (let i = 0; i < botonesAgregarAlCarrito.length; i++) {
        const button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }

    // Agregamos funcionalidad al botón comprar
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked);


    
}

// Eliminamos todos los elementos del carrito y lo ocultamos
function pagarClicked() {
    Swal.fire({
        title: 'Gracias por su compra',
        text: 'Su compra ha sido procesada con éxito.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    }).then(() => {

        const carritoItems = document.getElementsByClassName('carrito-items')[0];
        while (carritoItems.hasChildNodes()) {
            carritoItems.removeChild(carritoItems.firstChild);
        }
        actualizarTotalCarrito();
        ocultarCarrito();
    });
}


function fetchData() {
    return fetch('productos.json') 
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo cargar el archivo JSON.');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}




// Función que controla el botón clickeado de agregar al carrito
function agregarAlCarritoClicked(event) {
    const button = event.target;
    const item = button.parentElement;
    const itemIndex = Array.from(item.parentElement.children).indexOf(item);

    // Puedes utilizar un operador ternario para verificar si se encontró el producto en el array y luego llamar a las funciones correspondientes.
    (itemIndex >= 0) ? agregarItemAlCarrito(productos[itemIndex].titulo, productos[itemIndex].precio, productos[itemIndex].imagenSrc) : null;
    
    hacerVisibleCarrito();
}


// Función que hace visible el carrito
function hacerVisibleCarrito() {
    carritoVisible = true;
    const carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    const items = document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
}

function agregarItemAlCarrito(titulo, precio, imagenSrc) {
    const itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    // Utilizamos el operador ternario para verificar si el título ya existe en el carrito
    const itemExistente = Array.from(itemsCarrito.getElementsByClassName('carrito-item-titulo')).find((element) => element.innerText === titulo);

    if (!itemExistente) {
        const item = document.createElement('div');
        item.classList.add('item');

        const itemCarritoContenido = `
            <div class="carrito-item">
                <img src="${imagenSrc}" width="80px" alt="">
                <div class="carrito-item-detalles">
                    <span class="carrito-item-titulo">${titulo}</span>
                    <div class="selector-cantidad">
                        <i class="fa-solid fa-minus restar-cantidad"></i>
                        <input type="text" value="1" class="carrito-item-cantidad" disabled>
                        <i class="fa-solid fa-plus sumar-cantidad"></i>
                    </div>
                    <span class="carrito-item-precio">${precio}</span>
                </div>
                <button class="btn-eliminar">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
        item.innerHTML = itemCarritoContenido;
        itemsCarrito.append(item);

        // Agregamos la funcionalidad eliminar al nuevo item
        item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

        // Agregamos la funcionalidad restar cantidad del nuevo item
        item.getElementsByClassName('fa-minus')[0].addEventListener('click', restarCantidad);

        // Agregamos la funcionalidad sumar cantidad del nuevo item
        item.getElementsByClassName('fa-plus')[0].addEventListener('click', sumarCantidad);
    }

    // Actualizamos el total
    actualizarTotalCarrito();
}




// Aumento en uno la cantidad del elemento seleccionado
function sumarCantidad(event) {
    const buttonClicked = event.target;
    const selector = buttonClicked.parentElement;
    let cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
}

// Resto en uno la cantidad del elemento seleccionado
function restarCantidad(event) {
    const buttonClicked = event.target;
    const selector = buttonClicked.parentElement;
    let cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;
    if (cantidadActual >= 1) {
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
}

// Elimino el item seleccionado del carrito
function eliminarItemCarrito(event) {
    const buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    // Actualizamos el total del carrito
    actualizarTotalCarrito();

    // La siguiente función controla si hay elementos en el carrito
    // Si no hay, elimino el carrito
    ocultarCarrito();
}

// Función que controla si hay elementos en el carrito. Si no hay, oculto el carrito.
function ocultarCarrito() {
    const carritoItems = document.getElementsByClassName('carrito-items')[0];
    if (carritoItems.childElementCount == 0) {
        const carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;

        const items = document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}

// Actualizamos el total de Carrito
function actualizarTotalCarrito() {
    // Seleccionamos el contenedor carrito
    const carritoContenedor = document.getElementsByClassName('carrito')[0];
    const carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    let total = 0;
    // Recorremos cada elemento del carrito para actualizar el total
    for (let i = 0; i < carritoItems.length; i++) {
        const item = carritoItems[i];
        const precioElemento = item.getElementsByClassName('carrito-item-precio')[0];

        const precio = parseFloat(precioElemento.innerText.replace('$', '').replace('.', ''));
        const cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        const cantidad = cantidadItem.value;
        total = total + (precio * cantidad);
    }
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toLocaleString("es") + ",00";
}

const inputNombre = document.querySelector("#inputNombre")
const inputEmail = document.querySelector("#inputEmail")
const inputContraseña = document.querySelector("#inputContraseña")
const boton = document.getElementById("boton")


function guardarFormulario(){
    localStorage.setItem("nombre", inputNombre.value)
    localStorage.setItem("correo electronico", inputEmail.value)
    localStorage.setItem("contraseña", inputContraseña.value)
}


boton.addEventListener("click", guardarFormulario)