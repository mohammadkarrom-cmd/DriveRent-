import { uniqueId } from 'lodash'
import { createElement } from 'react'
import { appNavLinks } from '../config-nav'
import NavLink from '../nav/NavLink'
import SpecialLink from './SpecialLink'


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
            <SpecialLink />
        </ul>
    )
}

export default NavLinks

