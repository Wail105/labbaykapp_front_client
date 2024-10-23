import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { withTheme } from '@emotion/react';

const hiltonLogo = '/images/backgrounds/Hilton.png';
const airwaysLogo = '/images/backgrounds/Airways.png';
const saudiaLogo = '/images/backgrounds/Saudia.png'; // Replace with your actual logo path
const royalLogo= '/images/backgrounds/Royal.png'; 
// Create an array with three logos
const logos = [
  royalLogo,
  hiltonLogo,
  airwaysLogo,
  saudiaLogo,

];

const logoStyle = {
  width: '100px',
  height: '80px',
  margin: '0 16px',
  opacity: 0.7,
};

export default function LogoCollection() {
  return (
    <Box id="logoCollection" sx={{ margin:2, py: 4, display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
      <Typography
        component="p"
        variant="subtitle2"
        align="center"
        sx={{ color: 'text.secondary', width: '100%' 
          
        }} // Ensure it takes full width
      >
        Trusted by the best companies
      </Typography>
      {logos.map((logo, index) => (
        <Box key={index} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img
            src={logo} // Use logo variable for src
            alt={`Company logo ${index + 1}`}
            style={logoStyle}
          />
        </Box>
      ))}
    </Box>
  );
}
