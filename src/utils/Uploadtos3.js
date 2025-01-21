export const uploadImageToS3 = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://is3.cloudhost.id/binus", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Gagal mengupload gambar ke S3");
      }

      const data = await response.json();
      if (data.data && data.data.url_file) {
        console.log("URL gambar berhasil didapat:", data.data.url_file);
        return data.data.url_file;
      } else {
        throw new Error("URL gambar tidak tersedia dalam respons S3");
      }
    } catch (error) {
      console.error("Error upload ke S3:", error);
      throw error;
    }
  };