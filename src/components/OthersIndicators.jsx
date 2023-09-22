import React, { useState } from "react";

const OtherIndicators = () => {
  const categories = [
    "ABUSO SEXUAL",
    "IDEAS DE MUERTE",
    "PLAN SUICIDA",
    "ACTO SUICIDA",
    "CONSUMO PROBLEMATICO",
    "CICLO DE SUEÑO",
    "AFECTIVIDAD & SEXUALIDAD",
    "CICLO DE ALIMENTACIÓN",
    "ACTIVIDAD FISICA",
    "ANTECEDENTES PERSONALES EN SALUD MENTAL",
    "ANTECEDENTES FAMILIARES EN SALUD MENTAL",
    "EDUCACIÓN Y TRABAJO",
    "RELACIONES FAMILIARES",
  ];

  const [indicatorsData, setIndicatorsData] = useState({
    "ABUSO SEXUAL": "",
    "IDEAS DE MUERTE": "",
    "PLAN SUICIDA": "",
    "ACTO SUICIDA": "",
    "CONSUMO PROBLEMATICO": "",
    "CICLO DE SUEÑO": "",
    "AFECTIVIDAD & SEXUALIDAD": "",
    "CICLO DE ALIMENTACIÓN": "",
    "ACTIVIDAD FISICA": "",
    "ANTECEDENTES PERSONALES EN SALUD MENTAL": "",
    "ANTECEDENTES FAMILIARES EN SALUD MENTAL": "",
    "EDUCACIÓN Y TRABAJO": "",
    "RELACIONES FAMILIARES": "",
  });

  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  const handleNext = () => {
    const nextIndex = currentCategoryIndex + 1;
    if (nextIndex < categories.length) {
      setCurrentCategoryIndex(nextIndex);
    }
  };

  const handleBack = () => {
    const prevIndex = currentCategoryIndex - 1;
    if (prevIndex >= 0) {
      setCurrentCategoryIndex(prevIndex);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos de indicadores:", indicatorsData);
  };

  console.log("OTROS INDICADORES", indicatorsData);

  const currentCategory = categories[currentCategoryIndex];

  return (
    <form onSubmit={handleSubmit}>
      <div className="other-indicators-container">
        {currentCategory && (
          <div key={currentCategoryIndex} className="indicator-item">
            <label
              className="category-title-bold"
              htmlFor={`indicator-${currentCategoryIndex}`}
            >
              {currentCategory}:
            </label>{" "}
            <br />
            <input
              type="text"
              id={`indicator-${currentCategoryIndex}`}
              name={`indicator-${currentCategoryIndex}`}
              className="input-area-others-indicators"
              placeholder="Describe...."
              value={indicatorsData[currentCategory]}
              onChange={(e) =>
                setIndicatorsData({
                  ...indicatorsData,
                  [currentCategory]: e.target.value,
                })
              }
            />
          </div>
        )}
        <div className="buttons-container">
          {currentCategoryIndex > 0 && (
            <button className="before-btn" onClick={handleBack}>
              ATRÁS
            </button>
          )}
          <button className="next-btn" onClick={handleNext}>
            SIGUIENTE
          </button>
        </div>
      </div>
    </form>
  );
};

export default OtherIndicators;
