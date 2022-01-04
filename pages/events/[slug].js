import axios from "axios";
import { API_URL } from "@/config/index";
import Layout from "../../components/Layout";

function EventPage({ data }) {
  console.log(data);
  return (
    <Layout>
      <h1> Event page </h1>
      <h3> {data.name} </h3>
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
      data,
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
