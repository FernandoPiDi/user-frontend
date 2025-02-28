import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

// Definir el tipo para el tema
export type Theme = "light" | "dark";

// Definir la interfaz para el contexto
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Crear el contexto con un valor inicial
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Props para el proveedor del contexto
interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
}

// Proveedor del contexto
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = "light",
}) => {
  // Estado para el tema actual
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  // Efecto para cargar el tema guardado en localStorage al iniciar
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, []);

  // Función para cambiar entre temas
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  // Valor del contexto
  const contextValue: ThemeContextType = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};
