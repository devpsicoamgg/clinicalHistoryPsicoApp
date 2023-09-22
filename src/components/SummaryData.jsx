import React from "react";

const SummaryData = ({ name, textInputData }) => {
  return (
    <div className="summary">
      <h2>Resumen de indicadores</h2>
      <h2> {name} </h2>
    </div>
  );
};

export default SummaryData;
