import styles from "@/styles/ImageUpload.module.css";
import axios from "axios";
import { useState } from "react";
import { API_URL } from "../config/index";

function ImageUpload({ evtId, imageUploaded }) {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("files", image);
    formData.append("ref", "events");
    formData.append("refId", evtId);
    formData.append("field", "image");

    await axios
      .post(`${API_URL}/upload`, formData)
      .then((res) => imageUploaded())
      .catch((err) => console.log(err));
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className={styles.form}>
      <h1>Upload Event</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type="file" onChange={handleFileChange} />
        </div>
        <input type="submit" value="Upload" />
      </form>
    </div>
  );
}

export default ImageUpload;
