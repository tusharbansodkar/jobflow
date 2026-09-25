const express = require("express");
const {
  getApplications,
  createApplication,
  deleteApplication,
  updateApplication,
  getApplicationById,
} = require("../controllers/applicationController");

const router = express.Router();

router.get("/", getApplications);
router.get("/:id", getApplicationById);
router.post("/add", createApplication);
router.delete("/delete/:id", deleteApplication);
router.put("/update/:id", updateApplication);

module.exports = router;
