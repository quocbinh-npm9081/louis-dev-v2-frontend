import React from 'react';
import { useForm, FormProvider as Form } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface IFormProvider {
  mode?: 'onBlur' | 'onChange' | 'onSubmit' | 'onTouched';
  defaultValues: any;
  children: React.ReactNode;
  className?: string;
  validation?: any;
}

const FromProvider: React.FC<IFormProvider> = ({ mode, defaultValues, validation, children, className }) => {
  const menthods = useForm({
    mode: mode,
    resolver: yupResolver(validation),
    defaultValues: defaultValues,
  });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = menthods;

  const onsubmit = (data: any) => {
    if (isSubmitSuccessful) reset(defaultValues);
    console.log('data', data);
  };

  return (
    <Form {...menthods}>
      <form onSubmit={handleSubmit(onsubmit)} className={className}>
        {children}
      </form>
    </Form>
  );
};

export default FromProvider;
