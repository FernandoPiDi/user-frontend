import type { Meta, StoryObj } from "@storybook/react";
import { Usuarios, User, ItemsPerPageOption } from "./Usuarios";
import { UserProvider } from "../../context/UserContext";
import React from "react";

const meta: Meta<typeof Usuarios> = {
  title: "Components/Usuarios",
  component: Usuarios,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Componente que muestra una lista paginada de usuarios con su nombre, correo y ciudad. Incluye controles para ajustar la cantidad de items por página.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    defaultItemsPerPage: {
      control: {
        type: "number",
        min: 5,
        max: 20,
        step: 5,
      },
      options: [5, 10, 15, 20] as ItemsPerPageOption[],
      description: "Número de items a mostrar por página",
    },
  },
  decorators: [
    (Story, context) => {
      const { args } = context;
      return (
        <UserProvider
          mockUsers={args.mockUsers}
          defaultItemsPerPage={args.defaultItemsPerPage}
        >
          <Story />
        </UserProvider>
      );
    },
  ],
} satisfies Meta<typeof Usuarios>;

export default meta;
type Story = StoryObj<typeof meta>;

// Generar usuarios de ejemplo con tipo definido
const generateMockUsers = (count: number): User[] =>
  Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `Usuario ${index + 1}`,
    username: `user${index + 1}`,
    email: `usuario${index + 1}@example.com`,
    address: {
      city: `Ciudad ${index + 1}`,
      street: `Calle ${index + 1}`,
      suite: `Suite ${index + 1}`,
      zipcode: `${10000 + index}`,
      geo: { lat: "0", lng: "0" },
    },
    phone: `123-456-${7890 + index}`,
    website: `usuario${index + 1}.com`,
    company: {
      name: `Empresa ${index + 1}`,
      catchPhrase: `Slogan ${index + 1}`,
      bs: `Business ${index + 1}`,
    },
  }));

const mockUsers = generateMockUsers(20);

export const Default: Story = {
  args: {
    mockUsers,
    defaultItemsPerPage: 5,
  },
};

export const TenPerPage: Story = {
  args: {
    mockUsers,
    defaultItemsPerPage: 10,
  },
};

export const FewItems: Story = {
  args: {
    mockUsers: generateMockUsers(3),
    defaultItemsPerPage: 5,
  },
};
