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

const continents = [
  { id: "asia", component: <Asia /> },
  { id: "africa", component: <Africa /> },
  { id: "europe", component: <Europe /> },
  { id: "middle-east", component: <MiddleEast /> },
  { id: "north-america", component: <NorthAmerica /> },
  { id: "latin-america", component: <LatinAmerica /> },
  { id: "australasia", component: <Australasia /> },
];

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
        setViewBox(VIEWBOXES[continent.id]);
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
  
  // RETURN CLICK
  const handleReturnClick = (e) => {
    setDrawingMode(false);
    setMsgInProgress(false);
    setCurrentStep(steps.continentSelection);
    setCurrentContinent("");

    if (currentMessage) currentMessage.remove();

    gsap.to(svgRef.current, {
      duration: ANIMATION_DURATION,
      attr: { viewBox: BASE_VIEWBOX },
      onComplete: () => {
        const currentViewBox = svgRef.current.getAttribute("viewBox");
        const initialDimensions = BASE_VIEWBOX.split(" ");
        const currentDimensions = currentViewBox.split(" ");

        const initialWidth = parseFloat(initialDimensions[2]);
        const currentWidth = parseFloat(currentDimensions[2]);

        setZoomFactor(initialWidth / currentWidth);
      },
    });
  };


  // MESSAGE MGMT
  useEffect(() => {
    fetchMessages()
      .then((data) => {
        setMessages(data);
      })
      .catch((error) => console.error(error));
  }, [currentStep]);

  const renderMessages = (cont) => {
    return messages
      .filter((msg) => msg.continent == cont)
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

  // DETERMINE CONTINENT CLASSNAMES
  const classNameContinent = (continentName) => {
    if (currentContinent == "") return "continent";
    else if (currentContinent == continentName) return "continent-selected";
    return "continent-unselected";
  };

  // RENDER CONTINENTS
  const renderContinents = () => {
    const groupElements = continents.map((c) => (
      <g
        onClick={(e) => handleContinentClick(e)}
        className={classNameContinent(c.id)}
        id={c.id}
      >
        {c.component}
        {renderMessages(c.id)}
      </g>
    ));
    return (
      <svg
        ref={svgRef}
        baseProfile="tiny"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="worldmap"
        id="worldmap"
        viewBox={viewBox}
      >
        {groupElements}
      </svg>
    );
  };

  return (
    <div style={{ overflow: "hidden" }}>
      {/* --------------------------- WORLDMAP --------------------------- */}
      {renderContinents()}
      {/* -------------------------- IADMFR LOGO -------------------------- */}
      <IADMFR_LOGO className="iadmfr-logo" />
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
          zoomFactor={zoomFactor}
        />
      )}
    </div>
  );
}

export default Worldmap;
