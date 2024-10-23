import React from 'react';

import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import Portfolio from './components/Portfolio';
import ScrollTopButton from './components/ScrollTopButton';

const Home = () => {

  // useEffect(() => {
  //   const audio = new Audio(encodeURI('/audio/Labbaik.mp3'));

    // Try to play the audio on load
  //   audio.play().catch(error => {
  //     console.error("Autoplay failed. User interaction needed:", error);

  //     // If autoplay fails, wait for a click to play the audio
  //     const playAfterInteraction = () => {
  //       audio.play();
  //       document.removeEventListener('click', playAfterInteraction); // Remove listener once clicked
  //     };

  //     // Add event listener to play on next user interaction
  //     document.addEventListener('click', playAfterInteraction);
  //   });a
  // }, []);

  return (
    <>
        <HeroSection />
        <AboutSection />
        <Portfolio />
        <ScrollTopButton />
        
    </>
  );
};

export default Home;
