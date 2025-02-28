import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Usuarios, User } from "../stories/Usuarios/Usuarios";
import { UserProvider } from "../context/UserContext";

// Mock de datos de usuarios para las pruebas
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    username: "johndoe",
    email: "john@example.com",
    address: {
      street: "Test Street",
      suite: "Apt 123",
      city: "Test City",
      zipcode: "12345",
      geo: {
        lat: "0",
        lng: "0",
      },
    },
    phone: "123-456-7890",
    website: "example.com",
    company: {
      name: "Test Company",
      catchPhrase: "Test Phrase",
      bs: "Test BS",
    },
  },
  {
    id: 2,
    name: "Jane Smith",
    username: "janesmith",
    email: "jane@example.com",
    address: {
      street: "Another Street",
      suite: "Apt 456",
      city: "Another City",
      zipcode: "54321",
      geo: {
        lat: "1",
        lng: "1",
      },
    },
    phone: "098-765-4321",
    website: "example2.com",
    company: {
      name: "Another Company",
      catchPhrase: "Another Phrase",
      bs: "Another BS",
    },
  },
];

// Mock del componente UserCard
jest.mock("../stories/UserCard/UserCard", () => ({
  __esModule: true,
  default: ({
    user,
    isOpen,
    onClose,
  }: {
    user: User;
    isOpen: boolean;
    onClose: () => void;
  }) =>
    isOpen ? (
      <div data-testid="user-card-mock">
        <div data-testid="user-card-name">{user.name}</div>
        <button onClick={onClose}>Close</button>
      </div>
    ) : null,
}));

describe("Usuarios Component", () => {
  it("muestra entradas de usuarios cuando hay datos disponibles", () => {
    // Renderizar el componente con datos mock
    render(
      <UserProvider mockUsers={mockUsers}>
        <Usuarios />
      </UserProvider>
    );

    // Verificar que se muestran las tarjetas de usuario
    const usuariosGrid = document.querySelector(".usuarios-grid");
    expect(usuariosGrid).toBeInTheDocument();

    // Verificar que hay el número correcto de tarjetas de usuario
    const usuarioCards = document.querySelectorAll(".usuario-card");
    expect(usuarioCards.length).toBe(2);

    // Verificar que los nombres de los usuarios están presentes
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();

    // Verificar que los usernames están presentes
    expect(screen.getByText(/johndoe/i)).toBeInTheDocument();
    expect(screen.getByText(/janesmith/i)).toBeInTheDocument();

    // Verificar que los emails están presentes
    expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/jane@example.com/i)).toBeInTheDocument();
  });

  it('muestra mensaje de "no hay resultados" cuando no hay usuarios', () => {
    // Renderizar el componente con un array vacío de usuarios
    render(
      <UserProvider mockUsers={[]}>
        <Usuarios />
      </UserProvider>
    );

    // Verificar que se muestra el mensaje de no hay resultados
    expect(
      screen.getByText(
        "No se encontraron usuarios que coincidan con la búsqueda."
      )
    ).toBeInTheDocument();
  });

  it("permite seleccionar un usuario y mostrar su tarjeta de detalles", () => {
    // Renderizar el componente con datos mock
    render(
      <UserProvider mockUsers={mockUsers}>
        <Usuarios />
      </UserProvider>
    );

    // Verificar que las tarjetas de usuario están presentes
    const usuarioCards = document.querySelectorAll(".usuario-card");
    expect(usuarioCards.length).toBe(2);

    // Hacer clic en la primera tarjeta de usuario
    fireEvent.click(usuarioCards[0]);

    // Verificar que se muestra la tarjeta de detalles del usuario
    const userCardMock = screen.getByTestId("user-card-mock");
    expect(userCardMock).toBeInTheDocument();

    // Verificar que se muestra el nombre correcto en la tarjeta de detalles
    const userCardName = screen.getByTestId("user-card-name");
    expect(userCardName).toHaveTextContent("John Doe");

    // Cerrar la tarjeta de detalles
    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    // Verificar que la tarjeta de detalles ya no está visible
    expect(screen.queryByTestId("user-card-mock")).not.toBeInTheDocument();
  });

  it("permite cambiar el número de elementos por página", () => {
    // Renderizar el componente con datos mock de más de 5 usuarios
    const manyUsers = Array.from({ length: 10 }, (_, i) => ({
      ...mockUsers[0],
      id: i + 1,
      name: `User ${i + 1}`,
      username: `user${i + 1}`,
      email: `user${i + 1}@ejemplo.com`,
    }));

    render(
      <UserProvider mockUsers={manyUsers}>
        <Usuarios />
      </UserProvider>
    );

    // Verificar que inicialmente se muestran 5 tarjetas de usuario (valor por defecto)
    let usuarioCards = document.querySelectorAll(".usuario-card");
    expect(usuarioCards.length).toBe(5);

    // Cambiar a 10 elementos por página
    const itemsPerPageSelect = screen.getByLabelText("Items por página:");
    fireEvent.change(itemsPerPageSelect, { target: { value: "10" } });

    // Verificar que ahora se muestran 10 tarjetas de usuario
    usuarioCards = document.querySelectorAll(".usuario-card");
    expect(usuarioCards.length).toBe(10);
  });
});
