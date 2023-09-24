import React, { useState, useEffect, useMemo } from "react";
import { useForm } from "../hooks/useForms";
import { helpHttp } from "../api/Helpers/helpHttps";
import Dictaphone from "./Dictaphone";
import "../styles/ClinicalHistory.css";
import VoiceTranscriptionBox from "./VoiceTranscriptionBox";
import MentalExamination from "./MentalExamination";
import ConsultationSection from "./ConsultationSection";
import OtherIndicators from "./OthersIndicators";
import DiagnosesImpression from "./DiagnosysImpresion";
import SearchPatientResults from "./SearchPatientResults";
import OtroComponente from "./Examples";

const ClinicalHistory = () => {
  const [patients, setPatients] = useState([]);
  const [toRecord, setToRecord] = useState(false);
  const [showVoiceTranscriptionBox, setShowVoiceTranscriptionBox] =
    useState(false);
  const [transcriptionText, setTranscriptionText] = useState("");
  const [mostrarGuardar, setMostrarGuardar] = useState(false);
  const [showOptionsConsultation, setShowOptionsConsultation] = useState(false);
  const [showOptionsMentalExamination, setShowOptionsMentalExamination] =
    useState(false);
  const [showOptionsOtherIndicators, setShowOptionsOtherIndicators] =
    useState(false);
  const [showDiagnosesImpression, setShowDiagnosesImpression] = useState(false);
  const [showDiagnosesSummaryData, setShowDiagnosesSummaryData] =
    useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [motivoConsultaTexto, setMotivoConsultaTexto] = useState("");
  const [diagnosesData, setDiagnosesData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const { getPatients, updateData, fetchPatients, searchPatients } = useForm();

  return (
    <>
      <div className="clinical-history-container">
        <h1> HISTORIA CLÍNICA PSICOLOGÍA </h1>
        <SearchPatientResults
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <div className="consultation-reason">
          <button
            className="btn-show-consultation-reason"
            onClick={() => setShowOptionsConsultation(!showOptionsConsultation)}
          >
            Motivo de Consulta
          </button>
          {showOptionsConsultation && (
            <div>
              <ConsultationSection
                toRecord={toRecord}
                handleStartRecording={() => setToRecord(true)}
                handleShowVoiceTranscriptionBox={() =>
                  setShowVoiceTranscriptionBox(true)
                }
                showVoiceTranscriptionBox={showVoiceTranscriptionBox}
                transcriptionText={transcriptionText}
                mostrarGuardar={mostrarGuardar}
              />
              <button
                className="btn-consultation-reason-close"
                onClick={() => setShowOptionsConsultation(false)}
              >
                Cerrar
              </button>
              <button className="btn-save">GUARDAR</button>
            </div>
          )}
        </div>

        <div className="mental-examination">
          <button
            className="btn-show-mental-examination"
            onClick={() =>
              setShowOptionsMentalExamination(!showOptionsMentalExamination)
            }
          >
            Examen Mental
          </button>
          {showOptionsMentalExamination && (
            <div>
              <MentalExamination />
              <button
                className="btn-close-consultation-reason"
                onClick={() => setShowOptionsMentalExamination(false)}
              >
                CERRAR
              </button>
              <button className="btn-save">GUARDAR</button>
            </div>
          )}
        </div>

        <div className="others-indicators">
          <button
            onClick={() =>
              setShowOptionsOtherIndicators(!showOptionsOtherIndicators)
            }
            className="btn-show-other-indicators"
          >
            Otros Indicadores
          </button>
          {showOptionsOtherIndicators && (
            <div>
              <OtherIndicators />
              <button
                className="btn-close-other-indicators"
                onClick={() => setShowOptionsOtherIndicators(false)}
              >
                CERRAR
              </button>
              <button className="btn-save">GUARDAR</button>
            </div>
          )}
        </div>

        <div className="diagnoses-impression-container">
          <button
            onClick={() => setShowDiagnosesImpression(!showDiagnosesImpression)}
            className="btn-show-diagnoses-impression"
          >
            Impresión Diagnostica
          </button>
          {showDiagnosesImpression && (
            <div>
              <DiagnosesImpression />
              <button
                className="btn-close-diagnoses-impression"
                onClick={() => setShowDiagnosesImpression(false)}
              >
                CERRAR
              </button>
              <button
                className="btn-save"
                onClick={() => {
                  if (selectedPatient) {
                    updateData(selectedPatient.id, diagnosesData);
                  }
                }}
              >
                GUARDAR
              </button>
            </div>
          )}
        </div>

        <div className="summary-data-container">
          <button
            onClick={() =>
              setShowDiagnosesSummaryData(!showDiagnosesSummaryData)
            }
            className="btn-show-diagnoses-data"
          >
            Recopilación Datos & IA
          </button>
          {showDiagnosesSummaryData && (
            <div>
              <button
                className="btn-close-diagnoses-data"
                onClick={() => setShowDiagnosesSummaryData(false)}
              >
                CERRAR
              </button>
              <button className="btn-save">GUARDAR</button>
            </div>
          )}
        </div>
      </div>
<OtroComponente />

    </>
  );
};

export default ClinicalHistory;
