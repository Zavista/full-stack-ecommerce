import Layout from "@/components/Layout"
import { ProductsContext } from "@/components/ProductsContext"
import { useContext, useEffect, useState } from "react"

const checkout = () => {
  const {selectedProducts} = useContext(ProductsContext);
  const [productsInfo, setProductsInfo] = useState([]);

  const getProducts = async () => {
    if (selectedProducts.length > 0) {
      const uniqIds = [...new Set(selectedProducts)];
      const response = await fetch(`/api/products?ids=${uniqIds.join(',')}`);
      const data = await response.json();
      setProductsInfo(data);
    }
  };
  
  useEffect(() => {
    getProducts()
  },[selectedProducts])

  return (
    <Layout>
      {productsInfo.length === 0 ? (
        <div>
          No products in your shopping cart!
        </div>
      ) : (
        productsInfo.length > 0 && productsInfo.map(productInfo => (
          <div key={productInfo.name} className="flex flex-col md:flex-row mb-3 md:w-[900px]"> 
            <div className="bg-gray-100 p-3 rounded-xl mr-3 flex items-center justify-center">
              <img src={productInfo.picture} alt={productInfo.name} className="w-[150px] h-[120px]"></img>
            </div>
            <div>
              <h3 className="font-bold text-lg">{productInfo.name}</h3>
              <p className="text-sm">{productInfo.description}</p>
              <div className="flex justify-between">
                <div className="font-bold">{`$${productInfo.price}`}</div>
                <div className="flex items-center">
                  <button className="border border-emerald-300 px-2 rounded-l text-emerald-500">-</button>
                  <span className="px-2">{`${selectedProducts.filter(id => id === productInfo._id).length}`}</span>
                  <button className="border border-emerald-300 px-2 rounded-l text-white-500 bg-emerald-500">+</button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </Layout>
  )
}

export default checkout