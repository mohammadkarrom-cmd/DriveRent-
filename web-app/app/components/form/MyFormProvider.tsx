import React, { LegacyRef, ReactNode } from 'react';
import { FormProvider, UseFormReturn, SubmitHandler } from 'react-hook-form';

interface MyFormProviderProps<T> {
  children: ReactNode;
  onSubmit: SubmitHandler<T>;
  methods: UseFormReturn<T>;
  className?: string,
  ref?: LegacyRef<HTMLFormElement>
}

const MyFormProvider = <T,>({ children, onSubmit, methods, className,ref }: MyFormProviderProps<T>) => {
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={className}
        ref={ref}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default MyFormProvider;
