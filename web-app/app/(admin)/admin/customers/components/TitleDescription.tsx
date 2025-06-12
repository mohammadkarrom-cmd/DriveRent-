import { Typography } from '@/lib/ui/MTFix'
import { color } from '@material-tailwind/react/types/components/checkbox'
import { ReactNode } from 'react'

type Props = {
    title: string,
    description: string,
    titleColor?: color
    descriptionColor?: color,
    icon?: ReactNode
}

const TitleDescription = ({ description, title, titleColor, descriptionColor, icon }: Props) => {
    return (
        <div
            className='flex justify-center items-center gap-0.5 w-fit'
        >
            <Typography
                variant='lead'
                color={titleColor || "green"}
                className='flex justify-center items-center gap-0.5'
            >
                {
                    icon && icon
                }
                {title}
            </Typography>
            :
            <Typography
                variant='paragraph'
                color={descriptionColor || "inherit"}
            >
                {description}
            </Typography>
        </div>
    )
}

export default TitleDescription