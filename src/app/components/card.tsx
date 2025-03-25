import React from 'react'

interface CardProps {
    children: React.ReactNode
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className='bg-white text-black rounded-[8px] p-2 shadow-md flex flex-col space-y-4'>
      {children}
    </div>
  )
}

export default Card
