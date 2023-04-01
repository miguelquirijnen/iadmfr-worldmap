import Canvas from "../Canvas"

function DrawingStep({
  canvasRef,
  handleConfirmMessageClick,
  handleReturnClick
}) {
  return (
    <>
      <Canvas ref={canvasRef} width={"200px"} height={"200px"} />
      <button className="confirmMessageButton" onClick={(e) => handleConfirmMessageClick(e)} >Confirm Message</button>
      <button className="returnButton" onClick={(e) => handleReturnClick(e)} >Return</button>
    </>
  )
}

export default DrawingStep