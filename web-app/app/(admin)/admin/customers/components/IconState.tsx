import { Typography } from '@/lib/ui/MTFix'
import { color } from '@material-tailwind/react/types/components/checkbox'
import { ReactNode } from 'react'

type Props = {
    title: string,
    description: string,
    titleColor?: color
    descriptionColor?: color,
    icon: ReactNode
}

const IconState = ({ description, title, titleColor, descriptionColor, icon }: Props) => {
    return (
        <div
            className='flex justify-center items-center gap-0 w-fit flex-col'
        >
            <Typography role='div' variant='h2'
                color={titleColor || "green"}

            >
                {
                    icon && icon
                }
            </Typography>
            <Typography
                variant='lead'
                color={titleColor || "green"}
                className='flex justify-center items-center gap-0.5'
            >

                {title}
            </Typography>
            <Typography
                variant='paragraph'
                color={descriptionColor || "inherit"}
            >
                {description}
            </Typography>
        </div>
    )
}

export default IconState