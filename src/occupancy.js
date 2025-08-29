export function calcularOcupacion(lecturas, verificarSiSeEstaciono, tiempoActual) {
  const ocupacionPorZona = {};
  const L = 50;

  for (const item of lecturas) {
    if (verificarSiSeEstaciono(item.patente, lecturas, tiempoActual)) {
      const { lugar, tamano } = item;
      ocupacionPorZona[lugar] = (ocupacionPorZona[lugar] || 0) + tamano;
    }
  }

  const zonaResultado = [];
  for (const [lugar, espacioOcupado] of Object.entries(ocupacionPorZona)) {
    const porcentaje = (espacioOcupado / L) * 100;
    let color;
    if (porcentaje < 50) color = '🟢 Verde';
    else if (porcentaje < 80) color = '🟡 Amarillo';
    else color = '🔴 Rojo';
    zonaResultado.push({
      Lugar: lugar,
      "Porcentaje ocupado (%)": Math.round(porcentaje * 100) / 100,
      Color: color
    });
  }
  return zonaResultado;
}