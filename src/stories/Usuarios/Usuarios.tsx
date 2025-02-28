"use client";

import React from "react";
import "./Usuarios.css";
import UserCard from "../UserCard/UserCard";
import { useUserContext } from "../../context/UserContext";

// tipos y enums
export type ItemsPerPageOption = 5 | 10 | 15 | 20;

// interfaces
export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface UsuariosProps {
  mockUsers?: User[];
  /**
   * items por pagina por defecto (usado por el UserProvider)
   */
  defaultItemsPerPage?: ItemsPerPageOption;
}

export const Usuarios: React.FC<UsuariosProps> = () => {
  // usar el contexto
  const {
    filteredUsers,
    isLoading,
    error,
    currentPage,
    itemsPerPage,
    setCurrentPage,
    setItemsPerPage,
    selectUser,
    selectedUser,
    isUserCardOpen,
    closeUserCard,
  } = useUserContext();

  // calcular indices para paginacion
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // funcion para cambiar de pagina
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // funcion para cambiar el numero de elementos por pagina
  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newItemsPerPage = parseInt(e.target.value) as ItemsPerPageOption;
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // resetear a la primera pagina
  };

  // funcion para manejar el clic en un usuario
  const handleUserClick = (user: User) => {
    selectUser(user);
  };

  // mostrar spinner mientras carga
  if (isLoading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  // mostrar mensaje de error si hay alguno
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="usuarios-container">
      {/* controles de paginacion */}
      <div className="pagination-controls">
        <div className="items-per-page">
          <label htmlFor="items-per-page">Items por página:</label>
          <select
            id="items-per-page"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      {/* grid de usuarios */}
      {currentItems.length > 0 ? (
        <div className="usuarios-grid">
          {currentItems.map((user) => (
            <div
              key={user.id}
              className="usuario-card"
              onClick={() => handleUserClick(user)}
            >
              <h3>{user.name}</h3>
              <p>
                <strong>Username:</strong> {user.username}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              {/* <p>
                <strong>Teléfono:</strong> {user.phone}
              </p>
              <div className="company-info">
                <p>
                  <strong>Empresa:</strong> {user.company.name}
                </p>
              </div> */}
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results">
          No se encontraron usuarios que coincidan con la búsqueda.
        </div>
      )}

      {/* paginacion */}
      {filteredUsers.length > 0 && (
        <div className="pagination">
          <button
            className="pagination-button"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`pagination-button ${
                currentPage === i + 1 ? "active" : ""
              }`}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="pagination-button"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      )}

      {/* tarjeta de usuario */}
      {selectedUser && (
        <UserCard
          user={selectedUser}
          isOpen={isUserCardOpen}
          onClose={closeUserCard}
        />
      )}
    </div>
  );
};

export default Usuarios;
