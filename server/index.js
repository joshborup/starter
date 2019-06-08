require("dotenv").config();
const express = require("express");
const app = express();
// const mongoose = require("mongoose");
const { get, post, put, deleteItem } = require("./controller/controller");
const {
  login,
  registerUser,
  userInfo
} = require("./controller/authController");
const { SERVER_PORT, CONNECTION_STRING } = process.env;

// mongoose
//   .connect(CONNECTION_STRING)
//   .then(() => {
//     console.log("connected to mongodb");
//   })
//   .catch(err => console.log(err));

// top level middlewares

// auth

app.post("/api/register", registerUser);
app.post("/api/login", login);
app.post("/api/user", userInfo);

// data endpoints
app
  .route("/api")
  .get(get)
  .post(post);

app
  .route("/api/:id")
  .put(put)
  .delete(deleteItem);

const port = 4000;
app.listen(port, () => console.log(`server listening on ${port}`));
