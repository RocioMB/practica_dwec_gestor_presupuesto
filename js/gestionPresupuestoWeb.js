import * as gp from './gestionPresupuesto.js';

function mostrarDatoEnId(idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    elemento.textContent = valor;
    console.log(valor);
}

function mostrarGastoWeb(idElemento, gasto) {
    let elemento = document.getElementById(idElemento);
    let fechaGasto = new Date(gasto.fecha).toLocaleString();

    let divEtiquetas = document.createElement("div");
    divEtiquetas.classList.add("gasto-etiquetas");

    for (let etiqueta of gasto.etiquetas) {

        let spanEtiqueta = document.createElement("span");
        spanEtiqueta.classList.add("gasto-etiquetas-etiqueta");
        spanEtiqueta.innerText = etiqueta;
        divEtiquetas.appendChild(spanEtiqueta);

        let manejadorBorrarEtiquetas = new BorrarEtiquetasHandle();
        manejadorBorrarEtiquetas.gasto = gasto;
        manejadorBorrarEtiquetas.etiqueta = etiqueta;

        spanEtiqueta.addEventListener("click", manejadorBorrarEtiquetas);
    }

    let nodoDiv = document.createElement("div");
    nodoDiv.classList.add("gasto");

    let divGastoDescripcion = document.createElement("div");
    divGastoDescripcion.classList.add("gasto-descripcion");
    divGastoDescripcion.innerText = gasto.descripcion;

    let divGastoFecha = document.createElement("div");
    divGastoFecha.classList.add("gasto-fecha");
    divGastoFecha.innerText = fechaGasto;

    let divGastoValor = document.createElement("div");
    divGastoValor.classList.add("gasto-valor");
    divGastoValor.innerText = gasto.valor;

    nodoDiv.appendChild(divGastoDescripcion);
    nodoDiv.appendChild(divGastoFecha);
    nodoDiv.appendChild(divGastoValor);
    nodoDiv.appendChild(divEtiquetas);

    // Botón Editar Gasto
    let botonEditar = document.createElement("button");
    botonEditar.innerText = "Editar";
    botonEditar.setAttribute("type", "button");
    botonEditar.classList.add("gasto-editar");

    let manejadorEditarGasto = new EditarHandle();
    manejadorEditarGasto.gasto = gasto;

    botonEditar.addEventListener("click", manejadorEditarGasto);

    // Boton Borrar Gasto
    let botonBorrar = document.createElement("button");
    botonBorrar.innerText = "Borrar";
    botonBorrar.setAttribute("type", "button");
    botonBorrar.classList.add("gasto-borrar");

    let manejadorBorrarGasto = new BorrarHandle();
    manejadorBorrarGasto.gasto = gasto;

    botonBorrar.addEventListener("click", manejadorBorrarGasto);

    // Boton Borrar Gasto Api
    let botonBorrarApi = document.createElement("button");
    botonBorrarApi.innerText = "Borrar (API)";
    botonBorrarApi.setAttribute("type", "button");
    botonBorrarApi.classList.add("gasto-borrar-api");

    let manejadorBorrarGastoApi = new BorrarHandleApi();
    manejadorBorrarGastoApi.gasto = gasto;

    botonBorrarApi.addEventListener("click", manejadorBorrarGastoApi);

    // Boton Editar Gasto-Formulario
    let botonEditarGastoFormulario = document.createElement("button");
    botonEditarGastoFormulario.innerText = "Editar (formulario)";
    botonEditarGastoFormulario.setAttribute("type", "button");
    botonEditarGastoFormulario.classList.add("gasto-editar-formulario");

    let manejadorEditarGastoFormulario = new EditarHandleFormulario();
    manejadorEditarGastoFormulario.gasto = gasto;
    manejadorEditarGastoFormulario.nodoDiv = nodoDiv;
    manejadorEditarGastoFormulario.botonEditarGastoFormulario = botonEditarGastoFormulario;

    botonEditarGastoFormulario.addEventListener("click", manejadorEditarGastoFormulario);

    // Se añaden botones y div gasto al DOM
    nodoDiv.appendChild(botonEditar);
    nodoDiv.appendChild(botonBorrar);
    nodoDiv.appendChild(botonBorrarApi);
    nodoDiv.appendChild(botonEditarGastoFormulario);
    elemento.appendChild(nodoDiv);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    let elemento = document.getElementById(idElemento);
    let divAgrupacionDato = "";
    for (const [clave, valor] of Object.entries(agrup)) {
        divAgrupacionDato += '<div class="agrupacion-dato">' +
            '<span class="agrupacion-dato-clave"> ' + clave + '</span>' +
            '<span class="agrupacion-dato-valor"> ' + valor + '</span>' +
            '</div>';
    }
    elemento.innerHTML = '<div class="agrupacion"><h1>Gastos agrupados por ' + periodo + '</h1>' + divAgrupacionDato + '</div >';
}

