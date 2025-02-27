"use client"

import { useAuthContext } from '@/lib/context/auth/auth-context'
import {  useRouter } from 'next/navigation';
import { IoLogOut } from 'react-icons/io5';
import { paths } from '../layout/config-nav';


const Logout = () => {
    const { logout } = useAuthContext();
    const router = useRouter();
    return (
        <span
            onClick={() => {
                logout();
                router.replace(paths.login);
            }}
            className='inline-flex items-center gap-1.5 p-3'
        >
            <IoLogOut /> تسجيل الخروج
        </span>
    )
}

export default Logout