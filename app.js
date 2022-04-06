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
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
// database
const connectDB = require("./db/connect");

// routers
const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");
const reviewRouter = require("./routes/reviewRoute");
const orderRouter = require("./routes/orderRoute");

// middleware
const notfound = require("./middleware/notfound");
const errorhandler = require("./middleware/errorhandler");

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60
  })
);

app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(cors());
// app.use(morgan("dev"));

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use(express.static("./public"));
app.use(fileupload());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/orders", orderRouter);

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
