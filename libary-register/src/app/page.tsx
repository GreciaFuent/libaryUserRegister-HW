"use client";

import { useState } from "react";
import "./page.css";

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="main-container">
      <div className="div-info">
        <h2>Bienvenido al servicio bibliotecario</h2>
        <p>Para poder acceder a los libros es necesario que se registre</p>
        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.646 9.646a.5.5 0 01.708 0L8 12.293l2.646-2.647a.5.5 0 01.708.708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 010-.708z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M8 2.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V3a.5.5 0 01.5-.5z" clip-rule="evenodd"></path></svg>
        <button className="btn-open-form" onClick={handleToggleForm}>
          Registrarse
        </button>
      </div>

      <div className="img">
        {showForm && (
          <form className="form-container">
            <div className="form-group">
              <label htmlFor="name">Nombre:</label>
              <input type="text" id="name" name="name" required />
            </div>

            <div className="form-group">
              <label htmlFor="dpi">DPI:</label>
              <input type="text" id="dpi" name="dpi" required />
            </div>

            <div className="form-group">
              <label htmlFor="birth">Fecha de Nacimiento:</label>
              <input type="date" id="birth" name="birth" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo electrónico:</label>
              <input type="email" id="email" name="email" required />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña:</label>
              <input type="password" id="password" name="password" required />
            </div>

            <button type="submit">Guardar</button>
          </form>
        )}
      </div>
    </div>
  );
}
