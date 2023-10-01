import React, { useState } from "react";

const DiagnosesImpression = ({ onUpdateDiagnosisData }) => {
  const [diagnosisData, setDiagnosisData] = useState({
    mainDiagnosis: "",
    relatedDiagnosis1: "",
    relatedDiagnosis2: "",
    relatedDiagnosis3: "",
    mainDiagnosisType: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDiagnosisData({
      ...diagnosisData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

    if (selectedPatientId) {
      try {
        onUpdateDiagnosisData(diagnosisData); // Llama a la función de callback para enviar datos al padre
        setDiagnosisData({
          mainDiagnosis: "",
          relatedDiagnosis1: "",
          relatedDiagnosis2: "",
          relatedDiagnosis3: "",
          mainDiagnosisType: "",
        });
      } catch (error) {
        console.error("Error al enviar datos a la API:", error);
      }
    } else {
      console.error("selectedPatient no es válido");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="diagnoses-impression-container">
          <div className="diagnoses-impression">
            <label className="label-dx-pp">Diagnóstico Principal:</label>
            <input
              type="text"
              name="mainDiagnosis"
              className="input-diagnosis"
              placeholder="Ingresa un diagnostico principal"
              value={diagnosisData.mainDiagnosis}
              onChange={handleInputChange}
            />
            <select
              name="mainDiagnosisType"
              className="label-dx-choices"
              value={diagnosisData.mainDiagnosisType}
              onChange={handleInputChange}
            >
              <option value="">Seleccione...</option>
              <option value="Impresión Diagnóstica">
                Impresión Diagnóstica
              </option>
              <option value="Confirmado Nuevo">Confirmado Nuevo</option>
              <option value="Confirmado Repetido">Confirmado Repetido</option>
            </select>
          </div>

          <div className="diagnoses-impression">
            <label className="label-dx">Diagnóstico Relacionado 1:</label>
            <input
              type="text"
              name="relatedDiagnosis1"
              placeholder="Ingresa un diagnostico relacionado 1-uno si existe"
              className="input-diagnosis"
              value={diagnosisData.relatedDiagnosis1}
              onChange={handleInputChange}
            />
          </div>
          <div className="diagnoses-impression">
            <label className="label-dx">Diagnóstico Relacionado 2:</label>
            <input
              type="text"
              name="relatedDiagnosis2"
              className="input-diagnosis"
              placeholder="Ingresa un diagnostico relacionado 2-dos si existe"
              value={diagnosisData.relatedDiagnosis2}
              onChange={handleInputChange}
            />
          </div>

          <div className="diagnoses-impression">
            <label className="label-dx">Diagnóstico Relacionado 3:</label>
            <input
              type="text"
              name="relatedDiagnosis3"
              placeholder="Ingresa un diagnostico relacionado 3-tres si existe"
              className="input-diagnosis"
              value={diagnosisData.relatedDiagnosis3}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default DiagnosesImpression;
