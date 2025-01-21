// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_DUMMY } from "../utils/base_url";
import Swal from "sweetalert2"; // Import SweetAlert2
import "../style/tambah.css";
import { uploadImageToS3 } from "../utils/Uploadtos3";

function Tambah() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    type: "",
    link_gambar: "", // Properti untuk link gambar
  });
  const [file, setFile] = useState(null); // State untuk file gambar

  const add = async (imageUrl) => {
    try {
      const data = { ...formData, link_gambar: imageUrl };

      const response = await axios.post(`${API_DUMMY}/api/menus`, data);
      console.log("Response:", response);

      Swal.fire({
        icon: 'success',
        title: 'Data berhasil ditambahkan!',
        text: 'Menu baru telah berhasil ditambahkan.',
      }).then(() => {
        navigate("/menu");
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Terjadi kesalahan!',
        text: 'Gagal menambahkan data.',
      });
      console.error("Error uploading data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = formData.link_gambar;
      if (file) {
        imageUrl = await uploadImageToS3(file); // Mengunggah file gambar
      }
      await add(imageUrl);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="form-container">
      <h2>Tambah Data</h2>
      <form onSubmit={handleSubmit}>
        <label>Nama:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Harga:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <label>Type:</label>
        <input
          type="select"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        />

        <label>Unggah Gambar:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="form-control"
        />

        <button type="submit">Tambah</button>
      </form>
    </div>
  );
}

export default Tambah;
