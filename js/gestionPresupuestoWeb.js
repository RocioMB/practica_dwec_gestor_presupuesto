import * as gp from './gestionPresupuesto.js';

function mostrarDatoEnId(idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    elemento.textContent = valor;
    console.log(valor);
}

function mostrarGastoWeb(idElemento, gasto) {
    let elemento = document.getElementById(idElemento);
    let fechaGasto = new Date(gasto.fecha).toLocaleString();
    let etiquetasGasto = "";
    for (let etiqueta of gasto.etiquetas) {
        etiquetasGasto += '<span class="gasto-etiquetas-etiqueta">' + etiqueta + '</span> ';
    }

    let nodoDiv = document.createElement("div");
    nodoDiv.classList.add("gasto");
    nodoDiv.innerHTML = '<div class="gasto-descripcion">' + gasto.descripcion + '</div>' +
        '<div class="gasto-fecha">' + fechaGasto + '</div>' +
        '<div class="gasto-valor">' + gasto.valor + '</div>' +
        '<div class="gasto-etiquetas">' + etiquetasGasto + '</div>';

    // elemento.appendChild(nodoDiv);

    let boton = document.createElement("button");
    boton.innerText = "Editar";
    boton.setAttribute("type", "button");
    boton.classList.add("gasto-editar");

    let manejadorEditarGasto = new EditarHandle();
    manejadorEditarGasto.gasto = gasto;

    boton.addEventListener("click", manejadorEditarGasto);

    nodoDiv.appendChild(boton);
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
    presupuestoIntroducido = parseInt(presupuestoIntroducido);

    gp.actualizarPresupuesto(presupuestoIntroducido);

    repintar();
}

let botonActualizarPresupuesto = document.getElementById("actualizarpresupuesto");
botonActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb);

function nuevoGastoWeb() {
    let descripcion = prompt('Introduzca una descripción:', '');
    let valor = prompt('Introduzca un valor:', '');
    valor = parseInt(valor);
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
        let descripcion = prompt('Introduzca una descripción:', this.gasto.descripcion);
        let valor = prompt('Introduzca un valor:', this.gasto.valor);
        valor = parseInt(valor);
        let fecha = prompt('Introduzca una fecha', this.gasto.fecha);
        //El valor por defecto(parametro 2) del prompt debe ser un string (convertimos de array a string con join)
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

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}