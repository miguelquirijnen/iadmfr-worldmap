import React, { useRef } from "react";
import { gsap } from "gsap";
import { BASE_VIEWBOX, ANIMATION_DURATION } from "../../constants";
import interact from "interactjs";

function PlacementStep({
  handleReturnClick,
  nextStep,
  svgRef,
  currentMessage
}) {

    /*
    STEP IV: CONFIRM MESSAGE PLACEMENT
  */
  const handleConfirmPlacementClick = async (e) => {
      
      console.log(currentMessage)
      // interact(currentMessage).draggable("unset");
      currentMessage.style.pointerEvents = "none";
      

      gsap.to(svgRef.current, {
        duration: ANIMATION_DURATION,
        attr: { viewBox: BASE_VIEWBOX },
      });
      nextStep();
  };

  return (
    <>
      <a style={confirmationTextStyle}>{`Place your message on the continent.`}</a>
      <button className="confirmContinentButton" onClick={(e) => handleConfirmPlacementClick(e)} >Confirm placement</button>
      <button className="returnButton" onClick={(e) => handleReturnClick(e)} >Return</button>
    </>
  )
}

const confirmationTextStyle = {
  color: "white",
  fontSize: "large",
  position: "absolute",
  top: "50%",
  left: "50%",
  marginRight: "-50%",
}

export default PlacementStep;