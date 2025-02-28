import "@testing-library/jest-dom";

// Suprimir advertencias de consola específicas durante las pruebas
const originalConsoleWarn = console.warn;
console.warn = (...args) => {
  // Ignorar advertencias específicas como la de JSX transform
  if (
    args[0] &&
    typeof args[0] === "string" &&
    args[0].includes("outdated JSX transform")
  ) {
    return;
  }
  originalConsoleWarn(...args);
};

// Configuración global para testing-library
import { configure } from "@testing-library/react";
configure({
  testIdAttribute: "data-testid",
});
