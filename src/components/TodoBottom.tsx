import React, { FC } from 'react'
import { TodoType } from '../types/TodoType'
import { useDispatch } from 'react-redux';
import { removeTodos } from '../slices/todoSlice';

const TodoBottom: FC<{ todos: TodoType[], setActive: any, active: string, uuid: string }> = ({ todos, setActive, active, uuid }) => {

    const dispatch = useDispatch()
    const activeTodos = todos.filter((todo) =>
        todo.done === false);

    const types = ["All", "Completed", "Active"];

    const handleType = (type: string) => {
        setActive(type)
    }

    const removeAllTodos = () => {
        dispatch(removeTodos())
    }

    return (
        <div className='flex justify-between px-5 py-3 sticky bottom-0 bg-white shadow'>
            <p className='text-[12px] text-gray-400'>{activeTodos.length} items left</p>
            <div className='text-[12px] text-gray-400 flex gap-3 items-center'>
                {
                    types.map((type) => (
                        type === active ? (
                            <button onClick={() => handleType(type)} className='cursor-pointer border-2 border-gray-200/50 rounded px-2'>{type}</button>
                        ) : (
                            <button onClick={() => handleType(type)} className='cursor-pointer'>{type}</button>
                        )
                    ))
                }
            </div>
            <button className='text-[12px] text-gray-400' onClick={removeAllTodos}>Clear complated</button>
        </div>
    )
}

export default TodoBottom