function repintar() {
    mostrarDatoEnId("presupuesto", gp.mostrarPresupuesto());

    mostrarDatoEnId("gastos-totales", gp.calcularTotalGastos());

    mostrarDatoEnId("balance-total", gp.calcularBalance());

    let divListado = document.getElementById("listado-gastos-completo");
    divListado.innerHTML = "";

    for (let gasto of gp.listarGastos()) {
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }
}

function actualizarPresupuestoWeb() {
    let presupuestoIntroducido = prompt('Introduzca presupuesto:', '');
    presupuestoIntroducido = parseFloat(presupuestoIntroducido);

    gp.actualizarPresupuesto(presupuestoIntroducido);

    repintar();
}

let botonActualizarPresupuesto = document.getElementById("actualizarpresupuesto");
botonActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb);

function nuevoGastoWeb() {
    let descripcion = prompt('Introduzca una descripción:', '');
    let valor = prompt('Introduzca un valor:', '');
    valor = parseFloat(valor);
    let fecha = prompt('Introduzca una fecha', '');
    let etiquetas = prompt('Introduzca etiquetas:', '');
    etiquetas = etiquetas.split(',');

    let gasto = new gp.CrearGasto(descripcion, valor, fecha, etiquetas);

    gp.anyadirGasto(gasto);

    repintar();
}

let botonAnyadirGasto = document.getElementById("anyadirgasto");
botonAnyadirGasto.addEventListener("click", nuevoGastoWeb);

function EditarHandle() {
    this.handleEvent = function (evento) {
        // Evitamos que se ejecute la acción del botón, si botón fuera tipo submit
        evento.preventDefault();
        let descripcion = prompt('Introduzca una descripción:', this.gasto.descripcion);
        let valor = prompt('Introduzca un valor:', this.gasto.valor);
        valor = parseFloat(valor);
        let fecha = prompt('Introduzca una fecha', this.gasto.fecha);
        // El valor por defecto(parametro 2) del prompt debe ser un string (convertimos de array a string con join)
        let etiquetas = prompt('Introduzca etiquetas:', this.gasto.etiquetas.join(','));
        etiquetas = etiquetas.split(',');

        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);
        this.gasto.etiquetas = [];
        this.gasto.anyadirEtiquetas(etiquetas);

        repintar();
    }
}

function BorrarHandle() {
    this.handleEvent = function (evento) {
        evento.preventDefault();
        gp.borrarGasto(this.gasto.id);

        repintar();
    }
}

function BorrarEtiquetasHandle() {
    this.handleEvent = function (evento) {
        evento.preventDefault();
        this.gasto.borrarEtiquetas(this.etiqueta);

        repintar();
    }
}

