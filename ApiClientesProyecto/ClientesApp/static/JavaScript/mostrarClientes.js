
const url="http://127.0.0.1:8000/clientes/";

function limpiarFilasTabla() {
    var numeroFilasDeEncabezadoDeTabla = 1;
    var tabla = document.getElementById('tabla-clientes');
    var cuentaFilas = tabla.rows.length;
    for (var i = numeroFilasDeEncabezadoDeTabla; i < cuentaFilas; i++) {
        tabla.deleteRow(numeroFilasDeEncabezadoDeTabla);
    }
}

async function llenarTabla(url){
    limpiarFilasTabla();

    try{
        const respuesta = await fetch(url);
        if(!respuesta.ok){
            throw new Error("Respuesta de red no fue ok");
        }
        const clientesDesdeBD = await respuesta.json();
        const tableBody = document.querySelector("#tabla-clientes tbody");
        clientesDesdeBD.clientes.forEach(cliente => {
            const row = document.createElement("tr");

            let idNumber = cliente.idCliente;
            row.innerHTML = `
                    <td class="id">${idNumber}</td>
                    <td contenteditable="false">${cliente.nombre}</td>
                    <td contenteditable="false">${cliente.correo}</td>
                    <td contenteditable="false">${cliente.numeroTelefono}</td>
                    <td contenteditable="false">${cliente.edad}</td> 
                    
                    <td><button type="button" class="btn btn-info btn-sm" id="${idNumber}" onclick="editarCliente(id)">Editar</button>
                    <button type="button" class="btn btn-danger btn-sm" id="${idNumber}" onclick="botonEliminarCliente(id)">Eliminar</button></td> 
                `;
            row.setAttribute("id", idNumber);
            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error('Hubo un problema ', error);
        alert('No se pudieron cargar los clientes registrados. Intenta nuevamente más tarde.');
    }
    document.getElementById("cliente-buscar").value="";
}

//llamada de la función para llenar la tabla
document.addEventListener("DOMContentLoaded", () => llenarTabla(url));


function editarCliente(idboton){
    //id de la fila
    let row = document.getElementById(idboton);

    //campos a editar
    //id no se edita
    let nombre = row.children.item(1);
    let correo = row.children.item(2);
    let numeroTelefono = row.children.item(3);
    let edad = row.children.item(4);
    
    nombre.setAttribute("contenteditable","true");
    correo.setAttribute("contenteditable","true");
    numeroTelefono.setAttribute("contenteditable","true");
    edad.setAttribute("contenteditable","true");

    //poner el cursor sobre la celda 1
    nombre.focus();
    nombre.style.caretColor="black";//para ver el cursor
    correo.style.caretColor="black";
    numeroTelefono.style.caretColor="black";
    edad.style.caretColor="black";
    
    //cambiar el texto y color del boton de editar por guardar
    let botonEditar = row.children.item(5).children.item(0);
    botonEditar.setAttribute("class","btn btn-success");
    botonEditar.innerHTML = "Guardar";

    //mandar llamar al metodo guardarCliente(con los datos de la fila)
    botonEditar.setAttribute("onClick", `guardarCliente(${idboton})`);
}

function guardarCliente(idBoton){
    let row = document.getElementById(idBoton);

    let varId = row.children.item(0);
    let varNombre = row.children.item(1);
    let varCorreo = row.children.item(2);
    let varNumeroTelefono= row.children.item(3);
    let varEdad = row.children.item(4);
    

    //Validaciones
    if (!varNombre.innerText.trim()) {
        alert("El nombre no puede estar vacío.");
        return;
    }

    if (varCorreo.innerText.trim() === "") {
        alert("El correo no puede estar vacío.");
        return;
    }

    if (!/^\d{10}$/.test(varNumeroTelefono.innerHTML.trim())) {
        alert("El número de teléfono debe contener exactamente 10 dígitos.");
        return;
    }

    if (!/^\d+$/.test(varEdad.innerHTML.trim()) || varEdad.innerHTML <= 0 || varEdad.innerHTML > 120) {
        alert("Por favor ingresa una edad válida entre 1 y 120.");
        return;
    }

    
    //objeto que se editó
    const clienteActualizado={
        nombre : varNombre.innerHTML,
        correo : varCorreo.innerHTML,
        numeroTelefono : varNumeroTelefono.innerHTML,
        edad : varEdad.innerHTML,
        
    };

    const apiUrl=`http://127.0.0.1:8000/clientes/${varId.innerHTML}/`; 

    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(clienteActualizado)
    };

    fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(clienteFromAPI => {
            console.log('Success:', clienteFromAPI);
            llenarTabla(url)
            alert("Cliente editado correctamente");
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function encontrarCliente(idInput) {
    limpiarFilasTabla();
    const id = document.getElementById(idInput).value;
    
    const urlCliente = `http://127.0.0.1:8000/clientes/${id}/`;

    fetch(urlCliente)
        .then(response => {
            if (!response.ok) {
                throw new Error("Cliente no encontrado.");
            }
            return response.json();
        })
        .then(cliente => {
            const tableBody = document.querySelector("#tabla-clientes tbody");

            const row = document.createElement("tr");
            const idNumber = cliente.idCliente;

            row.innerHTML = `
                <td class="id">${idNumber}</td>
                <td contenteditable="false">${cliente.nombre}</td>
                <td contenteditable="false">${cliente.correo}</td>
                <td contenteditable="false">${cliente.numeroTelefono}</td>
                <td contenteditable="false">${cliente.edad}</td> 
                <td>
                    <button type="button" class="btn btn-info btn-sm" onclick="editarCliente(${idNumber})">Editar</button>
                    <button type="button" class="btn btn-danger btn-sm" onclick="botonEliminarCliente(${idNumber})">Eliminar</button>
                </td>
            `;
            row.setAttribute("id", idNumber);
            tableBody.appendChild(row);
        })
        .catch(error => {
            console.error(error);
            alert("No se encontró el cliente con el ID "+id);
        });
}


function botonEliminarCliente(id) {
    if (confirm("Estas seguro de eliminar al cliente con el id: "+id)) {
        eliminarCliente(id);
        alert("Cliente eliminado correctamente");
    } else {
        alert("No se ha eliminado el cliente");
    }
}

function eliminarCliente(id){
    const urlEliminar=`http://127.0.0.1:8000/clientes/${id}/`;
        fetch(urlEliminar, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },

    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response;
        })
        .then(data => {
            console.log('OK', data);
            llenarTabla(url);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}
