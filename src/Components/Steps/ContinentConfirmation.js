function ContinentConfirmationStep({
  currentContinent,
  handleConfirmContinentClick,
  handleReturnClick
}) {
  return (
    <>
      <a style={confirmationTextStyle}>{`Confirm ${currentContinent}?`}</a>
      <button className="confirmContinentButton" onClick={(e) => handleConfirmContinentClick(e)} >Confirm continent</button>
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

export default ContinentConfirmationStep