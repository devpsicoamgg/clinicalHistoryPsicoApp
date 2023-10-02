import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedPatient: null, // Almacenará la información del paciente seleccionado
  patients: [], // Almacenará la lista de pacientes
};

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    selectPatient: (state, action) => {
      state.selectedPatient = action.payload;
    },
    addPatient: (state, action) => {
      state.patients.push(action.payload);
    },
    updatePatient: (state, action) => {
      // Actualizar la información del paciente
      const updatedPatient = action.payload;
      state.patients = state.patients.map((patient) =>
        patient.id === updatedPatient.id ? updatedPatient : patient
      );
    },
    deletePatient: (state, action) => {
      // Eliminar al paciente por ID
      const patientId = action.payload;
      state.patients = state.patients.filter((patient) => patient.id !== patientId);
      state.selectedPatient = null;
    },
  },
});

export const { selectPatient, addPatient, updatePatient, deletePatient } =
  patientSlice.actions;

export default patientSlice.reducer;
