const { default: mongoose } = require("mongoose");
const Application = require("../models/Application");

const getApplications = async (req, res) => {
  try {
    const applications = await Application.find();
    res.status(200).json({ applications });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getApplicationById = async (req, res) => {
  try {
    const id = req.params.id;
    const application = await Application.findById(id);
    res.status(200).json({ application });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const createApplication = async (req, res) => {
  try {
    const {
      company,
      position,
      location,
      jobUrl,
      status,
      notes,
      applicationDate,
    } = req.body;

    const newApplication = await Application.create({
      company,
      position,
      location,
      jobUrl,
      status,
      notes,
      applicationDate,
    });

    res.status(201).json({
      message: "Application saved successfully.",
      application: newApplication,
    });
  } catch (error) {
    res.status(201).json({ message: "Server error", error: error.message });
  }
};

const deleteApplication = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedApplication = await Application.findByIdAndDelete(id);

    res.json({ message: "Application deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateApplication = async (req, res) => {
  try {
    const id = req.params.id;

    console.log(req.body);

    const application = await Application.findById(id);

    application.company = req.body.company || application.company;
    application.position = req.body.position || application.position;
    application.status = req.body.status || application.status;
    application.location = req.body.location || application.location;
    application.jobUrl = req.body.jobUrl || application.jobUrl;
    application.notes = req.body.notes || application.notes;
    application.applicationDate =
      req.body.applicationDate || application.applicationDate;

    const updatedApplication = await application.save();

    res.status(200).json({
      message: "Application updated successfully.",
      application: updatedApplication,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getApplications,
  createApplication,
  deleteApplication,
  updateApplication,
  getApplicationById,
};
