import React from "react";
import { useForm } from "../hooks/useForms";

function OtroComponente() {
  const { selectedPatient, selectedPatientInfo } = useForm();

  return (
    <div>
      {selectedPatient ? (
        <div>
          <p>Nombre del paciente seleccionado: {selectedPatient.firstName}</p>
          <p>
            Nombre del paciente seleccionado: {selectedPatientInfo.firstName}
          </p>
          {/* Otros datos del paciente si es necesario */}
        </div>
      ) : (
        <p>No hay paciente seleccionado</p>
      )}
    </div>
  );
}

export default OtroComponente;
