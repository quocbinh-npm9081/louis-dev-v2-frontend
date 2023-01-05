import React from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Checkbox from '@mui/material/Checkbox';
import { Box } from '@mui/material';
import { useTheme, makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  iconShowHidenPassword: {
    position: 'absolute',
    zIndex: 10,
    top: '50%',
    transform: 'translateY(-50%)',
    right: 0,
  },
});

const CheckBoxIconShowHiden: React.FC<{ checked: boolean; setChecked: (checked: boolean) => void }> = ({ checked, setChecked }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <Box className={classes.iconShowHidenPassword}>
      <Checkbox checked={checked} onChange={onHandleChange} icon={<VisibilityIcon />} checkedIcon={<VisibilityOffIcon />} />
    </Box>
  );
};

export default CheckBoxIconShowHiden;
