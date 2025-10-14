"use client";
import { useState, useEffect } from "react";
import "../styles/infoUserCard.css";

type UserCardProps = {
  idUser: number;
  defaultApproved?: boolean;
  onDarAcceso?: (tipo?: "whatsapp" | "email") => void;
};

export default function SolicitudCard({
  idUser,
  defaultApproved = false,
  onDarAcceso,
}: UserCardProps) {
  const [approved, setApproved] = useState(defaultApproved);
  const [tipoEnvio, setTipoEnvio] = useState<"whatsapp" | "email" | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tipo = params.get("tipo");
    if (tipo === "whatsapp" || tipo === "email") {
      setTipoEnvio(tipo);
    }
  }, []);

  const handleApprove = async () => {
    if (!approved) {
      await onDarAcceso?.(tipoEnvio || undefined);
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
        <div
          className={`user-card-status ${approved ? "approved" : "pending"}`}
        >
          {approved ? "Usuario con acceso" : "Usuario sin acceso"}
        </div>
      </div>

      <div className="user-card-right">
        {!approved && (
          <>
            {tipoEnvio === "whatsapp" ? (
              <button
                type="button"
                className="user-card-button whatsapp"
                onClick={handleApprove}
              >
                Dar acceso y enviar WhatsApp
              </button>
            ) : tipoEnvio === "email" ? (
              <button
                type="button"
                className="user-card-button email"
                onClick={handleApprove}
              >
                Dar acceso y enviar Correo
              </button>
            ) : (
              <button
                type="button"
                className="user-card-button to-approve"
                onClick={handleApprove}
              >
                Dar acceso
              </button>
            )}
          </>
        )}

        {approved && (
          <>
           <h4>Ya fue notificado el usuario</h4>
          </>
        )}
      </div>
    </div>
  );
}
