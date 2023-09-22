import React, { useEffect, useState, useMemo } from "react";
import { useForm } from "../hooks/useForms";

const SearchPatientResults = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectPatient,
    searchResult,
    setSearchResult,
    handleSearch,
  } = useForm();
  const [loading, setLoading] = useState(false); // Estado de carga

  // Filtra los resultados en función del valor actual de searchQuery
  const filteredResults = useMemo(() => {
    if (Array.isArray(searchResult) && searchQuery !== "") {
      return searchResult.filter((item) => {
        const search = searchQuery.toLowerCase();
        const fullName =
          `${item.firstName} ${item.middleName} ${item.lastName} ${item.secondLastName}`.toLowerCase();
        const docInfo = `${item.kindDoc} ${item.docNumber}`.toLowerCase();

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
        const data = await handleSearch(); // Obtener los datos de handleSearch
        setSearchResult(data); // Actualizar el estado de searchResult con los datos
        setLoading(false);
      } catch (error) {
        console.error("Error al buscar pacientes:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, setSearchResult]); // Añadir setSearchResult como dependencia

  const handleInputChange = (e) => {
    // Actualiza el valor de búsqueda cuando el usuario escribe en el campo
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar pacientes por nombre, apellido, ID o documento"
        value={searchQuery}
        onChange={handleInputChange}
      />

      <div>
        {loading ? (
          <p>Cargando pacientes...</p>
        ) : (
          <ul>
            {filteredResults.map((patient) => (
              <li key={patient.id}>
                {patient.firstName} {patient.middleName} {patient.lastName}{" "}
                {patient.secondLastName}{" "}
                <button onClick={() => selectPatient(patient)}>
                  Seleccionar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchPatientResults;
