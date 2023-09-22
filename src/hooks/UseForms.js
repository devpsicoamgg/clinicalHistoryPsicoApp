import { useState } from "react";
import { helpHttp } from "../api/Helpers/helpHttps";

export const useForm = (initialForm, validationForm) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [touchedFields, setTouchedFields] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const createData = async (data) => {
    const url = "http://localhost:3000/patients";
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

      const apiUrl = `http://localhost:3000/patients/${selectedPatientId}`;
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
      }/${now.getFullYear()} - ${now.toLocaleTimeString("es-CO", {
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
      const url = "http://localhost:3000/patients";
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
      const url = `http://localhost:3000/patients?search=${searchQuery}`;
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
      const url = "http://localhost:3000/patients";
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
    updateData,
    createData,
    fetchPatients,
    searchPatients,
    searchQuery,
    setSearchQuery,
    searchResult,
    setSearchResult,
  };
};
