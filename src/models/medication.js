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
    medForm: {
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
    },
    startDate: {
      type: Date,
    },
    sideEffects: {
      type: String,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { strictQuery: true }
);

const Medication = mongoose.model("Medication", medicationSchema);

module.exports = Medication;
