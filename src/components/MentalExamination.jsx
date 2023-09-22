import React, { useState, useRef } from "react";
import SummaryData from "./SummaryData";

const PsychologicalAssessmentForm = () => {
  const categories = [
    "1/10 Porte & Apariencia",
    "2/10 Orientación",
    "3/10 Inteligencia",
    "4/10 Lenguaje",
    "5/10 Afecto",
    "6/10 Senso - Percepción",
    "7/10 Actividad PsicoMotora",
    "8/10 Dispositivos Básicos Aprendizaje Atención",
    "9/10 Dispositivos Básicos Aprendizaje Memoria",
    "10/10 Actitud Ante la Valoración",
  ];

  const [formData, setFormData] = useState(
    categories.reduce((initialState, category) => {
      initialState[category] = {
        "Orientación global": false,
        "Desorientación en persona": false,
        "Desorientación en tiempo": false,
      };
      return initialState;
    }, {})
  );

  const [textInputData, setTextInputData] = useState(
    categories.reduce((initialState, category) => {
      initialState[category] = "";
      return initialState;
    }, {})
  );

  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  const inputRef = useRef(null);

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
    console.log("Casillas de verificación:", formData);
    console.log("Campos de entrada de texto:", textInputData);
  };

  const currentCategory = categories[currentCategoryIndex];

  return (
    <form onSubmit={handleSubmit}>
      <div className="porteyaparienciacontainer">
        <div className="porteyapariencia">
          {currentCategory && (
            <h4 className="category-title">{currentCategory}</h4>
          )}{" "}
          <div className="checkboxport">
            {"      "}
            {currentCategory === "1/10 Porte & Apariencia" && (
              <>
                <div>
                  <select
                    id="porteyapariencia"
                    name="porteyapariencia"
                    className="options-choices"
                    value={textInputData[currentCategory]}
                    onChange={(e) =>
                      setTextInputData({
                        ...textInputData,
                        [currentCategory]: e.target.value,
                      })
                    }
                  >
                    <option value="default"> 🔎 - - - - - -</option>
                    <option value="Limpia y organizada">
                      LIMPIA & ORGANIZADA
                    </option>
                    <option value="Descuidada">DESCUIDADA</option>
                  </select>
                </div>
              </>
            )}
            {"      "}
            {currentCategory === "2/10 Orientación" && (
              <>
                <div>
                  <select
                    id="orientacion"
                    name="orientacion"
                    className="options-choices"
                    value={textInputData[currentCategory]}
                    onChange={(e) =>
                      setTextInputData({
                        ...textInputData,
                        [currentCategory]: e.target.value,
                      })
                    }
                  >
                    <option value="default"> 🔎 - - - - - -</option>
                    <option value="Orientación global">
                      ORIENTACIÓN GLOBAL
                    </option>
                    <option value="Desorientación en persona">
                      DESORIENTACIÓN EN PERSONA
                    </option>
                    <option value="Desorientación en tiempo">
                      DESORIENTACIÓN EN TIEMPO
                    </option>
                    <option value="Desorientación global">
                      DESORIENTACIÓN GLOBAL
                    </option>
                  </select>
                </div>
              </>
            )}
            {"      "}
            {currentCategory === "3/10 Inteligencia" && (
              <div>
                <select
                  id="inteligencia"
                  name="inteligencia"
                  className="options-choices"
                  value={textInputData[currentCategory]}
                  onChange={(e) =>
                    setTextInputData({
                      ...textInputData,
                      [currentCategory]: e.target.value,
                    })
                  }
                >
                  <option value="default"> 🔎 - - - - - -</option>
                  <option value="Aparenta promedio a la media poblacional">
                    APARENTA PROMEDIO
                  </option>
                  <option value="No se valora">NO SE VALORA</option>
                  <option value="Se recomienda tamizaje">
                    SE RECOMIENDA VALORACIÓN
                  </option>
                </select>
              </div>
            )}
            {"      "}
            {currentCategory === "4/10 Lenguaje" && (
              <div>
                <select
                  id="lenguaje"
                  name="lenguaje"
                  className="options-choices"
                  value={textInputData[currentCategory]}
                  onChange={(e) =>
                    setTextInputData({
                      ...textInputData,
                      [currentCategory]: e.target.value,
                    })
                  }
                >
                  <option value="default"> 🔎 - - - - - -</option>
                  <option value="Aparenta compromiso">
                    APARENTA COMPROMISO
                  </option>
                  <option value="Sin aparente compromiso a nivel expresivo y comprensivo">
                    SIN APARENTE DIFICULTAD A NIVEL EXPRESIVO Y/O COMPRENSIVO
                  </option>
                </select>
              </div>
            )}
            {"      "}
            {currentCategory === "5/10 Afecto" && (
              <div>
                <select
                  id="afecto"
                  name="afecto"
                  className="options-choices"
                  value={textInputData[currentCategory]}
                  onChange={(e) =>
                    setTextInputData({
                      ...textInputData,
                      [currentCategory]: e.target.value,
                    })
                  }
                >
                  <option value="default"> 🔎 - - - - - -</option>
                  <option value="Anedonía">ANEDONIA</option>
                  <option value="Labilidad">LABILIDAD</option>
                  <option value="Tenacidad">TENCIDAD</option>
                  <option value="Disociación Ideo-Afectiva">
                    DISOCIACIÓN IDEO-AFECTIVA
                  </option>
                  <option value="Afecto plano">AFECTO PLANO</option>
                  <option value="Afecto inapropiado">AFECTO INAPROPIADO</option>
                  <option value="Afecto insuficiente">
                    {" "}
                    AFECTO INSUFICIENTE
                  </option>
                  <option value="Alogia">ALOGIA</option>
                  <option value="Abulia">ABULIA</option>
                </select>
              </div>
            )}
            {"      "}
            {currentCategory === "6/10 Senso - Percepción" && (
              <>
                <div>
                  <select
                    id="sensopercepcion"
                    name="sensopercepcion"
                    className="options-choices"
                    value={textInputData[currentCategory]}
                    onChange={(e) =>
                      setTextInputData({
                        ...textInputData,
                        [currentCategory]: e.target.value,
                      })
                    }
                  >
                    <option value="default"> 🔎 - - - - - -</option>
                    <option value="Cuadro Ilusorio">CUADRO ILUSORIO</option>
                    <option value="Cuadro Alucinatorio">
                      CUADRO ALUCINATORIO
                    </option>
                    <option value="Distorsión Sensorial">
                      DISTORSIÓN SENSOPERCEPTUAL
                    </option>
                    <option value="Sin distorsiones senso-perceptuales">
                      SIN DISTORSIONES SENSO-PERCEPTUALES
                    </option>
                  </select>
                </div>
              </>
            )}
            {"      "}
            {currentCategory === "7/10 Actividad PsicoMotora" && (
              <>
                <div>
                  <select
                    id="actividadpsicomotora"
                    name="actividadpsicomotora"
                    className="options-choices"
                    value={textInputData[currentCategory]}
                    onChange={(e) =>
                      setTextInputData({
                        ...textInputData,
                        [currentCategory]: e.target.value,
                      })
                    }
                  >
                    <option value="default"> 🔎 - - - - - -</option>
                    <option value="Movimientos corporales fluidos">
                      MOVIMIENTOS CORPORALES FLUIDOS
                    </option>
                    <option value="Dificultad y afecciones a nivel de movimiento">
                      AFECCIONES Y DIFICULTADES A NIVEL DE MOVIMIENTOS
                    </option>
                    <option value="Uso de ayudas, extensiones y/o prótesis">
                      USO DE AYUDAS, EXTENSIONES Y/O PRÓTESIS
                    </option>
                  </select>
                </div>
              </>
            )}
            {"      "}
            {currentCategory ===
              "8/10 Dispositivos Básicos Aprendizaje Atención" && (
              <>
                <div>
                  <select
                    id="dbaatencion"
                    name="dbaatencion"
                    className="options-choices"
                    value={textInputData[currentCategory]}
                    onChange={(e) =>
                      setTextInputData({
                        ...textInputData,
                        [currentCategory]: e.target.value,
                      })
                    }
                  >
                    <option value="default"> 🔎 - - - - - -</option>
                    <option value="Logra focalizar atención y mantenerla (euprosexia)">
                      EUPROSÉXICA
                    </option>
                    <option value="Afecciones a nivel de atención , bajo nivel para focalizar y mentener atención">
                      HIPOPROSÉXICA
                    </option>
                    <option value="Tendencia muy alerta, cambio constante de foco de atención">
                      HIPERPROSEXIA
                    </option>
                  </select>
                </div>
              </>
            )}
            {"        "}
            {currentCategory ===
              "9/10 Dispositivos Básicos Aprendizaje Memoria" && (
              <>
                <div className="explanation-select">
                  <select
                    id="dbamemoria"
                    name="dbamemoria"
                    className="options-choices-dbamemoria"
                    value={textInputData[currentCategory]}
                    onChange={(e) =>
                      setTextInputData({
                        ...textInputData,
                        [currentCategory]: e.target.value,
                      })
                    }
                  >
                    <option value="default"> 🔎 - - - - - -</option>
                    <option
                      value="EUMNESIA (sin alteración cualitativa o cuantitativa)"
                      className="cualitativa"
                    >
                      EUMNESIA (sin alteración cualitativa o cuantitativa)
                    </option>
                    <option
                      value="DÉJÀ VU (Refiere sensaciones de que una situación actual
                        ya ha sido experimentada)"
                      className="cualitativa"
                    >
                      DÉJÀ VU (Refiere sensaciones de que una situación actual
                      ya ha sido experimentada)
                    </option>
                    <option
                      value="JAMAIS VU (Refiere sensaciones de que una situación familiar es completamente nueva y desconocida)"
                      className="cualitativa"
                    >
                      JAMAIS VU (Refiere sensaciones de que una situación
                      familiar es completamente nueva y desconocida)
                    </option>
                    <option
                      value="ILUSIÓN DE LA MEMORIA (Refiere la sensación de valorar recuerdos como más precisos o completos de lo que es en realidad)"
                      className="cualitativa"
                    >
                      ILUSIÓN DE LA MEMORIA (Sensación de valorar recuerdos como
                      más precisos de lo que son en realidad)
                    </option>
                    <option
                      value="ALUCINACIÓN DE LA MEMORIA (Experimenta recuerdos que no están basados en eventos reales)"
                      className="cualitativa"
                    >
                      ALUCINACIÓN DE LA MEMORIA (Experimenta recuerdos que no
                      están basados en eventos reales)
                    </option>
                    <option
                      value="Creación involuntaria de relatos o información falsa para llenar lagunas en la memoria"
                      className="cualitativa"
                    >
                      CONFABULACIÓN
                    </option>
                    <option
                      value="Reaparición de un recuerdo olvidado como algo nuevo y original"
                      className="cualitativa"
                    >
                      CRIPTOMNESIA
                    </option>
                    <option
                      value="Sentimiento de que el momento actual es idéntico a un momento pasado"
                      className="cualitativa"
                    >
                      ECMNESIA
                    </option>
                    <option
                      value="Creencia de que un lugar o persona ha sido duplicado o copiado"
                      className="cualitativa"
                    >
                      PARAMNESIA REDUPLICADORA
                    </option>

                    <option
                      value="Amnesia: ausencia de recuerdo de un período determinado. Puede ser total o parcial."
                      className="cuantitativa"
                    >
                      AMNESIA: ausencia de recuerdo de un período determinado.
                      Puede ser total o parcial.
                    </option>
                    <option
                      value="Hipomnesia: disminución de la memoria debida a la incapacidad de fijar y evocar"
                      className="cuantitativa"
                    >
                      HIPOMNESIA: disminución de la memoria debida a la
                      incapacidad de fijar y evocar
                    </option>
                    <option
                      value="Hipermnesia: mayor facilidad para evocar"
                      className="cuantitativa"
                    >
                      HIPERMNESIA: mayor facilidad para evocar
                    </option>
                    <option
                      value="Dismnesia: impide actualizar un recuerdo en un momento dado mientras evoca otro en forma borrosa o poco nítida, etc."
                      className="cuantitativa"
                    >
                      DISMNESIA: impide actualizar un recuerdo en un momento
                      dado mientras evoca otro en forma borrosa o poco nítida,
                      etc.
                    </option>
                  </select>
                </div>
              </>
            )}
            {"      "}
          </div>
          <input
            type="text"
            id={`cat-${currentCategory}`}
            name={`cat-${currentCategory}`}
            value={textInputData[currentCategory]}
            onChange={(e) =>
              setTextInputData({
                ...textInputData,
                [currentCategory]: e.target.value,
              })
            }
            ref={inputRef}
          />
        </div>

        <div className="results">
          <p>{textInputData[currentCategory]}</p>
        </div>

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

export default PsychologicalAssessmentForm;
