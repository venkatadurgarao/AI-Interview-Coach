import React from 'react'
import { CiUser } from 'react-icons/ci'
import { RiMenu2Fill } from 'react-icons/ri'

export const Navbar = () => {
    return (
        <div className="border-1 rounded-sm flex justify-between p-1 ">
            <div className=" flex items-center justify-center w-[50px]">
                <RiMenu2Fill />
            </div>
            <div className="flex items-center justify-center pr-3">
                <div className=" border-1 rounded-full w-[40px] h-[40px] flex items-center justify-center">
                    <CiUser className="text-3xl" />
                </div>
            </div>
        </div>
    )
}
