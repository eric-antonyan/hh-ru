import React from 'react';
import TodosContainer from '../components/TodosContainer';
import Form from '../components/Form';

const TodoGroupsScreen: React.FC = () => {
    return (
        <div className='flex-1 w-full h-[100vh] flex items-center justify-center flex-col'>
            <h1 className='text-4xl font-light my-5'>todos</h1>
            <Form />
            <div className='relative h-[600px] w-[500px] mt-3'>
                <div className='w-full z-30 absolute overflow-auto h-[500px] top-0 border-[1px] border-solid shadow bg-[#fff]'>
                    <TodosContainer />
                </div>
                <div className='w-[500px] absolute h-[500px] border-[1px] border-solid shadow scale-[0.97] top-[16px] z-10 bg-[#fff]'></div>
                <div className='w-[500px] absolute h-[500px] border-[1px] border-solid shadow bg-[#fff] scale-[0.94] z-0 top-[32px]'></div>
            </div>
        </div>
    );
};

export default TodoGroupsScreen;
