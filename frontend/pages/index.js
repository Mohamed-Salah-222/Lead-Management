import { useState, useEffect } from "react";
import axios from "axios";

// API configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function Home() {
  // State management
  const [leads, setLeads] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "New",
  });
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [message, setMessage] = useState("");

  // Available lead status options
  const statusOptions = ["New", "Engaged", "Proposal Sent", "Closed-Won", "Closed-Lost"];

  const fetchLeads = async () => {
    setRefreshing(true);
    try {
      const response = await axios.get(`${API_URL}/leads`);
      setLeads(response.data);
      setMessage("Leads refreshed!");
      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      console.error("Error fetching leads:", error);
      setMessage("Error fetching leads");
    } finally {
      setRefreshing(false);
    }
  };

  const initialLoad = async () => {
    try {
      const response = await axios.get(`${API_URL}/leads`);
      setLeads(response.data);
    } catch (error) {
      console.error("Error loading leads:", error);
      setMessage("Error loading leads");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(`${API_URL}/leads`, formData);
      setLeads([response.data, ...leads]); // Add new lead to top of list
      setFormData({ name: "", email: "", status: "New" }); // Reset form
      setMessage("Lead added successfully!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error adding lead");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    initialLoad();
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      New: "#e3f2fd",
      Engaged: "#fff3e0",
      "Proposal Sent": "#f3e5f5",
      "Closed-Won": "#e8f5e8",
      "Closed-Lost": "#ffebee",
    };
    return colors[status] || "#f5f5f5";
  };

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">Lead Management</h1>
          <p className="page-subtitle">Manage your sales leads efficiently</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="main-grid">
        {/* Add Lead Form Section */}
        <div className="form-section">
          <div className="form-card">
            <h2 className="form-title">Add New Lead</h2>

            {/* Status/Error Messages */}
            {message && <div className={`message ${message.includes("success") || message.includes("added") || message.includes("refreshed") ? "message-success" : "message-error"}`}>{message}</div>}

            {/* Lead Form */}
            <form onSubmit={handleSubmit} className="lead-form">
              <div className="form-group">
                <label className="form-label">Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="form-input" placeholder="Enter lead name" />
              </div>

              <div className="form-group">
                <label className="form-label">Email *</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="form-input" placeholder="Enter email address" />
              </div>

              <div className="form-group">
                <label className="form-label">Status</label>
                <select name="status" value={formData.status} onChange={handleInputChange} className="form-select">
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" disabled={loading} className={`form-submit ${loading ? "form-submit-loading" : ""}`}>
                {loading ? "Adding..." : "Add Lead"}
              </button>
            </form>
          </div>
        </div>

        {/* Leads List Section */}
        <div className="leads-section">
          <div className="leads-card">
            {/* Leads Header */}
            <div className="leads-header">
              <h2 className="leads-title">All Leads ({leads.length})</h2>
              <button onClick={fetchLeads} disabled={refreshing} className={`refresh-btn ${refreshing ? "refresh-btn-loading" : ""}`}>
                {refreshing && <span className="spinner"></span>}
                {refreshing ? "Refreshing..." : "Refresh"}
              </button>
            </div>

            {/* Leads List */}
            <div className="leads-list">
              {leads.length === 0 ? (
                <div className="empty-state">No leads found. Add your first lead using the form.</div>
              ) : (
                leads.map((lead) => (
                  <div key={lead._id} className="lead-item">
                    <div className="lead-info">
                      <h3 className="lead-name">{lead.name}</h3>
                      <p className="lead-email">{lead.email}</p>
                      <p className="lead-date">Created: {new Date(lead.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="lead-status">
                      <span className="status-badge" style={{ backgroundColor: getStatusColor(lead.status) }}>
                        {lead.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
