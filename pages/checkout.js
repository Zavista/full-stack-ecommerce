import Layout from "@/components/Layout"
import { ProductsContext } from "@/components/ProductsContext"
import { useContext, useEffect, useState } from "react"

const checkout = () => {
  const {selectedProducts, setSelectedProducts} = useContext(ProductsContext);
  const [productsInfo, setProductsInfo] = useState([]);
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [postal, setPostal] = useState('');



  const getProducts = async () => {
    if (selectedProducts.length > 0) {
      const uniqIds = [...new Set(selectedProducts)];
      const response = await fetch(`/api/products?ids=${uniqIds.join(',')}`);
      const data = await response.json();
      setProductsInfo(data);
    } else {
      setProductsInfo([]);
    }
  };
  
  useEffect(() => {
    getProducts()
  },[selectedProducts])

  const addProduct = (id) => {
    setSelectedProducts(prev => [...prev, id]);
  }

  const removeProduct = (id) => {
    const pos = selectedProducts.indexOf(id);
    if (pos !==  -1) {
      const newSelectedProducts = selectedProducts.filter((value, index) => index != pos );
      setSelectedProducts(newSelectedProducts);
    }
  }

  const deliveryPrice = 5;
  let subtotal = 0;
  if (selectedProducts?.length) {
    for (let id of selectedProducts) {
      const price = productsInfo.find(p => p._id === id)?.price || 0;
      subtotal += price;
    }
  }
  const total = subtotal + deliveryPrice;

  return (
    <Layout>
      {productsInfo.length === 0 ? (
        <div>
          No products in your shopping cart!
        </div>
      ) : (
        
        <div className="">
          {productsInfo.length > 0 && productsInfo.map(productInfo => (
          <div key={productInfo.name} className="flex flex-col md:flex-row mb-3 lg:w-[1000px]"> 
            <div className="bg-gray-100 p-3 rounded-xl mr-3 flex items-center justify-center">
              <img src={productInfo.picture} alt={productInfo.name} className="w-[150px] h-[120px]"></img>
            </div>
            <div>
              <h3 className="font-bold text-lg">{productInfo.name}</h3>
              <p className="text-sm">{productInfo.description}</p>
              <div className="flex justify-between">
                <div className="font-bold">{`$${productInfo.price}`}</div>
                <div className="flex items-center">
                  <button 
                   onClick={() => removeProduct(productInfo._id)}
                  className="border border-emerald-300 px-2 rounded-l text-emerald-500">-</button>
                  <span className="px-2">{`${selectedProducts.filter(id => id === productInfo._id).length}`}</span>
                  <button 
                  onClick={() => addProduct(productInfo._id)}
                  className="border border-emerald-300 px-2 rounded-l text-white-500 bg-emerald-500">+</button>
                </div>
              </div>
            </div>
          </div>
        ))}
        </div>
      )}
      <form action='/api/checkout' method="POST">
        <div className="mt-4 border-solid border-t-4 border-black-500 pt-3 ">
          <h1 className="text-2xl font-bold mb-2">Billing Information</h1>
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='bg-gray-100 w-full px-4 py-2 rounded-xl mb-2'
            type="text"
            placeholder="Full Name"
          />

          <input
          name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-gray-100 w-full px-4 py-2 rounded-xl mb-2'
            type="text"
            placeholder="Email"
          />

          <input
          name="address"
            value={address}
            onChange={(e) => setAdress(e.target.value)}
            className='bg-gray-100 w-full px-4 py-2 rounded-xl mb-2'
            type="text"
            placeholder="Street Address"
          />

          <input
          name='city'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className='bg-gray-100 w-full px-4 py-2 rounded-xl mb-2'
            type="text"
            placeholder="City"
          />

          <input
          name="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className='bg-gray-100 w-full px-4 py-2 rounded-xl mb-2'
            type="text"
            placeholder="Country"
          />

          <input
          name="postal"
            value={postal}
            onChange={(e) => setPostal(e.target.value)}
            className='bg-gray-100 w-full px-4 py-2 rounded-xl mb-2'
            type="text"
            placeholder="Postal Code"
          />
        </div>
        <div className="mt-4">
          <div className="flex justify-between my-2">
            <h3 className="font-bold text-gray-400">Subtotal:</h3>
            <h3 className="text-gray-400">{`$${subtotal}`}</h3>
          </div>
          <div className="flex justify-between mb-4">
            <h3 className="font-bold text-gray-400">Delivery:</h3>
            <h3 className="text-gray-400">{`$${deliveryPrice}`}</h3>
          </div>
          <div className="flex justify-between my-2 border-dashed border-t border-emerald-500 pt-3">
            <h3 className="font-bold text-2xl">Total:</h3>
            <h3 className="text-2xl">{`$${total}`}</h3>
          </div>
      </div>
      
        <input type="hidden" name="products" value={selectedProducts.join(',')}></input>
        <div className="flex flex-end">
            <button type='submit' className="bg-emerald-500 p-5 text-white w-full md:w-[25%] mt-2 mb-4 shadow-emerald-200 shadow-lg ml-auto">Pay ${total}</button>
        </div>
      </form>
      
      
    </Layout>
  )
}

export default checkout