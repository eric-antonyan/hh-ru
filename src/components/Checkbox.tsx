import React, { FC } from 'react'
import { FaCheck } from 'react-icons/fa'

const Checkbox: FC<{ checked: boolean }> = ({ checked }) => {
    return (
        checked ? (
            <div className='w-[25px] text-green-500 flex justify-center items-center h-[25px] border-gray-400 border-[2px] cursor-pointer border-solid rounded-full'>
                <FaCheck size={"10px"} />
            </div>
        ) : (
            <div className='w-[25px] h-[25px] border-gray-400 border-[2px] cursor-pointer border-solid rounded-full'>

            </div>
        )
    )
}

export default Checkbox