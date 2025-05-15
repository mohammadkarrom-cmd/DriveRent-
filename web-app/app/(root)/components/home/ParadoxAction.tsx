"use client"

import { paths } from '@/app/components/layout/config-nav';
import { useAuthContext } from '@/lib/context/auth/auth-context';
import { Button } from '@/lib/ui/MTFix'
import Link from 'next/link';

type ParadoxActionStateType = {
    title: string
    href: string
    loading: boolean
}

const ParadoxAction = () => {
    const { status } = useAuthContext();

    const action: ParadoxActionStateType = status === "loading"
        ? {
            loading: true,
            title: "جار التحميل",
            href: ""
        } : status === "authenticated"
            ? {

                loading: false,
                title: "عرض كل السيارات",
                href: paths.cars.cars
            }
            : {

                loading: false,
                title: "تسجيل الدخول",
                href: paths.login
            };


    if (action.loading) {
        return (
            <Button
                color='green'
                variant='filled'
                className='text-sm md:text-lg bg-opacity-40 text-green-400'
                loading
            >
                {""}
            </Button>
        )
    } else {
        return (
            <Link
                href={action.href}
            >
                <Button
                    color='green'
                    variant='filled'
                    className='text-sm md:text-lg bg-opacity-40 text-green-400'
                    loading={action.loading}
                >
                    {action.title}
                </Button>
            </Link>
        )
    }
}

export default ParadoxAction