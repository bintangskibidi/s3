import axios from "axios";
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API_DUMMY } from "../utils/base_url";
import "../style/register.css";
// import { div } from "framer-motion/client";

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
  <div className="backround">
    <div className="body1 md:text-base lg:h-100vh sm:text-sm">
      <div className="container1">
        <h3>Registrasi</h3>
        <form onSubmit={register} method="POST">
          <label htmlFor="username">Username</label>
          <br />
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            type="text"
            placeholder="Masukkan username"
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            placeholder="Masukkan email"
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            placeholder="Masukkan password"
          />
          <br />
          <button type="submit">Register</button>
          <p>
            Sudah punya akun? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
 </div>
  );
}
