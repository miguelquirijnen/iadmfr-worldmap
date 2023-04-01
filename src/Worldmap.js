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
import { IADMFR_LOGO } from "./Logo";
import { useState } from "react";
import Canvas from "./Components/Canvas";

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

  const handleContinentClick = async (e) => {
    if (currentStep !== steps.continentSelection) return;

    const gBox = e.currentTarget.getBBox();
    const newViewBox = `${gBox.x} ${gBox.y} ${gBox.width} ${gBox.height}`;

    gsap.to(svgRef.current, { duration: ANIMATION_DURATION, attr: { viewBox: newViewBox } });

    // Start msg 
    setCurrentStep(steps.continentConfirmation)

    setCurrentContinent(e.currentTarget.id);
  }

  const handleConfirmContinentClick = (e) => {
    // Disable drawing
    setCurrentStep(steps.messageDrawing);
    setDrawingMode(true);

  }

  const handleConfirmMessageClick  = (e) => {
    // Disable drawing
    setDrawingMode(false);
    setCurrentStep(steps.messagePlacing);
  }

  const handleConfirmPlacementClick = (e) => {
    setCurrentStep(steps.continentSelection);

    gsap.to(svgRef.current, { duration: ANIMATION_DURATION, attr: { viewBox: BASE_VIEWBOX } });
  }


  const handleReturnClick = (e) => {
    // Disable drawing
    setDrawingMode(false);
    setMsgInProgress(false);
    setCurrentStep(steps.continentSelection)
    setCurrentContinent("");

    gsap.to(svgRef.current, { duration: ANIMATION_DURATION, attr: { viewBox: BASE_VIEWBOX } });
  }
  
  return (
    <div style={{ overflow: "hidden" }}>
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
      <div className="logoBox">
        <IADMFR_LOGO />
      </div>
      {currentStep === steps.continentConfirmation && <>
        <a style={confirmationTextStyle}>{`Confirm ${currentContinent}?`}</a>
        <button className="confirmContinentButton" onClick={(e) => handleConfirmContinentClick(e)} >Confirm continent</button>
        <button className="returnButton" onClick={(e) => handleReturnClick(e)} >Return</button>
      </>}
      {currentStep === steps.messageDrawing && <>
        <Canvas width={"200px"} height={"200px"} />
        <button className="confirmMessageButton" onClick={(e) => handleConfirmMessageClick(e)} >Confirm Message</button>
        <button className="returnButton" onClick={(e) => handleReturnClick(e)} >Return</button>
      </>}
      {currentStep === steps.messagePlacing && <>
        <a style={confirmationTextStyle}>{`Place your message on the continent.`}</a>
        <button className="confirmContinentButton" onClick={(e) => handleConfirmPlacementClick(e)} >Confirm placement</button>
        <button className="returnButton" onClick={(e) => handleReturnClick(e)} >Return</button>
      </>}

      {/* TODO REMOVE */}
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

const confirmationTextStyle = {
  color: "white",
  fontSize: "large",
  position: "absolute",
  top: "50%",
  left: "50%",
  marginRight: "-50%",
}

export default Worldmap;