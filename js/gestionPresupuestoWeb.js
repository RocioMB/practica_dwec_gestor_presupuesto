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
        etiquetasGasto += '<span class="gasto-etiquetas-etiqueta">' + etiqueta + '</span>';
    }
    elemento.innerHTML = '<div class="gasto">' + 
         '<div class="gasto-descripcion">' + gasto.descripcion + '</div>' +
         '<div class="gasto-fecha">' + fechaGasto + '</div>' + 
         '<div class="gasto-valor">' + gasto.valor + '</div>' +
         '<div class="gasto-etiquetas">' + etiquetasGasto + '</div></div>';
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    let elemento = document.getElementById(idElemento);
    let divAgrupacionDato = "";
    for(const [clave, valor] of Object.entries(agrup)) {
        divAgrupacionDato += '<div class="agrupacion-dato">' +
                '<span class="agrupacion-dato-clave">' + clave + '</span>' +
                '<span class="agrupacion-dato-valor">' + valor + '</span>' +
            '</div>';
    }
    elemento.innerHTML = '<div class="agrupacion"><h1>Gastos agrupados por ' + periodo + '</h1>' + divAgrupacionDato + '</div >';
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}