const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");
const buyRoutes = require("./routes/productRoutes");
const sellRoutes = require("./routes/productRoutes");
const cronJob = require("./lib/cron");

const app = express();
app.use(cors());
app.use(express.json());
cronJob.start();

app.use("/api/auth", authRoutes);
app.use("/api/products", protect, productRoutes);
app.use("/api/buy", protect, buyRoutes);
app.use("/api/sell", protect, sellRoutes);
app.use("/api/transactions", require("./routes/transactionRoutes.js"));
app.get("/ping", (req, res) => {
  res.status(200).send("pong");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(5000, () => console.log("Server running on port 5000"))
  )
  .catch((err) => console.error(err));
