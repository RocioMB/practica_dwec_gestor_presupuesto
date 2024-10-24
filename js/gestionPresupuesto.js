
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
}

function listarGastos() {
    return gastos;
}

function anyadirGasto() {
    //TODO
}

function borrarGasto() {
    //TODO
}

function calcularTotalGastos() {
    //TODO
}

function calcularBalance() {
    //TODO
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
