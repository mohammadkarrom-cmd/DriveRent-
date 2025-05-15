import React, { createElement } from 'react'
import NavLink from '../nav/NavLink'
import { appNavLinks } from '../config-nav'
import SpecialLink from './SpecialLink'
import { uniqueId } from 'lodash'


const NavLinks = () => {
    return (
        <ul className="flex justify-center items-center gap-1">
            {
                appNavLinks.map(link => (
                    <li
                        key={uniqueId()}
                    >
                        <NavLink
                            href={link.href}
                            className='flex gap-1 items-center text-sm'
                        >
                            {createElement(link.icon)}
                            {link.label}
                        </NavLink>
                    </li>
                ))
            }
            <li
                key={uniqueId()}
            >
               <SpecialLink />
            </li>
        </ul>
    )
}

export default NavLinks

