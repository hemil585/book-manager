const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bookRouter = require('./routes/book')
require("dotenv").config();

const server = express();
const port = process.env.PORT || 8000;

// Middleware
server.use(express.json());
server.use(cors());
server.use(morgan("dev"));
server.use(express.urlencoded({ extended: true }));
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
server.use('/books',bookRouter.router)

// Connection
const connectToDB = (async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to DB");
  } catch (err) {
    console.error(err);
  }
})();

server.listen(8080, () => {
  console.log(`Server is listening on port ${port}`);
});
