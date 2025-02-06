import axios from "axios";
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API_DUMMY } from "../utils/base_url";
import "../style/register.css";

// Import komponen-komponen MUI
import { TextField, Button, Container, Typography, Box } from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    try {
      // Mengirimkan permintaan POST untuk login
      await axios.post(`${API_DUMMY}/api/user/login`, {
        email,
        password,
      });

      // Menampilkan pesan sukses login menggunakan SweetAlert
      Swal.fire({
        icon: "success",
        title: "Berhasil Login!",
        showConfirmButton: false,
        timer: 1500,
      });

      // Navigasi ke halaman menu setelah login berhasil
      setTimeout(() => {
        navigate("/menu");
      }, 1500);
    } catch (error) {
      // Menampilkan pesan error menggunakan SweetAlert
      Swal.fire({
        icon: "error",
        title: "Login Gagal!",
        text: error.response?.data?.message || "Terjadi kesalahan, silakan coba lagi.",
      });
    }
  };

  return (
    <div className="body1 md:text-base lg:h-100vh sm:text-sm">
      <Container maxWidth="xs">
        <Box sx={{ textAlign: "center", marginTop: 5 }}>
          <Typography variant="h5">Login</Typography>
          <form onSubmit={login}>
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
              Login
            </Button>
          </form>
          <Typography variant="body2" sx={{ marginTop: 2 }}>
            Belum punya akun? <a href="/">Register</a>
          </Typography>
        </Box>
      </Container>
    </div>
  );
}
