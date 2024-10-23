import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

// List of background images
const backgroundImages = [
  '/images/backgrounds/3342.jpg',
  '/images/backgrounds/3342.jpg',
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Handlers for manual navigation
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + backgroundImages.length) % backgroundImages.length);
  };

  return (
    <Box
      id="hero"
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `url(${backgroundImages[currentIndex]})`, // Change based on currentIndex
        transition: 'background-image 0.5s ease-in-out', // Smooth transition
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 60 },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: 'clamp(3rem, 10vw, 3.5rem)',
            color: 'grey',
            textAlign: 'center',
          }}
        >
          Our&nbsp;Unique&nbsp;
          <Typography
            component="span"
            variant="h1"
            sx={{
              fontSize: 'inherit',
              color: 'primary.main',
            }}
          >
            Journey
          </Typography>
        </Typography>
        <Typography
          sx={{
            textAlign: 'center',
            color: 'text.secondary',
            width: { sm: '100%', md: '80%' },
            mt: 2,
          }}
        >
          Embark on an unforgettable spiritual journey, where every step draws you closer to peace
          and divine connection, embracing the sacred traditions of a truly profound pilgrimage.
        </Typography>
      </Container>
      {/* Arrows for manual navigation */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: 20,
          transform: 'translateY(-50%)',
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          color: 'gold',
        }}
        onClick={handlePrev}
      >
        <ArrowBackIosIcon sx={{ fontSize: 40 }} />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          right: 20,
          transform: 'translateY(-50%)',
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          color: 'gold',
        }}
        onClick={handleNext}
      >
        <ArrowForwardIosIcon sx={{ fontSize: 40 }} />
      </Box>
    </Box>
  );
}
