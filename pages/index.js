import Image from "next/image";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";

export default function Home() {

  const [productsInfo, setProdcutsInfo] = useState([]);
  const getProducts = async () => {
    const response = await fetch('/api/products');
    const data = await response.json();
    setProdcutsInfo(data);
  }
  useEffect(() => {
    getProducts();
  },[])

  const categoriesNames  = [... new Set(productsInfo.map(product => product.category))];

  return (
    <div className="p-5">
      <div>
        {categoriesNames.map(category => (
          <div key={category}>
            <h2 className="text-2xl py-5 capitalize font-bold">{category}</h2>
            <div className='flex overflow-x-scroll '>
              {productsInfo.filter(product => product.category === category).map(product => (
                <div key={product._id} className="mr-5 mb-8">
                  <ProductCard name={product.name} price={product.price} description={product.description} picture={product.picture}></ProductCard>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
