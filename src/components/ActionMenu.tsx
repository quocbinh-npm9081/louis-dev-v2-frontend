import React, { useState } from 'react';
import AvatarHeader from './AvatarHeader';
import { Menu, MenuItem, IconButton, Box, Theme } from '@mui/material';
import { Logout } from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';
import LinkRoute from './LinkRoute';
import { makeStyles, useTheme } from '@mui/styles';
const useStyles = makeStyles((theme: Theme) => ({
  menuItemLink: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: theme.palette.common.black,
  },
}));
const ActionMenu = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: ' center', alignItems: 'center' }}>
        <IconButton
          onClick={handleClick}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
        >
          <AvatarHeader />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            backgroundColor: '#ffff',
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
              backgroundColor: '#ffff',
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              backgroundColor: '#ffff',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <LinkRoute to='/' className={classes.menuItemLink}>
            <PersonIcon /> Thông tin tài khoản
          </LinkRoute>
        </MenuItem>

        <MenuItem>
          <LinkRoute to='/logout' className={classes.menuItemLink}>
            <Logout /> Đăng xuất
          </LinkRoute>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ActionMenu;
