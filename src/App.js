import Worldmap from "./Components/World/Worldmap";
import React, { useState, useRef, useEffect } from "react";

function App() {
  const overlayRef = useRef(null);

  return (
    <div className="wrapper">
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
        integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
        crossOrigin="anonymous"
      />
      <Worldmap />
    </div>
  );
}

export default App;