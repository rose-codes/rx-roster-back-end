const express = require("express");
const router = new express.Router();
const Medication = require("../models/medication");
// Get entire medication history (w/ optional filter)
router.get("/medications", async (req, res) => {
  try {
    const medications = await Medication.find();
    res.send(medications);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get a specific medication
router.get("/medications/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const medication = await Medication.findById(_id);
    if (!medication) {
      return res.status(404).send("Medication not found");
    }
    res.send(medication);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Add a medication to medication history
router.post("/medications", async (req, res) => {
  const medication = new Medication(req.body);
  console.log(medication);

  try {
    await medication.save();
    res.status(201).send(medication);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update a medication in medication history
router.patch("/medications/:id", async (req, res) => {
  const userUpdates = Object.keys(req.body);
  const allowedUpdates = [
    "strength",
    "prescribedFor",
    "instructions",
    "prescriber",
    "pharmacyFilled",
    "manufacturer",
    "currentlyTaking",
    "datePrescribed",
    "sideEffects",
  ];
  const isValidUpdate = userUpdates.every((update) => {
    return allowedUpdates.includes(update);
  });
  if (!isValidUpdate) {
    return res.status(400).send({ error: "Invalid updates" });
  }
  try {
    const medication = await Medication.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!medication) {
      return res.status(404).send();
    }
    res.send(medication);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete a Medication
router.delete("/medications/:id", async (req, res) => {
  try {
    const medication = await Medication.findByIdAndDelete(req.params.id);
    if (!medication) {
      return res.status(404).send();
    }
    const newMedications = await Medication.find({});
    res.send(newMedications);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
