import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='sticky bottom-0 bg-white p-5 w-full flex'>
        <Link href={'/'}>Home</Link>
        <Link href={'/checkout'}>Cart</Link>
    </footer>
  )
}

export default Footer