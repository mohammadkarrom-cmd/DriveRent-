"use client";
import React, { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import useBoolean from '@/lib/hooks/use-boolean';
import { IconButton, Drawer } from '@/lib/ui/MTFix';
import { MdMenu, MdMenuOpen } from 'react-icons/md';
import { useSettingsContext } from '@/lib/context/settings/setting-context';
import clsx from 'clsx';
import { Backgrounds } from '@/lib/ui/class/classNames';
import Logo from '../../Lgo';

type Props = {
    children: ReactNode,
    className?: string
    hidden?: "hidden" | "sm" | "md" | "lg" | "xl"
};

export const classes = ["hidden sm:hidden md:hidden lg:hidden xl:hidden"]

function MyDrawer({ children, className, hidden }: Props) {
    const drawerOpen = useBoolean({ initialState: false });
    const { theme } = useSettingsContext();
    const isDark = theme === "dark";
    const [isClient, setIsClient] = useState(false);
    const [hiddenClass, setHiddenClass] = useState<string>("");

    useEffect(() => {
        setIsClient(true); // Ensure this part of the code only runs on the client side
        if (hidden) {
            if (hidden === "hidden") {
                setHiddenClass("hidden");
            } else {
                setHiddenClass(hidden + ":hidden")
            }
        }
    }, [hidden]);

    return (
        <>
            <IconButton
                onClick={drawerOpen.onTrue}
                variant='text'
                size='lg'
                color={isDark ? "white" : "black"}
                className={clsx('p-0 rounded-full ' + hiddenClass)}
            >
                <MdMenu fontSize={25} />
            </IconButton>
            {isClient && createPortal(
                <Drawer
                    open={drawerOpen.value}
                    overlayProps={{
                        className: "backdrop-blur-sm"
                    }}
                    onClose={drawerOpen.onFalse}
                    className={clsx('flex flex-col items-center justify-normal h-screen' + hiddenClass, Backgrounds, className)}
                    transition={{ type: "spring", duration: 0.3 }}
                >
                    <IconButton
                        onClick={drawerOpen.onFalse}
                        variant='text'
                        size='lg'
                        color={isDark ? "white" : "black"}
                        className='p-0 self-start rounded-full'
                    >
                        <MdMenuOpen fontSize={25} />
                    </IconButton>
                    <Logo width={40} height={100} disabledLink />
                    {children}
                </Drawer>,
                document.body // This will render the drawer outside of the parent hierarchy
            )}
        </>
    );
}

export default MyDrawer;
