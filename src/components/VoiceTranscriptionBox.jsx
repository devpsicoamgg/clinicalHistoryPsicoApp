import React, { useState } from "react";
import "../styles/VoiceTranscriptionBox.css";
import SummaryData from "./SummaryData";

const VoiceTranscriptionBox = ({
  transcript,
  listening,
  className,
  editable,
  onSaveMotivoConsulta,
}) => {
  const [motivoConsulta, setMotivoConsulta] = useState("");

  

  const inputProps = {
    id: "transcriptionInput",
    rows: 6,
    placeholder: "",
    className: className,
  };

  const handleMotivoConsultaChange = (event) => {
    setMotivoConsulta(event.target.value);
  };

  if (editable) {
    inputProps.placeholder = "🖥️✏️...digitar el motivo de consulta...";
    return (
      <div className="voice-transcription-box">
        <textarea
          {...inputProps}
          defaultValue={transcript}
          onChange={handleMotivoConsultaChange}
        />
      </div>
    );
  } else {
    inputProps.placeholder =
      "🎙️ ... Da click en empezar para escuchar sonidos... 🎤";
    return (
      <div className="voice-transcription-box">
        <textarea
          {...inputProps}
          value={transcript}
          readOnly
          onChange={handleMotivoConsultaChange}
        />
      </div>
    );
  }
};

export default VoiceTranscriptionBox;
