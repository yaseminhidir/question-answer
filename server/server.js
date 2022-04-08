const express = require("express");
var cors = require("cors");
const dotenv = require("dotenv");
const connectDatabase = require("./helpers/database/connectDatabase");
const customErrorHandler = require("./middlewares/errors/customErrorHandler");
const routers = require("./routers/index.js");
const path = require("path");
var cookieParser = require("cookie-parser");
const { checkAuth } = require("./middlewares/authorization/auth");
dotenv.config({
  path: "./config/env/config.env",
});

//MongodB Connection

connectDatabase();
const app = express();
app.use(cookieParser());
app.use(
  cors({
    allowedHeaders: "*,content-type,authorization,accept",
    credentials: true,
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
  })
);
// Express - Body Middleware

app.use(express.json());

const PORT = process.env.PORT;

//Routers Middleware
app.use(checkAuth);
app.use("/api", routers);


// Error Handler

app.use(customErrorHandler);

// Static Files
app.use(express.static(path.join(__dirname, "public")));
app.listen(PORT, () => {
  console.log(`app started on ${PORT} : ${process.env.NODE_ENV}`);
});
