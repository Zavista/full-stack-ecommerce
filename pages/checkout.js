import Layout from "@/components/Layout"
import { ProductsContext } from "@/components/ProductsContext"
import { useContext, useEffect, useState } from "react"

const checkout = () => {
  const {selectedProducts} = useContext(ProductsContext);
  const [productsInfo, setProductsInfo] = useState([]);

  const getProducts = async () => {
    const uniqIds = [...new Set(selectedProducts)];
    const response = await fetch(`/api/products?ids=${uniqIds.join(',')}`);
    const data = await response.json();
    console.log(data);
    setProductsInfo(data);
    
  }

  useEffect(() => {
    getProducts()
  },[selectedProducts])

  return (
    <Layout>
        {selectedProducts.join(', ')}
    </Layout>
  )
}

export default checkout