import React, { useEffect, useState, useMemo } from "react";
import { useForm } from "../hooks/useForms";
import calculateAge from "../api/Helpers/calculateAge";

const SearchPatientResults = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectPatient,
    searchResult,
    setSearchResult,
    handleSearch,
    selectedPatientInfo,
  } = useForm();
  const [loading, setLoading] = useState(false); // Estado de carga

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
          `${item.firstName} ${item.middleName} ${item.lastName} ${item.secondLastName}`.toLowerCase();
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
          <h2>Información:</h2>
          <table className="patient-info-table">
            <tbody>
              <tr>
                <td className="title-table">Nombre:</td>
                <td className="show-table-result">
                  {selectedPatientInfo.firstName}
                </td>
                <td className="title-table">Segundo Nombre:</td>
                <td className="show-table-result">
                  {selectedPatientInfo.secondName}
                </td>
              </tr>
              <tr>
                <td className="title-table">Primer Apellido:</td>
                <td className="show-table-result">
                  {selectedPatientInfo.firstSurName}
                </td>
                <td className="title-table">Segundo Apellido:</td>
                <td className="show-table-result">
                  {selectedPatientInfo.secondSurName}
                </td>
              </tr>
              <tr>
                <td className="title-table">Tipo de Documento:</td>
                <td className="show-table-result">
                  {selectedPatientInfo.kindDoc}
                </td>
                <td className="title-table">Número de Documento:</td>
                <td className="show-table-result">
                  {selectedPatientInfo.docNumber}
                </td>
              </tr>
              <tr>
                <td className="title-table">Fecha de Nacimiento:</td>
                <td className="show-table-result">
                  {selectedPatientInfo.nataleDate}
                </td>
                <td className="title-table">Edad:</td>
                <td>{calculateAge(selectedPatientInfo.nataleDate)}</td>
              </tr>
              <tr>
                <td className="title-table">Estado Civil:</td>
                <td className="show-table-result">
                  {selectedPatientInfo.maritalStatus}
                </td>

                <td className="title-table">Discapacidad:</td>
                <td className="show-table-result">
                  {selectedPatientInfo.disability}
                </td>
              </tr>
              <tr>
                <td className="title-table">Género:</td>
                <td className="show-table-result">
                  {selectedPatientInfo.gender}
                </td>

                <td className="title-table">Ocupación:</td>
                <td className="show-table-result">
                  {selectedPatientInfo.occupation}
                </td>
              </tr>
              <tr>
                <td className="title-table">Número de Teléfono:</td>
                <td className="show-table-result">
                  {selectedPatientInfo.phoneNumber}
                </td>

                <td className="title-table">Correo Electrónico:</td>
                <td className="show-table-result">
                  {selectedPatientInfo.email}
                </td>
              </tr>
              <tr>
                <td className="title-table">Fecha de Registro:</td>
                <td className="show-table-result">
                  {selectedPatientInfo.registrationDate}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SearchPatientResults;
