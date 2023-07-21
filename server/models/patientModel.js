const mongoose = require("mongoose");

const patientModel = new mongoose.Schema(
  {
    referalDoc: {
      type: String,
    },
    patientName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    city: {
      type: String,
    },
    address: {
      type: String,
    },
    mobile: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientModel);

module.exports = Patient;
