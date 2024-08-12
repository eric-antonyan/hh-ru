import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoGroupType } from "../types/TodoGroup";
import { RootState } from "../store";

interface TodosState {
    map: Record<string, any>;
    todoGroups: TodoGroupType[];
}

const initialState: TodosState = {
    todoGroups: [],
    map: {},
};

const todoGroupSlice = createSlice({
    name: 'todoGroups',
    initialState,
    reducers: {
        addTodoGroup: (
            state,
            action: PayloadAction<TodoGroupType>
        ) => {
            const newTodoGroup = action.payload;
            state.todoGroups.push(newTodoGroup);
        },
        removeTodoGroup: (state, action: PayloadAction<string>) => {
            state.todoGroups = state.todoGroups.filter(
                (todoGroup) =>
                    todoGroup.uuid !== action.payload
            );
        },
        clearTodosFromGroup: (state, action: PayloadAction<string>) => {
            const groupId = action.payload;
            const group = state.todoGroups.find(
                (group) =>
                    group.uuid === groupId);

            if (group) {
                group.todos = [];
            }
        },
    }
});

export const {
    addTodoGroup,
    removeTodoGroup,
    clearTodosFromGroup
} = todoGroupSlice.actions;

export const selectTodoGroups = (state: RootState) =>
    [...state.todoGroups.todoGroups].sort((a, b) =>
        new Date(a.createdAt).getTime() >
            new Date(b.createdAt).getTime()
            ? -1
            : 1
    );

export const getGroupByUUID = createSelector(
    [selectTodoGroups, (state: RootState, uuid: string) => uuid],
    (todoGroups, uuid) =>
        todoGroups.find((todoGroup) =>
            todoGroup.uuid === uuid)?.todos
        || []
);

export default todoGroupSlice.reducer;
