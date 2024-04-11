import React from "react";
import { Box, Modal, Typography, Button } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning"; // Using MUI icon for demonstration

export default function UniPopup({ show, onHidePopup }) {
  const hide = () => {
    onHidePopup();
  };

  return (
    <Modal
      open={show}
      onClose={hide}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box sx={styles.popup}>
        <Box sx={styles.imageContainer}>
          <WarningIcon sx={{ fontSize: 80, mb: 2 }} color="error" />
        </Box>
        <Box sx={styles.info}>
          <Typography variant="body1">1. 涉及黄色信息</Typography>
          <Typography variant="body1">2. 涉及政治信息</Typography>
          <Typography variant="body1">3. 涉及广告信息</Typography>
          <Typography variant="body1">4. 涉及骚扰信息</Typography>
        </Box>
        <Button
          onClick={hide}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          我已知晓
        </Button>
      </Box>
    </Modal>
  );
}

const styles = {
  popup: {
    position: "absolute",
    backgroundColor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    width: "60%", // 可调整为所需百分比
    maxWidth: 300, // 可调整为所需最大宽度
    textAlign: "center",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    mt: 2,
    mb: 2,
  },
};
