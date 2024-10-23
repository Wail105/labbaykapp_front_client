import * as React from 'react';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import ToggleColorMode from './components_2/ToggleColorMode';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import getMPTheme from '../../theme/getMPTheme';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'relative', // You can keep this or change it to 'sticky' if you want it to stick to the top
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderBottom: '1px solid',
  borderColor: theme.palette.divider,
  boxShadow: 'none',
  backgroundImage: 'none',
  zIndex: theme.zIndex.drawer + 1,
  flex: '0 0 auto',
}));

function TemplateFrame({
  showCustomTheme,
  toggleCustomTheme,
  mode,
  toggleColorMode,
  children,
}) {
  const MPTheme = createTheme(getMPTheme(mode));

  return (
    <ThemeProvider theme={MPTheme}>
      
        <StyledAppBar sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Box sx={{ marginLeft: 'auto' }}>
            <ToggleColorMode
              data-screenshot="toggle-mode"
              mode={mode}
              toggleColorMode={toggleColorMode}
            />
          </Box>
        </StyledAppBar>
        <Box
          sx={{
            flex: '1 1 auto', // Allow this box to fill available space
            overflow: 'auto',
          }}
        >
          {children}
        </Box>
    </ThemeProvider>
  );
}

TemplateFrame.propTypes = {
  children: PropTypes.node,
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  showCustomTheme: PropTypes.bool.isRequired,
  toggleColorMode: PropTypes.func.isRequired,
  toggleCustomTheme: PropTypes.func.isRequired,
};

export default TemplateFrame;
