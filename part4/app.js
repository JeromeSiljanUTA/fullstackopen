const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const mongoose = require("mongoose");

mongoose
  .connect(config.MONGODB_URI)
  .then(() => console.log("Successfully connected to MongoDB"));

app.use(cors());
app.use(express.json());
app.use(blogsRouter);

module.exports = app;
