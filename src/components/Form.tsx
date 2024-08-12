import React, { ChangeEvent, FC, useState } from 'react'
import { useDispatch } from 'react-redux';
import { v4 } from 'uuid';
import { addTodoGroup } from '../slices/todoGroupSlice';
import { TodoGroupType } from '../types/TodoGroup';
import { addTodo } from '../slices/todoSlice';
import { TodoType } from '../types/TodoType';

const Form: FC<{ type?: string, setIsOpen?: any, uuid?: string }> = ({ type = "group", setIsOpen, uuid }) => {
    const [newTitle, setNewTitle] = useState<string>('');
    const dispatch = useDispatch();

    const onSubmitTodoGroup = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (newTitle.trim() === '') return;

        const newTodoGroup: TodoGroupType = {
            title: newTitle,
            uuid: v4(),
            todos: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        dispatch(addTodoGroup(newTodoGroup));
        setNewTitle('');
    };

    const onSubmitTodo = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (newTitle.trim() === '') return;


        if (!uuid) return;

        const newTodo: TodoType = {
            title: newTitle,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            parentUUID: uuid,
            uuid: v4(),
            done: false
        };

        dispatch(addTodo(newTodo));

        if (setIsOpen) setIsOpen(false);
    }


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.target.value);
    };

    return (
        <form onSubmit={type !== "todo" ? onSubmitTodoGroup : onSubmitTodo} className={`w-full ${type === "group" ? "rounded-t-3xl" : null} py-5 shadow flex pr-5`}>
            <input
                onChange={handleChange}
                type="text"
                value={newTitle}
                className='px-5 flex-1 w-full outline-none'
                placeholder={`Enter new ${type} name`}
                autoFocus
            />
            <button type="submit" className='font-medium active:text-gray-600'>Add Todo</button>
        </form>
    )
}

export default Form