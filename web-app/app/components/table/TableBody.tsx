import clsx from 'clsx';
import { Typography } from '@/lib/ui/MTFix'
import { Backgrounds, TextPrimary, TextSecondary } from '@/lib/ui/class/classNames';

type Props = {
    tableHead: TableHead[],
    tableRows: TableBody[],
    height: number
}
const TableBody = ({ tableHead, tableRows, height }: Props) => {
    const baseClasses = clsx(TextSecondary, "w-full");
    return (
        <tbody
            className={clsx(TextPrimary, 'w-full rounded-md min-w-fit')}
            style={{
                height: `${height}vh`,
                maxHeight: `${height}vh`
            }}
        >
            {tableRows.map((row, index) => (
                <tr
                    key={`tr-${index}`}
                    className={clsx(index % 2 !== 0 && Backgrounds, baseClasses)}
                >
                    {tableHead.map((head, headIndex) => {
                        const rowValue = head.render(row);
                        if (typeof rowValue !== "string" && typeof rowValue !== "number") {
                            return <td
                                className='p-0 overflow-scroll'
                                key={`tr-td-${headIndex}-${head.name}`}
                            >
                                {rowValue}
                            </td>
                        } else {
                            return (
                                <td
                                    className='p-4 overflow-scroll'
                                    key={`tr-td-${headIndex}-${head.name}`}
                                >
                                    <Typography
                                        variant='small'
                                        className={TextPrimary}
                                    >
                                        {rowValue}
                                    </Typography>
                                </td>
                            )
                        }
                    })}
                </tr>
            ))}
        </tbody>
    )
}

export default TableBody