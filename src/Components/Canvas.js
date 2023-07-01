import React, { useState, useRef, useEffect } from "react";

const WIDTH_VW_FACTOR = 50;
const HEIGHT_VH_FACTOR = 50;

const Canvas = ({ width, height }) => {
  const [drawing, setDrawing] = useState(false);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    canvas.width =
      document.body.getBoundingClientRect().width * (WIDTH_VW_FACTOR / 100);
    canvas.height =
      document.body.getBoundingClientRect().height * (HEIGHT_VH_FACTOR / 100);

    // canvas.width = document.documentElement.clientWidth * (WIDTH_VW_FACTOR/100)
    // canvas.height = document.documentElement.clientHeight * (HEIGHT_VH_FACTOR/100)

    canvas.style.width = `${WIDTH_VW_FACTOR}vw`;
    canvas.style.height = `${HEIGHT_VH_FACTOR}vh`;

    // Setting the context to enable us draw
    const ctx = canvas.getContext("2d");

    ctx.lineCap = "round";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctxRef.current = ctx;
  }, []);

  // Start drawing
  const startDraw = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    setDrawing(true);
  };

  // Stop drawing
  const stopDraw = () => {
    ctxRef.current.closePath();
    setDrawing(false);
  };

  // Draw on the canvas
  const draw = ({ nativeEvent }) => {
    if (!drawing) return;
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  };

  // Clear the canvas
  const clear = () => {
    ctxRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
  };

  return (
    <canvas
      onMouseDown={startDraw}
      onMouseUp={stopDraw}
      onMouseMove={draw}
      ref={canvasRef}
      style={canvasStyle}
      id={"canvas"}
    />
  );
};

const canvasStyle = {
  border: "1 px solid black",
  backgroundColor: "rgba(128, 0, 32,0.8)",
  borderRadius: "10px", // Add round border
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", // Add shadow effect
  width: `${WIDTH_VW_FACTOR}vw`,
  height: `${HEIGHT_VH_FACTOR}vh`,
};

export default Canvas;
