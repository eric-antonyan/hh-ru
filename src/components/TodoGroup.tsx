import React, { FC, useState, useCallback } from 'react';
import { TodoGroupType } from '../types/TodoGroup';
import { FaCheckCircle, FaChevronDown, FaChevronUp, FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { removeTodoGroup } from '../slices/todoGroupSlice';
import Form from './Form';
import Todo from './Todo';
import TodoBottom from './TodoBottom';
import { RootState } from '../store';
import { selectTodoGroupById } from '../slices/todoSlice';

interface ITodoGroup {
    todo: TodoGroupType;
}

const TodoGroup: FC<ITodoGroup> = ({ todo }) => {
    const [isNewTodo, setIsNewTodo] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState(false);
    const [active, setActive] = useState("All");
    const dispatch = useDispatch();

    const handleRemove = useCallback(() => dispatch(removeTodoGroup(todo.uuid)), [dispatch, todo.uuid]);

    const todos = useSelector((state: RootState) => selectTodoGroupById(state, todo.uuid)) || [];

    const completedTodos = todos.filter(todoItem => todoItem.done);
    const inActiveTodos = todos.filter(todoItem => !todoItem.done);

    const handleNewTodo = useCallback(() => {
        setIsNewTodo(prev => !prev);
        setIsOpen(true);
    }, []);

    const handleToggle = useCallback(() => {
        setIsOpen(prev => !prev);
        setIsNewTodo(prev => !!prev);
    }, []);

    return (
        <div className='mb-5 border border-solid border-gray-200 hover:border-gray-900'>
            <div className='border border-solid border-gray-200 select-none'>
                <div className='p-5 flex justify-between shadow hover:bg-gray-200 sticky top-0 bg-white border-t-[1px] border-black border-solid'>
                    <div onClick={handleToggle} className='flex items-center gap-3 cursor-pointer'>
                        {completedTodos.length === todos.length ? (
                            <p className='text-gray-400 flex gap-3 items-center'>
                                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                                <p>{todo.title}</p>
                                <FaCheckCircle className='text-green-500' />
                            </p>
                        ) : (
                            <>
                                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                                <p>{todo.title}</p>
                            </>
                        )}
                    </div>
                    <div className='flex gap-3'>
                        <button onClick={handleNewTodo} className='active:text-gray-500'>
                            {isNewTodo ? <FaMinus /> : <FaPlus />}
                        </button>
                        <button onClick={handleRemove} className='text-red-500 active:text-red-700'>
                            <FaTrash />
                        </button>
                    </div>
                </div>
                {isOpen && (
                    <div>
                        {isNewTodo && <Form type='todo' uuid={todo.uuid} setIsOpen={setIsNewTodo} />}
                        {active === "All" ? (
                            todos.length > 0 ? (
                                todos.map(todoItem => (
                                    <Todo key={todoItem.createdAt} todo={todoItem} />
                                ))
                            ) : (
                                <p className='text-center text-sm my-3'>No todos available</p>
                            )
                        ) : active === "Completed" ? (
                            completedTodos.length > 0 ? (
                                completedTodos.map((todoItem, index) => (
                                    <Todo key={index} todo={todoItem} />
                                ))
                            ) : (
                                <p className='text-center text-sm my-3'>No completed todos available</p>
                            )
                        ) : active === "Active" ? (
                            inActiveTodos.length > 0 ? (
                                inActiveTodos.map(todoItem => (
                                    <Todo key={todoItem.createdAt} todo={todoItem} />
                                ))
                            ) : (
                                <p className='text-center text-sm my-3'>No active todos available</p>
                            )
                        ) : null}
                    </div>
                )}
            </div>
            <TodoBottom uuid={todo.uuid} setActive={setActive} todos={todos} active={active} />
        </div>
    );
}

export default TodoGroup;
