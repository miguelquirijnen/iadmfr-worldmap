import React from "react";
import { gsap } from "gsap";
import {
  BASE_VIEWBOX,
  ANIMATION_DURATION,
  DRAG_FACTORS,
  START_POSITIONS,
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
    console.log(zoomFactor)
    const factorX = (1 / zoomFactor[0]) * DRAG_FACTORS[currentContinent];
    const factorY = (1 / zoomFactor[1]) * DRAG_FACTORS[currentContinent];
    console.log("factors: ", factorX, " - ", factorY)
    const x = (parseFloat(target.style.x) || 0) + event.dx * factorX;
    const y = (parseFloat(target.style.y) || 0) + event.dy * factorY;

    // Store the object's position
    target.style.x = x;
    target.style.y = y;
  }

  // Enable draggability on the draggable object
  interact(currentMessage).draggable({
    listeners: {
      move: dragMoveListener,
    },
  });

  // Confirm the placement of the object
  const handleConfirmPlacementClick = async (e) => {
    const widthString = currentMessage.style.width;
    const heightString = currentMessage.style.height;

    pushToDb(
      dataUrl,
      currentMessage.style.x,
      currentMessage.style.y,
      widthString.substr(0, widthString.length - 2),
      heightString.substr(0, heightString.length - 2),
      currentContinent
    );

    nextStep();

    currentMessage.remove();
    handleReturnClick();
  };

  // ZOOM IN
  const zoomObjectIn = () => {
    const initWidthStr = currentMessage.style.width;
    const initHeightStr = currentMessage.style.height;
    const initX = parseFloat(currentMessage.style.x);
    const initY = parseFloat(currentMessage.style.y);

    const initWidth = parseFloat(
      initWidthStr.substr(0, initWidthStr.length - 2)
    );
    const initHeight = parseFloat(
      initHeightStr.substr(0, initHeightStr.length - 2)
    );

    const newWidth = initWidth * 1.1;
    const newHeight = initHeight * 1.1;

    const moveToLeft = Math.abs(initWidth - newWidth) / 2;
    const moveUp = Math.abs(initHeight - newHeight) / 2;

    const newX = initX - moveToLeft;
    const newY = initY - moveUp;

    currentMessage.style.width = newWidth;
    currentMessage.style.height = newHeight;
    currentMessage.style.x = newX;
    currentMessage.style.y = newY;
  };

  // ZOOM OUT
  const zoomObjectOut = () => {
    const initWidthStr = currentMessage.style.width;
    const initHeightStr = currentMessage.style.height;
    const initX = parseFloat(currentMessage.style.x);
    const initY = parseFloat(currentMessage.style.y);

    const initWidth = parseFloat(
      initWidthStr.substr(0, initWidthStr.length - 2)
    );
    const initHeight = parseFloat(
      initHeightStr.substr(0, initHeightStr.length - 2)
    );

    const newWidth = initWidth / 1.1;
    const newHeight = initHeight / 1.1;

    const moveToRight = Math.abs(initWidth - newWidth) / 2;
    const moveDown = Math.abs(initHeight - newHeight) / 2;

    const newX = initX + moveToRight;
    const newY = initY + moveDown;

    currentMessage.style.width = newWidth;
    currentMessage.style.height = newHeight;
    currentMessage.style.x = newX;
    currentMessage.style.y = newY;
  };

  const instructionText = `Place your message on the continent.`;
  const confirmText = `Confirm message!`;
  const returnText = `Return to main view`;

  const zoomIn = `+`;
  const zoomOut = `-`;

  return (
    <div>
      <image
        x={START_POSITIONS[currentContinent][0]}
        y={START_POSITIONS[currentContinent][1]}
        width={150}
        height={80}
        href={dataUrl}
      />
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
