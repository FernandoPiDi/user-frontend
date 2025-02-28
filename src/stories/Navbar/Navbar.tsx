import React, { useState } from "react";
import "./Navbar.css";
import { Buscar } from "../Buscar/Buscar";
import Link from "next/link";
import Image from "next/image";
import { useUserContext } from "../../context/UserContext";
import { useThemeContext } from "../../context/ThemeContext";

export type NavbarTheme = "light" | "dark" | "custom";

export interface MenuItem {
  label: string;
  href: string;
  active?: boolean;
}

export interface NavbarProps {
  /**
   * Brand name to display in the navbar
   */
  brandName?: string;
  /**
   * Optional additional CSS class
   */
  className?: string;
  /**
   * Whether the navbar should be fixed at the top
   */
  isFixed?: boolean;
  /**
   * Navigation menu items
   */
  menuItems?: MenuItem[];
  /**
   * Whether to show the search bar
   */
  showSearch?: boolean;
  /**
   * Whether to show the user menu
   */
  showUserMenu?: boolean;
  /**
   * URL for the brand logo
   */
  logoSrc?: string;
  /**
   * Callback for menu button click (mobile)
   */
  onMenuClick?: () => void;
  /**
   * Altura de la barra de navegación en píxeles
   */
  navbarHeight?: number;
  /**
   * Radio de borde para elementos de la barra de navegación
   */
  borderRadius?: number;
  /**
   * Fondo transparente con efecto de desenfoque
   */
  transparentBackground?: boolean;
}

// Create dummy context values for when the real contexts aren't available
const dummyUserContext = {
  searchTerm: "",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSearchTerm: (_term: string) => {},
  clearSearch: () => {},
};

const dummyThemeContext = {
  theme: "light",
  toggleTheme: () => {},
};

