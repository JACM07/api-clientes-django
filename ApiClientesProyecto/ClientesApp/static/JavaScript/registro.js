console.log("Cargando registro de clientes");

function limpiarPantalla(){
    document.getElementById("nombre").value="";
    document.getElementById("correo").value="";
    document.getElementById("telefono").value="";
    document.getElementById("edad").value="";
}

function registrarCliente(){
    const formNombreCliente= document.getElementById("nombre").value;
    const formCorreoCliente=document.getElementById("correo").value;
    const formTelefonoCliente=document.getElementById("telefono").value;
    const formEdadCliente=document.getElementById("edad").value;

    //Validaciones
    if(!formNombreCliente || !formCorreoCliente || !formTelefonoCliente || !formEdadCliente){
        alert("Completa todos los campos requeridos");
        return;
    }

    const apiUrl= "http://127.0.0.1:8000/clientes/";

    //objeto json
    const objetoCliente={
        nombre:formNombreCliente,
        correo:formCorreoCliente,
        numeroTelefono:formTelefonoCliente,
        edad:formEdadCliente
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoCliente)
    };

    //Hacer el POST request
    fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(clienteFromAPI => {
            console.log('Success:', clienteFromAPI);
            alert("Cliente registrado exitosamente");
            limpiarPantalla();
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Hubo un problema al registrar al cliente. Por favor, intenta nuevamente.");
        });
}