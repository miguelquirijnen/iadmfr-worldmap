import React, { useRef, useEffect } from "react";
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
import {
  BASE_VIEWBOX,
  ANIMATION_DURATION,
  steps,
  VIEWBOXES,
} from "../../constants";

import { fetchMessages } from "../../Database/requests";

function Worldmap() {
  const [viewBox, setViewBox] = useState(BASE_VIEWBOX);
  const [drawingMode, setDrawingMode] = useState(false);
  const [msgInProgress, setMsgInProgress] = useState(false);
  const [currentContinent, setCurrentContinent] = useState("");
  const [currentStep, setCurrentStep] = useState(steps.continentSelection);
  const [currentMessage, setCurrentMessage] = useState();
  const [dataUrl, setDataUrl] = useState();
  const [messages, setMessages] = useState([]);
  const [zoomFactor, setZoomFactor] = useState(1.0);

  const svgRef = useRef(null);

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(0);
    }
  };

  // STEP I  - CLICK ON CONTINENT
  const handleContinentClick = async (e) => {
    if (currentStep !== steps.continentSelection) return;
    const continent = e.currentTarget;

    gsap.to(svgRef.current, {
      duration: ANIMATION_DURATION,
      attr: { viewBox: VIEWBOXES[continent.id] },
      onComplete: () => {
        const currentViewBox = svgRef.current.getAttribute("viewBox");
        const initialDimensions = BASE_VIEWBOX.split(" ");
        const currentDimensions = currentViewBox.split(" ");
    
        const initialWidth = parseFloat(initialDimensions[2]);
        const currentWidth = parseFloat(currentDimensions[2]);
    
        setZoomFactor(initialWidth / currentWidth);
      },
    });

    setCurrentStep(steps.continentConfirmation);
    setCurrentContinent(continent.id);
  };

  // STEP II - CONFIRM SELECTED CONTINENT
  const handleConfirmContinentClick = (e) => {
    setCurrentStep(steps.messageDrawing);
    setDrawingMode(true);
  };

  // Handle return click
  const handleReturnClick = (e) => {
    setDrawingMode(false);
    setMsgInProgress(false);
    setCurrentStep(steps.continentSelection);
    setCurrentContinent("");

    gsap.to(svgRef.current, {
      duration: ANIMATION_DURATION,
      attr: { viewBox: BASE_VIEWBOX },
      onComplete: () => {
        const currentViewBox = svgRef.current.getAttribute("viewBox");
        const initialDimensions = BASE_VIEWBOX.split(" ");
        const currentDimensions = currentViewBox.split(" ");
    
        const initialWidth = parseFloat(initialDimensions[2]);
        const currentWidth = parseFloat(currentDimensions[2]);
    
        setZoomFactor( initialWidth/currentWidth );
      },
    });
  };

  useEffect(() => {
    // Fetch objects from the database
    fetchMessages()
      .then((data) => {
        console.log(data);
        setMessages(data);
      })
      .catch((error) => console.error(error));
  }, [currentStep]);

  const renderMessagesAfrica = () => {
    return messages
      .filter((msg) => (msg.continent = "africa"))
      .map((msg) => (
        <image
          key={msg.id}
          x={0}
          y={0}
          data-x={msg.xcoord}
          data-y={msg.ycoord}
          width={msg.width}
          height={msg.height}
          href={msg.dataURL}
          style={{ transform: `translate(${msg.xcoord}px, ${msg.ycoord}px)` }}
        />
      ));
  };

  const renderMessagesAsia = () => {
    return messages
      .filter((msg) => (msg.continent = "asia"))
      .map((msg) => (
        <image
          key={msg.id}
          x={0}
          y={0}
          data-x={msg.xcoord}
          data-y={msg.ycoord}
          width={msg.width}
          height={msg.height}
          href={msg.dataURL}
          style={{ transform: `translate(${msg.xcoord}px, ${msg.ycoord}px)` }}
        />
      ));
  };

  const renderMessagesAustralasia = () => {
    return messages
      .filter((msg) => (msg.continent = "australasia"))
      .map((msg) => (
        <image
          key={msg.id}
          x={0}
          y={0}
          data-x={msg.xcoord}
          data-y={msg.ycoord}
          width={msg.width}
          height={msg.height}
          href={msg.dataURL}
          style={{ transform: `translate(${msg.xcoord}px, ${msg.ycoord}px)` }}
        />
      ));
  };

  // Render the message objects on the world map
  const renderMessagesEurope = () => {
    return messages
      .filter((msg) => (msg.continent = "europe"))
      .map((msg) => (
        <image
          key={msg.id}
          x={0}
          y={0}
          data-x={msg.xcoord}
          data-y={msg.ycoord}
          width={msg.width}
          height={msg.height}
          href={msg.dataURL}
          style={{ transform: `translate(${msg.xcoord}px, ${msg.ycoord}px)` }}
        />
      ));
  };

  const renderMessagesLatinAmerica = () => {
    return messages
      .filter((msg) => (msg.continent = "latin-america"))
      .map((msg) => (
        <image
          key={msg.id}
          x={0}
          y={0}
          data-x={msg.xcoord}
          data-y={msg.ycoord}
          width={msg.width}
          height={msg.height}
          href={msg.dataURL}
          style={{ transform: `translate(${msg.xcoord}px, ${msg.ycoord}px)` }}
        />
      ));
  };

  const renderMessagesMiddleEast = () => {
    return messages
      .filter((msg) => (msg.continent = "middle-east"))
      .map((msg) => (
        <image
          key={msg.id}
          x={0}
          y={0}
          data-x={msg.xcoord}
          data-y={msg.ycoord}
          width={msg.width}
          height={msg.height}
          href={msg.dataURL}
          style={{ transform: `translate(${msg.xcoord}px, ${msg.ycoord}px)` }}
        />
      ));
  };

  const renderMessagesNorthAmerica = () => {
    return messages
      .filter((msg) => (msg.continent = "north-america"))
      .map((msg) => (
        <image
          key={msg.id}
          x={0}
          y={0}
          data-x={msg.xcoord}
          data-y={msg.ycoord}
          width={msg.width}
          height={msg.height}
          href={msg.dataURL}
          style={{ transform: `translate(${msg.xcoord}px, ${msg.ycoord}px)` }}
        />
      ));
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
          {renderMessagesAsia()}
        </g>
        <g
          onClick={(e) => handleContinentClick(e)}
          className="Africa disabled"
          id="africa"
        >
          <Africa />
          {renderMessagesAfrica()}
        </g>
        <g
          onClick={(e) => handleContinentClick(e)}
          className="Europe"
          id="europe"
        >
          <Europe />
          {renderMessagesEurope()}
        </g>
        <g
          onClick={(e) => handleContinentClick(e)}
          className="MiddleEast"
          id="middle-east"
        >
          <MiddleEast />
          {renderMessagesMiddleEast()}
        </g>
        <g
          onClick={(e) => handleContinentClick(e)}
          className="NorthAmerica"
          id="north-america"
        >
          <NorthAmerica />
          {renderMessagesNorthAmerica()}
        </g>
        <g
          onClick={(e) => handleContinentClick(e)}
          className="LatinAmerica"
          id="latin-america"
        >
          <LatinAmerica />
          {renderMessagesLatinAmerica()}
        </g>
        <g
          onClick={(e) => handleContinentClick(e)}
          className="Australasia"
          id="australasia"
        >
          <Australasia />
          {renderMessagesAustralasia()}
        </g>
      </svg>
      {/* ------------------------ RENDER MESSAGES ------------------------ */}

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
          setDataUrl={setDataUrl}
          zoomFactor={zoomFactor}
        />
      )}
      {currentStep === steps.messagePlacing && (
        <PlacementStep
          handleReturnClick={handleReturnClick}
          nextStep={nextStep}
          svgRef={svgRef}
          currentMessage={currentMessage}
          dataUrl={dataUrl}
          currentContinent={currentContinent}
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
        {`ViewBox: ${viewBox}`}
        <br />
        {`Continent: ${currentContinent}`}
        <br />
        {`Step: ${currentStep}`}
      </a>
    </div>
  );
}

export default Worldmap;
