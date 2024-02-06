import React, { useContext } from 'react';
import Image from 'next/image';
import { ProductsContext } from './ProductsContext';

const ProductCard = ({_id, name, price, description, picture}) => {
  const {setSelectedProducts } = useContext(ProductsContext);
  const addProduct = () => {
    setSelectedProducts(prev => [...prev, _id]); //add _id to end of list
  };

  return (
    <div className="w-64 h-[100%] flex flex-col">
        <div className="bg-blue-100 p-5 rounded-xl">
            <img src={picture} alt="iphone"  className='w-[220px] h-[180px] md:w-[300px] md:h-[225px] object-contain'></img>
        </div>
        <div className='h-[100%] flex flex-col justify-between items-between'>
          <div>
              <div className="mt-2">
                <h3 className="font-bold text-lg">{name}</h3>
              </div>
              <p className="text-sm mt-1 leading-4">{description}</p>
          </div>
          <div className="flex items-center justify-between mt-1">
                <div className="text-2xl font-bold">{`$${price}`}</div>
                <button 
                onClick={() => addProduct()}
                className="bg-emerald-400 text-white py-1 px-3">Add to Cart</button>
          </div>          
        </div>

    </div>
  )
}

export default ProductCard