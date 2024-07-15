import React from 'react'
import { FaPhone, FaRegUser } from 'react-icons/fa'

function DetailUser({ nama, phone }) {
    return (
        <div className='flex-col flex gap-1 w-full text-xs'>
            <div className='flex-row flex gap-1 justify-start items-center'>
                <FaRegUser />
                <p className=''>{nama}</p>
            </div>
            <div className='flex-row flex gap-1 justify-start items-center'>
                <FaPhone />
                <p className=''>{nama}</p>
            </div>
        </div>
    )
}

export default DetailUser