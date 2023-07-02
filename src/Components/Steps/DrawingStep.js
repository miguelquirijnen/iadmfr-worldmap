import React, { useRef } from "react";
import Canvas from "../Canvas";
import { START_POSITIONS, svgNS, DRAG_FACTORS } from "../../constants";

function DrawingStep({
  handleReturnClick,
  nextStep,
  setCurrentMessage,
  currentContinent,
  setDataUrl,
}) {
  const canvasRef = useRef(null);

  // Confirm the sketched message
  const handleConfirmMessageClick = async (e) => {
    const canvas = document.getElementById("canvas");
    const dataURL = canvas.toDataURL("image/png");
    setDataUrl(dataURL);

    // Create the <image> element
    var imageElement = document.createElementNS(svgNS, "image");

    // Set the necessary attributes
    imageElement.style.zIndex = "1999";
    imageElement.style.width = "150";
    imageElement.style.height = "80";
    imageElement.style.x = START_POSITIONS[currentContinent][0];
    imageElement.style.y = START_POSITIONS[currentContinent][1];

    // Set the href attribute to the Data URL
    imageElement.setAttribute("href", dataURL);

    // Get a reference to the group element
    var contElement = document.getElementById(currentContinent);
    contElement.appendChild(imageElement);

    // Get a reference to the root <svg> element
    var svgElement = document.getElementById("worldmap");

    // Append the <image> element to the root <svg> element to bring it to the front
    svgElement.appendChild(imageElement);

    setCurrentMessage(imageElement);

    nextStep();
  };

  const handleClearClick = async (e) => {
    const myCanvas = document.getElementById("canvas");
    const ctx = myCanvas.getContext("2d");
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  };

  const instructionText = `Write your message here!`;
  const confirmText = `Continue to placement!`;
  const clearText = `Clear`;
  const returnText = `Return to main view`;

  return (
    
      <div style={drawingContainerStyle}>
        <h2 style={textStyle}>{instructionText}</h2>
        <Canvas />
        <div style={buttonContainerStyle}>
          <button
            className="button"
            onClick={(e) => handleConfirmMessageClick(e)}
          >
            {confirmText}
          </button>
          <button className="button" onClick={(e) => handleClearClick(e)}>
            {clearText}
          </button>
          <button className="button" onClick={(e) => handleReturnClick(e)}>
            {returnText}
          </button>
        </div>
      </div>
  );
}

/* -------------------- STYLE COMPONENTS ------------- */

const drawingContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  position: "absolute",
  top: "50%",
  left: "50%",
  marginRight: "-50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "60%",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: "20px",
};

const textStyle = {
  cursor: "default",
  textAlign: "center",
  color: "white",
  fontSize: "3vh",
  fontWeight: "bold",
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
  marginBottom: "30px",
};

export default DrawingStep;
