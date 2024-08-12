import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { TodoType } from "../types/TodoType";

interface TodosState {
    todos: TodoType[];
}

const initialState: TodosState = {
    todos: [],
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<TodoType>) => {

            const todo = action.payload;

            const newTodo: TodoType = {
                ...todo,
                createdAt: todo.createdAt 
                    ? new Date(todo.createdAt).toISOString() 
                    : new Date().toISOString(),
                updatedAt: todo.updatedAt 
                    ? new Date(todo.updatedAt).toISOString() 
                    : new Date().toISOString(),
            };
            state.todos.push(newTodo);
        },
        removeTodos: (state) => {
            if (!state.todos.length) {
                alert("Completed todos not found, process failed!");
                return;
            }
            state.todos = state.todos.filter(todo => !todo.done);
        },
        removeTodo: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter(todo => 
                todo.uuid !== action.payload);
        },
        toggleTodoByUUID: (state, action: PayloadAction<{ groupId: string }>) => {
            state.todos = state.todos.map(todo =>
                todo.uuid === action.payload.groupId
                    ? { ...todo, done: !todo.done }
                    : todo
            );
        },
    }
});

export const { 
    addTodo, 
    removeTodo, 
    toggleTodoByUUID, 
    removeTodos 
} = todoSlice.actions;

export const selectTodos = (state: RootState): TodoType[] =>
    state.todos.todos;

export const selectTodoGroupById = (state: RootState, uuid: string): TodoType[] => {
    const todoGroup = state.todos.todos.filter(todo => todo.parentUUID === uuid);
    return [...todoGroup].sort((a, b) => 
        new Date(a.createdAt).getTime() > 
        new Date(b.createdAt).getTime() ?
         -1 :
          1);
}

export default todoSlice.reducer;
