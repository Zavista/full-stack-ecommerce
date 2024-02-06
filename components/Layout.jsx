import React, { useState } from 'react';
import Footer from './Footer';
import { useEffect } from 'react';

const Layout = ({children}) => {
  const [success, setSuccess] = useState("");
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      setSuccess('success');
    }

    if (query.get('canceled')) {
      setSuccess('canceled');
    }
  }, []);

  return (
    <div>
      <div className='p-5'>
      {success === 'success' && (
        <div className="mb-5 bg-green-400 text-white text-lg p-5 rounded-xl">
          Thanks for your order!
        </div>
        )
      }
      {success === 'canceled' && (
        <div className="mb-5 bg-red-400 text-white text-lg p-5 rounded-xl">
          Order Canceled!
        </div>
        )
      } 
        {children}</div> 
      <Footer></Footer>
    </div>
    
  )
}

export default Layout