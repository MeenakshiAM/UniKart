const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const reportRoutes = require("./routes/report.routes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/reports", reportRoutes);
app.use("/reports", reportRoutes);

module.exports = app;