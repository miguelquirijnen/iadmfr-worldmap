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
} from "./World/Continents";
import { IADMFR_LOGO } from "../Logo";
import { useState } from "react";

import ContinentConfirmationStep from "./Steps/ContinentConfirmation";
import DrawingStep from "./Steps/DrawingStep";
import PlacementStep from "./Steps/PlacementStep";
import {
  BASE_VIEWBOX,
  ANIMATION_DURATION,
  steps,
  VIEWBOXES,
} from "../constants";

import { fetchMessages } from "../Database/requests";
import DevMode from "./DevMode";

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
  const [currentContinent, setCurrentContinent] = useState("");
  const [currentStep, setCurrentStep] = useState(steps.continentSelection);
  const [currentMessage, setCurrentMessage] = useState();
  const [dataUrl, setDataUrl] = useState();
  const [messages, setMessages] = useState([]);
  const [devMode, setDevMode] = useState(false);

  const svgRef = useRef(null);

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
    else setCurrentStep(0);
  };

  // STEP I  - CLICK ON CONTINENT
  const handleContinentClick = async (e) => {
    if (currentStep !== steps.continentSelection || currentContinent) return;
    const continent = e.currentTarget;

    setCurrentContinent(continent.id);

    gsap.to(svgRef.current, {
      duration: ANIMATION_DURATION,
      attr: { viewBox: VIEWBOXES[continent.id] },
      onComplete: () => {
        if (!devMode) setCurrentStep(steps.continentConfirmation);
      },
    });
  };

  // RETURN CLICK
  const handleReturnClick = (e) => {
    const lastStep = currentStep;
    setCurrentStep(steps.continentSelection);
    setCurrentContinent("");

    if (currentMessage) currentMessage.remove();

    gsap.to(svgRef.current, {
      duration: ANIMATION_DURATION,
      attr: { viewBox: BASE_VIEWBOX },
      onComplete: () => {
        if ((!devMode && lastStep === 3) || devMode) window.location.reload();
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
      .filter((msg) => msg.continent === cont)
      .map((msg) => {
        return (
          <image
            id={msg.id}
            key={msg.id}
            className="message"
            style={{
              x: `${msg.xcoord}px`,
              y: `${msg.ycoord}px`,
              width: `${msg.width}px`,
              height: `${msg.height}px`,
            }}
            href={msg.dataURL}
          />
        );
      });
  };

  // DETERMINE CONTINENT CLASSNAMES
  const classNameContinent = (continentName) => {
    if (devMode) {
      if (currentContinent === "") return "continent";
      else if (currentContinent === continentName)
        return "continent-dev-selected";
      return "continent-dev-unselected";
    } else {
      if (currentContinent === "") return "continent";
      else if (currentContinent === continentName) return "continent-selected";
      return "continent-unselected";
    }
  };

  // RENDER CONTINENTS
  const renderContinents = () => (
    <div className="svg-container">
      <svg ref={svgRef} className="worldmap" id="worldmap" viewBox={BASE_VIEWBOX}>
        {continents.map((c) => (
          <g
            onClick={(e) => handleContinentClick(e)}
            className={classNameContinent(c.id)}
            id={c.id}
            key={c.id}
          >
            {c.component}
            {renderMessages(c.id)}
          </g>
        ))}
      </svg>
    </div>
  );

  return (
    <div style={{ overflow: "hidden" }}>
      {/* --------------------------- WORLDMAP --------------------------- */}
      {renderContinents()}
      {/* -------------------------- IADMFR LOGO -------------------------- */}
      <IADMFR_LOGO currentStep={currentStep} />
      {/* ------------------------ STEP COMPONENTS ------------------------ */}
      {currentStep < 3 && currentContinent !== "" && !devMode && (
        <div
          className={`overlay ${currentStep === steps.continentConfirmation ||
            currentStep === steps.messageDrawing
            ? "active"
            : ""
            }`}
        >
          {currentStep === steps.continentConfirmation && (
            <ContinentConfirmationStep
              currentContinent={currentContinent}
              handleReturnClick={handleReturnClick}
              setCurrentStep={setCurrentStep}
            />
          )}
          {currentStep === steps.messageDrawing && (
            <DrawingStep
              handleReturnClick={handleReturnClick}
              currentContinent={currentContinent}
              nextStep={nextStep}
              setCurrentMessage={setCurrentMessage}
              setDataUrl={setDataUrl}
            />
          )}
        </div>
      )}
      {currentStep === steps.messagePlacing && (
        <PlacementStep
          handleReturnClick={handleReturnClick}
          nextStep={nextStep}
          currentMessage={currentMessage}
          dataUrl={dataUrl}
          currentContinent={currentContinent}
        />
      )}
      {/* ------------------------ DEV MODE ------------------------ */}
      {(currentContinent === "" || devMode) && (
        <DevMode
          devMode={devMode}
          setDevMode={setDevMode}
          currentContinent={currentContinent}
          handleReturnClick={handleReturnClick}
          messages={messages}
          svgRef={svgRef}
        />
      )}
    </div>
  );
}

export default Worldmap;
