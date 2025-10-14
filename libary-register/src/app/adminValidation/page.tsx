"use client";

import { useEffect, useState } from "react";
import SolicitudCard from "@/components/infoUser";
import InMemoryBookRepository from "@/utils/in-memory-book-repository"; 
import "./adminPage.css";

type User = {
  id: number;
  valid_status: boolean;
};

type Book = {
  name: string;
  datePublish: string;
  author: string;
};

export default function ValidationPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [books, setBooks] = useState<Book[]>([]); // ✅ nuevo estado

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

        // Si no tiene acceso
        if (!res.ok && data?.message === "No tiene acceso") {
          setUser({ id: Number(id.split("?")[0]), valid_status: false });
        } else {
          // Si tiene acceso
          setUser({ id: Number(id.split("?")[0]), valid_status: true });

          const repo = new InMemoryBookRepository();
          const bookList = await repo.find();
          setBooks(bookList as unknown as Book[]);
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

      
        const repo = new InMemoryBookRepository();
        const bookList = await repo.find();
        setBooks(bookList as unknown as Book[]);

        alert(
          tipo === "email"
            ? `Acceso concedido y correo enviado correctamente`
            : tipo === "whatsapp"
            ? `Acceso concedido y WhatsApp enviado correctamente`
            : `Acceso concedido sin notificación`
        );
      } else {
        alert("❌ No se pudo dar acceso al usuario");
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
          onDarAcceso={handleDarAcceso}
        />
      </div>

      {user.valid_status && books.length > 0 && (
        <div className="books-section">
          <h4>📚 Libros disponibles</h4>
          <ul className="books-list">
            {books.map((book, index) => (
              <li key={index} className="book-card">
                <div className="book-title">{book.name}</div>
                <div className="book-author">Autor: {book.author}</div>
                <div className="book-date">
                  Publicado en {new Date(book.datePublish).getFullYear()}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
