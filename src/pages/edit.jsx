// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Button, TextField, Container, Grid, Paper, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import axios from "axios";
import { API_DUMMY } from "../utils/base_url";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom"; // Ganti useHistory dengan useNavigate

function Edit() {
  const { id } = useParams();
  const [menu, setMenu] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("makanan");
  const [description, setDescription] = useState(""); // Menambahkan state untuk deskripsi
  
  const navigate = useNavigate(); // Ganti useHistory dengan useNavigate

  useEffect(() => {
    axios
      .get(`${API_DUMMY}/api/menus/${id}`)
      .then((res) => {
        const { name, price, type, description } = res.data;
        setMenu(res.data);
        setName(name);
        setPrice(price);
        setType(type);
        setDescription(description); // Menampilkan deskripsi menu
      })
      .catch(() => {
        console.error("Error fetching menu");
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedMenu = { name, price, type, description }; // Menambahkan deskripsi
    try {
      await axios.put(`${API_DUMMY}/api/menus/${id}`, updatedMenu);
      Swal.fire({
        icon: "success",
        title: "Data berhasil diperbarui!",
        text: "Menu telah diperbarui.",
      }).then(() => {
        navigate("/menu"); // Redirect menggunakan navigate, bukan history.push
      });
    } catch (error) {
      console.error("Error while updating menu:", error);
      Swal.fire({
        icon: "error",
        title: "Terjadi kesalahan!",
        text: "Gagal memperbarui data.",
      });
    }
  };

  if (!menu) return <div>Loading...</div>;

  return (
    <Container>
      <Paper sx={{ padding: 3, marginTop: 2 }}>
        <h2>Edit Menu</h2>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nama Menu"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Harga"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                type="number"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Tipe</InputLabel>
                <Select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  label="Tipe"
                >
                  <MenuItem value="makanan">Makanan</MenuItem>
                  <MenuItem value="minuman">Minuman</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* Input Deskripsi */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Deskripsi"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                multiline
                rows={4} // Memperbesar area input deskripsi
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Simpan Perubahan
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Edit;
