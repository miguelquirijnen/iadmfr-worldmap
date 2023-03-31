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
import { IADMFR_LOGO } from "./logo";
import { useState } from "react";

// Declaration of all the constants
const BASE_VIEWBOX = "0 0 2000 857"
const ANIMATION_DURATION = 0.5 // in seconds

function Worldmap() {
  const [viewBox, setViewBox] = useState(BASE_VIEWBOX)
  const [drawingMode, setDrawingMode] = useState(false)
  const [currentContinent, setCurrentContinent] = useState("");

  const svgRef = useRef(null);

  const handleContinentClick = async (e) => {
    if (drawingMode) return;

    const gBox = e.currentTarget.getBBox();
    const newViewBox = `${gBox.x} ${gBox.y} ${gBox.width} ${gBox.height}`;

    gsap.to(svgRef.current, { duration: ANIMATION_DURATION, attr: { viewBox: newViewBox } });

    // Enable drawing
    setDrawingMode(true);

    setCurrentContinent(e.currentTarget.id);
  }

  const handleReturnClick = (e) => {
    // Disable drawing
    setDrawingMode(false);

    gsap.to(svgRef.current, { duration: ANIMATION_DURATION, attr: { viewBox: BASE_VIEWBOX } });

    setCurrentContinent("");
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
      {drawingMode && <button className="returnButton" onClick={(e) => handleReturnClick(e)} >Return</button>}

      {/* TODO REMOVE */}
      <a style={{ position: "absolute", bottom: "10px", right: "600px", width: "300px", height: "80px" }}>
        {`Drawingmode: ${drawingMode} `}
        <br />
        {` ViewBox: ${viewBox}`}
        <br />
        {` Continent: ${currentContinent}`}
      </a>
    </div>
  );
}

export default Worldmap;