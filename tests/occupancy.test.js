//pruebas para el calculo porc de ocupacion y color por zona

import { calcularOcupacion } from "../src/occupancy.js";

// uso de función verificarSiSeEstaciono: considera estacionado a todo el que tenga lectura
function stubVerificarSiSeEstaciono() { return true; }

describe("calcularOcupacion", () => {
  test("calcula porcentaje y color por zona", () => {
    const lecturas = [
      { patente: "A", lugar: "Zona1", tamano: 10, timestamp: new Date("2025-06-03T09:00:00") },
      { patente: "B", lugar: "Zona1", tamano: 15, timestamp: new Date("2025-06-03T09:10:00") },
      { patente: "C", lugar: "Zona2", tamano: 45, timestamp: new Date("2025-06-03T09:20:00") }
    ];
    const zonas = calcularOcupacion(lecturas, stubVerificarSiSeEstaciono, new Date("2025-06-03T10:10:00"));
    // Espera dos zonas
    const z1 = zonas.find(z => z.Lugar === "Zona1");
    const z2 = zonas.find(z => z.Lugar === "Zona2");
    expect(z1["Porcentaje ocupado (%)"]).toBeCloseTo(50);
    expect(z1.Color).toBe("🟡 Amarillo");
    expect(z2["Porcentaje ocupado (%)"]).toBeCloseTo(90);
    expect(z2.Color).toBe("🔴 Rojo");
  });
});
