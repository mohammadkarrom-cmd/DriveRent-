import { Typography } from '@/lib/ui/MTFix'
import clsx from 'clsx';

type Props = {
    head: TableHead
};

const Th = ({ head }: Props) => {
    const baseClasses = "p-4 bg-transparent";

    return (
        <th
            className={!!head.className ? clsx(baseClasses, head.className) : baseClasses}
        >
            <Typography
                variant="small"
                className={(!!head.icon? 'flex items-center gap-1' : " ") + " text-nowrap"} 
            >
                {!!head.icon && head.icon}
                {head.name}
            </Typography>
        </th>
    )
}

export default Th