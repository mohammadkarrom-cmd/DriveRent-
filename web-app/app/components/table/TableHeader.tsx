import clsx from 'clsx';
import Th from './Th';

type Props = {
    tableHead: TableHead[]
    className?: string
};

const TableHeader = ({ tableHead, className }: Props) => {
    const baseClasses = " border-b border-text-light-primary text-text-light-primary bg-primary-light bg-opacity-40 dark:border-text-dark-primary dark:text-text-dark-primary rounded-md";
    const classes = clsx(baseClasses, className);

    return (

        <thead
            className={classes}
        >
            <tr className='rounded-md'>
                {tableHead.map((head) => (
                    <Th
                        key={`tr-${head.name}-head`}
                        head={head}
                    />
                ))}
            </tr>
        </thead>
    );
};

export default TableHeader
