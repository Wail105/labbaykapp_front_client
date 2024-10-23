import React, { useRef, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { styled } from '@mui/material/styles';

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
  backgroundSize: 'cover',
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(10),
    height: 700,
  },
  ...theme.applyStyles('dark', {
    boxShadow: '0 0 24px 12px hsla(210, 100%, 25%, 0.2)',
    outlineColor: 'hsla(220, 20%, 42%, 0.1)',
    borderColor: theme.palette.grey[700],
  }),
}));

const ImageScroller = () => {
  const scrollRef = useRef(null);
  const imageWidth = 650; // Width of each image

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -imageWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: imageWidth, behavior: 'smooth' });
    }
  };

  // This effect handles the automatic scrolling
  useEffect(() => {
    const interval = setInterval(() => {
      scrollRight();
    }, 3000); // Scroll every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Handle infinite scroll effect
  const resetScrollPosition = () => {
    if (scrollRef.current) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const totalImages = 6; // Adjust based on the number of images (original + duplicates)

      if (scrollPosition >= imageWidth * totalImages) {
        scrollRef.current.scrollLeft = imageWidth; // Reset to the first original image
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      resetScrollPosition();
    };

    if (scrollRef.current) {
      scrollRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <Box sx={{ position: 'relative', width: '650px', maxHeight: '400px', overflow: 'hidden' }}>
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
      
    </Box>
  );
};

export default ImageScroller;
