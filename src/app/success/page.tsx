import React from 'react'
import { LucideTruck } from 'lucide-react'

const Success = () => {
  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
      <div className='max-w-6xl mx-auto flex flex-col justify-center items-center mb-20'>
        <h1 className='text-4xl font-semibold text-gray-600'>Your order has been placed</h1>
        <LucideTruck size={60} className='text-gray-600'/>
      </div>
    </div>
  )
}

export default Success
