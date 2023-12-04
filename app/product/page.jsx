import { useFetchAllProduct } from "../../internalAPI/FetchAllProducts";
export default function AllProducts() {
  const { data } = useFetchAllProduct();
  return <div>{data && data.map((product) => <div>{product.title}</div>)}</div>;
}