function nuevoGastoWebFormulario() {
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    let contenedorFormulario = document.getElementById("controlesprincipales");
    contenedorFormulario.append(plantillaFormulario);

    botonAnyadirGastoFormulario.setAttribute("disabled", true);

    var formulario = contenedorFormulario.querySelector("form");

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        let formularioAnyadirGasto = evento.currentTarget;
        let descripcion = formularioAnyadirGasto.elements.descripcion.value;
        let valor = formularioAnyadirGasto.elements.valor.value;
        valor = parseFloat(valor);
        let fecha = formularioAnyadirGasto.elements.fecha.value; //Esto es un string ¿cambiar a timestamp?
        let etiquetas = formularioAnyadirGasto.elements.etiquetas.value;
        etiquetas = etiquetas.split(',');

        let gasto = new gp.CrearGasto(descripcion, valor, fecha, ...etiquetas);

        gp.anyadirGasto(gasto);

        repintar();

        botonAnyadirGastoFormulario.removeAttribute("disabled");
    });

    function CancelarHandle() {
        this.handleEvent = function (evento) {
            this.formulario.remove();
            botonAnyadirGastoFormulario.removeAttribute("disabled");
        }
    }

    let manejadorCancelarFormulario = new CancelarHandle();
    manejadorCancelarFormulario.formulario = formulario;

    let botonCancelar = formulario.querySelector("button.cancelar");
    botonCancelar.addEventListener("click", manejadorCancelarFormulario);

    // Boton .gasto-enviar-api
    function enviarGastoApi() {
        let usuario = document.getElementById("nombre_usuario").value;

        // Construimos un objeto FormData que contiene los valores del formulario
        let formularioDatos = new FormData(formulario);
        // Accedemos a los valores del formulario mediante el método get de FormData
        // y construimos un objeto gasto
        let gasto = new gp.CrearGasto(
            formularioDatos.get('descripcion'),
            formularioDatos.get('valor'),
            formularioDatos.get('fecha'),
            formularioDatos.get('etiquetas')
        );
        console.log(gasto);

        fetch(`https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(gasto)
            })
            .then(function (respuesta) {
                if (respuesta.ok) {
                    console.log("Gasto añadido con éxito");
                    respuesta.json();
                    cargarGastosApi();
                } else {
                    throw ("Ha habido un error");
                }
            })
            .catch(function (error) {
                console.log(`Error: ${error.message}`);
            })

    }

    let botonGastoEnviarApi = formulario.querySelector("button.gasto-enviar-api");
    botonGastoEnviarApi.addEventListener("click", enviarGastoApi);

}

let botonAnyadirGastoFormulario = document.getElementById("anyadirgasto-formulario");
botonAnyadirGastoFormulario.addEventListener("click", nuevoGastoWebFormulario);

function EditarHandleFormulario() {
    this.handleEvent = function (evento) {
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        this.nodoDiv.appendChild(plantillaFormulario);

        this.botonEditarGastoFormulario.setAttribute("disabled", true);

        var formulario = this.nodoDiv.querySelector("form");

        // Se le da valores (el valor del gasto actual) a los inputs del formulario
        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = parseFloat(this.gasto.valor);
        let fecha = new Date(this.gasto.fecha).toISOString();
        fecha = fecha.split('T');
        formulario.elements.fecha.value = fecha[0];
        formulario.elements.etiquetas.value = this.gasto.etiquetas;

        // Funcion constructora boton Enviar
        function EnviarHandle() {
            this.handleEvent = function (evento) {
                evento.preventDefault();

                // Se accede al formulario (el elemento sobre el que sucede el addEventListener)
                formulario = evento.currentTarget;

                // A cada propiedad de gasto, se le da el valor que se ha modificado de los inputs
                let descripcion = formulario.elements.descripcion.value;
                let valor = parseFloat(formulario.elements.valor.value);
                let fecha = formulario.elements.fecha.value;
                let etiquetas = formulario.elements.etiquetas.value;
                etiquetas = etiquetas.split(',');

                this.gasto.actualizarDescripcion(descripcion);
                this.gasto.actualizarValor(valor);
                this.gasto.actualizarFecha(fecha);
                this.gasto.etiquetas = [];
                this.gasto.anyadirEtiquetas(...etiquetas);

                repintar();
            }
        }

        let manejadorEnviarHandleFormulario = new EnviarHandle();
        manejadorEnviarHandleFormulario.gasto = this.gasto;

        formulario.addEventListener('submit', manejadorEnviarHandleFormulario)

        // Funcion constructora boton Cancelar
        function CancelarHandle() {
            this.handleEvent = function (evento) {
                this.formulario.remove();
                this.botonEditarGastoFormulario.removeAttribute("disabled");
            }
        }

        let manejadorCancelarFormulario = new CancelarHandle();
        manejadorCancelarFormulario.formulario = formulario;
        manejadorCancelarFormulario.botonEditarGastoFormulario = this.botonEditarGastoFormulario;

        let botonCancelar = formulario.querySelector("button.cancelar");
        botonCancelar.addEventListener("click", manejadorCancelarFormulario);

    }
}

function filtrarGastosWeb(evento) {
    evento.preventDefault();

    // Se recogen los datos del formulario
    let inputDescripcion = document.getElementById("formulario-filtrado-descripcion");
    let descripcionContiene = inputDescripcion.value;

    let inputValorMin = document.getElementById("formulario-filtrado-valor-minimo");
    let valorMinimo = inputValorMin.value;
    valorMinimo = parseFloat(valorMinimo);

    let inputValorMax = document.getElementById("formulario-filtrado-valor-maximo");
    let valorMaximo = inputValorMax.value;
    valorMaximo = parseFloat(valorMaximo);

    let inputFechaDesde = document.getElementById("formulario-filtrado-fecha-desde");
    let fechaDesde = inputFechaDesde.value;

    let inputFechaHasta = document.getElementById("formulario-filtrado-fecha-hasta");
    let fechaHasta = inputFechaHasta.value;

    let inputEtiquetas = document.getElementById("formulario-filtrado-etiquetas-tiene");
    let etiquetasTiene = inputEtiquetas.value;
    // Si tiene datos se llama a la función transformarListadoEtiquetas
    if (etiquetasTiene.length > 0) {
        etiquetasTiene = gp.transformarListadoEtiquetas(etiquetasTiene);
    }
    // Si no, se devuelve array vacío
    else {
        etiquetasTiene = [];
    }

    // Se crea objeto filtro y se pasa a filtrarGastos
    let filtro = {};

    if (descripcionContiene.length > 0) {
        filtro.descripcionContiene = descripcionContiene;
    }
    if (!isNaN(valorMinimo)) {
        filtro.valorMinimo = valorMinimo;
    }
    if (!isNaN(valorMaximo)) {
        filtro.valorMaximo = valorMaximo;
    }
    if (fechaDesde.length > 0) {
        filtro.fechaDesde = fechaDesde;
    }
    if (fechaHasta.length > 0) {
        filtro.fechaHasta = fechaHasta;
    }
    if (etiquetasTiene.length > 0) {
        filtro.etiquetasTiene = etiquetasTiene;
    }

    let gastosFiltrados = gp.filtrarGastos(filtro);

    // Se borra el listado de gastos primero, y luego se actualiza.
    let listadoGastos = document.getElementById('listado-gastos-completo');
    listadoGastos.innerHTML = '';
    for (let gasto of gastosFiltrados) {
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }
}

let formularioFiltrado = document.getElementById("formulario-filtrado");
formularioFiltrado.addEventListener("submit", filtrarGastosWeb);

function guardarGastosWeb() {
    // Se pasa a string el listado de gastos
    let gastosAlmacenamiento = JSON.stringify(gp.listarGastos());
    // Y se guarda en la clave GestorGastosDWEC
    localStorage.setItem("GestorGastosDWEC", gastosAlmacenamiento);
}

let botonGuardarGastos = document.getElementById("guardar-gastos");
botonGuardarGastos.addEventListener("click", guardarGastosWeb);

function cargarGastosWeb() {
    // Se recupera el valor almacenado
    let gastosAlmacenamiento = localStorage.getItem("GestorGastosDWEC");

    // Si no existe la clave en el localStorage, se carga un array vacío
    if (gastosAlmacenamiento == null) {
        let arrayVacio = [];
        gp.cargarGastos(arrayVacio);
    }
    // Si existe, se parsea a un array y se le pasa a cargarGastos
    else {
        let gastosRecuperados = JSON.parse(gastosAlmacenamiento);
        gp.cargarGastos(gastosRecuperados);
    }

    repintar();
}

let botonCargarGastos = document.getElementById("cargar-gastos");
botonCargarGastos.addEventListener("click", cargarGastosWeb);

function cargarGastosApi() {
    // Se obtiene el valor del nombre de usuario
    let usuario = document.getElementById("nombre_usuario").value;

    // Traemos el listado de gastos del usuario
    fetch(`https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}`,
        {
            method: "GET"
        })
        .then(function (respuesta) {
            if (respuesta.ok) {
                return respuesta.json();
            } else {
                throw ("Ha habido un error");
            }
        })
        .then(function (gastos_json) {

            gp.cargarGastos(gastos_json);
            repintar();
        })
        .catch(function (error) {
            console.log(`Error: ${error.message}`);
        })
}

let botonCargarGastosApi = document.getElementById("cargar-gastos-api");
botonCargarGastosApi.addEventListener("click", cargarGastosApi);

function BorrarHandleApi() {
    this.handleEvent = function (evento) {
        let usuario = document.getElementById("nombre_usuario").value;

        fetch(`https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${usuario}/${this.gasto.gastoId}`,
            {
                method: "DELETE"
            })
            .then(function (respuesta) {
                if (respuesta.ok) {
                    console.log("Gasto borrado con éxito");
                    cargarGastosApi();
                } else {
                    throw ("Ha habido un error");
                }
            })
            .catch(function (error) {
                console.log(`Error: ${error.message}`);
            });
    }
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    filtrarGastosWeb,
    guardarGastosWeb,
    cargarGastosWeb,
    cargarGastosApi
}