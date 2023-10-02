import "./App.css";
import ClinicalHistory from "./components/ClinicalHistory";
import BasicDataForm from "./components/BasicDataForm";
import EditAndDelete from "./components/EditAndDelete";

function App() {
  return (
    <>
      <BasicDataForm />
      <ClinicalHistory />
      <EditAndDelete />
    </>
  );
}

export default App;
