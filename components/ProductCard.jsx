import React from 'react';
import Image from 'next/image';

const ProductCard = ({name, price, description, picture}) => {
  return (
    <div className="w-64">
        <div className="bg-blue-100 p-5 rounded-xl">
            <Image src={picture} alt="iphone" width={200} height={150}></Image>
        </div>
        <div className="mt-2">
            <h3 className="font-bold text-lg">{name}</h3>
        </div>
        <p className="text-sm mt-1 leading-4">{description}</p>
        <div className="flex items-center justify-between mt-1">
              <div className="text-2xl font-bold">$899</div>
              <button className="bg-emerald-400 text-white py-1 px-3">Add to Cart</button>
        </div>
    </div>
  )
}

export default ProductCard