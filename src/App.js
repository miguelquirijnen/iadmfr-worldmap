import { Belgium } from "./Countries";
import { useState, useEffect, useRef } from "react";
// import Modal from "./Modal";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Worldmap from "./Worldmap";
import { Europe } from "./Continents";
import DrawingCanvas from "./DrawingCanvas";

function App() {
  const [showModal, setShowModal] = useState(false);


  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const activateArea = (e) => {
    console.log("activating...")
    console.log(e.currentTarget.id)
    document.body.style.zoom = "100%";
    handleShow();
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
        integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
        crossorigin="anonymous"
      />
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!
          
          <DrawingCanvas/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Worldmap activateArea={activateArea} />
    </>
  );
}

export default App;
