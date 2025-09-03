"use client";
import { useState } from "react";
import "../styles/infoUserCard.css";

type UserCardProps = {
  idUser: number;
  fullName: string;
  email: string;
  dpi: string;
  phoneNumber: string;
  defaultApproved?: boolean;
  onStatusChange?: (status: boolean) => void;
};

export default function SolicitudCard({
  idUser,
  fullName,
  email,
  dpi,
  phoneNumber,
  defaultApproved = false,
  onStatusChange,
}: UserCardProps) {
  const [approved, setApproved] = useState(defaultApproved);

  const handleApprove = () => {
    const next = !approved;
    setApproved(next);
    onStatusChange?.(next);
  };

  const handleSendWhatsApp = () => {
    alert(`📲 Se envió confirmación por WhatsApp al número ${phoneNumber}`);
  };

  const handleSendEmail = () => {
    alert(`📧 Se envió confirmación al correo ${email}`);
  };

  return (
    <div className="user-card">
      <div className="user-card-left">
        <div className="user-card-logo">{idUser}</div>
      </div>

      <div className="user-card-middle">
        <div className="user-card-name">{fullName}</div>
        <div className="user-card-row">
          <span className="user-card-label">Correo:</span>
          <span className="user-card-value">{email}</span>
        </div>
        <div className="user-card-row">
          <span className="user-card-label">DPI:</span>
          <span className="user-card-value">{dpi}</span>
        </div>
        <div className="user-card-row">
          <span className="user-card-label">Teléfono:</span>
          <span className="user-card-value">{phoneNumber}</span>
        </div>
      </div>

      <div className="user-card-right">
        <div
          className={`user-card-status ${approved ? "approved" : "pending"}`}
        >
          {approved ? "Aprobado" : "Pendiente"}
        </div>

        <button
          type="button"
          className={`user-card-button ${approved ? "approved" : "to-approve"}`}
          onClick={handleApprove}
        >
          {approved ? "Aprobado" : "Aprobar"}
        </button>

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
