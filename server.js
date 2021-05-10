require("dotenv").config();
const express = require("express");
const cors = require("cors");

require("./configuration/dbConnect");

const productRoutes = require("./routers/productRoutes");
const authRoutes = require("./routers/authRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/products", productRoutes);

app.all("*", (req, res, next) => {
  res
    .status(404)
    .json({ message: `Cannot find ${req.originalUrl} on the server` });
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({ message: error.message });
});

module.exports = app.listen(4000, () => console.log("Server up and running"));
