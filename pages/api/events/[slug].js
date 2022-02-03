import { API_URL } from "@/config/";
import axios from "axios";

export default function handler(req, res) {
  let events;

  await axios
    .get(`${API_URL}/events?populate=image`)
    .then((res) => (events = res.data.data))
    .catch((err) => console.log(err));

  const eventName = events.filter((ev) => ev.slug === req.query.slug);

  if (req.method === "GET") {
    res.status(200).json(eventName);
  } else {
    res.status(405).json({
      message: `Method ${req.method} is not allowed`,
    });
  }
}
