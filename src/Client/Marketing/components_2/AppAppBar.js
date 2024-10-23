import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Sitemark from './SitemarkIcon';
import ToggleColorMode from './ToggleColorMode';
import PropTypes from 'prop-types';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.background.default, 0.4),
  boxShadow: theme.shadows[1],
  padding: '8px 12px',
}));

export default function AppAppBar({
  showCustomTheme,
  toggleCustomTheme,
  mode,
  toggleColorMode,
  children,
}) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed" // Change to fixed
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        bottom: 0, // Position it at the bottom
        left: 0,
        right: 0,
        top: 20,
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0, padding: '0px 0px 0px 50px' }}>
            <Sitemark />
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              <Button variant="text" color="info" size="small" sx={{ margin: '0px 0px 0px 100px', boxShadow: 'none' }}>
                <div style={{ fontWeight: 'bold' }}>Home</div>
              </Button>
              <Button variant="text" color="info" size="small" sx={{ margin: '0px 0px 0px 100px', boxShadow: 'none' }}>
                <div style={{ fontWeight: 'bold' }}>Hajj</div>
              </Button>
              <Button variant="text" color="info" size="small" sx={{ margin: '0px 0px 0px 100px', boxShadow: 'none' }}>
                <div style={{ fontWeight: 'bold' }}>Umrah</div>
              </Button>
              <Button variant="text" color="info" size="small" sx={{ margin: '0px 0px 0px 100px', boxShadow: 'none' }}>
                <div style={{ fontWeight: 'bold' }}>Blog</div>
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
              padding: '0px 50px 0px 0px',
            }}
          >
            <Button color="primary" variant="text" size="small" sx={{ boxShadow: 'none' }}>
              <div style={{ fontWeight: 'bold' }}>Sign in</div>
            </Button>
            <Button color="primary" variant="contained" size="small" sx={{ boxShadow: 'none' }}>
              <div style={{ fontWeight: 'bold' }}>Sign up</div>
            </Button>
          </Box>
          <Box sx={{ marginLeft: 'auto' }}>
            <ToggleColorMode
              data-screenshot="toggle-mode"
              mode={mode}
              toggleColorMode={toggleColorMode}
            />
          </Box>
          <Box sx={{ display: { sm: 'flex', md: 'none' } }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <Divider sx={{ my: 3 }} />
                <MenuItem>Features</MenuItem>
                <MenuItem>Testimonials</MenuItem>
                <MenuItem>Highlights</MenuItem>
                <MenuItem>Pricing</MenuItem>
                <MenuItem>FAQ</MenuItem>
                <MenuItem>Blog</MenuItem>
                <MenuItem>
                  <Button color="primary" variant="contained" fullWidth>
                    Sign up
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button color="primary" variant="outlined" fullWidth>
                    Sign in
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}

// Define PropTypes outside of the component
AppAppBar.propTypes = {
  children: PropTypes.node,
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  showCustomTheme: PropTypes.bool.isRequired,
  toggleColorMode: PropTypes.func.isRequired,
  toggleCustomTheme: PropTypes.func.isRequired,
};
