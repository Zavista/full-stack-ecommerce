import Image from "next/image";
import { useEffect, useState } from "react";


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

  return (
    <div className="p-5">
      <div>
        <h2 className="text-2xl">Mobiles</h2>
        <div className="py-4">
          <div className="w-64">
            <div className="bg-blue-100 p-5 rounded-xl">
              <Image src='/products/iphone.png' alt="iphone" width={200} height={150}></Image>
            </div>
            <div className="mt-2">
              <h3 className="font-bold text-lg">Iphone 14 Pro</h3>
            </div>
            <p className="text-sm mt-1 leading-4">Astonishing 6.5" display, powerful A16 chip, and a stellar triple-lens camera system. Face ID is faster, and 5G connectivity keeps you on the cutting edge. MagSafe adds convenience. In a nutshell, it's the epitome of smartphone brilliance.</p>
            <div className="flex items-center justify-between mt-1">
              <div className="text-2xl font-bold">$899</div>
              <button className="bg-emerald-400 text-white py-1 px-3">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
