require("dotenv").config();
require("express-async-errors");

// express
const express = require("express");
const app = express();

// package
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileupload = require("express-fileupload");

// database
const connectDB = require("./db/connect");

// routers
const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");

// middleware
const notfound = require("./middleware/notfound");
const errorhandler = require("./middleware/errorhandler");

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static("./public"));
app.use(fileupload());
app.use(cors());

// app.use(express.static());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

app.use(notfound);
app.use(errorhandler);

// start
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
