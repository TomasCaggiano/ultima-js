const searchInput = document.getElementById('searchInput');
const resultList = document.getElementById('resultList');

const criptoYa = "https://criptoya.com/api/dolar";

const divDolar = document.getElementById("Blue");

fetch(criptoYa)
    .then(response => response.json())
    .then(({blue})=>{
        divDolar.innerHTML = `
        <h3>El blue esta en:${blue}</h3>
        `
    })
    .catch(error => console.log(error))

// Datos de ejemplo para la búsqueda (pueden provenir de una API)
class Producto{
    constructor(id,nombre, precio, img){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1; 
    }
}

const GPU= new Producto(1,"gpu",30," ");
const MOTHER = new Producto(2,"mother",25," ");

const PRODUCTOS = [GPU, MOTHER]; 
let carrito = [];

console.log(PRODUCTOS)

const CONTENEDOR_PRODUCTOS = document.getElementById("contenedorProductos");

const MOSTRAR_PRODUCTOS = () =>{
    //ITERAMOS SOBRE UN FOREACH
    PRODUCTOS.forEach(producto =>{
        const card = document.createElement("div");
        //propiedades css
        card.classList.add("col-xl-3", "col-md-6","col-sm-12");
        card.innerHTML = 
        `
            <div class="card">
                <img src="${producto.img}" class="card-img-tom imgProducto" />
                <div class="card-body">
                    <h2>${producto.nombre}</h2>
                    <p>valor en USD ${producto.precio}</p>
                    <div id="rating-container">
                        <span onclick="calificar(1)">☆</span>            
                        <span onclick="calificar(2)">☆</span>        
                        <span onclick="calificar(3)">☆</span>
                        <span onclick="calificar(4)">☆</span>
                        <span onclick="calificar(5)">☆</span>
                    </div> 

                    <button class="btn colorBoton" id="boton${producto.id}">agregar Producto</button>
                </div>
            </div>
        `
        CONTENEDOR_PRODUCTOS.appendChild(card);
        
        //AGREGAMOS PRODUCTOS AL CARRITO
            const BOTON = document.getElementById(`boton${producto.id}`)
            BOTON.addEventListener("click", ()=>{
                agregarAlCarrito(producto.id);
    });

    })
}

MOSTRAR_PRODUCTOS();

const agregarAlCarrito = (id) =>{
    const productoEnCarrito = carrito.find(producto => producto.id === id);
    if(productoEnCarrito){
        productoEnCarrito.cantidad++;
    } else{
        const producto = PRODUCTOS.find(producto => producto.id === id)
        carrito.push(producto);
    }

    console.log(carrito);
}

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", ()=>{
    mostrarCarrito();
})

const mostrarCarrito = () =>{

    contenedorCarrito.innerHTML = " ";

    carrito.forEach(producto =>{
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6","col-sm-12");
        card.innerHTML = 
        `
            <div class="card">
                <img src="${producto.img}" class="card-img-tom imgProducto" />
                <div class="card-body">
                    <h2>${producto.nombre}</h2>
                    <p>${producto.precio}</p>
                    <p>${producto.cantidad}</p>
                    <button class="btn colorBoton" id="eliminar${producto.id}">Eliminar Producto</button>
                </div>
            </div>
        `
        contenedorCarrito.appendChild(card);
        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click",()=>{
            eliminarDelCarrito(producto.id)
        })

    })
}

//eliminar el producto

const eliminarDelCarrito = (id) => {
    const producto = carrito.find(producto => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice,1);
    mostrarCarrito();
}

function calificar(estrellas){
    console.log ("se ha seleccionado estrella:",estrellas);
    alert(`gracias por calificar con ${estrellas} estrellas`);
}


const botonModo = document.getElementById("botonModo"); 

botonModo.addEventListener("click", ()=>{
    document.body.classList.toggle("dark");
    if(document.body.classList.contains("dark")){
        localStorage.setItem("modo","dark");
        
    }else{
        localStorage.setItem("modo", "claro");
    }
});

const datos = ['GPU', 'MOTHER'];
// Función para realizar la búsqueda
function buscar() {
  // Obtén el valor del campo de búsqueda
  const searchTerm = searchInput.value.toLowerCase();

  
  // Filtra los datos según el término de búsqueda
  const resultados = datos.filter(item => item.toLowerCase().includes(searchTerm));

  // Muestra los resultados en el DOM
  mostrarResultados(resultados);
}

// Función para mostrar los resultados en el DOM
function mostrarResultados(resultados) {
  // Borra los resultados anteriores
  resultList.innerHTML = '';

  // Crea elementos de lista para cada resultado y añádelos al DOM
  resultados.forEach(resultado => {
    const li = document.createElement('li');
    li.textContent = resultado;
    resultList.appendChild(li);
  });
}

// Escucha eventos de entrada en el campo de búsqueda
searchInput.addEventListener('input', buscar);