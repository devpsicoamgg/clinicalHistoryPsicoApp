import React, { useEffect, useState, useMemo } from "react";
import { useForm } from "../hooks/useForms";
import validationForm from "../utils/ValidationForm";
import "../styles/BasicDataForm.css";
import { helpHttp } from "../api/Helpers/helpHttps";
import calculateAge from "../api/Helpers/calculateAge";

const EditAndDeleteDataForm = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectPatient,
    searchResult,
    setSearchResult,
    handleSearch,
    updateData,
    selectedPatientInfo,
    deletePatient,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedFields, setEditedFields] = useState({});

  const handleEditarClick = () => {
    setIsEditing(true);
    setEditedFields({});
    console.log("Modo edición activado");
  };



  const handleGuardarClick = async () => {
    const updatedPatientInfo = {
      ...selectedPatientInfo,
      ...editedFields,
    };

    try {
      await updateData(selectedPatientInfo.id, updatedPatientInfo);
      setIsEditing(false);
      console.log("Cambios guardados");
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };

  const handleCancelarClick = () => {
    setIsEditing(false);
    setEditedFields({});
  };

  // ...

  const handleEliminarClick = async () => {
    if (
      selectedPatientInfo &&
      window.confirm("¿Estás seguro de que deseas eliminar este paciente?")
    ) {
      try {
        // Llama a la función para eliminar al paciente
        // Asegúrate de haber agregado la función deletePatient en tu hook useForm
        await deletePatient(selectedPatientInfo.id);
        console.log("Paciente eliminado");
        // Limpia la información del paciente seleccionado
        selectPatient(null);
      } catch (error) {
        console.error("Error al eliminar el paciente:", error);
      }
    }
  };

  useEffect(() => {
    // Inicialmente, no mostrar resultados ni detalles del paciente
    setSearchResult([]);
    selectPatient(null);
  }, []);

  // Filtra los resultados en función del valor actual de searchQuery
  const filteredResults = useMemo(() => {
    if (Array.isArray(searchResult) && searchQuery !== "") {
      const search = searchQuery.toLowerCase();

      return searchResult.filter((item) => {
        const fullName =
          `${item.firstName} ${item.secondName} ${item.firstSurName} ${item.secondSurName}`.toLowerCase();
        const docInfo = `${item.docNumber}`.toLowerCase();
        return fullName.includes(search) || docInfo.includes(search);
      });
    } else {
      return [];
    }
  }, [searchResult, searchQuery]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await handleSearch();
        setSearchResult(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al buscar pacientes:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, setSearchResult]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        className="input-search-patients"
        placeholder="🔎 nombres, apellidos, documentos"
        value={searchQuery}
        onChange={handleInputChange}
      />

      <div>
        {loading ? (
          <p>Cargando pacientes...</p>
        ) : filteredResults.length > 0 ? (
          <table className="patient-info-table">
            <thead>
              <tr>
                <th>NOMBRES</th>
                <th>APELLIDOS</th>
                <th>NÚMERO DE DOCUMENTO</th>
                <th>SELECCIONAR</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((patient) => (
                <tr key={patient.id}>
                  <td>
                    {patient.firstName} {patient.secondName}
                  </td>
                  <td>
                    {patient.firstSurName} {patient.secondSurName}
                  </td>
                  <td>{patient.docNumber}</td>
                  <td>
                    <button onClick={() => selectPatient(patient)}>
                      Seleccionar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>

      {/* Mostrar detalles del paciente seleccionado */}
      {selectedPatientInfo && (
        <div>
          <fieldset>
            <form>
              {/*COLUMNA 1*/}
              <div id="form-column-one" className="form-column">
                {/*PRIMER NOMBRE COL 1*/}

                <div className="question">
                  <label htmlFor="firstNameInput">Primer Nombre: </label>
                  <input
                    type="text"
                    id="firstNameInput"
                    name="firstName"
                    defaultValue={selectedPatientInfo.firstName}
                    onChange={(e) => {
                      selectedPatientInfo.firstName = e.target.value;
                    }}
                    required
                  />
                </div>

                {/*SEGUNDO NOMBRE COL 1*/}

                <div className="question">
                  <label htmlFor="secondNameInput">Segundo Nombre </label>
                  <input
                    type="text"
                    id="secondNameInput"
                    name="secondName"
                    defaultValue={selectedPatientInfo.secondName}
                    onChange={(e) => {
                      selectedPatientInfo.secondName = e.target.value;
                    }}
                  />
                </div>
                {/*PRIMER APELLIDO COL 1*/}

                <div className="question">
                  <label htmlFor="firstSurNameInput"> Primer Apellido</label>
                  <input
                    type="text"
                    id="firstSurNameInput"
                    name="firstSurName"
                    defaultValue={selectedPatientInfo.firstSurName}
                    onChange={(e) => {
                      selectedPatientInfo.firstSurName = e.target.value;
                    }}
                    required
                  />
                </div>
                {/*SEGUNDO APELLIDO COL 1*/}

                <div className="question">
                  <label htmlFor="secondSurNameInput">Segundo apellido:</label>
                  <input
                    type="text"
                    id="secondSurNameInput"
                    name="secondSurName"
                    defaultValue={selectedPatientInfo.secondSurName}
                    onChange={(e) => {
                      selectedPatientInfo.secondSurName = e.target.value;
                    }}
                  />
                </div>
              </div>

              {/*COLUMNA 2*/}
              <div className="form-column">
                {/* TIPO DOCUMENTO  COL 2 */}

                <div className="question">
                  <label htmlFor="kindDocSelect"> Tipo de documento </label>
                  <select
                    id="kindDocSelect"
                    name="kindDoc"
                    defaultValue={selectedPatientInfo.kindDoc}
                    onChange={(e) => {
                      selectedPatientInfo.kindDoc = e.target.value;
                    }}
                    required
                  >
                    <option value="" disabled hidden>
                      🪪 Tipo de documento
                    </option>
                    <option value="Registro civil">Registro civil</option>
                    <option value="Tarjeta de identidad">
                      Tarjeta de identidad
                    </option>
                    <option value="Cédula de ciudadanía">
                      Cédula de ciudadanía
                    </option>
                    <option value="Permiso de permanencia">
                      Permiso especial de permanencia
                    </option>
                    <option value="Cédula extranjería">
                      Cédula de extranjería
                    </option>
                    <option value="Pasaporte">Pasaporte</option>
                    <option value="Visa">Visa</option>
                    <option value="Sin documento">Sin documento</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                {/* NUMERO DOCUMENTO  COL 2 */}

                <div className="question">
                  <label htmlFor="docNumberInput">Numero de documento:</label>
                  <input
                    type="number"
                    inputMode="numeric"
                    id="docNumberInput"
                    name="docNumber"
                    defaultValue={selectedPatientInfo.docNumber}
                    onChange={(e) => {
                      selectedPatientInfo.docNumber = e.target.value;
                    }}
                    required
                  />
                </div>

                {/* FECHA NACIMIENTO   COL 2 */}

                <div className="question">
                  <label htmlFor="nataleDateInput">Fecha Nacimiento:</label>
                  <input
                    type="date"
                    id="nataleDateInput"
                    name="nataleDate"
                    defaultValue={selectedPatientInfo.nataleDate}
                    onChange={(e) => {
                      selectedPatientInfo.nataleDate = e.target.value;
                    }}
                    required
                  />
                </div>

                {/* ESTADO CIVIL COL 2 */}

                <div className="question">
                  <label htmlFor="maritalStatusInput">Estado civil:</label>
                  <select
                    id="maritalStatusInput"
                    name="maritalStatus"
                    defaultValue={selectedPatientInfo.maritalStatus}
                    onChange={(e) => {
                      selectedPatientInfo.maritalStatus = e.target.value;
                    }}
                    required
                  >
                    <option value="" disabled hidden>
                      Estado civil
                    </option>
                    <option value="Soltero/a">Soltero/a</option>
                    <option value="Casado/a">Casado/a</option>
                    <option value="Divorciado/a">Divorciado/a</option>
                    <option value="Viudo/a">Viudo/a</option>
                    <option value="Unión marital de hecho">
                      Unión marital de hecho
                    </option>
                    <option value="Religioso/a">Religioso/a</option>
                    <option value="Otro/a">Otro/a</option>
                    <option value="N/A">N/A</option>
                  </select>
                </div>
              </div>

              {/*COLUMNA 3 */}
              <div className="form-column">
                {/* DISCAPACIDAD COL 3 */}

                <div className="question">
                  <label htmlFor="disabilitySelect">Discapacidad:</label>
                  <select
                    id="disabilitySelect"
                    name="disability"
                    defaultValue={selectedPatientInfo.disability}
                    onChange={(e) => {
                      selectedPatientInfo.disability = e.target.value;
                    }}
                    required
                  >
                    <option value="" disabled hidden>
                      Discapacidad:
                    </option>
                    <option value="No">No</option>
                    <option value="Si">Si</option>
                  </select>
                </div>

                {/* SEXO COL 3 */}
                <div className="question">
                  <label htmlFor="genderSelect"> Género:</label>
                  <select
                    id="genderSelect"
                    name="gender"
                    defaultValue={selectedPatientInfo.gender}
                    onChange={(e) => {
                      selectedPatientInfo.gender = e.target.value;
                    }}
                    required
                  >
                    <option value="" disabled hidden>
                      Género
                    </option>
                    <option value="Femenino">Femenino</option>
                    <option value="Masculino">Masculino</option>
                    <option value="LGTBIQ+">LGTBIQ+</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                {/* OCUPACIÓN COL 3 */}
                <div className="question">
                  <label htmlFor="occupationInput">Ocupación: </label>
                  <input
                    type="text"
                    id="occupationInput"
                    name="occupation"
                    defaultValue={selectedPatientInfo.occupation}
                    onChange={(e) => {
                      selectedPatientInfo.occupation = e.target.value;
                    }}
                    required
                  />
                </div>

                {/*TELEFONO*/}
                <div className="question">
                  <label htmlFor="phoneNumberInput">Número de contacto</label>
                  <input
                    type="number"
                    inputMode="tel"
                    id="phoneNumberInput"
                    name="phoneNumber"
                    defaultValue={selectedPatientInfo.phoneNumber}
                    onChange={(e) => {
                      selectedPatientInfo.phoneNumber = e.target.value;
                    }}
                    required
                  />
                </div>
              </div>

              {/*  COLUMNA 4 */}
              <div id="form-column-four" className="form-column">
                {/* CORREO COL 3 */}
                <div className="question">
                  <label htmlFor="emailInput"> Correo electrónico: </label>
                  <input
                    type="email"
                    id="emailInput"
                    name="email"
                    defaultValue={selectedPatientInfo.email}
                    onChange={(e) => {
                      selectedPatientInfo.email = e.target.value;
                    }}
                    required
                  />
                </div>
              </div>

              <br />
              <div className="action-buttons">
                {isEditing ? (
                  <>
                    <button onClick={handleGuardarClick}>Guardar</button>
                    <button onClick={handleCancelarClick}>Cancelar</button>
                  </>
                ) : (
                  <>
                    <button onClick={handleEditarClick}>Editar</button>
                    <button onClick={handleEliminarClick}>Eliminar</button>
                  </>
                )}
              </div>
            </form>
          </fieldset>
        </div>
      )}
    </div>
  );
};

export default EditAndDeleteDataForm;
