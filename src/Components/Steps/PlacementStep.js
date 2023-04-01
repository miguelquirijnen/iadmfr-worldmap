function PlacementStep({
  handleConfirmPlacementClick,
  handleReturnClick
}) {
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