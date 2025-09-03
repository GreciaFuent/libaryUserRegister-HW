import SolicitudCard from "@/components/infoUser";
import "./adminPage.css";

export default function validationPage() {

  return (
    <div className="div-validation">
        <h3>Todas las Solicitudes</h3>
        <div className="request-container">
          <SolicitudCard 
          idUser={5}
          fullName="Grecia Fuentes"
          email="greciaFuentes307@gmail.com"
          dpi="45454545454545"
          phoneNumber="54758354"/>
          
        </div>
        
    </div>
  );
}
