import type { Meta, StoryObj } from "@storybook/react";
import { Buscar } from "./Buscar";

const meta: Meta<typeof Buscar> = {
  title: "Components/Buscar",
  component: Buscar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Componente de búsqueda que permite filtrar usuarios en tiempo real a medida que se escribe. Altamente personalizable en términos de apariencia y comportamiento.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    onSearch: { action: "searched" },
    placeholder: { control: "text" },
    debounceTime: { control: { type: "number", min: 0, max: 1000, step: 100 } },
    className: { control: "text" },
    value: { control: "text" },
    variant: {
      control: { type: "select" },
      options: ["light", "dark", "primary", "secondary"],
      description: "Variante de estilo del componente",
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "Tamaño del componente",
    },
    maxWidth: {
      control: { type: "text" },
      description: 'Ancho máximo del componente (ej: "400px", "100%")',
    },
    borderStyle: {
      control: { type: "select" },
      options: ["none", "thin", "medium", "thick"],
      description: "Estilo del borde",
    },
    borderColor: {
      control: { type: "color" },
      description: "Color del borde",
    },
    iconPosition: {
      control: { type: "select" },
      options: ["left", "right"],
      description: "Posición del icono de búsqueda",
    },
    rounded: {
      control: { type: "boolean" },
      description: "Si el componente debe tener bordes redondeados",
    },
  },
} satisfies Meta<typeof Buscar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Buscar usuarios...",
    debounceTime: 300,
  },
};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: "Filtrar por nombre...",
    debounceTime: 300,
  },
};

export const FastDebounce: Story = {
  args: {
    placeholder: "Buscar usuarios...",
    debounceTime: 100,
  },
};

export const DarkVariant: Story = {
  args: {
    placeholder: "Buscar usuarios...",
    debounceTime: 300,
    variant: "dark",
  },
};

export const PrimaryVariant: Story = {
  args: {
    placeholder: "Buscar usuarios...",
    debounceTime: 300,
    variant: "primary",
  },
};

export const SmallSize: Story = {
  args: {
    placeholder: "Buscar...",
    debounceTime: 300,
    size: "small",
  },
};

export const LargeSize: Story = {
  args: {
    placeholder: "Buscar usuarios o productos...",
    debounceTime: 300,
    size: "large",
  },
};

export const WithBorder: Story = {
  args: {
    placeholder: "Buscar usuarios...",
    debounceTime: 300,
    borderStyle: "medium",
    borderColor: "#4f46e5",
  },
};

export const LeftIconPosition: Story = {
  args: {
    placeholder: "Buscar usuarios...",
    debounceTime: 300,
    iconPosition: "left",
  },
};

export const FullWidth: Story = {
  args: {
    placeholder: "Buscar usuarios...",
    debounceTime: 300,
    maxWidth: "100%",
  },
};

export const SquareCorners: Story = {
  args: {
    placeholder: "Buscar usuarios...",
    debounceTime: 300,
    rounded: false,
  },
};
