// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { API_DUMMY } from "../utils/base_url";
import Swal from "sweetalert2";
import "../style/edit.css";

function Edit() {
  const { id } = useParams();
  const [makanan, setMakanan] = useState({
    name: "",
    price: "",
    type: "",
    imageUrl: "",
    description: "",
    stock: 0, // Mengatur default stok ke 0 (bukan undefined)
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_DUMMY}/api/menus/${id}`)
      .then((res) => {
        // Pastikan tidak ada field yang undefined
        setMakanan({
          name: res.data.name || "",
          price: res.data.price || "",
          type: res.data.type || "",
          imageUrl: res.data.imageUrl || "",
          description: res.data.description || "",
          stock: res.data.stock || 0, // Pastikan stok adalah angka 0 jika tidak ada
        });
      })
      .catch((error) => {
        alert("Terjadi kesalahan: " + error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Log perubahan stok
    if (name === "stock") {
      console.log("Stok yang baru diubah:", value);
    }

    setMakanan((prev) => ({
      ...prev,
      [name]: name === "stock" ? Number(value) : value, // Mengonversi stok menjadi angka
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Log data yang akan disubmit
    console.log("Data yang akan disubmit:", makanan);

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
          .put(`${API_DUMMY}/api/menus/${id}`, makanan) // Mengirim data yang sudah diperbarui
          .then((res) => {
            // Log respons dari API
            console.log("Response setelah update:", res.data);

            Swal.fire({
              icon: 'success',
              title: 'Berhasil!',
              text: 'Data telah berhasil diperbarui.',
            }).then(() => {
              navigate("/menu");
            });
          })
          .catch((error) => {
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
          <label htmlFor="type" className="form-label">Tipe</label>
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

        <div className="form-group">
          <label htmlFor="description" className="form-label">Deskripsi</label>
          <textarea
            id="description"
            name="description"
            className="form-input"
            value={makanan.description}
            onChange={handleChange}
            placeholder="Masukkan deskripsi makanan"
            rows="4"
          />
        </div>

        <div className="form-group">
          <label htmlFor="stock" className="form-label">Stok</label>
          <input
            type="number"
            id="stock"
            name="stock"
            className="form-input"
            value={makanan.stock}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

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
