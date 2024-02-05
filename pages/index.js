import Image from "next/image";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { connectMongoose } from "@/lib/mongoose";
import { findAllProducts } from "./api/products";
import Layout from "@/components/Layout";

export default function Home({products}) {

  const [searchInput, setSearchInput] = useState('');


  if (searchInput) {
    products= products.filter(p => p.name.toLowerCase().includes(searchInput.toLowerCase()));
  } 

  const categoriesNames  = [... new Set(products.map(product => product.category))];

  return (
    <Layout>
      <input value={searchInput} onChange={e => setSearchInput(e.target.value)} type="text" placeholder="Search for products..." className="bg-gray-100 w-full py-2 px-4 rounded-xl"></input>
      <div>
        {categoriesNames.map(category => (
          <div key={category}>
            <h2 className="text-2xl py-5 capitalize font-bold">{category}</h2>
            <div className='flex overflow-x-scroll '>
              {products.filter(product => product.category === category).map(product => (
                <div key={product._id} className="mr-5 mb-8">
                  <ProductCard name={product.name} price={product.price} description={product.description} picture={product.picture}></ProductCard>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}


export async function getServerSideProps() { 
  await connectMongoose();
  const products = await findAllProducts(); //from our api
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    }
  }
}