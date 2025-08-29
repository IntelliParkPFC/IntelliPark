//prueba casos true/false de la ventana de 5 minutos y patente inexistente

import { verificarSiSeEstaciono } from "../src/checkParking.js";

describe("verificarSiSeEstaciono", () => {
  const t = new Date("2025-06-03T10:10:00");

  test("devuelve true si pasó la ventana de 5 min desde la última lectura", () => {
    const lecturas = [{ patente: "ABC123", timestamp: new Date("2025-06-03T09:00:00") }];
    expect(verificarSiSeEstaciono("ABC123", lecturas, t, 5)).toBe(true);
  });

  test("devuelve false si hay lecturas muy cercanas entre sí dentro de la ventana de 5 min", () => {
    const lecturas = [
      { patente: "XYZ789", timestamp: new Date("2025-06-03T09:00:00") },
      { patente: "XYZ789", timestamp: new Date("2025-06-03T09:04:00") }
    ];
    expect(verificarSiSeEstaciono("XYZ789", lecturas, new Date("2025-06-03T09:05:00"), 5)).toBe(false);
  });

  test("devuelve false si no hay lecturas para la patente", () => {
    const lecturas = [{ patente: "AAA000", timestamp: new Date("2025-06-03T09:00:00") }];
    expect(verificarSiSeEstaciono("BBB111", lecturas, t, 5)).toBe(false);
  });
});
