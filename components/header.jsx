import React from 'react'
import Link from 'next/link'

import Image from "next/image";
import icon from "../public/icon1.png"
import icon2 from "../public/home.png"
const Header = () => {
  return (
    <div className='flex justify-end'>
      <Link href="/">
        <Image className='h-8 w-8 mx-3 mt-1' src={icon2} alt="icon画像"/>
      </Link>
      <Link href="/info">
        <Image className='h-8 w-8 mx-3 mt-1' src={icon} alt="icon画像"/>
      </Link>
    </div>
  )
}

export default Header