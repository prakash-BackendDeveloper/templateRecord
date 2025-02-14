const express = require("express");
const router = express.Router();
const Record = require("../models/records");

router.post("/", async (req, res) => {
  const record = new Record({
    categoryName: req.body.categoryName,
    tempId: req.body.tempId,
    tempName: req.body.tempName,
    createdBy: req.body.createdBy,
    testedBy: req.body.testedBy,
  });
  try {
    const newRecord = await record.save();
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const record = await Record.find();
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: "couldn't find the post" });
    }
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: "Couldn't find the post" });
    }
    (record.categoryName = req.body.categoryName || record.categoryName),
      (record.tempId = req.body.tempId || record.tempId),
      (record.tempName = req.body.tempName || record.tempName),
      (record.testedBy = req.body.testedBy || record.testedBy);

    const updatedRecord = await record.save();
    res.status(201).json(updatedRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: "Couldn't find the post" });
    }
    await Record.findByIdAndDelete(req.params.id);
    res.json({ message: "Record deleted" });
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
