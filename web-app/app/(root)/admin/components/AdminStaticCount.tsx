import { TextPrimary } from '@/lib/ui/class/classNames'
import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react'
import { colors } from '@material-tailwind/react/types/generic'
import { ReactNode } from 'react'

type Props = {
    label: string,
    count: number,
    icon: ReactNode,
    color: colors
}

const AdminStaticCount = ({ count, icon, label, color }: Props) => {
    return (
        <Card
            color={color}
            className='bg-opacity-10 flex flex-row justify-between min-w-[175px] max-w-fit gap-5 p-3'
        >
            <CardHeader
                color='transparent'
                floated={false}
                shadow={false}
                className='flex flex-col justify-center items-center m-0'
            >
                <Typography
                    variant='h4'
                    color={color}
                >
                    {label}
                </Typography>
                <Typography
                    variant='h4'
                    className={TextPrimary}
                >
                    {count}
                </Typography>
            </CardHeader>
            <CardBody
                className='p-0'
            >
                <Typography
                    color={color}
                >
                    {icon}
                </Typography>
            </CardBody>
        </Card>
    )
}

export default AdminStaticCount