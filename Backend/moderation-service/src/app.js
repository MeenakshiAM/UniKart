require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db"); // ✅ path is relative to app.js

const app = express();
app.use(express.json());

connectDB(); // ✅ connect DB here

module.exports = app;
