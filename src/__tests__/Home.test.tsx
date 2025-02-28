import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../app/page";
import { UserProvider } from "../context/UserContext";

// Mock de los componentes que se utilizan en el layout
jest.mock("../stories/Navbar/Navbar", () => ({
  Navbar: () => <div data-testid="navbar-mock">Navbar Mock</div>,
}));

jest.mock("../stories/Usuarios/Usuarios", () => ({
  Usuarios: () => <div data-testid="usuarios-mock">Usuarios Mock</div>,
}));

describe("Home Page", () => {
  it("renders the home page correctly", () => {
    // Renderizamos el componente Home dentro del contexto necesario
    const { container } = render(
      <UserProvider>
        <Home />
      </UserProvider>
    );

    // Verificamos que el contenedor principal existe
    const mainContainer = container.querySelector(".container");
    expect(mainContainer).toBeInTheDocument();

    // Verificamos que tiene la clase correcta
    expect(mainContainer).toHaveClass("container");

    // Verificamos que tiene el estilo correcto
    expect(mainContainer).toHaveStyle({ padding: "2rem" });
  });
});
