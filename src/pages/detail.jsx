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
    navigate(-1);
  };

  if (!data) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="detail-container">
      <h2>Detail Menu</h2>
      <div className="detail-card">
        {/* Gambar menu */}
        <img
          src={data.link_gambar || "/images/placeholder.jpg"} 
          alt={data.name} 
          className="detail-image"
          onError={(e) => (e.target.src = "/images/placeholder.jpg")}
        />
        <div className="detail-info">
          {/* Informasi menu */}
          <h3>Nama: {data.name}</h3>
          <p>Harga: {data.price} IDR</p>
          <p>Tipe: {data.type}</p>
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
