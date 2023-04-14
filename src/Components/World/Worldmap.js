import React, { useRef } from "react";
import { gsap } from "gsap";
import {
  Africa,
  Asia,
  Australasia,
  Europe,
  LatinAmerica,
  MiddleEast,
  NorthAmerica,
} from "./Continents";
import { IADMFR_LOGO } from "../../Logo";
import { useState } from "react";

import ContinentConfirmationStep from "../Steps/ContinentConfirmation";
import DrawingStep from "../Steps/DrawingStep";
import PlacementStep from "../Steps/PlacementStep";

// Declaration of all the constants
const BASE_VIEWBOX = "0 0 2000 857"
const ANIMATION_DURATION = 0.5 // in seconds

const steps = {
  continentSelection: 0,
  continentConfirmation: 1,
  messageDrawing: 2,
  messagePlacing: 3,
}

function Worldmap() {
  const [viewBox, setViewBox] = useState(BASE_VIEWBOX)
  const [drawingMode, setDrawingMode] = useState(false)
  const [msgInProgress, setMsgInProgress] = useState(false)
  const [currentContinent, setCurrentContinent] = useState("");
  const [currentStep, setCurrentStep] = useState(steps.continentSelection)

  const svgRef = useRef(null);
  const canvasRef = useRef(null);

  /* 
    STEP 1: CLICK ON CONTINENT
  */
  const handleContinentClick = async (e) => {
    if (currentStep !== steps.continentSelection) return;
    const continent = e.currentTarget

    const gBox = continent.getBBox();
    const newViewBox = `${gBox.x} ${gBox.y} ${gBox.width} ${gBox.height}`;
    gsap.to(svgRef.current, { duration: ANIMATION_DURATION, attr: { viewBox: newViewBox } });

    setCurrentStep(steps.continentConfirmation)
    setCurrentContinent(continent.id);
  }

  /*
    STEP 2: CONFIRM SELECTED CONTINENT
  */
  const handleConfirmContinentClick = (e) => {
    setCurrentStep(steps.messageDrawing);
    setDrawingMode(true);
  }

  /*
    STEP 3: CONFIRM MESSAGE CONTENT
  */
  const handleConfirmMessageClick = (e) => {
    setDrawingMode(false);

    const canvas = document.getElementById("canvas");
    console.log(canvas)
    const dataURL = canvas.toDataURL('image/png');
    console.log(dataURL)
    // const link = document.createElement('a');
    // link.download = 'canvas.png';
    // link.href = dataURL;
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);

    setCurrentStep(steps.messagePlacing);
  }

  /*
    STEP 3: CONFIRM MESSAGE PLACEMENT
  */
  const handleConfirmPlacementClick = (e) => {
    setCurrentStep(steps.continentSelection);
    gsap.to(svgRef.current, { duration: ANIMATION_DURATION, attr: { viewBox: BASE_VIEWBOX } });
  }

  /*
    RETURN TO BASE WORLD MAP
  */
  const handleReturnClick = (e) => {
    setDrawingMode(false);
    setMsgInProgress(false);
    setCurrentStep(steps.continentSelection)
    setCurrentContinent("");

    gsap.to(svgRef.current, { duration: ANIMATION_DURATION, attr: { viewBox: BASE_VIEWBOX } });
  }

  return (
    <div style={{ overflow: "hidden" }}>
      {/* --------------------------- WORLDMAP --------------------------- */}
      <svg
        ref={svgRef}
        baseProfile="tiny"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="worldmap"
        id="worldmap"
        viewBox={viewBox}
      >
        <g onClick={(e) => handleContinentClick(e)} className="Asia" id="asia">
          <Asia />
        </g>
        <g onClick={(e) => handleContinentClick(e)} className="Africa" id="africa">
          <Africa />
        </g>
        <g onClick={(e) => handleContinentClick(e)} className="Europe" id="europe">
          <Europe />
        </g>
        <g onClick={(e) => handleContinentClick(e)} className="MiddleEast" id="middle-east">
          <MiddleEast />
        </g>
        <g onClick={(e) => handleContinentClick(e)} className="NorthAmerica" id="north-america">
          <NorthAmerica />
        </g>
        <g onClick={(e) => handleContinentClick(e)} className="LatinAmerica" id="latin-america">
          <LatinAmerica />
        </g>
        <g onClick={(e) => handleContinentClick(e)} className="Australasia" id="australasia">
          <Australasia />
        </g>
      </svg>
      {/* -------------------------- IADMFR LOGO -------------------------- */}
      <div className="logoBox">
        <IADMFR_LOGO />
      </div>
      {/* ------------------------ STEP COMPONENTS ------------------------ */}
      {currentStep === steps.continentConfirmation &&
        <ContinentConfirmationStep
          currentContinent={currentContinent}
          handleConfirmContinentClick={handleConfirmContinentClick}
          handleReturnClick={handleReturnClick}
        />}
      {currentStep === steps.messageDrawing &&
        <DrawingStep
          canvasRef={canvasRef}
          handleConfirmMessageClick={handleConfirmMessageClick}
          handleReturnClick={handleReturnClick}
        />}
      {currentStep === steps.messagePlacing &&
        <PlacementStep
          handleConfirmPlacementClick={handleConfirmPlacementClick}
          handleReturnClick={handleReturnClick}
        />}
      {/* ---------------------- DEBUGGING COMPONENTS ---------------------- */}
      <a style={{ position: "absolute", bottom: "10px", right: "600px", width: "300px", height: "100px" }}>
        {`Drawingmode: ${drawingMode} `}
        <br />
        {` ViewBox: ${viewBox}`}
        <br />
        {` Continent: ${currentContinent}`}
        <br />
        {` Step: ${currentStep}`}
      </a>
    </div>
  );
}

export default Worldmap;