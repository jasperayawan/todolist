'use client'

import React, { useState } from 'react'
import Card from './card'
import CardContent from './card-content'
import TodoForm from './todo-form'

export type Priority = 'low' | 'medium' | 'high'

export type Todo = {
    id: string
    text: string
    completed: boolean
    dueDate?: string
    priority: Priority
    category: string
}

export type FilterType = 'all' | 'active' | 'completed'

const TodoList = () => {
    const [todos, setTodos] = useState<Todo[]>([])
    const [categories, setCategories] = useState<string[]>(["Work", "Personal", "Shopping", "Others"])
    const [undoStack, setUndoStack] = useState<Todo[][]>([])

    const addTodo = (todo: Omit<Todo, "id">) => {
        setTodos([
            ...todos,
            {
                ...todo,
                id: crypto.randomUUID(),
            },
        ])
    }

    
  return (
    <Card>
        <h1 className='text-2xl text-center flex justify-center items-center'>Todo List</h1>
        <CardContent>
            <TodoForm onAddTodo={addTodo} />
        </CardContent>
    </Card>
  )
}

export default TodoList
