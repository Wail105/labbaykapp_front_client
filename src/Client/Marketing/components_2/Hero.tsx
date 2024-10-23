import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { visuallyHidden } from '@mui/utils';
import { styled } from '@mui/material/styles';
import ImageScroller from './imageScroller';
const StyledBox = styled('div')(({ theme }) => ({
  alignSelf: 'center',
  width: '100%',
  height: 400,
  marginTop: theme.spacing(8),
  borderRadius: theme.shape.borderRadius,
  outline: '6px solid',
  outlineColor: 'hsla(220, 25%, 80%, 0.2)',
  border: '1px solid',
  borderColor: theme.palette.grey[200],
  boxShadow: '0 0 12px 8px hsla(220, 25%, 80%, 0.2)',
  backgroundImage: `url(${'/static/screenshots/material-ui/getting-started/templates/dashboard.jpg'})`,
  backgroundSize: 'cover',
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(10),
    height: 700,
  },
  ...theme.applyStyles('dark', {
    boxShadow: '0 0 24px 12px hsla(210, 100%, 25%, 0.2)',
    backgroundImage: `url(${'/static/screenshots/material-ui/getting-started/templates/dashboard-dark.jpg'})`,
    outlineColor: 'hsla(220, 20%, 42%, 0.1)',
    borderColor: theme.palette.grey[700],
  }),
}));

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundImage:
          'radial-gradient(ellipse 80% 50% at 50% -15%, hsl(44, 100%, 60%), transparent)',
        ...theme.applyStyles('dark', {
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% -15%, hsl(45, 60%, 30%), transparent)',        
        }),
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ alignItems: 'center', width: { xs: '100%', sm: '70%' } }}
        >
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              fontSize: 'clamp(3rem, 10vw, 3.5rem)',
            }}
          >
            Our&nbsp;Unique&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={(theme) => ({
                fontSize: 'inherit',
                color: 'primary.light',
                ...theme.applyStyles('dark', {
                  color: 'primary.main',
                }),
              })}
            >
              Journey
            </Typography>
          </Typography>
          <Typography
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              width: { sm: '100%', md: '80%' },
            }}
          >
             Embark on an unforgettable spiritual journey, where every step draws you closer to peace
             and divine connection, embracing the sacred traditions of a truly profound pilgrimage.
          </Typography>
      <Box
  sx={{
    display: { xs: 'none', md: 'flex' },
    gap: 1,
    alignItems: 'center',
    padding: '0px 50px 0px 0px',
  }}
>
  <Button
    color="primary"
    variant="contained"
    size="small"
    sx={{
      boxShadow: '0px 4px 10px 0px rgba(128, 128, 128, 0.5)', // Gradient-like gray shadow
      background: 'linear-gradient(45deg, #f0f0f0, #d3d3d3)', // Gradient gray background
      border:'0px',
    }}
  >
    <div style={{ fontWeight: 'bold' }}>Reserve Now</div>
  </Button>
  <Button
    color="primary"
    variant="contained"
    size="small"
    sx={{ boxShadow: 'none' }}
  >
    <div style={{ fontWeight: 'bold' }}>Explore our Offers</div>
  </Button>
</Box> 
        </Stack>
        <Box>
          <ImageScroller/>
</Box>
          
      </Container>
    </Box>
  );
}
