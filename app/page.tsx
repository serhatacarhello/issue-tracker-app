import Pagination from "./components/Pagination";

export default function Home() {
  return (
    <>
      <h1>hello world</h1>
      <Pagination currentPage={2} itemCount={100} pageSize={10} />
    </>
  )
}
