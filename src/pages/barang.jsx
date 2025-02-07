// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import Swal from "sweetalert2";
import { API_DUMMY } from "../utils/base_url";

function Data() {
  const [menus, setMenus] = useState([]);
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [purchaseQuantities, setPurchaseQuantities] = useState({});

  const getAll = () => {
    axios
      .get(`${API_DUMMY}/api/menus`)
      .then((res) => {
        setMenus(res.data);
        setFilteredMenus(res.data);
      })
      .catch((error) => {
        alert("Terjadi kesalahan: " + error);
      });
  };

  const deleteUser = async (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data yang dihapus tidak dapat dikembalikan.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${API_DUMMY}/api/menus/${id}`)
          .then(() => {
            getAll();
            Swal.fire({
              icon: 'success',
              title: 'Data berhasil dihapus!',
              text: 'Data telah dihapus dari sistem.',
            });
          })
          .catch((error) => {
            console.error("Error deleting product:", error);
            Swal.fire({
              icon: 'error',
              title: 'Terjadi kesalahan!',
              text: 'Gagal menghapus data.',
            });
          });
      }
    });
  };

  const handleFilterChange = (event) => {
    const type = event.target.value;
    setFilter(type);
    if (type === "all") {
      setFilteredMenus(menus);
    } else {
      setFilteredMenus(menus.filter((menu) => menu.type.toLowerCase() === type));
    }
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchTerm(query);
    const filtered = menus.filter(
      (menu) =>
        menu.name.toLowerCase().includes(query.toLowerCase()) &&
        (filter === "all" || menu.type.toLowerCase() === filter)
    );
    setFilteredMenus(filtered);
  };

  const handlePurchase = (menuId) => {
    const quantity = purchaseQuantities[menuId];
    if (quantity <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Jumlah tidak valid!',
        text: 'Jumlah pembelian harus lebih dari 0.',
      });
      return;
    }

    axios
      .post(`${API_DUMMY}/api/menus/purchase/${menuId}`, null, {
        params: { quantity },
      })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Pembelian berhasil!',
          text: 'Menu telah dibeli.',
        });
        getAll();
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Terjadi kesalahan!',
          text: 'Gagal melakukan pembelian. Stok tidak cukup atau terjadi kesalahan.',
        });
        console.error("Error during purchase:", error);
      });
  };

  const handleQuantityChange = (menuId, value) => {
    setPurchaseQuantities({
      ...purchaseQuantities,
      [menuId]: value,
    });
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <Container>
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="filter-select-label">Tipe</InputLabel>
            <Select
              labelId="filter-select-label"
              value={filter}
              onChange={handleFilterChange}
              sx={{ backgroundColor: "#f4f4f4", borderRadius: "8px" }}
            >
              <MenuItem value="all" sx={{ backgroundColor: "#f4f4f4" }}>
                Semua
              </MenuItem>
              <MenuItem value="makanan" sx={{ backgroundColor: "#f4f4f4" }}>
                Makanan
              </MenuItem>
              <MenuItem value="minuman" sx={{ backgroundColor: "#f4f4f4" }}>
                Minuman
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Cari berdasarkan nama..."
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              borderColor: "#3f51b5",
            }}
          />
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        href="/tambah"
        sx={{ marginBottom: 2, backgroundColor: "#4caf50" }}
      >
        Tambah Data
      </Button>

      <TableContainer component={Paper} sx={{ marginTop: 2, boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>No</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Nama</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Harga</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Tipe</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMenus.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    href={`/edit/${row.id}`}
                    sx={{
                      marginRight: 1,
                      backgroundColor: "#ff9800",
                      color: "#fff",
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => deleteUser(row.id)}
                    sx={{
                      marginRight: 1,
                      backgroundColor: "#f44336",
                      color: "#fff",
                    }}
                  >
                    Hapus
                  </Button>
                  <Button
                    variant="outlined"
                    color="info"
                    href={`/detail/${row.id}`}
                    sx={{
                      marginRight: 1,
                      backgroundColor: "#00bcd4",
                      color: "#fff",
                    }}
                  >
                    Detail
                  </Button>

                  <TextField
                    type="number"
                    label="Jumlah"
                    value={purchaseQuantities[row.id] || 0}
                    onChange={(e) => handleQuantityChange(row.id, e.target.value)}
                    InputProps={{ inputProps: { min: 1 } }}
                    sx={{
                      width: 80,
                      marginRight: 1,
                      backgroundColor: "#e3f2fd",
                      borderRadius: "4px",
                    }}
                  />
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handlePurchase(row.id)}
                    sx={{ backgroundColor: "#388e3c" }}
                  >
                    Beli
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Data;
