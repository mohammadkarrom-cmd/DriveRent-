"use client"

import { TextPrimary } from '@/lib/ui/class/classNames'
import { color } from '@material-tailwind/react/types/components/input'
import clsx from 'clsx'
import React, { HTMLInputTypeAttribute, ReactNode, useEffect, useRef } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Input, Typography } from '@/lib/ui/MTFix'


type Props = {
    className?: string
    name: string
    label: string
    helperText: string
    type: HTMLInputTypeAttribute,
    color: color,
    icon?: ReactNode,
}

const RHFInput = ({ helperText, name, type, className, icon, color, label }: Props) => {
    const { control, formState: { errors } } = useFormContext();

    const inputRef = useRef(null);

    useEffect(() => {
        if (errors[name]) {
            inputRef.current.focus();
        }
    }, [errors, name]);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <div>
                    <Input
                        // dir='ltr'
                        labelProps={{
                            dir: "ltr",
                        }}
                        inputRef={inputRef}
                        label={label}
                        type={type}
                        crossOrigin={undefined}
                        color={color}
                        className={clsx("mb-1", TextPrimary, className)}
                        icon={icon}
                        value={type === "number" && field.value === 0 ? "" : field.value ? field.value : ''}
                        onChange={(event) => {
                            if (type === "number") {
                                field.onChange(Number(event.target.value));
                            } else {
                                field.onChange(event.target.value);
                            }
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

export default RHFInput