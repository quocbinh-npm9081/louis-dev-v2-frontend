import React from 'react';
import { useForm, FormProvider as Form } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface IFormProvider {
  mode?: 'onBlur' | 'onChange' | 'onSubmit' | 'onTouched' | undefined;
  defaultValues: { [x: string]: string | number | any };
  children: React.ReactNode;
  className?: string;
  validationShema?: any;
  onSubmit: (data: any) => void;
  reset?: boolean;
}

const FromProvider: React.FC<IFormProvider> = ({ mode, defaultValues, validationShema, children, className, onSubmit }) => {
  const menthods = useForm({
    mode: mode,
    resolver: yupResolver(validationShema),
    defaultValues: defaultValues,
    reValidateMode: 'onChange',
  });
  const {
    handleSubmit,
    reset,
    getValues,
    formState: { isSubmitSuccessful },
  } = menthods;

  const onsubmit = handleSubmit(async values => {
    const formValues = getValues();
    try {
      onSubmit && onSubmit(values);
      if (reset && isSubmitSuccessful) reset(defaultValues);
    } catch (error) {
      reset(formValues);
    }
  });

  return (
    <Form {...menthods}>
      <form onSubmit={onsubmit} className={className}>
        {children}
      </form>
    </Form>
  );
};

export default FromProvider;
