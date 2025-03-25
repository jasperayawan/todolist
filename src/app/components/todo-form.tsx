import { PlusCircle } from 'lucide-react'
import React from 'react'

const TodoForm = () => {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('submitted')
    }

  return (
    <form onSubmit={handleSubmit} className='space-y-3'>
        <div className="flex gap-2">
            <input 
                type='text'
                placeholder="What needs to be done?"
                className='border flex-1 w-full px-4 py-1 rounded-md'
            />
            <button type='submit' className='bg-black text-white px-2 rounded'>
                <PlusCircle className='h-4 w-4'/>
            </button>
        </div>
    </form>
  )
}

export default TodoForm
