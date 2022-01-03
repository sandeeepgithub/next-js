const { events } = require("./data.json");

export default function handler(req, res) {
  const eventName = events.filter((ev) => ev.slug === req.query.slug);

  if (req.method === "GET") {
    res.status(200).json(eventName);
  } else {
    res.status(405).json({
      message: `Method ${req.method} is not allowed`,
    });
  }
}
