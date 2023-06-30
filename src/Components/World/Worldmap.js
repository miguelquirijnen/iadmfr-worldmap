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
import { BASE_VIEWBOX, ANIMATION_DURATION, steps, VIEWBOXES} from "../../constants";

function Worldmap() {
  const [viewBox, setViewBox] = useState(BASE_VIEWBOX);
  const [drawingMode, setDrawingMode] = useState(false);
  const [msgInProgress, setMsgInProgress] = useState(false);
  const [currentContinent, setCurrentContinent] = useState("");
  const [currentStep, setCurrentStep] = useState(steps.continentSelection);
  const [currentMessage, setCurrentMessage] = useState();

  const svgRef = useRef(null);

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(0);
    }
  };

  /* 
    STEP I: CLICK ON CONTINENT
  */
  const handleContinentClick = async (e) => {
    console.log(currentStep)
    if (currentStep !== steps.continentSelection) return;
    const continent = e.currentTarget;
    
    const newViewBox = VIEWBOXES[continent.id]
    console.log("newViewBox = " + newViewBox + " / " + continent.id)

    gsap.to(svgRef.current, {
      duration: ANIMATION_DURATION,
      attr: { viewBox: newViewBox },
    });

    setCurrentStep(steps.continentConfirmation);
    setCurrentContinent(continent.id);
  };

  /*
    STEP II: CONFIRM SELECTED CONTINENT
  */
  const handleConfirmContinentClick = (e) => {
    setCurrentStep(steps.messageDrawing);
    setDrawingMode(true);
  };

  /*
    RETURN TO BASE WORLD MAP
  */
  const handleReturnClick = (e) => {
    setDrawingMode(false);
    setMsgInProgress(false);
    setCurrentStep(steps.continentSelection);
    setCurrentContinent("");

    gsap.to(svgRef.current, {
      duration: ANIMATION_DURATION,
      attr: { viewBox: BASE_VIEWBOX },
    });
  };

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
        <g
          onClick={(e) => handleContinentClick(e)}
          className="Africa disabled"
          id="africa"
        >
          <Africa />
        </g>
        <g
          onClick={(e) => handleContinentClick(e)}
          className="Europe"
          id="europe"
        >
          <Europe />
        </g>
        <g
          onClick={(e) => handleContinentClick(e)}
          className="MiddleEast"
          id="middle-east"
        >
          <MiddleEast />
        </g>
        <g
          onClick={(e) => handleContinentClick(e)}
          className="NorthAmerica"
          id="north-america"
        >
          <NorthAmerica />
        </g>
        <g
          onClick={(e) => handleContinentClick(e)}
          className="LatinAmerica"
          id="latin-america"
        >
          <LatinAmerica />
        </g>
        <g
          onClick={(e) => handleContinentClick(e)}
          className="Australasia"
          id="australasia"
        >
          <Australasia />
        </g>
      </svg>
      {/* -------------------------- IADMFR LOGO -------------------------- */}
      <IADMFR_LOGO />
      {/* ------------------------ STEP COMPONENTS ------------------------ */}
      {currentStep === steps.continentConfirmation && (
        <ContinentConfirmationStep
          currentContinent={currentContinent}
          handleConfirmContinentClick={handleConfirmContinentClick}
          handleReturnClick={handleReturnClick}
        />
      )}
      {currentStep === steps.messageDrawing && (
        <DrawingStep
          handleReturnClick={handleReturnClick}
          currentContinent={currentContinent}
          nextStep={nextStep}
          setDrawingMode={setDrawingMode}
          svgRef={svgRef}
          setCurrentMessage={setCurrentMessage}
        />
      )}
      {currentStep === steps.messagePlacing && (
        <PlacementStep
          handleReturnClick={handleReturnClick}
          nextStep={nextStep}
          svgRef={svgRef}
          currentMessage={currentMessage}
        />
      )}
      {/* ---------------------- DEBUGGING COMPONENTS ---------------------- */}
      <a
        style={{
          position: "absolute",
          bottom: "10px",
          right: "600px",
          width: "300px",
          height: "100px",
        }}
      >
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
