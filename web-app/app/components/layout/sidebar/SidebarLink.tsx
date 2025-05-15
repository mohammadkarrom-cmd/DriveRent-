"use client"

import { ListItem, ListItemPrefix } from '@/lib/ui/MTFix';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
    link: MenuLinkType,
    includes?: boolean,
}

const SidebarLink = ({ link, includes }: Props) => {
    const pathname = usePathname();
    const isActive = includes ? pathname.includes(link.path) : pathname === link.path;

    return (
        <Link
            href={link.path}
        >
            <ListItem
                selected={isActive}
                className={(isActive
                    ? "bg-primary-light bg-opacity-50 "
                    : "")
                    + " hover:bg-primary-light hover:bg-opacity-50 focus:bg-primary-light focus:bg-opacity-50 active:bg-primary-light active:bg-opacity-50 text-inherit gap-1.5"
                }
            >
                <ListItemPrefix>
                    {link.icon}
                </ListItemPrefix>
                {link.label}
            </ListItem>
        </Link>
    )
}

export default SidebarLink