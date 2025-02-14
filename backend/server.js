const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const recordRoutes = require("./routes/records");
const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3600;
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/record")
  .then(() => {
    console.log("Db connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api/records", recordRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
