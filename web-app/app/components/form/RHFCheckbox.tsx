"use client"; // Ensure this runs on the client side

import { Controller, useFormContext } from 'react-hook-form';
import clsx from 'clsx';
import { Checkbox, Typography } from '@/lib/ui/MTFix';
import { color } from '@material-tailwind/react/types/components/checkbox';
import { labelProps } from '@material-tailwind/react/types/components/input';

type Props = {
  className?: string;
  name: string;
  label: string;
  helperText?: string;
  color: color; // Adjust if `color` is a specific type
  labelProps?: labelProps
};

const RHFCheckbox = ({ helperText, name, className, label, color, labelProps }: Props) => {
  const { control } = useFormContext();


  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={clsx(className)}>
          <Checkbox
            {...field}
            crossOrigin={undefined}
            color={color}
            label={label}
            checked={field.value}
            onChange={(e) => field.onChange(e.target.checked)}
            labelProps={labelProps}
          />
          {!!error && <Typography variant='small' color='red' className='text-xs'>{error.message ? error.message : helperText}</Typography>}
        </div>
      )}
    />
  );
};

export default RHFCheckbox;
