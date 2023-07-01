import React, { useRef } from "react";
import { gsap } from "gsap";
import {
  BASE_VIEWBOX,
  ANIMATION_DURATION,
  DRAG_FACTORS,
} from "../../constants";
import interact from "interactjs";
import { pushToDb } from "../../Database/requests";

function PlacementStep({
  handleReturnClick,
  nextStep,
  svgRef,
  currentMessage,
  dataUrl,
  currentContinent,
  zoomFactor,
}) {
  // Drag move event listener
  function dragMoveListener(event) {
    const target = event.target;
    const factor = (1 / zoomFactor) * DRAG_FACTORS[currentContinent];

    const x =
      (parseFloat(target.getAttribute("data-x")) || 0) + event.dx * factor;
    const y =
      (parseFloat(target.getAttribute("data-y")) || 0) + event.dy * factor;

    // Translate the dragged object
    target.style.transform = `translate(${x}px, ${y}px)`;

    // Store the object's position
    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);
  }

  // Enable draggability on the draggable object
  interact(currentMessage).draggable({
    listeners: {
      move: dragMoveListener,
    },
  });

  const handleConfirmPlacementClick = async (e) => {
    gsap.to(svgRef.current, {
      duration: ANIMATION_DURATION,
      attr: { viewBox: BASE_VIEWBOX },
    });

    pushToDb(
      dataUrl,
      currentMessage.getAttribute("data-x"),
      currentMessage.getAttribute("data-y"),
      currentMessage.getAttribute("width"),
      currentMessage.getAttribute("height"),
      currentContinent
    );

    nextStep();

    currentMessage.remove();
  };

  const zoomObjectIn = () => {
    const initWidth = currentMessage.getAttribute("width");
    const initHeight = currentMessage.getAttribute("height");

    currentMessage.setAttribute("width", initWidth * 1.1);
    currentMessage.setAttribute("height", initHeight * 1.1);
  };

  const zoomObjectOut = () => {
    const initWidth = currentMessage.getAttribute("width");
    const initHeight = currentMessage.getAttribute("height");

    currentMessage.setAttribute("width", initWidth / 1.1);
    currentMessage.setAttribute("height", initHeight / 1.1);
  };

  const instructionText = `Place your message on the continent.`;
  const confirmText = `Confirm message!`;
  const returnText = `Return to main view`;

  const zoomIn = `+`;
  const zoomOut = `-`;

  return (
    <div >
      <h2 style={textStyle}>{instructionText}</h2>

      <div style={zoomContainerStyle}>
        <button className="button" onClick={(e) => zoomObjectIn(e)}>
          {zoomIn}
        </button>
        <button className="button" onClick={(e) => zoomObjectOut(e)}>
          {zoomOut}
        </button>
      </div>

      <div style={buttonContainerStyle}>
        <button
          className="button"
          onClick={(e) => handleConfirmPlacementClick(e)}
        >
          {confirmText}
        </button>
        <button className="button" onClick={(e) => handleReturnClick(e)}>
          {returnText}
        </button>
      </div>
    </div>
  );
}

/* -------------------- STYLE COMPONENTS ------------- */
const textStyle = {
  position: "absolute",
  top: "10%",
  textAlign: "center",
  color: "white",
  fontSize: "3vh",
  fontWeight: "bold",
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
  cursor: "default",
};

const zoomContainerStyle = {
  width: "auto",
  top: "50%",
  right: "1%",
  transform: "translate(-50%, -50%)",
  position: "fixed",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  background: "rgb(255,255,255,0.6)",
  padding: "10px",
  borderRadius: "10px",
};

const buttonContainerStyle = {
  bottom: "5%",
  position: "fixed",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
};

export default PlacementStep;
