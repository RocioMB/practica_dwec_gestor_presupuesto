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
    nodoDiv.innerHTML = '<div class="gasto-descripcion">' + gasto.descripcion + '</div>' +
        '<div class="gasto-fecha">' + fechaGasto + '</div>' +
        '<div class="gasto-valor">' + gasto.valor + '</div>';

    let botonEditar = document.createElement("button");
    botonEditar.innerText = "Editar";
    botonEditar.setAttribute("type", "button");
    botonEditar.classList.add("gasto-editar");

    let manejadorEditarGasto = new EditarHandle();
    manejadorEditarGasto.gasto = gasto;

    botonEditar.addEventListener("click", manejadorEditarGasto);

    
    let botonBorrar = document.createElement("button");
    botonBorrar.innerText = "Borrar";
    botonBorrar.setAttribute("type", "button");
    botonBorrar.classList.add("gasto-borrar");

    let manejadorBorrarGasto = new BorrarHandle();
    manejadorBorrarGasto.gasto = gasto;

    botonBorrar.addEventListener("click", manejadorBorrarGasto);

    nodoDiv.appendChild(botonEditar);
    nodoDiv.appendChild(botonBorrar);
    elemento.appendChild(nodoDiv);
    nodoDiv.appendChild(divEtiquetas);
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

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}