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
    elemento.innerHTML = '
        < div class="gasto">
         <div class="gasto-descripcion">' + gasto.descripcion + '</div>
         <div class="gasto-fecha">' + fechaGasto + '</div> 
         <div class="gasto-valor">' + gasto.valor + '</div> 
         <div class="gasto-etiquetas">' + etiquetasGasto + '</div> 
        </div>';
}

