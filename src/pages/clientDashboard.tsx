import React, { useState } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  History,
  LogOut,
  Menu,
  Smile,
  X,
  CheckCircle,
  XCircle,
  User,
} from 'lucide-react';

const ClientDashboard: React.FC = () => {
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showDisapproveModal, setShowDisapproveModal] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [orders, setOrders] = useState([
    { id: 1, food: 'Pizza', quantity: 2, totalPrice: 20, status: 'Pending' },
    { id: 2, food: 'Burger', quantity: 1, totalPrice: 10, status: 'Pending' },
    { id: 3, food: 'Pasta', quantity: 3, totalPrice: 30, status: 'Pending' },
    // Add more orders as needed
  ]);

  const handleCloseApproveModal = () => setShowApproveModal(false);
  const handleShowApproveModal = (orderId: number) => {
    setSelectedOrderId(orderId);
    setShowApproveModal(true);
  };

  const handleCloseDisapproveModal = () => setShowDisapproveModal(false);
  const handleShowDisapproveModal = (orderId: number) => {
    setSelectedOrderId(orderId);
    setShowDisapproveModal(true);
  };

  const handleApprove = () => {
    setOrders(orders.map(order => 
      order.id === selectedOrderId ? { ...order, status: 'Approved' } : order
    ));
    setShowApproveModal(false);
  };

  const handleDisapprove = () => {
    setOrders(orders.map(order => 
      order.id === selectedOrderId ? { ...order, status: 'Denied' } : order
    ));
    setShowDisapproveModal(false);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="client-dashboard">
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
          <span className="text">Client Dashboard</span>
        </a>
        <ul className="side-menu top">
          <li className="active">
            <Link to="/orderHistory" className="gap-2">
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

        {/* ORDERS TABLE */}
        <div className="container mt-3">
          <h1 className="mt-4 mb-4">My Orders</h1>
          <div className="table-responsive">
            <Table striped bordered hover className="shadow-lg">
              <thead className="thead-dark">
                <tr>
                  <th>Order ID</th>
                  <th>Name of the Food</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.food}</td>
                    <td>{order.quantity}</td>
                    <td>${order.totalPrice}</td>
                    <td>
                      {order.status === 'Pending' ? (
                        <>
                          <Button variant="success" size="sm" className="me-2" onClick={() => handleShowApproveModal(order.id)}>
                            <CheckCircle size={12} /> {/* Approve Icon */}
                          </Button>
                          <Button variant="danger" size="sm" onClick={() => handleShowDisapproveModal(order.id)}>
                            <XCircle size={12} /> {/* Disapprove Icon */}
                          </Button>
                        </>
                      ) : (
                        <span>{order.status}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>

        {/* APPROVE MODAL */}
        <Modal show={showApproveModal} onHide={handleCloseApproveModal}>
          <Modal.Header closeButton>
            <Modal.Title>Approve Order</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to approve this order?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseApproveModal}>No</Button>
            <Button variant="success" onClick={handleApprove}>Yes</Button>
          </Modal.Footer>
        </Modal>

        {/* DISAPPROVE MODAL */}
        <Modal show={showDisapproveModal} onHide={handleCloseDisapproveModal}>
          <Modal.Header closeButton>
            <Modal.Title>Disapprove Order</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to disapprove this order?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDisapproveModal}>No</Button>
            <Button variant="danger" onClick={handleDisapprove}>Yes</Button>
          </Modal.Footer>
        </Modal>
      </section>
    </div>
  );
};

export default ClientDashboard;