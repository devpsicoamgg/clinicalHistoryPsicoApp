import { useState } from "react";
import { helpHttp } from "../api/Helpers/helpHttps";

// Define la URL de la API o servidor aquí
const apiUrl = "http://localhost:3000/patients";

export const useForm = (initialForm, validationForm) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [touchedFields, setTouchedFields] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedPatientInfo, setSelectedPatientInfo] = useState({});

  const handleSearch = async () => {
    try {
      console.log("Realizando búsqueda...");
      console.log("URL de búsqueda:", apiUrl);

      // Realizar una solicitud HTTP para buscar pacientes y retornar los datos
      const response = await fetch(`${apiUrl}?search=${searchQuery}`);

      if (response.ok) {
        const data = await response.json();
        console.log("Resultados de búsqueda:", data);
        return data; // Devolver los datos obtenidos
      } else {
        // Manejar el error si es necesario
        console.error("Error al buscar pacientes:", response.status);
        return []; // En caso de error, retornar un arreglo vacío
      }
    } catch (error) {
      // Manejar el error si es necesario
      console.error("Error al buscar pacientes:", error);
      return []; // En caso de error, retornar un arreglo vacío
    }
  };

  const deletePatient = async (patientId) => {
    try {
      console.log("Eliminando paciente con ID:", patientId);
      console.log("URL de eliminación:", `${apiUrl}/${patientId}`);

      // Define la URL de la API o servidor donde eliminarás al paciente
      const apiUrl = `${apiUrl}/${patientId}`;

      // Aquí utilizas http.del correctamente
      const response = await helpHttp().del(apiUrl);
      console.log("Respuesta de eliminación:", response);

      // Verifica si la solicitud DELETE fue exitosa
      if (response.err) {
        console.error("Error al eliminar:", response.status);
        // Maneja el error si es necesario
        // Puedes mostrar un mensaje de error al usuario, por ejemplo
      } else {
        // Eliminación exitosa, actualiza la lista de resultados después de la eliminación
        setSearchResult((prevResults) =>
          prevResults.filter((item) => item.id !== patientId)
        );
      }
    } catch (error) {
      console.error("Error al eliminar el paciente:", error.message);
      // Puedes manejar el error de alguna manera y mostrar un mensaje de error al usuario si lo deseas
    }
  };

  const selectPatient = (patient) => {
    console.log(patient);
    setSelectedPatient(patient);
    setSelectedPatientInfo(patient);
    setSearchResult([]);
  };

  const createData = async (data) => {
    const url = apiUrl; // Utiliza la constante apiUrl definida arriba
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    };

    const result = await fetch(url, options);
    const response = await result.json();
    return response;
  };

  const updateData = async (selectedPatientId, diagnosisData) => {
    console.log(diagnosisData);
    try {
      if (!selectedPatientId || !diagnosisData) {
        console.error("ID de paciente o datos no válidos");
        return;
      }

      const apiUrl = `${apiUrl}/${selectedPatientId}`; // Utiliza la constante apiUrl definida arriba
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(diagnosisData),
      };

      const result = await fetch(apiUrl, options);

      if (!result.ok) {
        const errorMessage = `Error HTTP: ${result.status} ${result.statusText}`;
        const responseText = await result.text();
        throw new Error(`${errorMessage}\nResponse Text: ${responseText}`);
      }

      const response = await result.json();
      return response;
    } catch (error) {
      console.error("Error al enviar datos de diagnóstico a la API:", error);
      throw error;
    }
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === "radio") {
      if (checked) {
        setForm((prevForm) => ({
          ...prevForm,
          [name]: value,
        }));
      }
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;

    setTouchedFields({
      ...touchedFields,
      [name]: true,
    });

    handleChange(e);
    setErrors(validationForm(form));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validationForm(form);
    setErrors(formErrors);
    const hasErrors = Object.keys(formErrors).length > 0;

    if (hasErrors) {
      return;
    }

    setLoading(true);

    try {
      const now = new Date();
      const formattedDate = `${now.getDate()}/${
        now.getMonth() + 1
      }/${now.getFullYear()} - ${now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })}`;

      const newForm = {
        ...form,
        id: new Date().getTime(),
        registrationDate: formattedDate,
      };
      const result = await createData(newForm);
      setResponse(result);
      setForm(initialForm);
    } catch (error) {
      console.error("Error al enviar datos:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPatients = async () => {
    try {
      const url = apiUrl; // Utiliza la constante apiUrl definida arriba
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error al obtener pacientes");
      }
      const data = await response.json();
      return data; // Retorna los datos obtenidos
    } catch (error) {
      console.error("Error al obtener pacientes:", error);
      throw error;
    }
  };

  const searchPatients = async (searchQuery) => {
    try {
      const url = `${apiUrl}?search=${searchQuery}`; // Utiliza la constante apiUrl definida arriba
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error al buscar pacientes");
      }
      const data = await response.json();
      return data; // Retorna los datos obtenidos
    } catch (error) {
      console.error("Error al buscar pacientes:", error);
      throw error;
    }
  };

  const fetchPatients = async () => {
    try {
      const url = apiUrl; // Utiliza la constante apiUrl definida arriba
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error al obtener pacientes");
      }
      const data = await response.json();
      return data; // Retorna los datos obtenidos
    } catch (error) {
      console.error("Error al obtener pacientes:", error);
      throw error;
    }
  };

  return {
    getPatients,
    form,
    errors,
    loading,
    response,
    touchedFields,
    handleChange,
    handleBlur,
    handleSubmit,
    deletePatient,
    updateData,
    patients,
    selectedPatient,
    createData,
    fetchPatients,
    searchPatients,
    searchQuery,
    setSearchQuery,
    searchResult,
    selectedPatientInfo,
    setSearchResult,
    handleSearch,
    selectPatient,
  };
};
