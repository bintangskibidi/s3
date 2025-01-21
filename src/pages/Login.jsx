import axios from "axios";
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API_DUMMY } from "../utils/base_url";
import "../style/register.css";

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
      <div className="container1">
        <h3>Login</h3>
        <form onSubmit={login} method="POST">
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
          <button type="submit">Login</button>
          <p>
            Belum punya akun? <a href="/">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
}
