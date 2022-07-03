import React from 'react';
import { logout } from '../redux/accountSlices';
import {useDispatch} from "react-redux"

const LogoutPages = () => {
    const dispatch=useDispatch()
    dispatch(logout())
    return (
        <div className='w-full '>
            <div className='m-auto'>
            <p className='m-0 text-xl font-medium'>You was logout!</p>
            </div>

        </div>
    );
};

export default LogoutPages;