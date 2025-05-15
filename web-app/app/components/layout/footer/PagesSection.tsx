import { Typography } from '@/lib/ui/MTFix'
import { uniqueId } from 'lodash'
import Link from 'next/link'

type Props = {
    links: FooterLinkType[]
}

const PagesSection = ({ links }: Props) => {
    return (
        <>
            {
                links.map(group => (
                    <section
                        key={uniqueId()}
                    >
                        <Typography
                            variant='lead'
                            className='text-base mb-1'
                        >
                            {group.group}
                        </Typography>
                        <ol className='flex flex-col gap-0.5'>
                            {
                                group.links.map(link => (
                                    <li
                                        key={uniqueId()}
                                    >
                                        <Link
                                            href={link.href}
                                        >
                                            <Typography
                                                variant='small'
                                                className='text-sm text-text-light-secondary hover:text-text-light-primary dark:text-text-dark-secondary dark:hover:text-text-dark-primary transition-all active:scale-105'
                                            >
                                                {link.label}
                                            </Typography>
                                        </Link>
                                    </li>
                                ))
                            }
                        </ol>
                    </section>
                ))
            }
        </>
    )
}

export default PagesSection