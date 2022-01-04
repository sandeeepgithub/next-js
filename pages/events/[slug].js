import { API_URL } from "@/config/index";
import Layout from "../../components/Layout";
import styles from "@/styles/Event.module.css";

import axios from "axios";
import Link from "next/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Image from "next/image";

function EventPage({ evt }) {
  const deleteEvent = (e) => {
    console.log(e);
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
          {evt.date} at {evt.time}
        </span>
        <h1> {evt.name} </h1>
        <div className={styles.image}>
          {evt.image && <Image src={evt.image} width={960} height={600} />}
        </div>
        <h3> Performers: </h3>
        <p> {evt.performers} </p>
        <h3> Description: </h3>
        <p> {evt.description} </p>
        <h3> Venue: </h3>
        <p> {evt.address} </p>

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

  await axios.get(`${API_URL}/api/events`).then((res) => (data = res.data));

  let paths = data.map((evt) => ({
    params: { slug: evt.slug },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  let data;
  await axios
    .get(`${API_URL}/api/events/${slug}`)
    .then((res) => (data = res.data));

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
