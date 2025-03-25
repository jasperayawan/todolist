'use client'

import { Calendar, PlusCircle } from 'lucide-react'
import React, { useState } from 'react'
import { Priority } from './todo-list'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'

interface TodoFormProps {
    onAddTodo: (todo: {
        text: string
        completed: boolean
        dueDate?: string
        priority: Priority
        category: string
    }) => void
    categories: string[]
    onAddCategory: (category: string) => void
}

const TodoForm = () => {
    const [text, setText] = useState("")
    const [date, setDate] = useState<Date | undefined>(undefined)
    const [priority, setPriority] = useState<Priority>("medium")
    const [category, setCategory] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState(false)

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
            <button type='submit' className='bg-black text-white px-2 rounded cursor-pointer'>
                <PlusCircle className='h-4 w-4'/>
            </button>
        </div>
        <Popover>
            <PopoverTrigger asChild>
                <Button variant='outline' size='sm' className='h-8 text-white'>
                    <Calendar className="h-3.5 w-3.5 mr-2 text-white"/>
                    {date ? format(date, 'MMM dd, yyyy') : 'Set due date'}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent mode='single' selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
        </Popover>

        <Select value={priority} onValueChange={(value) => setPriority(value as Priority)}>
            <SelectTrigger className="w-[130px] h-8">
                <SelectValue placeholder="Priority" />
            </SelectTrigger>
        </Select>
    </form>
  )
}

export default TodoForm
