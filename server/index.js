const express = require("express");
const app = express();
const mongoose = require("mongoose");
const foodModel = require("./models/Food");
const PORT = 3001 || 5000;
const dbUrl = "mongodb+srv://n3whouse:HEvZPC63L1iPtdJp@crud.lbpnrrx.mongodb.net/food?retryWrites=true&w=majority&appName=CRUD";
const cors = require("cors");

app.use(cors());
app.use(express.json());

mongoose.connect(dbUrl, {
  useNewUrlParser: true,

});

app.get("/read", async (req, res) => {
  try {
    const data = await foodModel.find({});
    res.send(data)
  } catch (err) {
    throw err;
  }
});

app.post("/insert", async (req, res) => {

  const foodName = req.body.foodName;
  const days = req.body.days;

  const food = new foodModel({
    foodName: foodName,
    daysSinceIAte: days
  });
  try {
    await food.save();
    res.send("inserted data");
  } catch (err) {
    console.log(err);
  };
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
});