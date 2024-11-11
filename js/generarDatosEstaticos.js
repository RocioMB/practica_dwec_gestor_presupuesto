import {mostrarDatoEnId, mostrarGastoWeb, mostrarGastosAgrupadosWeb} from './gestionPresupuestoWeb.js';

import {mostrarPresupuesto, actualizarPresupuesto, CrearGasto, listarGastos, anyadirGasto, borrarGasto, calcularTotalGastos, calcularBalance, filtrarGastos, agruparGastos} from './gestionPresupuesto.js';

actualizarPresupuesto(1500);

mostrarDatoEnId("presupuesto", mostrarPresupuesto());

let gasto1 = new CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

anyadirGasto(gasto1);
anyadirGasto(gasto2);
anyadirGasto(gasto3);
anyadirGasto(gasto4);
anyadirGasto(gasto5);
anyadirGasto(gasto6);

mostrarDatoEnId("gastos-totales", calcularTotalGastos());

mostrarDatoEnId("balance-total", calcularBalance());

for (let gasto of listarGastos()) {
    mostrarGastoWeb("listado-gastos-completo", gasto);
}

let filtro1 = {fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"};
let gastosFiltrados1 = filtrarGastos(filtro1);
for (let gasto of gastosFiltrados1) {
    mostrarGastoWeb("listado-gastos-filtrado-1", gasto);
}

let filtro2 = {valorMinimo: 50};
let gastosFiltrados2 = filtrarGastos(filtro2);
for (let gasto of gastosFiltrados2) {
    mostrarGastoWeb("listado-gastos-filtrado-2", gasto);
}

let filtro3 = {valorMinimo: 200, etiquetasTiene: ["seguros"]};
let gastosFiltrados3 = filtrarGastos(filtro3);
for (let gasto of gastosFiltrados3) {
    mostrarGastoWeb("listado-gastos-filtrado-3", gasto);
}

let filtro4 = {valorMaximo: 50, etiquetasTiene: ["comida", "transporte"]};
let gastosFiltrados4 = filtrarGastos(filtro4);
for (let gasto of gastosFiltrados4) {
    mostrarGastoWeb("listado-gastos-filtrado-4", gasto);
}