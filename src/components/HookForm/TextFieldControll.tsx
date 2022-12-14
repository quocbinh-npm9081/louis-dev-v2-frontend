import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import CheckBoxIconShowHiden from '../CheckBoxIconShowHiden';
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
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <>
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
            type={checked ? type : 'text'}
          />
        )}
      />
      {name === 'password' && <CheckBoxIconShowHiden checked={checked} setChecked={setChecked} />}
    </>
  );
};

export default TextFieldControll;
