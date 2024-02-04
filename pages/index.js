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
            <h2 className="text-2xl capitalize">{category}</h2>
            {productsInfo.filter(product => product.category === category).map(product => (
              <div key={product.name}>
                <ProductCard name={product.name} price={product.price} description={product.description} picture={product.picture}></ProductCard>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
