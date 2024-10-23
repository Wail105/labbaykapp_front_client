// ImageScroller.js
import React, { useRef } from 'react';
import { Box, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ImageScroller = () => {
  const scrollRef = useRef<HTMLDivElement>(null); // Explicitly set the type to HTMLDivElement

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' }); // No more TypeScript error
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' }); // No more TypeScript error
    }
  };

  return (
    <Box sx={{ position: 'relative', width: '650px', maxHeight: '400px' }}>
      <Button
        onClick={scrollLeft}
        sx={{ position: 'absolute', top: '50%', left: '0', zIndex: 1 }}
      >
        <ArrowBackIosIcon />
      </Button>
      <Button
        onClick={scrollRight}
        sx={{ position: 'absolute', top: '50%', right: '0', zIndex: 1 }}
      >
        <ArrowForwardIosIcon />
      </Button>
      <Box
        ref={scrollRef}
        sx={{
          display: 'flex',
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          width: '650px',
          maxHeight: '400px',
        }}
      >
        <Box
          sx={{
            minWidth: '650px',
            height: '400px',
            backgroundImage: 'url("/images/backgrounds/Haram.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            flexShrink: 0,
          }}
        />
        <Box
          sx={{
            minWidth: '650px',
            height: '400px',
            backgroundImage: 'url("/images/backgrounds/SecondImage.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            flexShrink: 0,
          }}
        />
        <Box
          sx={{
            minWidth: '650px',
            height: '400px',
            backgroundImage: 'url("/images/backgrounds/ThirdImage.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            flexShrink: 0,
          }}
        />
      </Box>
    </Box>
  );
};

export default ImageScroller;
