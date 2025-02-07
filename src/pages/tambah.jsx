// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Button, TextField, Container, Grid, Paper, Typography, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_DUMMY } from "../utils/base_url";
import Swal from "sweetalert2"; // Import SweetAlert2
import { uploadImageToS3 } from "../utils/Uploadtos3";

function Tambah() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    type: "",
    description: "", // Menambahkan field deskripsi
    link_gambar: "", // Properti untuk link gambar
    stock: "", // Menambahkan field stok
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
    <Container maxWidth="sm">
      <Paper sx={{ padding: 3, marginTop: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Tambah Menu Baru
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Nama */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nama Menu"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>

            {/* Harga */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Harga"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                type="number"
                variant="outlined"
              />
            </Grid>

            {/* Tipe */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tipe Menu"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>

            {/* Deskripsi */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Deskripsi"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Masukkan deskripsi menu"
                required
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid>

            {/* Stok */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Stok"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                type="number"
                variant="outlined"
                inputProps={{ min: "0" }}
              />
            </Grid>

            {/* Unggah Gambar */}
            <Grid item xs={12}>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="form-control"
              />
            </Grid>

            {/* Tombol Submit */}
            <Grid item xs={12}>
              <Box sx={{ textAlign: "center", marginTop: 2 }}>
                <Button type="submit" variant="contained" color="primary">
                  Tambah Menu
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Tambah;
