import React, { useState, useEffect } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";

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

  useEffect(() => {
    // Fetch the list of patients from the server
    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/getAll/patients"
        );
        console.log(response);
        setPatients(response.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching patients:", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchPatients();
  }, []);

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <StyledContainer>
      <h1>Patients List</h1>
      {loading ? ( // Check if data is still loading
        <CircularProgress /> // Show loading circle if data is loading
      ) : patients.length === 0 ? (
        <p>No patients found.</p> // Show "No patients found" message if no patients are found
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
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.map((patient, index) => (
                <StyledTableRow
                  key={patient._id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f2f2f2" : "white",
                  }}
                  onClick={() => handleRowClick(patient)}
                >
                  <TableCell>{patient.referalDoc}</TableCell>
                  <TableCell>{patient.patientName}</TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell>{patient.city}</TableCell>
                  <TableCell>{patient.address}</TableCell>
                  <TableCell>{patient.mobile}</TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      )}

      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Patient Details</DialogTitle>
        {selectedRow && (
          <DialogContent>
            <DialogContentText>
              Referral Doctor: {selectedRow.referalDoc}
            </DialogContentText>
            <DialogContentText>
              Patient Name: {selectedRow.patientName}
            </DialogContentText>
            <DialogContentText>Gender: {selectedRow.gender}</DialogContentText>
            <DialogContentText>City: {selectedRow.city}</DialogContentText>
            <DialogContentText>
              Address: {selectedRow.address}
            </DialogContentText>
            <DialogContentText>Mobile: {selectedRow.mobile}</DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleCloseModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </StyledContainer>
  );
};

export default PatientList;
