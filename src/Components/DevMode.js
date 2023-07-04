import React, { useEffect } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import interact from "interactjs";
import { DRAG_FACTORS } from "../constants";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const DevMode = ({
  devMode,
  setDevMode,
  currentContinent,
  handleReturnClick,
  messages,
  svgRef,
}) => {
  const handleDevClick = () => {
    if (currentContinent != "") return;
    setDevMode(!devMode);
  };

  // Function to handle the download
  const handleDownloadImages = () => {
    const zip = new JSZip();

    messages.forEach((msg) => {
      const imageBlob = dataURLToBlob(msg.dataURL);
      zip.file(
        `message_${msg.xcoord}_${msg.ycoord}_${msg.width}_${msg.height}.png`,
        imageBlob
      );
    });

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "messages.zip");
    });
  };

  const dataURLToBlob = (dataURL) => {
    const byteString = atob(dataURL.split(",")[1]);
    const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  };

  const handleDownloadSVG = () => {
    const svgElement = svgRef.current;
  
    // Clone the original SVG element
    const clonedSvgElement = svgElement.cloneNode(true);
  
    // Create a temporary container and append the cloned SVG element
    const container = document.createElement("div");
    container.appendChild(clonedSvgElement);
  
    // Get computed styles of the continent elements
    const computedStyles = window.getComputedStyle(container.querySelector("svg"));
  
    // Update the continent elements' fill and stroke attributes
    const continentElements = clonedSvgElement.querySelectorAll(".continent");
    continentElements.forEach((element) => {
      const continentName = element.getAttribute("id");
      const continentColor = computedStyles.getPropertyValue(`--${continentName}-color`);
      element.setAttribute("fill", continentColor);
      element.setAttribute("stroke", continentColor);
    });
  
    // Serialize the updated SVG element to string
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(clonedSvgElement);
  
    // Create and trigger the download link
    const downloadLink = document.createElement("a");
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
  
    downloadLink.href = url;
    downloadLink.download = "worldmap.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
  };


  const downloadSVGText = `Download map as SVG`;
  const downloadPNGText = `Download all messages as ZIP file`;
  const returnText = `Return to main view`;

  return (
    <div>
      <div style={iconContainterStyle}>
        <SettingsIcon
          style={{ color: devMode ? `green` : `#64020e` }}
          onClick={handleDevClick}
        />
        {devMode && <p style={textStyle}>DEVMODE ON</p>}
      </div>
      {(devMode && currentContinent == "")&& (
        <div style={buttonContainerStyle}>
          <button className="button" onClick={handleDownloadSVG}>
            {downloadSVGText}
          </button>
          <button className="button" onClick={handleDownloadImages}>
            {downloadPNGText}
          </button>
        </div>
      )}
      {devMode && currentContinent != "" && (
        <div style={buttonContainerStyle}>
          <button className="button" onClick={(e) => handleReturnClick(e)}>
            {returnText}
          </button>
        </div>
      )}
    </div>
  );
};

const buttonContainerStyle = {
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  bottom: "2%",
};

const iconContainterStyle = {
  display: "flex",
  position: "absolute",
  top: "10px",
  left: "10px",
};

const textStyle = {
  marginLeft: "10px",
  fontWeight: "bold",
};

export default DevMode;
