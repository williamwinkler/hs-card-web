import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ThemeSwitch from './ThemeSwitch';
import { useMediaQuery } from '@mui/material';

interface Props {
  theme: string;
  toggleTheme: () => void;
}

const Navbar: React.FC<Props> = ({ theme, toggleTheme }) => {
  const isMobile = useMediaQuery('(max-width: 1000px)'); // Adjust the breakpoint as needed

  return (
    <div className='Navbar'>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position='static'
          sx={{
            backgroundColor: theme === 'light' ? '#3f85b7' : '#242323',
            // Add responsive styles for mobile
            ...(isMobile && {
              paddingLeft: '10px', // Adjust as needed
              paddingRight: '10px', // Adjust as needed
            }),
          }}
        >
          <Toolbar>
            <Typography
              variant={isMobile ? 'h6' : 'h5'}
              component='div'
              sx={{ flexGrow: 1 }}
            >
              Hearthstone Card Viewer
            </Typography>
            <ThemeSwitch theme={theme} toggleTheme={toggleTheme}></ThemeSwitch>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Navbar;
