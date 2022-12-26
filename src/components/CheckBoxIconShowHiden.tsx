import React from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Checkbox from '@mui/material/Checkbox';
import { Box } from '@mui/material';
const CheckBoxIconShowHiden: React.FC<{ className: string; checked: boolean; setChecked: (checked: boolean) => void }> = ({
  className,
  checked,
  setChecked,
}) => {
  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  return (
    <Box className={className}>
      <Checkbox checked={checked} onChange={onHandleChange} icon={<VisibilityIcon />} checkedIcon={<VisibilityOffIcon />} />
    </Box>
  );
};

export default CheckBoxIconShowHiden;
