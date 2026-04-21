const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoute = require("./modules/auth/auth.routes");
const userRoutes = require("./modules/user/user.routes");
const ideaRoutes = require("./modules/idea/idea.routes");
const pdfRoutes = require("./modules/pdf/pdf.routes");
const paymentRoutes = require("./modules/payment/payment.routes");

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
app.use("/api/user",userRoutes);
//pdf route
app.use("/api/pdf", pdfRoutes);
// IDEA ROUTES 🚀
app.use("/api/ideas", ideaRoutes);
//payment route
app.use("/api/payment", paymentRoutes);

// health check (VERY IMPORTANT for debugging)
app.get("/", (req, res) => {
  res.send("Auth service is running 🚀");
});

module.exports = app;  