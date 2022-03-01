import Link from "next/link";

function PaginationComponent({ total, page }) {
  const lastPage = Math.ceil(total / 2);

  return (
    <>
      {page > 1 && (
        <Link href={`/events?page=${+page - 1}`}>
          <a className="btn-secondary"> Prev </a>
        </Link>
      )}

      {page < lastPage && (
        <Link href={`/events?page=${+page + 1}`}>
          <a className="btn-secondary"> Next </a>
        </Link>
      )}
    </>
  );
}

export default PaginationComponent;
