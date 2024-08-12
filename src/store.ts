import { configureStore } from "@reduxjs/toolkit"
import todoGroupsReducer from "./slices/todoGroupSlice"
import todosSlice from "./slices/todoSlice"

const store = configureStore({
    reducer: {
        todoGroups: todoGroupsReducer,
        todos: todosSlice
    }
})  

export type RootState = ReturnType<typeof store.getState>;

export default store