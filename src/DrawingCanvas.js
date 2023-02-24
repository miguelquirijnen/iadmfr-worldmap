import React, { useState, useRef, useEffect } from 'react'
import { Europe } from './Continents';

const DrawingCanvas = props => {
  const [drawing, setDrawing] = useState(false);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    // For supporting computers with higher screen densities, we double the screen density
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    console.log("hw " +  canvas.width + " - " + canvas.height)
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    // Setting the context to enable us draw
    const ctx = canvas.getContext('2d');
    ctx.scale(2, 2);
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5;
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
      ><Europe /></canvas>
    </>
  );
}

export default DrawingCanvas