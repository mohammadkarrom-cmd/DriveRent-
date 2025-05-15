"use client"

import useBoolean from '@/lib/hooks/use-boolean';
import { Accordion, AccordionBody, AccordionHeader, ListItem, ListItemPrefix, Typography, } from '@/lib/ui/MTFix';
import { FaChevronDown } from 'react-icons/fa';
import NestedLink from './NestedLink';
import { usePathname } from 'next/navigation';
import { uniqueId } from 'lodash';

type Props = {
    link: MenuLinkType
}

const MultiLevelLink = ({ link }: Props) => {
    const open = useBoolean({ initialState: false });
    const pathname = usePathname();
    const isActive = pathname.includes(link.path);
    return (
        <Accordion
            open={open.value}
            icon={
                <FaChevronDown
                    strokeWidth={2.5}
                    className={`mx-auto h-3 w-3 transition-transform ${open.value ? "rotate-180" : ""} text-inherit`}
                />
            }
        >
            <ListItem
                className={(isActive
                    ? "bg-primary-light bg-opacity-50 "
                    : "")
                    + " hover:bg-primary-light hover:bg-opacity-50 focus:bg-primary-light focus:bg-opacity-50 active:bg-primary-light active:bg-opacity-50 text-inherit p-0"
                }
                selected={open.value}
            >
                <AccordionHeader onClick={open.onToggle} className="border-b-0 p-3 text-inherit gap-1.5">
                    <ListItemPrefix>
                        {link.icon}
                    </ListItemPrefix>
                    <Typography variant="small" className="me-auto font-normal ">
                        {link.label}
                    </Typography>
                </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1 text-inherit">
                {
                    link.Links?.map(link => (
                        <NestedLink
                            key={uniqueId()}
                            link={link}
                        />
                    ))
                }
            </AccordionBody>
        </Accordion>
    )
}

export default MultiLevelLink