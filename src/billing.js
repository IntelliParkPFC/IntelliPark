export function procesarCobro(patente, saldo, tarifaPorHora, deudas, registroCobros) {
  if (saldo >= tarifaPorHora) {
    const nuevoSaldo = saldo - tarifaPorHora;
    registroCobros.push({
      patente,
      accion: 'Cobro realizado',
      monto: tarifaPorHora,
      saldo_restante: nuevoSaldo,
      deuda_total: 0
    });
    return nuevoSaldo;
  } else {
    const deuda = tarifaPorHora;
    deudas[patente] = (deudas[patente] || 0) + deuda;
    registroCobros.push({
      patente,
      accion: 'Saldo insuficiente',
      monto: deuda,
      saldo_restante: saldo,
      deuda_total: deudas[patente]
    });
    return saldo;
  }
}