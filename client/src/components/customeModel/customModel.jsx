import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

const CustomModel = ({
  isModalOpen,
  setModalOpen,
  selectedRow,
  setSelectedRow,
  handleCloseModal,
}) => {
  return (
    <>
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Patient Details</DialogTitle>
        {selectedRow && (
          <DialogContent>
            <DialogContentText>Date: {selectedRow.date}</DialogContentText>
            <DialogContentText>Time: {selectedRow.time}</DialogContentText>
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
    </>
  );
};

export default CustomModel;
