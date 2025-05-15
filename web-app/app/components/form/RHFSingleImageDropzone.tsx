"use client"; // Ensure this runs on the client side

import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFormContext, Controller } from 'react-hook-form';
import { IconButton, Typography } from '@/lib/ui/MTFix';
import clsx from 'clsx';
import Image from 'next/image';
import { Backgrounds, BorderSecondary, CardBackgrounds, TextSecondary } from '@/lib/ui/class/classNames';

interface RHFSingleImageDropzoneProps {
  name: string;
  label: string;
  className?: string;
  helperText?: string;
}

const RHFSingleImageDropzone: React.FC<RHFSingleImageDropzoneProps> = ({ name, label, className, helperText }) => {
  const { control } = useFormContext();
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setPreview(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false, // Restrict to single file upload
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif'],
    }
  });

  useEffect(() => {
    return () => {
      // Revoke the data uris to avoid memory leaks
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);


  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <div className={clsx("p-4 rounded-md", isDragActive ? CardBackgrounds : Backgrounds, TextSecondary)}>
            <label>{label}</label>
            <figure
              className='relative'
            >
              {
                !!field.value &&
                <IconButton
                  size='sm'
                  variant='filled'
                  color='red'
                  className='!absolute top-0 left-0 rounded-full m-1 text-xs size-fit'
                  onClick={() => {
                    field.onChange(null);
                    setPreview(null);
                  }}
                >
                  X
                </IconButton>
              }
              {
                preview || (field.value && typeof field.value === "string")
                  ? < Image width={500} height={500} src={preview ? preview : field.value} alt="Preview" className={className} />
                  : <div {...getRootProps()} className={clsx("border-dashed border-[1.5px] p-2 text-xs mt-2 rounded-md cursor-pointer", BorderSecondary, className)}>
                    <input {...getInputProps()} onChange={(e) => {
                      field.onChange(e.target.files?.[0]);
                      onDrop(e.target.files ? Array.from(e.target.files) : []);
                    }} />
                    {
                      isDragActive ?
                        <Typography variant="small" className='text-inherit text-xs'>Drop the image here...</Typography> :
                        <Typography variant="small" className='text-inherit text-xs'>Drag & drop an image here, or click to select an image</Typography>
                    }
                  </div>
              }
            </figure>
            {!!error && <Typography variant="small" color="red" className="text-xs mt-2">{error?.message || helperText}</Typography>}
          </div>
        )
      }}
    />
  );
};

export default RHFSingleImageDropzone;
