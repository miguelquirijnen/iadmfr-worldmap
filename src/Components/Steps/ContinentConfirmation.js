import { CONTINENT_NAMES } from "../../constants";

function ContinentConfirmationStep({
  currentContinent,
  handleConfirmContinentClick,
  handleReturnClick,
}) {
  const questionText = `Leave a message from ${CONTINENT_NAMES[currentContinent]}?`;
  const confirmText = `Yes!`;
  const returnText = `No, return`;

  return (
    <div style={confirmationContainerStyle}>
      <h2 style={textStyle}>{questionText}</h2>
      <div style={buttonContainerStyle}>
        <button
          className="button"
          onClick={(e) => handleConfirmContinentClick(e)}
        >
          {confirmText}
        </button>
        <button className="button" onClick={(e) => handleReturnClick(e)}>
          {returnText}
        </button>
      </div>
    </div>
  );
}

/* -------------------- STYLE COMPONENTS ------------- */

const confirmationContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  marginRight: "-50%",
  transform: "translate(-50%, -50%)",

  height: "auto",
  width: "auto",

};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: "20px",
};

const textStyle = {
  textAlign: "center",
  color: "white",
  fontSize: "3vh",
  fontWeight: "bold",
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
  cursor: "default"
};

export default ContinentConfirmationStep;
