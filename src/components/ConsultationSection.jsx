import React from "react";
import Dictaphone from "./Dictaphone";
import VoiceTranscriptionBox from "./VoiceTranscriptionBox";

function ConsultationSection({
  toRecord,
  handleStartRecording,
  handleShowVoiceTranscriptionBox,
  showVoiceTranscriptionBox,
  transcriptionText,
  mostrarGuardar,
  handleShowOptions,
}) {
  return (
    <div className="consultation-reason">
      <section>
        {toRecord ? (
          <Dictaphone />
        ) : (
          <>
            {showVoiceTranscriptionBox ? (
              <VoiceTranscriptionBox
                transcript={transcriptionText}
                editable={true}
                onSaveTranscription={handleShowVoiceTranscriptionBox}
              />
            ) : (
              <button
                onClick={handleStartRecording}
                className="mic-button-start"
              >
                GRABAR
              </button>
            )}
            {!showVoiceTranscriptionBox && (
              <button
                onClick={handleShowVoiceTranscriptionBox}
                className="button-write"
              >
                ESCRIBIR
              </button>
            )}
          </>
        )}
      </section>
    </div>
  );
}

export default ConsultationSection;
