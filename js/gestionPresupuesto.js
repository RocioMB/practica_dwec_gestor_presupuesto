
// Variables globales
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(valor) {
    if (isNaN(valor) || valor < 0) {
        valor = -1;
    }
    else {
        presupuesto = valor;
    }
    return valor;
}

function mostrarPresupuesto() {
    let texto = "Tu presupuesto actual es de " + presupuesto + " €";
    return texto;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    if (isNaN(valor) || valor < 0) {
        valor = 0;
    }

    let auxFecha = Date.parse(fecha);
    if (isNaN(auxFecha)){
        auxFecha = Date.now();
    }

    this.descripcion = descripcion;
    this.valor = valor;
    this.fecha = auxFecha;
    this.etiquetas = etiquetas;

    this.mostrarGasto = function() {
        return "Gasto correspondiente a " + descripcion + " con valor " + valor + " €";
    }

    this.actualizarDescripcion = function(nuevaDescripcion){
        if(typeof nuevaDescripcion === "string"){
            this.descripcion = nuevaDescripcion;
        }
    }

    this.actualizarValor = function(nuevoValor){
        if (!isNaN(nuevoValor) && nuevoValor > 0) {
            this.valor = nuevoValor;
        }
    }

    this.mostrarGastoCompleto = function() {
        let fechaLocal = new Date(this.fecha).toLocaleString();
        let texto = `Gasto correspondiente a descripción del gasto con valor ${this.valor} €.
Fecha: ${fechaLocal}
Etiquetas:
`;
        for (let etiqueta of this.etiquetas) {
            texto += "- " + etiqueta + "\n";
        }
        return texto;
    }

    this.actualizarFecha = function(fecha) {
        let fechaParseada = Date.parse(fecha);
        if (!isNaN(fechaParseada)){
            this.fecha = fechaParseada;
        }
    }

    this.anyadirEtiquetas = function (...etiquetasNuevas) {
        for (let etiqueta of etiquetasNuevas) {
            if(!this.etiquetas.includes(etiqueta, 0)) {
                this.etiquetas.push(etiqueta);
            }
        }
    }

    this.borrarEtiquetas = function (...etiquetasABorrar) {
        for (let etiqueta of etiquetasABorrar) {
            let posicion = this.etiquetas.indexOf(etiqueta, 0);
            if (posicion != -1) {
                this.etiquetas.splice(posicion, 1);
            }
        }
    }
}

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;

    idGasto++;

    gastos.push(gasto);
}

function borrarGasto(idABorrar) {
    for (let i = 0; i < gastos.length; i++) {
        if (gastos[i].id == idABorrar) {
            gastos.splice(i, 1);
        }
    }
}

function calcularTotalGastos() {
    let total = 0;
    for (let gasto of gastos){
        total += gasto.valor;
    }
    return total;
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}
