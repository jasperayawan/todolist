'use client'

import { Calendar, PlusCircle, Tag } from 'lucide-react'
import React, { useState } from 'react'
import { Priority } from './todo-list'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

interface TodoFormProps {
    onAddTodo: (todo: {
        text: string
        completed: boolean
        dueDate?: string
        priority: Priority
        category: string
    }) => void
    categories?: string[]
    onAddCategory?: (category: string) => void
}

const TodoForm = ({ onAddTodo } : TodoFormProps) => {
    const [text, setText] = useState("")
    const [date, setDate] = useState<Date | undefined>(undefined)
    const [priority, setPriority] = useState<Priority>("medium")
    const [category, setCategory] = useState("")
    const [newCategory, setNewCategory] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(text.trim()){
            onAddTodo({
                text,
                completed: false,
                dueDate: date ? format(date, 'yyyy-MM-dd') : undefined,
                priority,
                category,
            })
            setText("")
            setDate(undefined)
            setPriority("medium")
        }
        
    }

    // const handleAddCategory = () => {
    //     if(newCategory.trim()){
    //         onAddCategory(newCategory.trim())
    //         setCategory(newCategory.trim())
    //         setNewCategory("")
    //         setIsDialogOpen(false)
    //     }
    // }

    const priorityColors = {
        low: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
        medium: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
        high: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
    }

  return (
    <form onSubmit={handleSubmit} className='space-y-3'>
        <div className="flex gap-2">
            <input 
                type='text'
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What needs to be done?"
                className='border flex-1 w-full px-4 py-1 rounded-md'
            />
            <Button type='submit' className='cursor-pointer'>
                <PlusCircle className='h-4 w-4'/>
            </Button>
        </div>
        <div className="flex gap-2">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant='outline' size='sm' className='h-8'>
                        <Calendar className="h-3.5 w-3.5 mr-2"/>
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
                <SelectContent>
                    <SelectItem value='low'>
                        <Badge variant='outline' className={priorityColors.low}>
                            Low
                        </Badge>
                    </SelectItem>
                    <SelectItem value='medium'>
                        <Badge variant='outline' className={priorityColors.medium}>
                            Medium
                        </Badge>
                    </SelectItem>
                    <SelectItem value='high'>
                        <Badge variant='outline' className={priorityColors.high}>
                            High
                        </Badge>
                    </SelectItem>
                </SelectContent>
            </Select>

            <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[130px] h-8">
                    <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant='ghost'>
                                <Tag />
                                Add category
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add new category</DialogTitle>
                            </DialogHeader>
                            <div className="py-4">
                                <Label>Category name</Label>
                                <Input 
                                    id='new-category'
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    className='mt-2'
                                />
                            </div>
                            <DialogFooter>
                                {/* <Button onClick={handleAddCategory}>Add</Button> */}
                                <Button>Add</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </SelectContent>
            </Select>
        </div>
    </form>
  )
}

export default TodoForm
