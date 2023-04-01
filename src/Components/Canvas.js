import React, { useState, useRef, useEffect } from 'react'

const WIDTH_VW_FACTOR = 50;
const HEIGHT_VH_FACTOR = 50;

const Canvas = ({width, height}) => {
  const [drawing, setDrawing] = useState(false);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    // For supporting computers with higher screen densities, we double the screen density
    canvas.width = document.documentElement.clientWidth * (WIDTH_VW_FACTOR/100)
    canvas.height = document.documentElement.clientHeight * (HEIGHT_VH_FACTOR/100)
    // canvas.width = window.innerWidth * 2;
    // canvas.height = window.innerHeight * 2;
    console.log("hw " +  canvas.width + " - " + canvas.height)
    canvas.style.width = `${WIDTH_VW_FACTOR}vw`;
    canvas.style.height = `${HEIGHT_VH_FACTOR}vh`;
    // Setting the context to enable us draw
    const ctx = canvas.getContext('2d');
    // ctx.scale(2, 2);
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctxRef.current = ctx;
  }, []);

  const startDraw = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    setDrawing(true);
  };
  const stopDraw = () => {
    ctxRef.current.closePath();
    setDrawing(false);
  };
  const draw = ({ nativeEvent }) => {
    if (!drawing) return;
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  };
  const clear = () => {
    ctxRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
  };
  
  return (
    <>
      <canvas
        onMouseDown={startDraw}
        onMouseUp={stopDraw}
        onMouseMove={draw}
        ref={canvasRef}
        style={canvasStyle}
        id={"canvas"}
        // width={"50vw"}
        // height={"70vh"}
      />
    </>
  );
}

const canvasStyle = {
  border: "1 px solid black",
  backgroundColor: "rgba(255,255,255,0.5)",
  position: "absolute",
  width: `${WIDTH_VW_FACTOR}vw`,
  height: `${HEIGHT_VH_FACTOR}vh`,
  top: "50%",
  left: "50%",
  marginRight: "-50%",
  transform: "translate(-50%, -50%)"
}

export default Canvas;