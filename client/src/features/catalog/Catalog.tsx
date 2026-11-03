import ProductList from "./ProductList";
import { useFetchProductsQuery } from "./catalogApi";



export default function Catalog() {
  const {data:products,isLoading} = useFetchProductsQuery()
  if(isLoading || !products) return <div>Loading...</div>
  return (
    <>
      <ProductList products={products} />
    </>
  )
}