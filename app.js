const express = require("express");
const connectDB = require("./db/connect");
require("dotenv").config();
const app = express();

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    app.listen(port, console.log(`Sever is listening on port ${port}`));
    await connectDB(process.env.DBURL);
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
};

start();
