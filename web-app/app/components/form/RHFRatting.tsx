"use client"; // Ensure this runs on the client side

import { TextPrimary } from '@/lib/ui/class/classNames';
import { Rating, Typography } from '@/lib/ui/MTFix';
import { RatingProps } from '@material-tailwind/react';
import clsx from 'clsx';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
    className?: string;
    name: string;
    label: string;
    helperText?: string;
    ratingProps: RatingProps
}

const RHFRatting = ({ name, label, className, helperText,ratingProps }: Props) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <div className={clsx(className)}>
                    <Typography variant='small'  className={clsx(TextPrimary)}>
                        {label}
                    </Typography>
                    <Rating
                        {...field}
                        {...ratingProps}
                        onChange={(value) => field.onChange(value)}
                    />
                    {!!error && <Typography variant='small' color='red' className='text-xs'>{error.message ? error.message : helperText}</Typography>}
                </div>
            )}
        />
    );
}

export default RHFRatting