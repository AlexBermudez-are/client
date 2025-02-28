import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Container,
  Paper,
  Avatar,
  Grid,
} from "@mui/material";
import { customMessage } from "./CustomMessage/CustomMessage";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import axios from "axios";
import Input from "../commons/Input/Input";

const ChangePasswordModal = ({ user, open, onClose }) => {
  const userFormData = {
    previousPass: "",
    password: "******",
  };

  // States
  const [formData, setFormData] = useState(userFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [showPreviousPass, setShowPreviousPass] = useState(false);
  // Handlers
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleShowPreviousPass = () => {
    setShowPreviousPass((prev) => !prev);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:3001/users/me/edit`, formData, {
        withCredentials: true,
      })
      .then(() =>
        customMessage("success", `Usuario (${user.fileNumber}) modificado`)
      )
      .catch((err) => customMessage("error", err.response.data));
    onClose();
    setFormData(userFormData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // Effects

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container component="main" maxWidth="xs">
        <Paper
          style={{
            marginTop: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "2rem",
            borderRadius: "25px",
          }}
          elevation={3}
        >
          <Avatar
            style={{
              margin: "1rem",
              backgroundColor: "#FB9B14",
            }}
          >
            <SaveAsIcon />
          </Avatar>
          <Typography variant="h5">Cambiar Contraseña:</Typography>
          <form
            style={{ width: "100%", marginTop: "2rem" }}
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Input
                name="previousPass"
                label="Anterior Contraseña"
                handleChange={handleChange}
                type={showPreviousPass ? "text" : "password"}
                handleShowPassword={handleShowPreviousPass}
              />
              <Input
                name="password"
                label="Nueva Contraseña"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
                error={formData.password.length < 6}
                helperText={
                  formData.password.length < 6 &&
                  "La contraseña debe tener al menos 6 caracteres"
                }
              />
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "1rem",
              }}
            >
              <Button
                variant="contained"
                onClick={(e) => {
                  onClose();
                  setFormData(userFormData);
                }}
                sx={{
                  mr: 1,
                  backgroundColor: "#1369B4",
                  "&:hover": {
                    backgroundColor: "#FB9B14",
                  },
                }}
              >
                Cancelar
              </Button>
              <Button
                sx={{
                  mr: 1,
                  backgroundColor: "#1369B4",
                  color: "#FFFFFF",
                  "&:hover": {
                    backgroundColor: "#FB9B14",
                  },
                }}
                type="submit"
                variant="container"
                disabled={formData.password.length < 6}
                className={
                  formData.password.length < 6 ? "disabled-button" : ""
                }
              >
                Modificar
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Modal>
  );
};

export default ChangePasswordModal;
