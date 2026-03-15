const express = require("express");
const cors = require("cors");

const listingRoutes = require("./routes/service.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/listings", listingRoutes);
const productRoutes = require("./routes/product.routes");

app.use("/api/products", productRoutes);
// routes

const reviewRoutes = require("./routes/review.routes");
app.use("/api", reviewRoutes);


module.exports = app;
