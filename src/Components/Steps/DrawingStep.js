import React, { useRef } from "react";
import Canvas from "../Canvas";

import interact from "interactjs";

import { START_POSITIONS, svgNS, DRAG_FACTORS } from "../../constants";

function DrawingStep({
  handleReturnClick,
  nextStep,
  setDrawingMode,
  svgRef,
  setCurrentMessage,
  currentContinent,
  setDataUrl,
  zoomFactor,
}) {
  const canvasRef = useRef(null);

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

  // Confirm the sketched message
  const handleConfirmMessageClick = async (e) => {
    setDrawingMode(false);

    const canvas = document.getElementById("canvas");
    const dataURL = canvas.toDataURL("image/png");
    setDataUrl(dataURL);

    // Create the <image> element
    var imageElement = document.createElementNS(svgNS, "image");

    // Set the necessary attributes
    imageElement.setAttribute("x", START_POSITIONS[currentContinent][0]);
    imageElement.setAttribute("y", START_POSITIONS[currentContinent][1]);
    imageElement.setAttribute("width", "150");
    imageElement.setAttribute("height", "80");

    // Set the red border
    imageElement.setAttribute("stroke", "red");
    imageElement.setAttribute("stroke-width", "2");

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

    // Enable draggability on the draggable object
    interact(imageElement).draggable({
      listeners: {
        move: dragMoveListener,
      },
    });

    nextStep();
  };

  return (
    <>
      <Canvas ref={canvasRef} width={"200px"} height={"200px"} />
      <button
        className="confirmMessageButton"
        onClick={(e) => handleConfirmMessageClick(e)}
      >
        {`Confirm Message`}
      </button>
      <button className="returnButton" onClick={(e) => handleReturnClick(e)}>
        {`Return`}
      </button>
    </>
  );
}

export default DrawingStep;
