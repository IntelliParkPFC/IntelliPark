import { connectRedis } from './src/redisClient.js';
import { loadJSON, storeReadings, fetchReadings } from './src/dataLoader.js';
import { verificarSiSeEstaciono } from './src/checkParking.js';
import { procesarCobro } from './src/billing.js';
import { calcularOcupacion } from './src/occupancy.js';

const tarifaPorHora = 200;
const tiempoActualSimulado = new Date("2025-06-03T10:10:00");

async function main() {
  const client = await connectRedis();

  const datosJson = loadJSON('./data.json');
  await storeReadings(client, datosJson);
  const lecturasRecuperadas = await fetchReadings(client);

  const deudas = {};
  const registroCobros = [];

  const patentes = [...new Set(lecturasRecuperadas.map(l => l.patente))];
  for (const patente of patentes) {
    if (verificarSiSeEstaciono(patente, lecturasRecuperadas, tiempoActualSimulado)) {
      const registros = lecturasRecuperadas.filter(r => r.patente === patente).sort((a, b) => a.timestamp - b.timestamp);
      const saldo = registros[registros.length - 1].saldo || 0;
      procesarCobro(patente, saldo, tarifaPorHora, deudas, registroCobros);
    }
  }

  console.log("\n🔸 REGISTRO DE COBROS");
  console.table(registroCobros);

  const zonas = calcularOcupacion(lecturasRecuperadas, verificarSiSeEstaciono, tiempoActualSimulado);
  console.log("\n🔸 ESTADO DE OCUPACIÓN POR ZONA");
  console.table(zonas);

  await client.quit();
}

main();
