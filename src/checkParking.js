export function verificarSiSeEstaciono(patente, lecturas, tiempoActual, ventana = 5) {
  const registrosPatente = lecturas
    .filter(r => r.patente === patente)
    .sort((a, b) => a.timestamp - b.timestamp);

  if (registrosPatente.length === 0) return false;

  const ultimaLectura = registrosPatente[registrosPatente.length - 1].timestamp;

  for (let i = 0; i < registrosPatente.length - 1; i++) {
    const diff = (ultimaLectura - registrosPatente[i].timestamp) / 1000;
    if (diff > 0 && diff <= ventana * 60) return false;
  }
  return (tiempoActual - ultimaLectura) > ventana * 60 * 1000;
}