import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Home, Package, Calendar, User, Settings, LogOut, Search, Filter, ChevronDown, Menu, X } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/dashboard.css';

// TypeScript interface for Order
interface Order {
  id: number;
  date: string;
  items: string;
  total: string;
  status: string;
}

const Dashboard = () => {
  const [orders] = useState<Order[]>([
    { id: 1, date: "2025-01-15", items: "Burger, Fries", total: "$15.99", status: "Delivered" },
    { id: 2, date: "2025-01-20", items: "Pizza", total: "$12.99", status: "Delivered" },
    { id: 3, date: "2025-02-05", items: "Pasta", total: "$10.99", status: "In Transit" },
    { id: 4, date: "2025-02-10", items: "Salad, Breadsticks", total: "$14.50", status: "Processing" },
    { id: 5, date: "2025-02-12", items: "Wings, Soda", total: "$18.75", status: "Processing" },
  ]);

  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  // Filter orders based on active tab and search query
  const filteredOrders = orders.filter(order => {
    const matchesTab = activeTab === "all" || 
                      (activeTab === "delivered" && order.status === "Delivered") ||
                      (activeTab === "in-transit" && order.status === "In Transit") ||
                      (activeTab === "processing" && order.status === "Processing");
    
    const matchesSearch = order.items.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.date.includes(searchQuery) ||
                          order.id.toString().includes(searchQuery);
    
    return matchesTab && matchesSearch;
  });

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortOrder === "oldest") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortOrder === "highest") {
      return parseFloat(b.total.substring(1)) - parseFloat(a.total.substring(1));
    } else {
      return parseFloat(a.total.substring(1)) - parseFloat(b.total.substring(1));
    }
  });

  // Calculate stats
  const totalSpent = orders.reduce((sum, order) => sum + parseFloat(order.total.substring(1)), 0).toFixed(2);
  const processingCount = orders.filter(order => order.status === "Processing").length;
  const inTransitCount = orders.filter(order => order.status === "In Transit").length;
  const deliveredCount = orders.filter(order => order.status === "Delivered").length;

  // Status badge helper
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Delivered":
        return "badge bg-success";
      case "In Transit":
        return "badge bg-warning text-dark";
      default:
        return "badge bg-secondary";
    }
  };

  // Close sidebar when clicking outside on mobile
  const handleContentClick = () => {
    if (showMobileSidebar && window.innerWidth < 992) {
      setShowMobileSidebar(false);
    }
  };

  return (
    <div className="dashboard-wrapper">
      {/* Mobile Sidebar Toggle Button */}
      <button 
        className="btn btn-primary d-lg-none dashboard-sidebar-toggle"
        onClick={() => setShowMobileSidebar(!showMobileSidebar)}
        aria-label={showMobileSidebar ? "Close menu" : "Open menu"}
      >
        {showMobileSidebar ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${showMobileSidebar ? 'show' : ''}`}>
        <div className="dashboard-logo-container">
          <h2 className="fw-semibold">FoodDelivery</h2>
        </div>
        
        <div className="dashboard-user-profile">
          <div className="dashboard-user-avatar">
            <span>JD</span>
          </div>
          <div className="dashboard-user-info">
            <p className="dashboard-user-name">John Doe</p>
            <p className="dashboard-user-status">Premium Member</p>
          </div>
        </div>
        
        <nav className="dashboard-sidebar-nav">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link active">
                <Home size={18} className="dashboard-nav-icon" />
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/orders" className="nav-link">
                <Package size={18} className="dashboard-nav-icon" />
                My Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/delivery" className="nav-link">
                <Package size={18} className="dashboard-nav-icon" />
                Track Delivery
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/schedule" className="nav-link">
                <Calendar size={18} className="dashboard-nav-icon" />
                Schedule Orders
              </Link>
            </li>
          </ul>
          
          <div className="dashboard-settings-section">
            <p className="dashboard-settings-header">SETTINGS</p>
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link to="/profile" className="nav-link">
                  <User size={18} className="dashboard-nav-icon" />
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/settings" className="nav-link">
                  <Settings size={18} className="dashboard-nav-icon" />
                  Settings
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/logout" className="nav-link">
                  <LogOut size={18} className="dashboard-nav-icon" />
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </aside>
      
      {/* Mobile Bottom Navigation */}
      <div className="dashboard-mobile-nav d-lg-none">
        <Link to="/dashboard" className="dashboard-mobile-nav-item active">
          <Home size={20} className="dashboard-mobile-nav-icon" />
          <span className="dashboard-mobile-nav-text">Home</span>
        </Link>
        <Link to="/orders" className="dashboard-mobile-nav-item">
          <Package size={20} className="dashboard-mobile-nav-icon" />
          <span className="dashboard-mobile-nav-text">Orders</span>
        </Link>
        <Link to="/delivery" className="dashboard-mobile-nav-item">
          <Package size={20} className="dashboard-mobile-nav-icon" />
          <span className="dashboard-mobile-nav-text">Tracking</span>
        </Link>
        <Link to="/profile" className="dashboard-mobile-nav-item">
          <User size={20} className="dashboard-mobile-nav-icon" />
          <span className="dashboard-mobile-nav-text">Profile</span>
        </Link>
      </div>
      
      {/* Overlay for mobile sidebar */}
      {showMobileSidebar && (
        <div 
          className="dashboard-sidebar-overlay d-lg-none" 
          onClick={() => setShowMobileSidebar(false)}
        ></div>
      )}
      
      {/* Main Content */}
      <div className="dashboard-content" onClick={handleContentClick}>
        <div className="container-fluid px-lg-4">
          {/* Header with Notification */}
          <div className="dashboard-header mb-4">
            <div className="row align-items-center">
              <div className="col-md-6 col-lg-8 mb-3 mb-md-0">
                <h1 className="h2 fw-bold mb-1">Dashboard</h1>
                <p className="text-muted mb-0">Welcome back, John! Here's your order summary.</p>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="d-flex flex-wrap gap-3 justify-content-md-end">
                  <div className="position-relative">
                    <button className="btn btn-light position-relative" aria-label="Notifications">
                      <Bell size={18} />
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        2
                        <span className="visually-hidden">unread notifications</span>
                      </span>
                    </button>
                  </div>
                  <div className="position-relative dashboard-search-container">
                    <Search size={16} className="dashboard-search-icon" />
                    <input
                      type="text"
                      placeholder="Search orders..."
                      className="form-control dashboard-search-input"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      aria-label="Search orders"
                    />
                  </div>
                  <div className="dropdown">
                    <button className="btn btn-outline-secondary dropdown-toggle d-flex align-items-center gap-1" type="button" id="filterDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                      <Filter size={16} />
                      <span className="d-none d-sm-inline">Filter</span>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="filterDropdown">
                      <li><button className="dropdown-item" onClick={() => setActiveTab('all')}>All Orders</button></li>
                      <li><button className="dropdown-item" onClick={() => setActiveTab('processing')}>Processing</button></li>
                      <li><button className="dropdown-item" onClick={() => setActiveTab('in-transit')}>In Transit</button></li>
                      <li><button className="dropdown-item" onClick={() => setActiveTab('delivered')}>Delivered</button></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="row mb-4 g-3">
            <div className="col-sm-6 col-lg-3">
              <div className="card dashboard-stat-card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-2">
                    <h6 className="card-subtitle text-muted">Total Spent</h6>
                    <div className="dashboard-stat-icon text-primary rounded-circle bg-primary bg-opacity-10 p-2">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                      </svg>
                    </div>
                  </div>
                  <h2 className="card-title fw-bold">${totalSpent}</h2>
                  <p className="card-text small text-success mb-0"><span className="me-1">↑</span>2.5% from last month</p>
                </div>
              </div>
            </div>
            
            <div className="col-sm-6 col-lg-3">
              <div className="card dashboard-stat-card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-2">
                    <h6 className="card-subtitle text-muted">Processing</h6>
                    <div className="dashboard-stat-icon text-warning rounded-circle bg-warning bg-opacity-10 p-2">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                    </div>
                  </div>
                  <h2 className="card-title fw-bold">{processingCount}</h2>
                  <p className="card-text small text-muted mb-0">Orders being prepared</p>
                </div>
              </div>
            </div>
            
            <div className="col-sm-6 col-lg-3">
              <div className="card dashboard-stat-card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-2">
                    <h6 className="card-subtitle text-muted">In Transit</h6>
                    <div className="dashboard-stat-icon text-info rounded-circle bg-info bg-opacity-10 p-2">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="18" cy="5" r="3"/>
                        <circle cx="6" cy="12" r="3"/>
                        <circle cx="18" cy="19" r="3"/>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                      </svg>
                    </div>
                  </div>
                  <h2 className="card-title fw-bold">{inTransitCount}</h2>
                  <p className="card-text small text-muted mb-0">Orders on the way</p>
                </div>
              </div>
            </div>
            
            <div className="col-sm-6 col-lg-3">
              <div className="card dashboard-stat-card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-2">
                    <h6 className="card-subtitle text-muted">Delivered</h6>
                    <div className="dashboard-stat-icon text-success rounded-circle bg-success bg-opacity-10 p-2">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                      </svg>
                    </div>
                  </div>
                  <h2 className="card-title fw-bold">{deliveredCount}</h2>
                  <p className="card-text small text-muted mb-0">Completed orders</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Order History */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white border-bottom-0 pt-3">
              <div className="row align-items-center">
                <div className="col-lg-6 mb-2 mb-lg-0">
                  <h5 className="card-title fw-semibold mb-0">Order History</h5>
                </div>
                <div className="col-lg-6">
                  <div className="d-flex justify-content-lg-end">
                    <div className="input-group w-auto">
                      <span className="input-group-text bg-white border-end-0">
                        <ChevronDown size={16} />
                      </span>
                      <select 
                        className="form-select border-start-0"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        aria-label="Sort orders"
                      >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="highest">Highest Total</option>
                        <option value="lowest">Lowest Total</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="dashboard-tab-navigation mt-3 overflow-auto">
                <ul className="nav nav-tabs flex-nowrap">
                  <li className="nav-item">
                    <button 
                      className={`nav-link ${activeTab === 'all' ? 'active' : ''}`}
                      onClick={() => setActiveTab('all')}
                    >
                      All Orders
                    </button>
                  </li>
                  <li className="nav-item">
                    <button 
                      className={`nav-link ${activeTab === 'processing' ? 'active' : ''}`}
                      onClick={() => setActiveTab('processing')}
                    >
                      <span className="d-none d-sm-inline">Processing</span>
                      <span className="d-inline d-sm-none">Process</span>
                    </button>
                  </li>
                  <li className="nav-item">
                    <button 
                      className={`nav-link ${activeTab === 'in-transit' ? 'active' : ''}`}
                      onClick={() => setActiveTab('in-transit')}
                    >
                      <span className="d-none d-sm-inline">In Transit</span>
                      <span className="d-inline d-sm-none">Transit</span>
                    </button>
                  </li>
                  <li className="nav-item">
                    <button 
                      className={`nav-link ${activeTab === 'delivered' ? 'active' : ''}`}
                      onClick={() => setActiveTab('delivered')}
                    >
                      Delivered
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light text-nowrap">
                  <tr>
                    <th scope="col">Order ID</th>
                    <th scope="col">Date</th>
                    <th scope="col">Items</th>
                    <th scope="col">Total</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedOrders.length > 0 ? (
                    sortedOrders.map((order) => (
                      <tr key={order.id} className="position-relative">
                        <td><span className="fw-medium">#{order.id}</span></td>
                        <td>{new Date(order.date).toLocaleDateString()}</td>
                        <td className="text-truncate" style={{maxWidth: "200px"}}>{order.items}</td>
                        <td className="fw-medium">{order.total}</td>
                        <td>
                          <span className={getStatusBadgeClass(order.status)}>
                            {order.status}
                          </span>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-primary">Details</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center py-4 text-muted">
                        <div className="py-4">
                          <p className="mb-0">No orders found matching your criteria.</p>
                          <button className="btn btn-link" onClick={() => setActiveTab('all')}>View all orders</button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {sortedOrders.length > 0 && (
              <div className="card-footer bg-white d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
                <p className="small text-muted mb-md-0">
                  Showing <span className="fw-medium">{sortedOrders.length}</span> of <span className="fw-medium">{orders.length}</span> orders
                </p>
                <nav aria-label="Page navigation">
                  <ul className="pagination pagination-sm mb-0 flex-wrap justify-content-center justify-content-md-end">
                    <li className="page-item disabled">
                      <button className="page-link" aria-label="Previous page">
                        <span aria-hidden="true">&laquo;</span>
                      </button>
                    </li>
                    <li className="page-item active">
                      <button className="page-link">1</button>
                    </li>
                    <li className="page-item disabled">
                      <button className="page-link" aria-label="Next page">
                        <span aria-hidden="true">&raquo;</span>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;