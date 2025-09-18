
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
if (!process.env.MONGODB_URI) {
  console.error("❌ MONGODB_URI environment variable is required");
  console.error("💡 Please set MONGODB_URI in your .env file");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err.message);
    process.exit(1); 
  });

// Lead Schema 
const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true, 
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true, 
    trim: true,
  },
  status: {
    type: String,
    enum: ["New", "Engaged", "Proposal Sent", "Closed-Won", "Closed-Lost"],
    default: "New",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Lead = mongoose.model("Lead", leadSchema);

// API Routes


app.get("/api/leads", async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    console.error("Error fetching leads:", error.message);
    res.status(500).json({ message: "Failed to retrieve leads" });
  }
});


app.post("/api/leads", async (req, res) => {
  try {
    const { name, email, status } = req.body;

    //  validation
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    // Check for existing lead with same email
    const existingLead = await Lead.findOne({ email: email.toLowerCase().trim() });
    if (existingLead) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create new lead
    const newLead = new Lead({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      status: status || "New",
    });

    const savedLead = await newLead.save();
    res.status(201).json(savedLead);
  } catch (error) {
    console.error("Error creating lead:", error.message);

    // Handle validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    res.status(400).json({ message: "Failed to create lead" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API available at http://localhost:${PORT}/api`);
});
