'use client'

import React from 'react'
import Card from './card'
import CardContent from './card-content'
import TodoForm from './todo-form'

const TodoList = () => {
  return (
    <Card>
        <h1 className='text-2xl text-center flex justify-center items-center'>Todo List</h1>
        <CardContent>
            <TodoForm />
        </CardContent>
    </Card>
  )
}

export default TodoList
