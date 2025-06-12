import React from 'react'
import { CgSpinner } from 'react-icons/cg'


function Loading() {
    return (
        <div className='w-full h-screen flex justify-center items-center'><CgSpinner size={70} className='animate-spin text-primary-main'/></div>
    )
}

export default Loading