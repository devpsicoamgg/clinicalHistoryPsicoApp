import { configureStore } from "@reduxjs/toolkit";
import patientReducer from "./patientSlice";

const store = configureStore({
  reducer: {
    patient: patientReducer, // Aquí debes agregar tus "slices" según sea necesario
  },
});

export default store;