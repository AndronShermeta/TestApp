import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "./App.css";
import axios from "axios";

require("react-dom");
window.React2 = require("react");
console.log(window.React1 === window.React2);
function App() {
  const [shopData, setshopData] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getAll = async () => {
    const baseUrl = "http://localhost:3000/shop";
    const response = await axios.get(baseUrl);
    console.log(response.data);
    setshopData(response.data);
  };
  const changeJson = async () =>{
    axios.put('http://localhost:3000/shop/3/', {
    id: 3,
    imageUrl: "https://ru.reactjs.org/logo-og.png",
    name: 'Fred',
    count: 0,
    size: {
      "width": 200,
      "height": 200
    },
    weight: "20g",
    
    count: 0,
    }).then(resp => {
        console.log(resp.data);
    }).catch(error => {
        console.log(error);
    });
  }
  useEffect(() => {
    getAll();
    changeJson();
  }, []);
  return (
    <div className="App">
      <div className="navBar">
        <div className="view">
          <button className="listView">
            ListView
          </button>
          <button className="ProductView">ProductView</button>
        </div>
      </div>
      <div className="shopModule">
        <div className="cards-container">
          {shopData.map((data) => {
            return (
              <div className="itemcard" key={data.id}>
                <img
                  src={data.imageUrl}
                  alt="cardImage"
                  className="cardImage"
                ></img>
                <span className="cardName">{data.name}</span>
                <span className="cardName">In stock:{data.count}</span>
                <span className="cardName">
                  Size:{data.size.width}x{data.size.height}
                </span>
                <button className="editButton" onClick={handleShow}>
                  Edit
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                  type="text"        
                  placeholder="Enter text" 
                  required 
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Count</Form.Label>
                <Form.Control 
                  type="text"        
                  placeholder="Enter text" 
                  required 
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>SizeWidth</Form.Label>
                <Form.Control 
                  type="text"        
                  placeholder="Enter text" 
                  required 
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>SizeHeight</Form.Label>
                <Form.Control 
                  type="text"        
                  placeholder="Enter text" 
                  required 
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary">Understood</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default App;
