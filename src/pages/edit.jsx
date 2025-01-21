// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Menggunakan useNavigate
import { API_DUMMY } from "../utils/base_url";
import Swal from "sweetalert2"; // Import SweetAlert2
import "../style/edit.css";

function Edit() {
  const { id } = useParams(); // Mengambil ID dari URL
  const [makanan, setMakanan] = useState({
    name: "",
    price: "",
    type: "",
    imageUrl: "", // Menambahkan field imageUrl
  });
  const navigate = useNavigate(); // Menggunakan useNavigate untuk navigasi

  useEffect(() => {
    // Request data berdasarkan ID
    axios
      .get(`${API_DUMMY}/api/menus/${id}`)
      .then((res) => {
        setMakanan(res.data);
      })
      .catch((error) => {
        alert("Terjadi kesalahan: " + error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMakanan((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Menambahkan pop-up konfirmasi dengan SweetAlert2
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Perubahan yang Anda buat akan disimpan.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Simpan!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`${API_DUMMY}/api/menus/${id}`, makanan)
          .then(() => {
            // Success popup
            Swal.fire({
              icon: 'success',
              title: 'Berhasil!',
              text: 'Data telah berhasil diperbarui.',
            }).then(() => {
              navigate("/menu"); // Menggunakan navigate untuk kembali ke halaman utama setelah sukses
            });
          })
          .catch((error) => {
            // Error popup
            Swal.fire({
              icon: 'error',
              title: 'Terjadi kesalahan!',
              text: 'Gagal menyimpan perubahan.',
            });
            console.error(error);
          });
      }
    });
  };

  return (
    <div className="edit-container">
      <h2 className="edit-title">Edit Makanan</h2>
      <form className="edit-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">Nama</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-input"
            value={makanan.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price" className="form-label">Harga</label>
          <input
            type="number"
            id="price"
            name="price"
            className="form-input"
            value={makanan.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="type" className="form-label">Type</label>
          <input
            type="text"
            id="type"
            name="type"
            className="form-input"
            value={makanan.type}
            onChange={handleChange}
            required
          />
        </div>
        {/* Input untuk URL gambar */}
        <div className="form-group">
          <label htmlFor="imageUrl" className="form-label">Link Gambar</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            className="form-input"
            value={makanan.imageUrl}
            onChange={handleChange}
            placeholder="Masukkan URL gambar"
          />
        </div>

        {/* Menampilkan gambar yang sudah diinput */}
        {makanan.imageUrl && (
          <div className="image-preview">
            <p>Gambar saat ini:</p>
            <img
              src={makanan.imageUrl}
              alt="Current"
              className="image-preview-img"
            />
          </div>
        )}

        <button type="submit" className="form-button">Simpan</button>
      </form>
    </div>
  );
}

export default Edit;
