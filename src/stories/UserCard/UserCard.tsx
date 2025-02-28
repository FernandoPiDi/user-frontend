"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import "./UserCard.css";
import { User } from "../Usuarios/Usuarios";

export interface UserCardProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export const UserCard: React.FC<UserCardProps> = ({
  user,
  isOpen,
  onClose,
}) => {
  const [animationState, setAnimationState] = useState<
    "opening" | "closing" | "idle"
  >("idle");
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // manejar el  cierre con animacion
  const handleClose = useCallback(() => {
    setAnimationState("closing");

    setTimeout(() => {
      onClose();
      setAnimationState("idle");
    }, 200); // Duración de la animación de cierre actualizada
  }, [onClose]);

  // manejar clic fuera de la tarjeta para cerrar
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      handleClose();
    }
  };

  // prevenir que el scroll del fondo cuando se hace scroll en la tarjeta
  useEffect(() => {
    const preventBackgroundScroll = (e: WheelEvent) => {
      if (
        isOpen &&
        cardRef.current &&
        cardRef.current.contains(e.target as Node)
      ) {
        // No hacer nada, permitir el scroll dentro de la tarjeta
      } else if (isOpen) {
        // Prevenir scroll en el fondo cuando el modal está abierto
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", preventBackgroundScroll, {
      passive: false,
    });

    return () => {
      window.removeEventListener("wheel", preventBackgroundScroll);
    };
  }, [isOpen]);

  // manejar tecla escape para cerrar
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, handleClose]);

  // efecto para la animacion de apertura
  useEffect(() => {
    if (isOpen) {
      setAnimationState("opening");
      setTimeout(() => {
        setAnimationState("idle");
      }, 200); // Duración de la animación de apertura actualizada
    }
  }, [isOpen]);

  // si no hay usuario o no esta abierto, no renderizar nada
  if (!user || !isOpen) {
    return null;
  }

  return (
    <div
      className={`user-card-overlay ${isOpen ? "open" : ""}`}
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      <div className={`user-card ${animationState}`} ref={cardRef}>
        <div className="user-card-header">
          <h2>{user.name}</h2>
          <button className="close-button" onClick={handleClose}>
            &times;
          </button>
        </div>

        <div className="user-info-section">
          <div className="section-header">
            <h3>Información Personal</h3>
          </div>
          <div className="section-content">
            <div className="info-row">
              <span className="info-label">Nombre de usuario:</span>
              <span className="info-value">{user.username}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Email:</span>
              <span className="info-value">{user.email}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Teléfono:</span>
              <span className="info-value">{user.phone}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Sitio web:</span>
              <span className="info-value">
                <a
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {user.website}
                </a>
              </span>
            </div>
          </div>
        </div>

        <div className="user-info-section">
          <div className="section-header">
            <h3>Dirección</h3>
          </div>
          <div className="section-content">
            <div className="info-row">
              <span className="info-label">Calle:</span>
              <span className="info-value">{user.address.street}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Suite/Apt:</span>
              <span className="info-value">{user.address.suite}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Ciudad:</span>
              <span className="info-value">{user.address.city}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Código postal:</span>
              <span className="info-value">{user.address.zipcode}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Coordenadas:</span>
              <span className="info-value">
                Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}
              </span>
            </div>
          </div>
        </div>

        <div className="user-info-section">
          <div className="section-header">
            <h3>Empresa</h3>
          </div>
          <div className="section-content">
            <div className="info-row">
              <span className="info-label">Nombre:</span>
              <span className="info-value">{user.company.name}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Eslogan:</span>
              <span className="info-value">{user.company.catchPhrase}</span>
            </div>
            <div className="info-row">
              <span className="info-label">BS:</span>
              <span className="info-value">{user.company.bs}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
