// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Impor useParams dan useNavigate
import { API_DUMMY } from "../utils/base_url"; // Sesuaikan dengan URL API Anda
import "../style/detail.css"; // Style khusus untuk halaman detail

function Detail() {
  const { id } = useParams(); // Mendapatkan ID dari URL
  const navigate = useNavigate(); // Untuk navigasi kembali
  const [data, setData] = useState(null); // State untuk menyimpan data menu

  useEffect(() => {
    axios
      .get(`${API_DUMMY}/api/menus/${id}`)
      .then((response) => setData(response.data))
      .catch((err) => console.error("Error fetching data: ", err)); 
  }, [id]); 

  const handleBack = () => {
    navigate(-1); // Navigasi kembali ke halaman sebelumnya
  };

  if (!data) {
    return <div>Loading...</div>; // Tampilkan loading jika data belum tersedia
  }

  return (
    <div className="detail-container">
      <h2>Detail Menu</h2>
      <div className="detail-card">
        {/* Gambar menu */}
        <img
          src={data.link_gambar || "/images/placeholder.jpg"} // Gunakan gambar placeholder jika tidak ada link gambar
          alt={data.name}
          className="detail-image"
          onError={(e) => (e.target.src = "/images/placeholder.jpg")} // Jika gambar gagal, ganti dengan placeholder
        />
        <div className="detail-info">
          {/* Informasi menu */}
          <h3>Nama: {data.name}</h3>
          <p>Harga: {data.price} IDR</p>
          <p>Tipe: {data.type}</p>
          <p><strong>Deskripsi:</strong> {data.description}</p> {/* Menambahkan deskripsi */}
          <p><strong>Stok:</strong> {data.stock} unit</p> {/* Menambahkan stok */}
        </div>
      </div>
      {/* Tombol kembali */}
      <button onClick={handleBack} className="back-button">
        Kembali
      </button>
    </div>
  );
}

export default Detail;
