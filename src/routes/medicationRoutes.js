const express = require("express");
const router = new express.Router();
const cors = require("cors");
// const { protect } = require("../middleware/authMiddleware");
router.use(express.json());
router.use(cors({ origin: "*" }));

// router.use(protect);

const {
  getAllMedications,
  getOneMedication,
  addMedication,
  updateMedication,
  deleteMedication,
} = require("../controllers/medication");

// Get entire medication history (w/ optional filter)
router.get("/", getAllMedications);

// Get a specific medication
router.get("/:id", getOneMedication);

// Add a medication to medication history
router.post("/", addMedication);

// Update a medication in medication history
router.patch("/:id", updateMedication);

// Delete a Medication
router.delete("/:id", deleteMedication);

module.exports = router;
