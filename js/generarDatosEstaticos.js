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

let filtro = {fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"};
let gastosFiltrados1 = filtrarGastos(filtro);
for (let gasto of gastosFiltrados1) {
    mostrarGastoWeb("listado-gastos-filtrado-1", gasto);
}


