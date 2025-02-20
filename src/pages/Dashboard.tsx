import React, { useState } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Dashboard.css';
import {
  User,
  Users,
  Pizza,
  History,
  LogOut,
  Menu,
  Smile,
  X,
  Edit,
  Trash2, // Add these icons
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = () => setShowEditModal(true);

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);

  const handleDelete = () => {
    // Perform delete action here
    setShowDeleteModal(false);
    alert('Case study deleted successfully.');
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="dashboard">
      {/* SIDEBAR */}
      <section
        id="sidebar"
        className={isSidebarVisible ? 'visible' : 'hidden'}
        style={{
          width: isSidebarVisible ? '280px' : '0',
          display: isSidebarVisible ? 'block' : 'none',
        }}
      >
        {/* Close Icon for Smaller Devices */}
        <div className="close-icon" onClick={toggleSidebar}>
          <X size={24} />
        </div>

        <a href="#" className="brand gap-2">
          <User size={24} />
          <span className="text ">Irakiza Sabin</span>
        </a>
        <ul className="side-menu top ">
          <li>
            <a href="#" className="gap-2">
              <Users size={20} />
              <span className="text">Users</span>
            </a>
          </li>
          <li className="active">
            <a href="#" className="gap-2">
              <Pizza size={20} />
              <span className="text">Food</span>
            </a>
          </li>
          <li>
            <a href="#" className='gap-2'>
              <History size={20} />
              <span className="text">Order History</span>
            </a>
          </li>
        </ul>
        <ul className="side-menu">
          <li>
            <a href="#" className="logout">
              <LogOut size={20} />
              <span className="text">Logout</span>
            </a>
          </li>
        </ul>
      </section>

      {/* CONTENT */}
      <section
        id="content"
        style={{
          width: isSidebarVisible ? 'calc(100% - 280px)' : '100%',
          left: isSidebarVisible ? '280px' : '0',
        }}
      >
        {/* NAVBAR */}
        <nav>
          <Menu size={24} onClick={toggleSidebar} style={{ cursor: 'pointer' }} />
          <a href="#" className="nav-link text-secondary">Welcome Back</a>
          <form action="#">
            <div className="form-input text-warning">
              <Smile size={20} />
            </div>
          </form>
          <a href="#" className="profile">
            <img src="img/people.png" alt="Profile" />
          </a>
        </nav>

        {/* Order food form */}
        <div className="container mt-3">
          <h1 className="mt-4 mb-4">Upload Food</h1>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter title" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Upload image:</Form.Label>
              <Form.Control type="file" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={5} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="Enter price" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Form>
        </div>

        {/* CASE STUDY OUTPUT */}
        <div className="container mt-4">
          <div className="table-responsive">
            <Table striped bordered hover className="shadow-lg">
              <thead className="thead-dark">
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Food</td>
                  <td>Best Food</td>
                  <td>
                   18$
                  </td>
                  <td>
                    <Button variant="primary" size="sm" className="me-2" onClick={handleShowEditModal}>
                      <Edit size={16} /> {/* Edit Icon */}
                    </Button>
                    <Button variant="danger" size="sm" onClick={handleShowDeleteModal}>
                      <Trash2 size={16} /> {/* Delete Icon */}
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>

        {/* EDIT MODAL */}
        <Modal show={showEditModal} onHide={handleCloseEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Food</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Upload new image:</Form.Label>
                <Form.Control type="file" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={5} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" placeholder="Enter price" />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditModal}>Close</Button>
            <Button variant="primary" onClick={handleCloseEditModal}>Save changes</Button>
          </Modal.Footer>
        </Modal>

        {/* DELETE MODAL */}
        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Food</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this Food?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDeleteModal}>No</Button>
            <Button variant="danger" onClick={handleDelete}>Yes</Button>
          </Modal.Footer>
        </Modal>
      </section>
    </div>
  );
};

export default Dashboard;