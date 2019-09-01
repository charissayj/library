const express = require("express");
const mongoose = require("mongoose");

const app = express();
const db = mongoose.connect("mongodb://localhost/bookAPI");
const port = process.env.PORT || 3000;
const Book = require("./models/bookModel");
const bookRouter = require("./routes/bookRouter")(Book);
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use("/api", bookRouter);

app.get("/", (req, res) => {
  res.send("YOOOOOOOoooo! Check out my app!");
});

app.listen(port, () => console.log(`running on port: ${port}`));
