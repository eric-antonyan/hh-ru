import React, { FC } from 'react'
import { TodoType } from '../types/TodoType'
import { useDispatch } from 'react-redux'
import { removeTodo, toggleTodoByUUID } from '../slices/todoSlice'
import { FaTrash } from 'react-icons/fa'
import Checkbox from './Checkbox'

const Todo: FC<{ todo: TodoType }> = ({ todo }) => {

  const dispatch = useDispatch()

  const handleToggle = () => {
    dispatch(toggleTodoByUUID({
      groupId: todo.uuid
    }));
  }

  const handleRemove = () => {
    dispatch(removeTodo(todo.uuid))
  }

  return (
    <div className='p-5 shadow flex select-none justify-between'>
      <div className='flex gap-3'>
        <div onClick={handleToggle}>
          <Checkbox checked={todo.done} />
        </div>
        {
          todo.done ? (
            <del className='text-gray-400'>
              <p className='select-none'>{todo.title}</p>
            </del>
          ) : (
            <p className='select-none'>{todo.title}</p>
          )
        }
      </div>
      <div className='flex gap-3'>
        <button onClick={handleRemove} className='text-red-500 active:text-red-700'>
          <FaTrash />
        </button>
      </div>
    </div>
  )
}

export default Todo