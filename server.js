require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");

const app = express();
app.use(express.json());



// Root route for the homepage
app.get("/", (req, res) => {
    res.send("Welcome to the RBAC System!");
});

mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    console.log('MONGO_URI:', process.env.MONGO_URI);
  });

// Routes
app.use("/auth", authRoutes);
app.use("/protected", protectedRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
