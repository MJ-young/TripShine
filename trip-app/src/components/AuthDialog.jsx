import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

function AuthDialog({ showError, onClose }) {
  return (
    <Dialog
      open={showError}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Session Expired"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Your session has expired. Please log in again.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AuthDialog;
