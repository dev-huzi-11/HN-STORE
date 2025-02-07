'use client'
import React from 'react'
import { Button } from '../ui/button'
import { useState } from 'react'

const Sale = () => {

    const [visibleSale, setVisibleSale] = useState<boolean>(true);

    if(!visibleSale) return null;

  return (
    <div className="w-full py-2 px-4 bg-black text-white">
      <div className='max-w-6xl mx-auto flex justify-between items-center gap-4'>
        <p className='text-xs md:text-sm lg:text-base'>Signup & get 20% off to your first order. <span className='text-base md:text-lg font-semibold underline'>Sign up now</span></p>
        <Button
        onClick={() => setVisibleSale(false)}
        className='bg-transparent'>X</Button>
      </div>
    </div>
  )
}

export default Sale
