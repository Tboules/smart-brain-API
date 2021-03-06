const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const signin = require("./controllers/Signin");
const register = require("./controllers/Register");
const Id = require("./controllers/Id");
const ImageHandler = require("./controllers/ImageHandler");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  },
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("It is working!");
});

//sign in
app.post("/signin", (req, res) => {
  signin.hanSignin(req, res, db, bcrypt);
});

//register
app.post("/register", (req, res) => {
  register.handReg(req, res, db, bcrypt);
});

// grabbing user info

app.get("/profile/:id", (req, res) => {
  Id.handId(req, res, db);
});

// updating image entry score

app.put("/image", (req, res) => {
  ImageHandler.handImg(req, res, db);
});

app.post("/imageurl", (req, res) => {
  ImageHandler.handleApiCall(req, res);
});

const PORT = process.env.PORT;
app.listen(PORT || 3001, () => {
  console.log(`App is running on port ${PORT}`);
});
