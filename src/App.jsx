import React from "react";
import "./App.css";
import { Link, Routes, Route, NavLink } from "react-router-dom";
import BasicDataForm from "./components/BasicDataForm";
import ClinicalHistory from "./components/ClinicalHistory";
import USERCREATION from "./img/creacionUser.jpg";
import CLINICALHISTORY from "./img/apertura.jpg";
import ROUTES from "./api/Helpers/routesHelper";

function App() {
  return (
    <>
      <Routes>
        <Route path={ROUTES.BASIC_DATA_FORM} element={<BasicDataForm />} />
        <Route path={ROUTES.CLINICAL_HISTORY} element={<ClinicalHistory />} />
      </Routes>

      <div className="parent">
        <div className="div1">
          <NavLink to={ROUTES.BASIC_DATA_FORM} className="btn-basic-data-form">
            <img
              src={USERCREATION}
              alt="BATOS BASICOS"
              className="img-basic-data-form"
            />
          </NavLink>
        </div>

        <div className="div5">
          <Link to={ROUTES.CLINICAL_HISTORY} className="btn-clinical-history">
            <img
              src={CLINICALHISTORY}
              alt="HISTORIA CLINICA"
              className="img-clinical-history"
            />
          </Link>
        </div>
      </div>
    </>
  );
}

export default App;
