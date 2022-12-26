import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const AvatarHeader = () => {
  return (
    <Stack direction='row' spacing={2} sx={{ display: 'inline-block!important' }}>
      <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
    </Stack>
  );
};

export default AvatarHeader;
