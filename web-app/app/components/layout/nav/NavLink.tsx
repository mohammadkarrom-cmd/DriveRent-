"use client"
import Link from 'next/link';
import React from 'react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { Button } from '@/lib/ui/MTFix'
import { useSettingsContext } from '@/lib/context/settings/setting-context';

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string; // Additional class names
    includes?: boolean
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, className, includes }) => {
    const pathname = usePathname();
    const isActive = includes ? pathname.includes(href) : pathname === href;
    const { theme } = useSettingsContext();
    const btnColor = theme == "dark" ? "white" : "black"

    return (
        <Link href={href}>
            <Button
                color={btnColor}
                variant={isActive ? "filled" : "text"}
                size='sm'
                className={clsx("normal-case active:scale-105", className)}
            >
                {children}
            </Button>
        </Link>
    );
};

export default NavLink;
