import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { selectTodoGroups } from '../slices/todoGroupSlice';
import { TodoGroupType } from '../types/TodoGroup';
import TodoGroup from './TodoGroup';

const TodosContainer: FC = () => {
    const todos = useSelector((state: RootState) => selectTodoGroups(state));

    return (
        <>
            {todos.map((todo: TodoGroupType, index: number) => (
                <TodoGroup key={index} todo={todo} />
            ))}
        </>
    );
}

export default TodosContainer;
