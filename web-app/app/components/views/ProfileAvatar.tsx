"use client"

import { TextPrimary } from '@/lib/ui/class/classNames'
import { IconButton, Menu, MenuHandler, MenuItem, MenuList, Typography } from '@/lib/ui/MTFix'
import clsx from 'clsx'
import { ImUser } from 'react-icons/im'
import { useAuthContext } from '@/lib/context/auth/auth-context'
import { IoLogOut } from 'react-icons/io5'
import { useRouter } from 'next/navigation'
import { paths } from '../layout/config-nav'
import { useSettingsContext } from '@/lib/context/settings/setting-context'


const ProfileAvatar = () => {
    const { user, logout } = useAuthContext();
    const { theme } = useSettingsContext();
    const router = useRouter();

    return (
        <Menu
            placement='bottom-end'
        >
            <MenuHandler>
                <IconButton
                    variant='filled'
                    className='rounded-full shadow-none active:scale-105 p-0'
                    color={theme === "dark" ? "white" : "black"}
                >
                    <ImUser
                        size={20}
                    />
                </IconButton>
            </MenuHandler>
            <MenuList
                className={clsx(TextPrimary, 'p-0 border-none bg-background-default-light dark:bg-background-card-dark')}
                color='transparent'
            >
                <MenuItem
                    className='p-5'
                    color='transparent'
                    disabled
                >
                    <section
                        className={clsx(TextPrimary, 'flex flex-col gap-1')}
                    >
                        <Typography
                            variant='small'
                            className='text-inherit'
                        >
                            {user.email}
                        </Typography>
                        <Typography
                            variant='small'
                            className='text-inherit'
                        >
                            {user.first_name} {user.last_name}
                        </Typography>
                    </section>
                </MenuItem>
                <MenuItem
                    className='inline-flex items-center gap-1.5 p-3'
                    color='transparent'
                    onClick={() => {
                        logout();
                        router.replace(paths.home);
                    }}
                >
                    <IoLogOut /> تسجيل الخروج
                </MenuItem>
            </MenuList>
        </Menu>
    )
}

export default ProfileAvatar