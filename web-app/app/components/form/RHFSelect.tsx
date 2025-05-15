"use client"; // Ensure this runs on the client side

import { Controller, useFormContext } from 'react-hook-form';
import clsx from 'clsx';
import { Select, Typography } from '@/lib/ui/MTFix';
import { color } from '@material-tailwind/react/types/components/select';
import { ReactNode } from 'react';
import { Backgrounds, shadowPrimary, TextPrimary } from '@/lib/ui/class/classNames';

type Props = {
    className?: string;
    name: string;
    label: string;
    helperText?: string;
    color: color; // Adjust if `color` is a specific type
    children: ReactNode
    isNumber?: boolean
}

const RHFSelect = ({ name, color, className, label, helperText, children, isNumber }: Props) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <div className={clsx(className)}>
                    <Select
                        {...field}
                        value={isNumber ? field.value.toString() : field.value}
                        color={color}
                        label={label}
                        onChange={(value) => field.onChange(isNumber ? value.toString() : value)}
                        menuProps={{
                            className: clsx(Backgrounds, shadowPrimary, TextPrimary, "shadow border-none")
                        }}
                    >
                        {children}
                    </Select>
                    {!!error && <Typography variant='small' color='red' className='text-xs'>{error.message ? error.message : helperText}</Typography>}
                </div>
            )}
        />
    )
}

export default RHFSelect