export const Navbar = ({
  brandName = "Brand",
  className = "",
  isFixed = false,
  menuItems = [],
  showSearch = false,
  showUserMenu = false,
  logoSrc,
  onMenuClick,
  navbarHeight,
  borderRadius,
  transparentBackground = false,
}: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [showMobileSearch, setShowMobileSearch] = useState<boolean>(false);

  // Estado local para cuando no hay contextos disponibles
  const [searchTermLocal, setSearchTermLocal] = useState<string>("");
  const [themeLocal, setThemeLocal] = useState<string>("light");

  // Always call hooks at the top level
  // These will throw errors in SSR, but we'll catch and handle them
  let userContextValue = dummyUserContext;
  let themeContextValue = dummyThemeContext;

  try {
    // We're calling hooks unconditionally here, but handling errors if they occur
    const userContext = useUserContext();
    if (userContext) userContextValue = userContext;
  } catch {}

  try {
    const themeContext = useThemeContext();
    if (themeContext) themeContextValue = themeContext;
  } catch {}

  // Use context values if available, otherwise use local state
  const searchTerm = userContextValue.searchTerm || searchTermLocal;
  const setSearchTerm = (term: string) => {
    if (userContextValue.setSearchTerm) {
      userContextValue.setSearchTerm(term);
    } else {
      setSearchTermLocal(term);
    }
  };

  const clearSearch = () => {
    if (userContextValue.clearSearch) {
      userContextValue.clearSearch();
    } else {
      setSearchTermLocal("");
    }
  };

  const currentTheme = themeContextValue.theme || themeLocal;
  const toggleTheme = () => {
    if (themeContextValue.toggleTheme) {
      themeContextValue.toggleTheme();
    } else {
      setThemeLocal(themeLocal === "light" ? "dark" : "light");
    }
  };

  // funcion para manejar la busqueda
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleMobileMenuClick = () => {
    if (typeof window !== "undefined" && window.innerWidth <= 768) {
      setShowMobileSearch(!showMobileSearch);
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    } else {
      setMobileMenuOpen(!mobileMenuOpen);
    }

    if (onMenuClick) {
      onMenuClick();
    }
  };

  const handleLogoClick = () => {
    clearSearch();
    setShowMobileSearch(false);
    setMobileMenuOpen(false);
  };

  // Estilos personalizados basados en las props
  const navbarStyle: React.CSSProperties = {
    ...(navbarHeight ? { height: `${navbarHeight}px` } : {}),
    ...(transparentBackground
      ? {
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        }
      : {}),
  };

  const navbarItemStyle: React.CSSProperties = {
    ...(borderRadius ? { borderRadius: `${borderRadius}px` } : {}),
  };

  const searchStyle: React.CSSProperties = {
    ...(borderRadius ? { borderRadius: `${borderRadius}px` } : {}),
  };

  // Renderizar el botón de cambio de tema
  const renderThemeToggle = () => (
    <div className="navbar-theme-toggle">
      <button
        className="theme-toggle-button"
        onClick={toggleTheme}
        aria-label={
          currentTheme === "light"
            ? "Cambiar a modo oscuro"
            : "Cambiar a modo claro"
        }
        style={navbarItemStyle}
      >
        {currentTheme === "light" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        )}
      </button>
    </div>
  );

  return (
    <nav
      className={`navbar ${className} ${
        isFixed ? "fixed" : ""
      } theme-${currentTheme} ${
        showMobileSearch ? "mobile-search-active" : ""
      } ${transparentBackground ? "transparent-bg" : ""}`}
      style={navbarStyle}
    >
      <div className="navbar-glow-effect"></div>
      <div className="navbar-container">
        {/* cuando la busqueda movil esta activa, mostrar solo el logo y la barra de busqueda */}
        {showMobileSearch ? (
          <>
            <div className="navbar-brand navbar-brand-compact">
              {logoSrc ? (
                <Link
                  href="/#top"
                  className="logo-link"
                  onClick={handleLogoClick}
                >
                  <Image
                    src={logoSrc}
                    alt={brandName}
                    width={150}
                    height={50}
                  />
                  <span className="logo-glow"></span>
                </Link>
              ) : (
                <Link
                  href="/#top"
                  className="logo-text"
                  onClick={handleLogoClick}
                >
                  <span className="logo-text-inner">{brandName}</span>
                  <span className="logo-underline"></span>
                </Link>
              )}
            </div>

            <div className="navbar-search-inline" style={searchStyle}>
              <Buscar
                onSearch={handleSearch}
                placeholder="Buscar..."
                className="navbar-search-input"
                value={searchTerm}
                rounded={borderRadius !== undefined ? borderRadius > 0 : true}
              />
            </div>

            <button
              className="mobile-menu-button search-active"
              onClick={handleMobileMenuClick}
              aria-label="Cerrar búsqueda"
              style={navbarItemStyle}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </>
        ) : (
          <>
            <div className="navbar-brand">
              {logoSrc ? (
                <Link
                  href="/#top"
                  className="logo-link"
                  onClick={handleLogoClick}
                >
                  <Image
                    src={logoSrc}
                    alt={brandName}
                    width={150}
                    height={50}
                  />
                  <span className="logo-glow"></span>
                </Link>
              ) : (
                <Link
                  href="/#top"
                  className="logo-text"
                  onClick={handleLogoClick}
                >
                  <span className="logo-text-inner">{brandName}</span>
                  <span className="logo-underline"></span>
                </Link>
              )}
            </div>

            {/* boton de menu hamburguesa */}
            <button
              className={`mobile-menu-button ${mobileMenuOpen ? "open" : ""}`}
              onClick={handleMobileMenuClick}
              aria-label="Abrir menú"
              style={navbarItemStyle}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            {/* menu de navegacion normal */}
            <div
              className={`navbar-menu ${mobileMenuOpen ? "mobile-open" : ""}`}
            >
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className={`navbar-item ${item.active ? "active" : ""}`}
                  style={navbarItemStyle}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShowMobileSearch(false);
                  }}
                >
                  {item.label}
                  <span className="navbar-item-highlight"></span>
                </a>
              ))}
              {showSearch && (
                <div className="navbar-search" style={searchStyle}>
                  <Buscar
                    onSearch={handleSearch}
                    placeholder="Buscar usuarios..."
                    className="navbar-search-input"
                    value={searchTerm}
                    rounded={
                      borderRadius !== undefined ? borderRadius > 0 : true
                    }
                  />
                </div>
              )}
              {showUserMenu && (
                <div className="navbar-user">
                  <button
                    onClick={() => {
                      if (onMenuClick) onMenuClick();
                      setMobileMenuOpen(false);
                      setShowMobileSearch(false);
                    }}
                    className="user-menu-button"
                    style={navbarItemStyle}
                  >
                    <span className="user-menu-text">Usuario</span>
                    <span className="user-menu-icon">
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
                        <circle cx="12" cy="7" r="4" />
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      </svg>
                    </span>
                  </button>
                </div>
              )}

              {/* Botón de cambio de tema */}
              {renderThemeToggle()}
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
