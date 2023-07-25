import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Fab,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import Header from "../header/header";
import CustomModel from "../customeModel/customModel";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { tokenStorage } from "../../App";
import { useNavigate } from "react-router-dom";

const StyledContainer = styled("div")({
  padding: "0 16px", // Add left and right padding to the page
  overflowX: "auto", // Enable horizontal scrollbar when content overflows
  overflowY: "auto",
});

const StyledTableContainer = styled(TableContainer)({
  maxWidth: "100%", // Ensure the table container takes full width
});

const StyledTableRow = styled(TableRow)({
  cursor: "pointer", // Add pointer cursor on hover
});

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editedPatients, setEditedPatients] = useState({});
  const [saveAction, setSaveAction] = useState(false);
  const [token] = useContext(tokenStorage);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of patients from the server
    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/getAll/patients"
        );

        // Add "Date" and "Time" fields to each patient object
        const patientsWithDateTime = response.data.map((patient) => {
          const date = new Date(patient.createdAt);
          return {
            ...patient,
            date: date.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }),
            time: date.toLocaleTimeString(),
          };
        });

        const sortedPatients = patientsWithDateTime.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setPatients(sortedPatients);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching patients:", error);
        setLoading(false);
      }
    };

    fetchPatients();
  }, [saveAction]);

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleEdit = (patient) => {
    setEditedPatients((prevEditedPatients) => ({
      ...prevEditedPatients,
      [patient._id]: {
        ...patient,
      },
    }));
  };

  const handleDelete = async (patientId) => {
    try {
      const shouldDelete = window.confirm(
        "Are you sure you want to delete this patient?"
      );
      if (!shouldDelete) {
        return;
      }
      const response = await axios.delete(
        `http://localhost:8081/delete/${patientId}`
      );

      if (response.status === 200) {
        setPatients((prevPatients) =>
          prevPatients.filter((patient) => patient._id !== patientId)
        );

        toast.success("Patient deleted successfully!", { autoClose: 600 });
      } else {
        toast.error("Failed to delete patient.", { autoClose: 1000 });
      }
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  const handleChange = (e, patientId) => {
    const { name, value } = e.target;
    setEditedPatients((prevEditedPatients) => ({
      ...prevEditedPatients,
      [patientId]: {
        ...prevEditedPatients[patientId],
        [name]: value,
      },
    }));
  };

  const handleSave = async (patientId) => {
    try {
      const editedPatientData = editedPatients[patientId];
      const response = await axios.put(
        `http://localhost:8081/edit/${patientId}`,
        editedPatientData
      );

      if (response.status === 200) {
        setSaveAction((prevSaveAction) => !prevSaveAction);
        setEditedPatients((prevEditedPatients) => {
          const updatedPatients = { ...prevEditedPatients };
          delete updatedPatients[patientId];
          return updatedPatients;
        });
      } else {
        console.log("Failed to update patient.");
      }
    } catch (error) {
      console.error("Error updating patient:", error);
    }
  };

  const handleCancel = (patientId) => {
    setEditedPatients((prevEditedPatients) => {
      const updatedPatients = { ...prevEditedPatients };
      delete updatedPatients[patientId];
      return updatedPatients;
    });
  };

  if (token) {
    return (
      <>
        <Header />
        <StyledContainer>
          <h1>Patients List</h1>
          {loading ? (
            <CircularProgress />
          ) : patients.length === 0 ? (
            <p>No patients found.</p>
          ) : (
            <StyledTableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                        color: "coral",
                        fontSize: "15px",
                      }}
                    >
                      Date
                    </TableCell>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                        color: "coral",
                        fontSize: "15px",
                      }}
                    >
                      Time
                    </TableCell>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                        color: "coral",
                        fontSize: "15px",
                      }}
                    >
                      Referral Doctor
                    </TableCell>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                        color: "coral",
                        fontSize: "15px",
                      }}
                    >
                      Patient Name
                    </TableCell>
                    <TableCell
                      style={{
                        fontWeight: "bold",
                        color: "coral",
                        fontSize: "15px",
                      }}
                    >
                      Gender
                    </TableCell>

                    <TableCell
                      style={{
                        fontWeight: "bold",
                        color: "coral",
                        fontSize: "15px",
                      }}
                    >
                      Age
                    </TableCell>

                    <TableCell
                      style={{
                        fontWeight: "bold",
                        color: "coral",
                        fontSize: "15px",
                      }}
                    >
                      City
                    </TableCell>

                    <TableCell
                      style={{
                        fontWeight: "bold",
                        color: "coral",
                        fontSize: "15px",
                      }}
                    >
                      Address
                    </TableCell>

                    <TableCell
                      style={{
                        fontWeight: "bold",
                        color: "coral",
                        fontSize: "15px",
                      }}
                    >
                      Mobile
                    </TableCell>

                    <TableCell
                      style={{
                        fontWeight: "bold",
                        color: "coral",
                        fontSize: "15px",
                      }}
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {patients.map((patient, index) => (
                    <StyledTableRow
                      key={patient._id}
                      style={{
                        backgroundColor: index % 2 === 0 ? "#f2f2f2" : "white",
                      }}
                    >
                      <TableCell onClick={() => handleRowClick(patient)}>
                        {patient.date}
                      </TableCell>
                      <TableCell onClick={() => handleRowClick(patient)}>
                        {patient.time}
                      </TableCell>

                      {editedPatients[patient._id] ? (
                        <>
                          {/* Render the editable cells */}
                          <TableCell>
                            <div style={{ maxWidth: "fit-content" }}>
                              <TextField
                                value={editedPatients[patient._id].referalDoc}
                                name="referalDoc"
                                onChange={(e) => handleChange(e, patient._id)}
                                // sx={{ maxWidth: "fit-content" }}
                              />
                            </div>
                          </TableCell>
                        </>
                      ) : (
                        <>
                          {/* Render the normal cells */}
                          <TableCell onClick={() => handleRowClick(patient)}>
                            {patient.referalDoc}
                          </TableCell>
                        </>
                      )}

                      {editedPatients[patient._id] ? (
                        <>
                          {/* Render the editable cells */}
                          <TableCell>
                            <TextField
                              value={editedPatients[patient._id].patientName}
                              name="patientName"
                              onChange={(e) => handleChange(e, patient._id)}
                            />
                          </TableCell>
                        </>
                      ) : (
                        <>
                          {/* Render the normal cells */}
                          <TableCell onClick={() => handleRowClick(patient)}>
                            {patient.patientName}
                          </TableCell>
                        </>
                      )}

                      {editedPatients[patient._id] ? (
                        // Render the editable cells
                        <TableCell>
                          <Select
                            value={editedPatients[patient._id].gender}
                            name="gender"
                            onChange={(e) => handleChange(e, patient._id)}
                          >
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                            <MenuItem value="other">Other</MenuItem>
                          </Select>
                        </TableCell>
                      ) : (
                        // Render the normal cells
                        <TableCell onClick={() => handleRowClick(patient)}>
                          {patient.gender}
                        </TableCell>
                      )}

                      {editedPatients[patient._id] ? (
                        <>
                          {/* Render the editable cells */}
                          <TableCell>
                            <TextField
                              value={editedPatients[patient._id].age}
                              name="age"
                              onChange={handleChange}
                              type="Number"
                            />
                          </TableCell>
                        </>
                      ) : (
                        <>
                          {/* Render the normal cells */}
                          <TableCell onClick={() => handleRowClick(patient)}>
                            {patient.age}
                          </TableCell>
                        </>
                      )}

                      {editedPatients[patient._id] ? (
                        <>
                          {/* Render the editable cells */}
                          <TableCell>
                            <TextField
                              value={editedPatients[patient._id].city}
                              name="city"
                              onChange={(e) => handleChange(e, patient._id)}
                            />
                          </TableCell>
                        </>
                      ) : (
                        <>
                          {/* Render the normal cells */}
                          <TableCell onClick={() => handleRowClick(patient)}>
                            {patient.city}
                          </TableCell>
                        </>
                      )}

                      {editedPatients[patient._id] ? (
                        <>
                          {/* Render the editable cells */}
                          <TableCell>
                            <TextField
                              value={editedPatients[patient._id].address}
                              name="address"
                              onChange={(e) => handleChange(e, patient._id)}
                            />
                          </TableCell>
                        </>
                      ) : (
                        <>
                          {/* Render the normal cells */}
                          <TableCell onClick={() => handleRowClick(patient)}>
                            {patient.address}
                          </TableCell>
                        </>
                      )}

                      {editedPatients[patient._id] ? (
                        <>
                          {/* Render the editable cells */}
                          <TableCell>
                            <TextField
                              value={editedPatients[patient._id].mobile}
                              name="mobile"
                              type="number"
                              onChange={(e) => handleChange(e, patient._id)}
                            />
                          </TableCell>
                        </>
                      ) : (
                        <>
                          {/* Render the normal cells */}
                          <TableCell onClick={() => handleRowClick(patient)}>
                            {patient.mobile}
                          </TableCell>
                        </>
                      )}

                      <TableCell style={{ display: "flex", gap: "5px" }}>
                        {/* Show "Save" and "Cancel" buttons when editing */}
                        {editedPatients[patient._id] ? (
                          <>
                            <Fab
                              aria-label="save"
                              color="primary"
                              onClick={() => handleSave(patient._id)}
                            >
                              <SaveIcon />
                            </Fab>
                            <Fab
                              aria-label="cancel"
                              style={{ backgroundColor: "rgb(247, 54, 59)" }}
                              onClick={() => handleCancel(patient._id)}
                            >
                              <CancelIcon />
                            </Fab>
                          </>
                        ) : (
                          // Show "Edit" and "Delete" buttons when not editing
                          <>
                            <Fab
                              aria-label="edit"
                              color="primary"
                              onClick={() => handleEdit(patient)}
                            >
                              <EditIcon />
                            </Fab>
                            <Fab
                              aria-label="delete"
                              style={{ backgroundColor: "rgb(247, 54, 59)" }}
                              onClick={() => handleDelete(patient._id)}
                            >
                              <DeleteIcon />
                            </Fab>
                          </>
                        )}
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </StyledTableContainer>
          )}

          <CustomModel
            isModalOpen={isModalOpen}
            setModalOpen={setModalOpen}
            selectedRow={selectedRow}
            setSelectedRow={setSelectedRow}
            handleCloseModal={handleCloseModal}
          />
        </StyledContainer>
        <ToastContainer />
      </>
    );
  } else {
    navigate("/");
  }
};

export default PatientList;
