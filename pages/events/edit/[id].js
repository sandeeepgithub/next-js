import { useState } from "react";
import { Router, useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FaImage } from "react-icons/fa";

import Layout from "@/components/Layout";
import styles from "@/styles/Form.module.css";
import { API_URL } from "@/config/index";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";

export default function EditEventPage({ data }) {
  const [values, setValues] = useState({
    name: data.attributes.name,
    performers: data.attributes.performers,
    venue: data.attributes.venue,
    address: data.attributes.address,
    date: data.attributes.date,
    time: data.attributes.time,
    description: data.attributes.description,
  });

  const [previewImage, setPreviewImage] = useState(
    data.attributes?.image?.data?.attributes
      ? data.attributes.image.data.attributes.formats.thumbnail
      : null
  );

  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasEmptyValues = Object.values(values).some((el) => el === "");

    if (hasEmptyValues) {
      toast.error("Please add all the fields");
    }

    await axios
      .put(`${API_URL}/events/${data.id}`, { data: values })
      .then((res) => router.push(`/events?${data.attributes.slug}`))
      .catch((err) => toast.error(err.message));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const imageUploaded = async () => {
    let data;

    await axios
      .get(`${API_URL}/events/${data.id}?populate=image`)
      .then((res) => (data = res.data))
      .catch((err) => console.log(err));

    setPreviewImage(data.attributes.image.data.attributes.formats.thumbnail);
    setShowModal(false);
  };

  return (
    <Layout title="Edit Event">
      <Link href="/events">Go Back</Link>
      <h1>Edit Event</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              name="performers"
              id="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              name="venue"
              id="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={moment(values.date).format("yyyy-MM-DD")}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              name="time"
              id="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <input type="submit" value="Update Event" className="btn" />
      </form>
      <h2>Event Image</h2>

      {previewImage ? (
        <Image src={previewImage.url} width={170} height={100} />
      ) : (
        <p> No Image Uploaded</p>
      )}
      <div>
        <button onClick={() => setShowModal(true)} className="btn-secondary">
          <FaImage /> Upload Image
        </button>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload evtId={data.id} imageUploaded={imageUploaded} />
      </Modal>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id } }) {
  let data;
  await axios
    .get(`${API_URL}/events/${id}?populate=image`)
    .then((res) => (data = res.data.data))
    .catch((err) => console.log(err));

  return {
    props: {
      data,
    },
  };
}
