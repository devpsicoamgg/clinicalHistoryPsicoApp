import SpeechRecognition from "react-speech-recognition";

export const startListening = () =>
  SpeechRecognition.startListening({ continuous: true, language: "es-CO" });
