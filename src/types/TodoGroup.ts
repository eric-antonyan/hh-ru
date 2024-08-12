import { TodoType } from "./TodoType";

export type TodoGroupType = {
    title: string;
    uuid: string;
    todos: TodoType[];
    createdAt: string;
    updatedAt: string;
}