"use client";
import { useAuthContext } from '@/lib/context/auth/auth-context';
import { } from '@/lib/ui/MTFix'
import { Spinner } from '@material-tailwind/react';
import NavLink from '../nav/NavLink';
import ProfileAvatar from '../../views/ProfileAvatar';

const AuthLink = () => {
    const { status } = useAuthContext();

    return (
        <>
            {
                status === 'loading' ?
                    (
                        <Spinner />
                    ) : (
                        status === "unauthenticated"
                            ? <NavLink
                                href='/auth/login'
                                className='whitespace-nowrap'
                            >
                                تسجيل الدخول
                            </NavLink>
                            : <ProfileAvatar />
             )
            }
        </>
    )
}

export default AuthLink