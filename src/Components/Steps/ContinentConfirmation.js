function ContinentConfirmationStep({
  currentContinent,
  handleConfirmContinentClick,
  handleReturnClick
}) {
  return (
    <div className="confirmation-container">
      <h2 className="confirmation-text">{`Confirm ${currentContinent}?`}</h2>
      <button className="confirmContinentButton" onClick={(e) => handleConfirmContinentClick(e)} >Confirm continent</button>
      <button className="returnButton" onClick={(e) => handleReturnClick(e)} >Return</button>
    </div>
  )
}

export default ContinentConfirmationStep