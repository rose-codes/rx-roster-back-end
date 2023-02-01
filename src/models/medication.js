const mongoose = require("mongoose");
const validator = require("validator");

const medicationSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      required: true,
      trim: true,
    },
    genericName: {
      type: String,
      required: true,
      trim: true,
    },
    form: {
      type: String,
      required: true,
    },
    strength: {
      type: Number,
      required: true,
    },
    strengthUnits: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
    },
    quantityUnits: {
      type: String,
    },
    prescribedFor: {
      type: String,
    },
    instructions: {
      type: String,
      required: true,
    },
    prescriber: {
      type: String,
    },
    pharmacyFilled: {
      type: String,
    },
    manufacturer: {
      type: String,
    },
    appearance: {
      type: String,
    },
    currentlyTaking: {
      type: Boolean,
      required: true,
    },
    datePrescribed: {
      type: Date,
      required: true,
    },
    sideEffects: {
      type: String,
    },
  },
  { strictQuery: true }
);

const Medication = mongoose.model("Medication", medicationSchema);

module.exports = Medication;
