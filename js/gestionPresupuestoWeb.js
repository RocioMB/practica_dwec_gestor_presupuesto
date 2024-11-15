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

    elemento.appendChild(nodoDiv);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    let elemento = document.getElementById(idElemento);
    let divAgrupacionDato = "";
    for(const [clave, valor] of Object.entries(agrup)) {
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

function actualizarPresupuestoWeb (){
    let presupuestoIntroducido = prompt('Introduzca presupuesto:', '');
    presupuestoIntroducido = parseInt(presupuestoIntroducido);

    gp.actualizarPresupuesto(presupuestoIntroducido);

    repintar();
}

let boton = document.getElementById("actualizarpresupuesto");
boton.addEventListener("click", actualizarPresupuestoWeb);

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}