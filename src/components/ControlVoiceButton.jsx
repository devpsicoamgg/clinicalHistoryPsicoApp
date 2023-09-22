import React from "react";
import microphoneBlack from "../img/micblack.png";
import microphoneWhite from "../img/micwhite.png";



const StartButton = ({ onClick }) => (
  <button onClick={onClick} className="mic-button-start">
    Empezar
  </button>
);

const StopButton = ({ onClick }) => (
  <button onClick={onClick} className="mic-button-stop">
    Parar 
  </button>
);

export { StartButton, StopButton };
