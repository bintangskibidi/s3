import axios from "axios";
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API_DUMMY } from "../utils/base_url";
import "../style/register.css";

// Import komponen-komponen MUI
import { TextField, Button, Container, Typography, Box } from "@mui/material";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();

    try {
      // Melakukan permintaan POST untuk registrasi
      await axios.post(`${API_DUMMY}/api/user/register`, {
        email,
        password,
        username,
      });

      // Menampilkan pesan sukses menggunakan SweetAlert
      Swal.fire({
        icon: "success",
        title: "Berhasil Register!",
        showConfirmButton: false,
        timer: 1500,
      });

      // Navigasi ke halaman login setelah registrasi berhasil
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      // Menampilkan pesan error jika registrasi gagal
      Swal.fire({
        icon: "error",
        title: "Gagal Register!",
        text: error.response?.data?.message || "Terjadi kesalahan, silakan coba lagi.",
      });
    }
  };

  return (
    <div className="background">
      <div className="body1 md:text-base lg:h-100vh sm:text-sm">
        <Container maxWidth="xs">
          <Box sx={{ textAlign: "center", marginTop: 5 }}>
            <Typography variant="h5">Registrasi</Typography>
            <form onSubmit={register}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: 2 }}
              >
                Register
              </Button>
            </form>
            <Typography variant="body2" sx={{ marginTop: 2 }}>
              Sudah punya akun? <a href="/login">Login</a>
            </Typography>
          </Box>
        </Container>
      </div>
    </div>
  );
}
