const express = require("express");
const app = express();
const cors = require("cors");

const mongoose = require("mongoose");
const port = 5000;

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
const mongoURI =
  "mongodb://BHARGAVI:Bhargavi123@ac-8toq5vq-shard-00-00.yvrccdm.mongodb.net:27017,ac-8toq5vq-shard-00-01.yvrccdm.mongodb.net:27017,ac-8toq5vq-shard-00-02.yvrccdm.mongodb.net:27017/?ssl=true&replicaSet=atlas-23bx4s-shard-0&authSource=admin&retryWrites=true&w=majority";
const mongoClient = mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = new mongoose.model("User", userSchema);

//Routes
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({ message: "Login Successfull", user: user });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: "User not registered" });
    }
  });
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "User already registerd" });
    } else {
      const user = new User({
        name,
        email,
        password,
      });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Successfully Registered, Please login now." });
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
app.get("/", (req, res) => {
  res.send("Hello World!");
});
