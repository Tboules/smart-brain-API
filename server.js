const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const signin = require("./controlers/signin");
const register = require("./controlers/register");
const Id = require("./controlers/Id");
const ImageHandler = require("./controlers/ImageHandler");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "test",
    database: "smart-brain",
  },
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(database.users);
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
app.listen(3001, () => {
  console.log(`App is running on port 3001`);
});
