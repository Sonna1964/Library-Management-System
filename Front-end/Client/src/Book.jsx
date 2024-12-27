import React, { useState, Fragment, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "react-bootstrap/Navbar";

const Book = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  const [editid, setEditId] = useState("");
  const [edittitle, setEditTitle] = useState("");
  const [editauthor, setEditAuthor] = useState("");
  const [editdescription, setEditDescription] = useState("");

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axios
      .get("https://localhost:7072/api/Book")
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (id) => {
    // alert(id);
    handleShow();
    axios
      .get(`https://localhost:7072/api/Book/${id}`)
      .then((result) => {
        setEditId(id);
        setEditTitle(result.data.title);
        setEditAuthor(result.data.author);
        setEditDescription(result.data.description);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure delete this Book`) == true) {
      axios
        .delete(`https://localhost:7072/api/Book/${id}`)
        .then((result) => {
          if (result.status === 200) {
            toast.success("Employee has been Deleted");
            getData();
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const handleUpdate = () => {
    const url = `https://localhost:7072/api/Book/${editid}`;
    const data = {
      id: editid,
      title: edittitle,
      author: editauthor,
      description: editdescription,
    };
    axios
      .put(url, data)
        .then((result) => {
            handleClose();
        getData();
        clear();
        toast.success("Book has been updated..!!");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleSave = () => {
    const url = "https://localhost:7072/api/Book";
    const data = {
      title: title,
      author: author,
      description: description,
    };
    axios
      .post(url, data)
      .then((result) => {
        getData();
        clear();
        toast.success("Book has been added..!!");
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  const clear = () => {
    setTitle("");
    setAuthor("");
    setDescription("");
    setEditId("");
    setEditTitle("");
    setEditAuthor("");
    setEditDescription("");
  };

  return (
    <Fragment>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Library Management System</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#login">Gagana H. Sonnadara</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ToastContainer />
      <Container>
        <Row>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Col>
          <Col>
            <button className="btn btn-primary" onClick={() => handleSave()}>
              Add Book
            </button>
          </Col>
        </Row>
      </Container>
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            {/* <th>Id</th> */}
            <th>Title</th>
            <th>Author</th>
                      <th>Description</th>
                      <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data || data.length > 0
            ? data.map((item, index) => {
                return (
                  <tr key={index}>
                    {/* <td>{item.id}</td> */}
                    <td>{item.title}</td>
                    <td>{item.author}</td>
                    <td>{item.description}</td>
                    <td colSpan={2}>
                      <button
                        className="btn btn-primary"
                        style={{ padding: "auto" }}
                        onClick={() => handleEdit(item.id)}>
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        style={{ marginLeft: "10px", padding: "auto" }}
                        onClick={() => handleDelete(item.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            : "Loading..."}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Book Info.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Edit Title"
                value={edittitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Edit Author"
                value={editauthor}
                onChange={(e) => setEditAuthor(e.target.value)}
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Edit Des."
                value={editdescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default Book;
