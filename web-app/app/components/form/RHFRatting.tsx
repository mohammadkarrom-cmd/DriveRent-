"use client";

import { TextPrimary } from '@/lib/ui/class/classNames';
import { Rating, Typography } from '@/lib/ui/MTFix';
import clsx from 'clsx';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
  className?: string;
  name: string;
  label: string;
  helperText?: string;
  // Remove type if it's too broad or potentially unsafe
  ratingProps?: {
    count?: number;
    ratedIcon?: React.ReactNode;
    unratedIcon?: React.ReactNode;
    className?: string;
  };
};

const RHFRatting = ({
  name,
  label,
  className,
  helperText,
  ratingProps,
}: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={clsx(className)}>
          <Typography variant="small" className={clsx(TextPrimary)}>
            {label}
          </Typography>
          <Rating
            value={parseInt(Number(field.value).toString()) || 0}
            onChange={(value) => field.onChange(value)}
            count={ratingProps?.count}
            ratedIcon={ratingProps?.ratedIcon}
            unratedIcon={ratingProps?.unratedIcon}
            className={ratingProps?.className}
          />
          {!!error && (
            <Typography variant="small" color="red" className="text-xs">
              {error.message || helperText}
            </Typography>
          )}
        </div>
      )}
    />
  );
};

export default RHFRatting;
