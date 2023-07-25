const express = require("express");
const loginModel = require("../models/loginModel");
const patientModel = require("../models/patientModel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();
router.use(express.json());

const saltRounds = 10;
const secretKey = process.env.SECRET;

//admin routes
router.post("/admin", async (req, res) => {
  try {
    const admin = await loginModel.findOne({ email: req.body.email });
    if (admin) {
      return res.status(500).send("Admin already exists");
    }

    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      if (err) {
        return res.status(400).send("Error:", err.message);
      }

      await loginModel.create({
        email: req.body.email,
        phone: req.body.phone,
        password: hash,
      });
      return res.status(200).send("admin created successfully");
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

//login route
router.post("/login", async (req, res) => {
  try {
    let adminExist;
    if (parseInt(req.body.email)) {
      let phoneNo = parseInt(req.body.email);
      adminExist = await loginModel.findOne({ phone: phoneNo });
    } else {
      adminExist = await loginModel.findOne({ email: req.body.email });
    }

    if (!adminExist) {
      return res.status(401).send("Invalid email or password");
    }

    bcrypt.compare(
      req.body.password,
      adminExist.password,
      function (err, result) {
        if (err) {
          return res.status(500).send("Invalid password");
        }
        if (result) {
          // Password is correct, create a JWT token
          const payload = {
            adminId: adminExist._id,
            email: adminExist.email,
          };

          jwt.sign(payload, secretKey, { expiresIn: "8h" }, (err, token) => {
            if (err) {
              return res.status(500).send("Error creating JWT token");
            }

            // Send the JWT token back to the client
            return res.status(200).json({ token: token });
          });
        } else {
          return res.status(401).send("Invalid email or password");
        }
      }
    );
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

//patient route
const Patient = require("../models/patientModel");

router.post("/create/patient", async (req, res) => {
  try {
    // Check if a patient with the same name and mobile already exists
    const existingPatient = await Patient.findOne({
      patientName: req.body.patientName,
      mobile: req.body.mobile,
    });

    if (existingPatient) {
      return res.status(409).json({ message: "Patient already exists" });
    }

    // If the patient does not exist, create a new patient
    const newPatient = await Patient.create({
      referalDoc: req.body.referalDoc,
      patientName: req.body.patientName,
      city: req.body.city,
      address: req.body.address,
      mobile: req.body.mobile,
      gender: req.body.gender,
      age: req.body.age,
    });

    return res
      .status(201)
      .json({ message: "Patient created successfully", patient: newPatient });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get("/getAll/patients", async (req, res) => {
  try {
    const allPatients = await patientModel.find({});
    return res.status(200).json(allPatients);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//search by name
router.get("/searchByName/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const patients = await patientModel.find({
      patientName: { $regex: new RegExp(name, "i") },
    });

    if (patients.length === 0) {
      return res
        .status(404)
        .json({ message: "No patients found with the given name." });
    }

    res.status(200).json(patients);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error searching patients by name.", error });
  }
});

//search by mobile
router.get("/searchByMobile/:mobile", async (req, res) => {
  try {
    const { mobile } = req.params;
    const patients = await patientModel.find({ mobile });

    if (patients.length === 0) {
      return res
        .status(404)
        .json({ message: "No patients found with the given mobile number." });
    }

    res.status(200).json(patients);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error searching patients by mobile.", error });
  }
});

//search by id
router.get("/searchById/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const patients = await patientModel.find({ _id: id });

    if (patients.length === 0) {
      return res
        .status(404)
        .json({ message: "No patients found with this given id" });
    }
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: "Error searching patients by id", error });
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const event = await patientModel.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (event) {
      return res.status(200).json({
        message: "Updated Sucessfully",
      });
    } else {
      return res.status(404).json({
        message: "There is no patient with this id",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const event = await patientModel.findByIdAndDelete(id);

  if (event) {
    return res.status(200).json({
      message: "deleted sucessfully",
    });
  } else {
    return res.status(400).json({
      message: "patient not found",
    });
  }
});
module.exports = router;
