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
router.post("/create/patient", async (req, res) => {
  try {
    const newPatient = await patientModel.create({
      referalDoc: req.body.referalDoc,
      patientName: req.body.patientName,
      city: req.body.city,
      address: req.body.address,
      mobile: req.body.mobile,
      gender: req.body.gender,
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

module.exports = router;
