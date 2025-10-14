"use client";

import { useEffect, useState } from "react";
import SolicitudCard from "@/components/infoUser";
import "./adminPage.css";

type User = {
  id: number;
  valid_status: boolean;
};

export default function ValidationPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
      setError("No se proporcionó un ID en la URL");
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/${id}`);
        const data = await res.json();

        if (!res.ok && data?.message === "No tiene acceso") {
          setUser({ id: Number(id), valid_status: false });
        } else {
          setUser({ id: Number(id), valid_status: true });
        }
      } catch (error) {
        console.error("Error al cargar usuario:", error);
        setError("Error de conexión con el servidor");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleDarAcceso = async (tipo?: "whatsapp" | "email") => {
    if (!user) return;
    try {
      const url = tipo
        ? `/api/${user.id}?tipo=${tipo}`
        : `/api/${user.id}`;

      const res = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ valid_status: true }),
      });

      const data = await res.json();

      if (res.ok) {
        setUser((prev) => prev && { ...prev, valid_status: true });
        alert(
          tipo === "email"
            ? `Acceso concedido y correo enviado correctamente`
            : tipo === "whatsapp"
            ? `Acceso concedido y WhatsApp enviado correctamente`
            : `Acceso concedido sin notificación`
        );
      } else {
        console.log("siempre tira esto ")
      }
    } catch (error) {
      console.error("Error al actualizar estado:", error);
      alert("Error de conexión con el servidor");
    }
  };

  if (loading) return <p>Cargando usuario...</p>;
  if (error) return <p>{error}</p>;
  if (!user) return <p>No se encontró ningún usuario.</p>;

  return (
    <div className="div-validation">
      <h3>Solicitud de Acceso al Sistema</h3>

      <p className="status-text">
        {user.valid_status
          ? "Usuario con acceso al sistema"
          : "Usuario sin acceso"}
      </p>

      <div className="request-container">
        <SolicitudCard
          idUser={user.id}
          defaultApproved={user.valid_status}
          onDarAcceso={handleDarAcceso}
        />
      </div>
    </div>
  );
}
