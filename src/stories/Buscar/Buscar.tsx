"use client";

import React, { useState, useEffect, useCallback } from "react";
import "./Buscar.css";

export interface BuscarProps {
  /**
   * funcion que se llama cuando cambia el texto de busqueda
   */
  onSearch: (searchTerm: string) => void;
  /**
   * placeholder para el campo de busqueda
   */
  placeholder?: string;
  /**
   * clase css adicional
   */
  className?: string;
  /**
   * retraso en milisegundos para el debounce de la busqueda
   */
  debounceTime?: number;
  /**
   * valor actual del campo de busqueda (opcional)
   */
  value?: string;
  /**
   * variante de estilo del componente
   */
  variant?: "light" | "dark" | "primary" | "secondary";
  /**
   * tamaño del componente
   */
  size?: "small" | "medium" | "large";
  /**
   * ancho máximo del componente
   */
  maxWidth?: string;
  /**
   * estilo del borde
   */
  borderStyle?: "none" | "thin" | "medium" | "thick";
  /**
   * color del borde
   */
  borderColor?: string;
  /**
   * posición del icono de búsqueda
   */
  iconPosition?: "left" | "right";
  /**
   * si el componente debe tener bordes redondeados
   */
  rounded?: boolean;
}

export const Buscar: React.FC<BuscarProps> = ({
  onSearch,
  placeholder = "Buscar usuarios...",
  className = "",
  debounceTime = 300,
  value,
  variant = "light",
  size = "medium",
  maxWidth,
  borderStyle = "none",
  borderColor,
  iconPosition = "right",
  rounded = true,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>(value || "");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // actualizar el estado interno cuando cambia el valor desde fuera
  useEffect(() => {
    if (value !== undefined) {
      setSearchTerm(value);
    }
  }, [value]);

  // implementacion de debounce para evitar demasiadas busquedas mientras se escribe
  const debouncedSearch = useCallback(
    (value: string) => {
      const handler = setTimeout(() => {
        onSearch(value);
      }, debounceTime);

      return () => {
        clearTimeout(handler);
      };
    },
    [onSearch, debounceTime]
  );

  useEffect(() => {
    // llamar a la funcion de busqueda con debounce
    const cleanup = debouncedSearch(searchTerm);
    return cleanup;
  }, [searchTerm, debouncedSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    onSearch("");
  };

  // Generar clases CSS basadas en las propiedades
  const containerClasses = [
    "buscar-container",
    className,
    isFocused ? "focused" : "",
    `variant-${variant}`,
    `size-${size}`,
    rounded ? "rounded" : "",
    borderStyle !== "none" ? `border-${borderStyle}` : "",
    iconPosition === "left" ? "icon-left" : "",
  ]
    .filter(Boolean)
    .join(" ");

  // Generar estilos inline para propiedades personalizadas
  const containerStyles: React.CSSProperties = {
    maxWidth: maxWidth || undefined,
    ...(borderColor && borderStyle !== "none" ? { borderColor } : {}),
  };

  // Componente de icono de búsqueda
  const SearchIcon = () => (
    <div className="buscar-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    </div>
  );

  return (
    <div className={containerClasses} style={containerStyles}>
      {iconPosition === "left" && !searchTerm && <SearchIcon />}

      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder={placeholder}
        className="buscar-input"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {searchTerm && (
        <button
          className="buscar-clear"
          onClick={handleClearSearch}
          aria-label="Limpiar búsqueda"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}

      {!searchTerm && iconPosition === "right" && <SearchIcon />}
    </div>
  );
};

export default Buscar;
