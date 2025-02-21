import React, { useState } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import {
  User,
  Users,
  Pizza,
  History,
  LogOut,
  Menu,
  Smile,
  X,
  Trash2,
} from 'lucide-react';

const UsersDashboard: React.FC = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = (userId: number) => {
    setSelectedUserId(userId);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    // Perform delete action here
    setShowDeleteModal(false);
    alert(`User with ID ${selectedUserId} deleted successfully.`);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', role: 'User' },
    // Add more users as needed
  ];

  return (
    <div className="users-dashboard">
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
          <span className="text">Irakiza Sabin</span>
        </a>
        <ul className="side-menu top">
          <li className="active">
            <a href="#" className="gap-2 ">
              <Users size={20} />
              <span className="text">Users</span>
            </a>
          </li>
          <li>
            <Link to="/dashboard" className="gap-2">
              <Pizza size={20} />
              <span className="text">Food</span>
            </Link>
          </li>
          <li>
            <Link to="/orderDashboard" className="gap-2">
              <History size={20} />
              <span className="text">Order History</span>
            </Link>
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
          <Menu className="menu-icon" size={24} onClick={toggleSidebar} style={{ cursor: 'pointer' }} />
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

        {/* USERS TABLE */}
        <div className="container mt-3">
          <h1 className="mt-4 mb-4">Users</h1>
          <div className="table-responsive">
            <Table striped bordered hover className="shadow-lg">
              <thead className="thead-dark">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <Button variant="danger" size="sm" onClick={() => handleShowDeleteModal(user.id)}>
                        <Trash2 size={12} /> {/* Delete Icon */}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>

        {/* DELETE MODAL */}
        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Delete User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this user?
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

export default UsersDashboard;