import { API_URL } from "@/config/index";
import Layout from "../../components/Layout";
import styles from "@/styles/Event.module.css";

import axios from "axios";
import Link from "next/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EventPage({ evt }) {
  const deleteEvent = async (e) => {
    if (confirm("Are you sure?")) {
      await axios
        .delete(`${API_URL}/events/${evt.id}`)
        .then((res) => toast.success("Success"))
        .catch((err) => toast.error(err.message));
    }
  };

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a className={styles.delete} onClick={deleteEvent}>
            <FaTimes />
            Delete Event
          </a>
        </div>
        <span>
          {new Date(evt.attributes.date).toLocaleDateString("en-IN")} at{" "}
          {evt.attributes.time}
        </span>
        <ToastContainer />
        <h1> {evt.attributes.name} </h1>
        <div className={styles.image}>
          {evt.attributes.image && (
            <Image
              src={evt.attributes.image.data.attributes.formats.medium.url}
              width={960}
              height={600}
            />
          )}
        </div>
        <h3> Performers: </h3>
        <p> {evt.attributes.performers} </p>
        <h3> Description: </h3>
        <p> {evt.attributes.description} </p>
        <h3> Venue: </h3>
        <p> {evt.attributes.address} </p>

        <Link href="/events">
          <a className={styles.back}>{"<"} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

export default EventPage;

export const getStaticPaths = async () => {
  let data;

  await axios
    .get(`${API_URL}/events?populate=image`)
    .then((res) => (data = res.data.data));

  let paths = data.map((evt) => ({
    params: { slug: evt.attributes.slug },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  let data;
  await axios
    .get(`${API_URL}/events?filters[slug]=${slug}&populate=image`)
    .then((res) => (data = res.data.data));

  return {
    props: {
      evt: data[0],
    },
  };
};

// export const getServerSideProps = async ({ query: { slug } }) => {
//   let data;

//   await axios.get(`${API_URL}/api/events`).then((res) => (data = res.data));

//   data = data.filter((evt) => evt.slug === slug)[0];

//   return {
//     props: {
//       data,
//     },
//   };
// };
