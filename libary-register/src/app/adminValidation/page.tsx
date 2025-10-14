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

  const handleDarAcceso = async (id: number) => {
    try {
      const res = await fetch(`/api/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ valid_status: true }),
      });

      if (res.ok) {
        setUser((prev) => prev && { ...prev, valid_status: true });
      } else {
        alert("No se pudo dar acceso al usuario");
      }
    } catch (error) {
      console.error("Error al actualizar estado:", error);
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
          onDarAcceso={() => handleDarAcceso(user.id)}
        />
      </div>
    </div>
  );
}
