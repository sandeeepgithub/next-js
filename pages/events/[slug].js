import { useRouter } from "next/router";

function EventPage() {
  const router = useRouter();
  console.log(router);

  return (
    <div>
      <h1> Event page </h1>
      <h3> {router.query.slug} </h3>
      <button onClick={() => router.push("/")}> Click</button>
    </div>
  );
}

export default EventPage;
