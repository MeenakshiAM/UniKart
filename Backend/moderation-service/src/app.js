require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());

// routes
const imageRoutes = require("./routes/moderationImage.routes");


app.use("/api/moderation", imageRoutes);
const moderationRoutes = require("./routes/moderation.routes");

app.use("/api/moderation", moderationRoutes);

module.exports = app;
