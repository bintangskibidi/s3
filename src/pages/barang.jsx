import axios from "axios";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { API_DUMMY } from "../utils/base_url";
import Swal from "sweetalert2"; // Import SweetAlert2
import "../style/barang.css";

function Data() {
  const [menus, setMenus] = useState([]); // Semua data
  const [filteredMenus, setFilteredMenus] = useState([]); // Data yang difilter
  const [filter, setFilter] = useState("all"); // Filter aktif (default: semua)

  const getAll = () => {
    axios
      .get(`${API_DUMMY}/api/menus`)
      .then((res) => {
        setMenus(res.data);
        setFilteredMenus(res.data); // Set default filter ke semua
      })
      .catch((error) => {
        alert("Terjadi kesalahan: " + error);
      });
  };

  const deleteUser = async (id) => {
    // SweetAlert2 confirmation popup
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
            getAll(); // Refresh data tanpa reload halaman
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
      setFilteredMenus(menus); // Tampilkan semua
    } else {
      setFilteredMenus(menus.filter((menu) => menu.type.toLowerCase() === type));
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div className="data-container">
      <div className="filter-menu">
        <select
          value={filter}
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="all">Semua</option>
          <option value="makanan">Makanan</option>
          <option value="minuman">Minuman</option>
        </select>
      </div>

      <a className="btn-add" href="/tambah">
        Tambah Data
      </a>

      <Table striped bordered hover className="data-table">
        <thead>
          <tr>
            <th style={{ width: "20px" }}>No</th>
            <th>Nama</th>
            <th>Harga</th>
            <th>Tipe</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredMenus.map((row, index) => (
            <tr key={row.id}>
              <td>{index + 1}</td>
              <td>{row.name}</td>
              <td>{row.price}</td>
              <td>{row.type}</td>
              <td className="action-buttons">
                <a href={`/edit/${row.id}`} className="btn-edit">
                  Edit
                </a>
                <button
                  className="btn-delete"
                  onClick={() => deleteUser(row.id)}
                >
                  Hapus
                </button>
                <a href={`/detail/${row.id}`} className="btn-detail">
                  Detail
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Data;
