const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  categoryName: { type: String, required: true },
  tempId: { type: String, required: true, unique: true },
  tempName: { type: String, required: true },
  createdBy: { type: String, required: true },
  testedBy: { type: String, required: true },
});

module.exports = mongoose.model("Record", recordSchema);
