//prueba de cobro con saldo suficiente y registrar deuda cuando no alcanza

import { procesarCobro } from "../src/billing.js";

describe("procesarCobro", () => {
  test("cobra cuando hay saldo suficiente", () => {
    const deudas = {};
    const registro = [];
    const saldoFinal = procesarCobro("ABC123", 300, 200, deudas, registro);
    expect(saldoFinal).toBe(100);
    expect(registro[0]).toMatchObject({ patente: "ABC123", accion: "Cobro realizado", monto: 200 });
    expect(deudas["ABC123"]).toBeUndefined();
  });

  test("registra deuda cuando el saldo es insuficiente", () => {
    const deudas = {};
    const registro = [];
    const saldoFinal = procesarCobro("XYZ789", 50, 200, deudas, registro);
    expect(saldoFinal).toBe(50);
    expect(deudas["XYZ789"]).toBe(200);
    expect(registro[0]).toMatchObject({ patente: "XYZ789", accion: "Saldo insuficiente", monto: 200 });
  });
});
