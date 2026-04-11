const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoute = require("./modules/auth/auth.routes");
const dotenv = require("dotenv");

dotenv.config();

// create app
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// connect DB BEFORE routes
connectDB();

// routes
app.use("/api/auth", authRoute);

// health check (VERY IMPORTANT for debugging)
app.get("/", (req, res) => {
  res.send("Auth service is running 🚀");
});

module.exports = app;  