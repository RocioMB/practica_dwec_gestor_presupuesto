
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
    if (isNaN(auxFecha)) {
        auxFecha = Date.now();
    }

    this.descripcion = descripcion;
    this.valor = valor;
    this.fecha = auxFecha;
    this.etiquetas = etiquetas;

    this.mostrarGasto = function () {
        return "Gasto correspondiente a " + descripcion + " con valor " + valor + " €";
    }

    this.actualizarDescripcion = function (nuevaDescripcion) {
        if (typeof nuevaDescripcion === "string") {
            this.descripcion = nuevaDescripcion;
        }
    }

    this.actualizarValor = function (nuevoValor) {
        if (!isNaN(nuevoValor) && nuevoValor > 0) {
            this.valor = nuevoValor;
        }
    }

    this.mostrarGastoCompleto = function () {
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

    this.actualizarFecha = function (fecha) {
        let fechaParseada = Date.parse(fecha);
        if (!isNaN(fechaParseada)) {
            this.fecha = fechaParseada;
        }
    }

    this.anyadirEtiquetas = function (...etiquetasNuevas) {
        for (let etiqueta of etiquetasNuevas) {
            if (!this.etiquetas.includes(etiqueta, 0)) {
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

    this.obtenerPeriodoAgrupacion = function (periodo) {
        let fechaPartidaEn2 = new Date(this.fecha).toISOString().split('T');
        let fechaDividida = fechaPartidaEn2[0].split('-');
        let periodoAgrupacion = fechaDividida[0];

        if (periodo == "mes") {
            periodoAgrupacion += "-" + fechaDividida[1];
        }
        if (periodo == "dia") {
            periodoAgrupacion += "-" + fechaDividida[1] + "-" + fechaDividida[2];
        }
        return periodoAgrupacion;
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
    for (let gasto of gastos) {
        total += gasto.valor;
    }
    return total;
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}

function filtrarGastos(filtro) {
    let gastosFiltrados = gastos.filter(function (gasto) {

        if (filtro.hasOwnProperty("fechaDesde")) {
            if (gasto.fecha < Date.parse(filtro.fechaDesde)) {
                return false;
            }
        }

        if (filtro.hasOwnProperty("fechaHasta")) {
            if (gasto.fecha > Date.parse(filtro.fechaHasta)) {
                return false;
            }
        }

        if (filtro.hasOwnProperty("valorMinimo")) {
            if (gasto.valor < filtro.valorMinimo) {
                return false;
            }
        }

        if (filtro.hasOwnProperty("valorMaximo")) {
            if (gasto.valor > filtro.valorMaximo) {
                return false;
            }
        }

        if (filtro.hasOwnProperty("descripcionContiene")) {
            if (!gasto.descripcion.toLowerCase().includes(filtro.descripcionContiene.toLowerCase())) {
                return false;
            }
        }

        if (filtro.hasOwnProperty("etiquetasTiene")) {
            let tieneEtiqueta = false;
            filtro.etiquetasTiene.forEach(function (etiqueta) {
                if (gasto.etiquetas.includes(etiqueta.toLowerCase())) {
                    tieneEtiqueta = true;
                }
            });
            if (!tieneEtiqueta) {
                return false;
            }
        }
        return true;
    });

    if (gastosFiltrados.length == 0) {
        gastosFiltrados = gastos;
    }
    return gastosFiltrados;
}

function agruparGastos(periodo = "mes", etiquetas = [], fechaDesde, fechaHasta = Date.now()) {

    let filtro = {};

    if (etiquetas.length > 0) {
        filtro = {
            etiquetasTiene: etiquetas,
            fechaDesde: fechaDesde,
            fechaHasta: fechaHasta
        }
    }

    let gastosFiltrados = filtrarGastos(filtro);

    return gastosFiltrados.reduce(function (acc, gasto) {
        let periodoAgrupacion = gasto.obtenerPeriodoAgrupacion(periodo);

        if (!acc[periodoAgrupacion]) {
            acc[periodoAgrupacion] = 0;
        }

        acc[periodoAgrupacion] += gasto.valor;

        return acc;
    }, {});
}

function transformarListadoEtiquetas(lista) {
    return lista.match(/\w+/g);
}

function cargarGastos(gastosAlmacenamiento) {
    // gastosAlmacenamiento es un array de objetos "planos"
    // No tienen acceso a los métodos creados con "CrearGasto":
    // "anyadirEtiquetas", "actualizarValor",...
    // Solo tienen guardadas sus propiedades: descripcion, valor, fecha y etiquetas

    // Reseteamos la variable global "gastos"
    gastos = [];
    // Procesamos cada gasto del listado pasado a la función
    for (let g of gastosAlmacenamiento) {
        // Creamos un nuevo objeto mediante el constructor
        // Este objeto tiene acceso a los métodos "anyadirEtiquetas", "actualizarValor",...
        // Pero sus propiedades (descripcion, valor, fecha y etiquetas) están sin asignar
        let gastoRehidratado = new CrearGasto();
        // Copiamos los datos del objeto guardado en el almacenamiento
        // al gasto rehidratado
        // https://es.javascript.info/object-copy#cloning-and-merging-object-assign
        Object.assign(gastoRehidratado, g);
        // Ahora "gastoRehidratado" tiene las propiedades del gasto
        // almacenado y además tiene acceso a los métodos de "CrearGasto"

        // Añadimos el gasto rehidratado a "gastos"
        gastos.push(gastoRehidratado)
    }
}


// Exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos,
    transformarListadoEtiquetas,
    cargarGastos
}
