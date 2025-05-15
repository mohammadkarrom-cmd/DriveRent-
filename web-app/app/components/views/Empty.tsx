import { CardBackgrounds, TextPrimary } from '@/lib/ui/class/classNames'
import { Card, CardBody, CardFooter, CardHeader, Typography } from '@/lib/ui/MTFix'
import clsx from 'clsx'
import { ReactNode } from 'react'
import { MdHeartBroken } from 'react-icons/md'

type Props = {
    title: string,
    body?: string,
    action?: ReactNode
}

const Empty = ({ title, action, body }: Props) => {
    return (
        <section
            className='w-full h-full py-20 px-10'
        >
            <Card
                shadow={false}
                color='transparent'
                className={clsx(CardBackgrounds, TextPrimary)}
            >
                <CardHeader
                    shadow={false}
                    color='transparent'
                    floated={false}
                >
                    <Typography
                        variant='h4'
                        color='red'
                        className='flex items-center gap-1.5'
                    >
                        <MdHeartBroken />
                        {title}
                        <MdHeartBroken />
                    </Typography>
                </CardHeader>
                <CardBody
                    color='transparent'
                >
                    {body}
                </CardBody>
                <CardFooter
                    className='gap-10 flex flex-col md:items-center md:flex-row'
                >
                    {action}
                </CardFooter>
            </Card>
        </section>
    )
}

export default Empty