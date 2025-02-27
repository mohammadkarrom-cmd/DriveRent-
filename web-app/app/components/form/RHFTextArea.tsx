"use client"

import { TextPrimary } from '@/lib/ui/class/classNames'
import { color } from '@material-tailwind/react/types/components/input'
import clsx from 'clsx'
import { useEffect, useRef } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Textarea, Typography } from '@/lib/ui/MTFix'


type Props = {
    className?: string
    name: string
    label?: string
    placeholder?: string
    helperText: string
    color?: color,
    maLength?: number
    rows?: number
}

const RHFTextArea = ({ helperText, name, className, color, label, maLength, rows, placeholder }: Props) => {
    const { control, formState: { errors } } = useFormContext();

    const inputRef = useRef(null);

    useEffect(() => {
        if (errors[name]) {
            inputRef.current?.focus();
        }
    }, [errors, name]);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <div>
                    <Textarea
                        label={label}
                        labelProps={{
                            dir: "ltr"
                        }}
                        placeholder={placeholder}
                        color={color}
                        className={clsx("mb-1", TextPrimary, className)}
                        value={field.value ? field.value : ''}
                        rows={rows}
                        maxLength={maLength}
                        onChange={(event) => {
                            field.onChange(event.target.value);
                        }}
                        error={!!error}
                    />
                    {!!error && <Typography variant='small' color='red' className='text-xs'>{error.message ? error.message : helperText}</Typography>}

                </div>

            )
            }
        />
    )
}

export default RHFTextArea