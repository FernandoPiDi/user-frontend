import type { Meta, StoryObj } from "@storybook/react";
import { UserCard } from "./UserCard";

const meta: Meta<typeof UserCard> = {
  title: "Components/UserCard",
  component: UserCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isOpen: { control: "boolean" },
    onClose: { action: "closed" },
  },
};

export default meta;
type Story = StoryObj<typeof UserCard>;

// Datos de ejemplo para las historias
const mockUser = {
  id: 1,
  name: "Leanne Graham",
  username: "Bret",
  email: "Sincere@april.biz",
  address: {
    street: "Kulas Light",
    suite: "Apt. 556",
    city: "Gwenborough",
    zipcode: "92998-3874",
    geo: {
      lat: "-37.3159",
      lng: "81.1496",
    },
  },
  phone: "1-770-736-8031 x56442",
  website: "hildegard.org",
  company: {
    name: "Romaguera-Crona",
    catchPhrase: "Multi-layered client-server neural-net",
    bs: "harness real-time e-markets",
  },
};

export const Default: Story = {
  args: {
    user: mockUser,
    isOpen: true,
    onClose: () => console.log("UserCard closed"),
  },
};

export const Closed: Story = {
  args: {
    user: mockUser,
    isOpen: false,
    onClose: () => console.log("UserCard closed"),
  },
};

export const WithLongContent: Story = {
  args: {
    user: {
      ...mockUser,
      name: "Usuario con nombre muy largo para probar el diseño responsivo",
      address: {
        ...mockUser.address,
        street:
          "Calle con un nombre extremadamente largo para probar cómo se comporta el diseño con contenido extenso",
        suite: "Apartamento con descripción muy larga para probar el diseño",
        city: "Ciudad con un nombre extremadamente largo para probar el diseño",
      },
      company: {
        ...mockUser.company,
        catchPhrase:
          "Esta es una frase extremadamente larga para probar cómo se comporta el componente con contenido extenso y verificar que el diseño sea responsivo",
      },
    },
    isOpen: true,
    onClose: () => console.log("UserCard closed"),
  },
};
