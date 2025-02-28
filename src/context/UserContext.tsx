import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import axios, { AxiosError } from "axios";
import { User, ItemsPerPageOption } from "../stories/Usuarios/Usuarios";

// Definir la interfaz para el contexto
interface UserContextType {
  users: User[];
  filteredUsers: User[];
  isLoading: boolean;
  error: string;
  searchTerm: string;
  currentPage: number;
  itemsPerPage: ItemsPerPageOption;
  selectedUser: User | null;
  isUserCardOpen: boolean;
  setSearchTerm: (term: string) => void;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (items: ItemsPerPageOption) => void;
  selectUser: (user: User) => void;
  closeUserCard: () => void;
  clearSearch: () => void;
}

// Crear el contexto con un valor inicial
const UserContext = createContext<UserContextType | undefined>(undefined);

// Props para el proveedor del contexto
interface UserProviderProps {
  children: ReactNode;
  mockUsers?: User[];
  defaultItemsPerPage?: ItemsPerPageOption;
}

// Proveedor del contexto
export const UserProvider: React.FC<UserProviderProps> = ({
  children,
  mockUsers,
  defaultItemsPerPage = 5,
}) => {
  // Estados
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(!mockUsers);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] =
    useState<ItemsPerPageOption>(defaultItemsPerPage);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserCardOpen, setIsUserCardOpen] = useState<boolean>(false);

  // Cargar usuarios
  useEffect(() => {
    if (mockUsers) {
      setUsers(mockUsers);
      setIsLoading(false);
      return;
    }

    const fetchUsers = async (): Promise<void> => {
      try {
        const apiUrl =
          process.env.REACT_APP_API_URL ||
          "https://jsonplaceholder.typicode.com";
        const response = await axios.get<User[]>(`${apiUrl}/users`);
        setUsers(response.data);
      } catch (err) {
        const error = err as AxiosError;
        setError(`Error al cargar los datos: ${error.message}`);
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchUsers();
  }, [mockUsers]);

  // Filtrar usuarios cuando cambia el termino de busqueda
  useEffect(() => {
    if (!searchTerm) {
      setFilteredUsers(users);
      return;
    }

    const lowercaseSearchTerm = searchTerm.toLowerCase();
    const filtered = users.filter((user) => {
      return (
        user.name.toLowerCase().includes(lowercaseSearchTerm) ||
        user.email.toLowerCase().includes(lowercaseSearchTerm) ||
        user.username.toLowerCase().includes(lowercaseSearchTerm)
        // user.company.name.toLowerCase().includes(lowercaseSearchTerm)
      );
    });

    setFilteredUsers(filtered);
    setCurrentPage(1); // Resetear a la primera pagina cuando se busca
  }, [searchTerm, users]);

  // Funciones para manipular el estado
  const selectUser = (user: User) => {
    setSelectedUser(user);
    setIsUserCardOpen(true);
  };

  const closeUserCard = () => {
    setIsUserCardOpen(false);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  // Valor del contexto
  const value = {
    users,
    filteredUsers,
    isLoading,
    error,
    searchTerm,
    currentPage,
    itemsPerPage,
    selectedUser,
    isUserCardOpen,
    setSearchTerm,
    setCurrentPage,
    setItemsPerPage,
    selectUser,
    closeUserCard,
    clearSearch,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Hook personalizado para usar el contexto
export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext debe ser usado dentro de un UserProvider");
  }
  return context;
};
