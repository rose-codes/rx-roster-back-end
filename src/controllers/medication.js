const Medication = require("../models/medication");

const getAllMedications = async (req, res) => {
  const user_id = req.user._id;
  const queryObj = { ...req.query };
  queryObj[user_id] = user_id;
  try {
    // const medications = await Medication.find(queryObj);
    const medications = await Medication.find(queryObj);
    res.send(medications);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getOneMedication = async (req, res) => {
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
};

const addMedication = async (req, res) => {
  console.log(req.user);
  const medication = new Medication(req.body);

  try {
    const user_id = req.user._id;
    await medication.save();
    res.status(201).send(medication);
  } catch (err) {
    res.status(400).send(err);
  }
};

const updateMedication = async (req, res) => {
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
    "startDate",
    "sideEffects",
  ];
  const isValidUpdate = (userUpdates, allowedUpdates) => {
    const bool = false;
    for (key in userUpdates) {
      if (allowedUpdates.includes(key)) {
        bool = true;
      }
    }
    return true;
  };

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
};

const deleteMedication = async (req, res) => {
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
};

module.exports = {
  getAllMedications,
  getOneMedication,
  addMedication,
  updateMedication,
  deleteMedication,
};
