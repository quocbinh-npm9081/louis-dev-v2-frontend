import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';
interface ITextFieldControl {
  name: string;
  defaultValue?: string;
  label?: string;
  className?: string;
  type?: string;
  autoComplete?: string;
}
const TextFieldControll: React.FC<ITextFieldControl> = ({
  className,
  name,
  label,
  defaultValue = '',
  type = 'text',
  autoComplete = '',
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <TextField
          fullWidth
          className={className}
          label={label}
          {...field}
          error={!!errors[name]}
          helperText={errors[name] ? String(errors[name]?.message) : ''}
          margin='dense'
          autoComplete={autoComplete}
          type={type}
        />
      )}
    />
  );
};

export default TextFieldControll;
