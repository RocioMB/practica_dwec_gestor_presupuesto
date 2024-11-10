import {mostrarDatoEnId, mostrarGastoWeb, mostrarGastosAgrupadosWeb} from './gestionPresupuestoWeb.js';

import {mostrarPresupuesto, actualizarPresupuesto, CrearGasto, listarGastos, anyadirGasto, borrarGasto, calcularTotalGastos, calcularBalance, filtrarGastos, agruparGastos} from './gestionPresupuesto.js';

actualizarPresupuesto(1500);

mostrarDatoEnId("presupuesto", mostrarPresupuesto());