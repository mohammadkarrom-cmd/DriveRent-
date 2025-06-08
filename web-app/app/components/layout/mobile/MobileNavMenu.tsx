import { Backgrounds, CardBackgrounds, TextPrimary } from '@/lib/ui/class/classNames';
import { IconButton, Menu, MenuHandler, MenuItem, MenuList } from '@/lib/ui/MTFix';
import clsx from 'clsx';
import { uniqueId } from 'lodash';
import Link from 'next/link';
import { createElement } from 'react';
import { CgMenuLeft } from 'react-icons/cg';
import SpecialMenuLink from '../commonLayout/SpecialMenuLink';
import { appNavLinks } from '../config-nav';


const MobileNavMenu = () => {
    return (
        <Menu
            offset={{ mainAxis: 10 }}
            placement="bottom"
        >
            <MenuHandler >
                <IconButton
                    variant='text'
                    size='md'
                    className='p-0 rounded-full text-black dark:text-white'
                >
                    <CgMenuLeft size={20} />
                </IconButton>
            </MenuHandler>
            <MenuList
                className={clsx(CardBackgrounds, 'w-full md:hidden mx-1 shadow-blue-gray-900 border-none gap-2')}
            >
                {
                    appNavLinks.map(link => (
                        <Link
                            href={link.href}
                            key={uniqueId()}
                        >
                            <MenuItem
                                className={clsx(TextPrimary, "hover:bg-background-default-light hover:dark:bg-background-default-dark flex gap-1.5 items-center flex-row-reverse justify-end group transition-all duration-300")}
                            >
                                {link.label}
                                <div
                                    className={clsx(Backgrounds, "group-hover:bg-background-card-light group-hover:dark:bg-background-card-dark p-2 rounded-md transition-all duration-300")}
                                >
                                    {createElement(link.icon)}
                                </div>
                            </MenuItem>
                        </Link>
                    ))
                }
                <SpecialMenuLink />
            </MenuList>
        </Menu>
    )
}

export default MobileNavMenu