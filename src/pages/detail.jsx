// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Container, Paper, Grid, Typography, Button, Box } from "@mui/material";
import axios from "axios";
import { API_DUMMY } from "../utils/base_url";
import { useParams, useNavigate } from "react-router-dom"; // Ganti useHistory dengan useNavigate

function Detail() {
  const { id } = useParams();
  const [menu, setMenu] = useState(null);
  const navigate = useNavigate(); // Ganti useHistory dengan useNavigate

  useEffect(() => {
    axios
      .get(`${API_DUMMY}/api/menus/${id}`)
      .then((res) => {
        setMenu(res.data);
      })
      .catch((error) => {
        console.error("Error fetching menu:", error);
      });
  }, [id]);

  if (!menu) return <div>Loading...</div>;

  return (
    <Container>
      <Paper sx={{ padding: 3, marginTop: 2 }}>
        <Typography variant="h4" gutterBottom>
          Detail Menu
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Nama Menu: {menu.name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Harga: {menu.price}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Tipe: {menu.type}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Stok: {menu.stock}</Typography> {/* Stok Barang */}
          </Grid>
          <Grid item xs={12}>
            {menu.link_gambar && (
              <Box sx={{ textAlign: "center", marginTop: 2 }}>
                <img
                  src={menu.link_gambar} // Menampilkan gambar menu
                  alt={menu.name}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </Box>
            )}
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate(-1)} // Tombol Kembali
          >
            Kembali
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/edit/${menu.id}`)} // Tombol Edit
          >
            Edit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Detail;
