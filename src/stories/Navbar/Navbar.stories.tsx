/**
 * Storybook configuration file for the Navbar component.
 * This file defines how the Navbar component will be displayed and documented in Storybook.
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Navbar } from "./Navbar";
import React from "react";

// Decorador para simular el contexto en Storybook
const withThemeContext = (Story: React.ComponentType) => (
  <div className="storybook-container">
    <Story />
  </div>
);

/**
 * Meta configuration object for the Navbar component
 * Defines the basic setup and controls for the component in Storybook
 */
const meta = {
  title: "Components/Navbar", // Define la ubicación en el sidebar de Storybook
  component: Navbar,
  decorators: [withThemeContext],
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#333333" },
      ],
    },
    viewport: {
      defaultViewport: "desktop",
    },
    actions: { argTypesRegex: "^on.*" },
    docs: {
      description: {
        component: "Un componente de navegación responsive y personalizable",
      },
    },
  },
  tags: ["autodocs"], // Habilita la generación automática de documentación
  argTypes: {
    brandName: { control: "text" }, // Control para modificar el nombre de la marca
    className: { control: "text" }, // Control para agregar clases CSS personalizadas
    isFixed: { control: "boolean" },
    menuItems: { control: "object" },
    showSearch: { control: "boolean" },
    showUserMenu: { control: "boolean" },
    logoSrc: { control: "text" },
    onMenuClick: { action: "menuClicked" },
    // Opciones de personalización
    navbarHeight: {
      control: { type: "range", min: 50, max: 100, step: 5 },
      description: "Altura de la barra de navegación en píxeles",
    },
    borderRadius: {
      control: { type: "range", min: 0, max: 20, step: 2 },
      description: "Radio de borde para elementos de la barra de navegación",
    },
    transparentBackground: {
      control: "boolean",
      description: "Fondo transparente con efecto de desenfoque",
    },
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultMenuItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

/**
 * Historia por defecto del Navbar
 * Muestra la configuración básica del componente
 */
export const Default: Story = {
  args: {
    brandName: "My Brand",
    menuItems: defaultMenuItems,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Configuración básica del Navbar con solo el nombre de la marca y elementos de menú.",
      },
    },
  },
};

/**
 * Navbar con barra de búsqueda
 */
export const WithSearch: Story = {
  args: {
    brandName: "Search Enabled",
    menuItems: defaultMenuItems,
    showSearch: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Navbar con barra de búsqueda habilitada.",
      },
    },
  },
};

/**
 * Navbar con menú de usuario
 */
export const WithUserMenu: Story = {
  args: {
    brandName: "User Menu",
    menuItems: defaultMenuItems,
    showUserMenu: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Navbar con menú de usuario habilitado.",
      },
    },
  },
};

/**
 * Navbar con fondo transparente (efecto glassmorphism)
 */
export const GlassmorphismNavbar: Story = {
  args: {
    brandName: "Glass Effect",
    menuItems: defaultMenuItems,
    transparentBackground: true,
    showSearch: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Navbar con efecto de vidrio (glassmorphism).",
      },
    },
  },
};

/**
 * Navbar con botón de cambio de tema
 */
export const WithThemeToggle: Story = {
  args: {
    brandName: "Theme Toggle",
    menuItems: defaultMenuItems,
    showSearch: false,
    showUserMenu: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Navbar con botón para cambiar entre tema claro y oscuro.",
      },
    },
  },
};

/**
 * Navbar completo con todas las características
 */
export const FullFeatured: Story = {
  args: {
    brandName: "Full Featured",
    menuItems: defaultMenuItems,
    showSearch: true,
    showUserMenu: true,
    isFixed: true,
    logoSrc: "https://via.placeholder.com/150x50",
    navbarHeight: 70,
    borderRadius: 8,
    transparentBackground: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Navbar con todas las características habilitadas y personalizadas.",
      },
    },
  },
};
