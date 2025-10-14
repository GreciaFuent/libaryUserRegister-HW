"use client";
import { useState } from "react";
import "../styles/infoUserCard.css";

type UserCardProps = {
  idUser: number;
  defaultApproved?: boolean;
  onDarAcceso?: () => void;
};

export default function SolicitudCard({
  idUser,
  defaultApproved = false,
  onDarAcceso,
}: UserCardProps) {
  const [approved, setApproved] = useState(defaultApproved);

  const handleApprove = async () => {
    if (!approved) {
      await onDarAcceso?.();
      setApproved(true);
    }
  };

  const handleSendWhatsApp = () => {
    alert(`📲 Se envió confirmación por WhatsApp al usuario con ID ${idUser}`);
  };

  const handleSendEmail = () => {
    alert(`📧 Se envió confirmación por correo al usuario con ID ${idUser}`);
  };

  return (
    <div className="user-card">
      <div className="user-card-left">
        <div className="user-card-logo">{idUser}</div>
      </div>

      <div className="user-card-middle">
        <div className={`user-card-status ${approved ? "approved" : "pending"}`}>
          {approved ? "Usuario con acceso" : "Usuario sin acceso"}
        </div>
      </div>

      <div className="user-card-right">
        {!approved && (
          <button
            type="button"
            className="user-card-button to-approve"
            onClick={handleApprove}
          >
            Dar acceso
          </button>
        )}

        {approved && (
          <>
            <button
              type="button"
              className="user-card-button whatsapp"
              onClick={handleSendWhatsApp}
            >
              Enviar WhatsApp
            </button>
            <button
              type="button"
              className="user-card-button email"
              onClick={handleSendEmail}
            >
              Enviar Correo
            </button>
          </>
        )}
      </div>
    </div>
  );
}
