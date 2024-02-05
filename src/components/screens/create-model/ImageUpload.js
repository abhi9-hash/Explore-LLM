import React, { useState } from "react";
import axios from "axios";

const ImageUpload = ({ imageUrl, setImageUrl }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const APIKey = process.env.REACT_APP_IMGBB_API_KEY;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${APIKey}`,
        formData
      );

      if (response.data && response.data.data && response.data.data.url) {
        setImageUrl(response.data.data.url);
        console.log(
          "Image uploaded successfully. URL:",
          response.data.data.url
        );
      } else {
        console.error("Error uploading image. Response:", response.data);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload Image</button>

      {imageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={imageUrl} alt="Uploaded" />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
