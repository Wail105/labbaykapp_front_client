import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const HeroSection = () => {
  useEffect(() => {
    AOS.init({ duration: 600, easing: 'ease-in-out', once: true, mirror: false });
  }, []);

  return (
    <section id="hero" className="hero section dark-background">
      <img src="/assets/img/hero-bg.jpg" alt="Hero background" data-aos="fade-in" />
      <div className="container">
        <div className="row justify-content-center text-center" data-aos="fade-up" data-aos-delay="100">
          <div className="col-xl-6 col-lg-8">
            <h2>Powerful Digital Solutions With GP<span>.</span></h2>
            <p>We are team of talented digital marketers</p>
          </div>
        </div>
        <div className="row gy-4 mt-5 justify-content-center" data-aos="fade-up" data-aos-delay="200">
          <div className="col-xl-2 col-md-4" data-aos="fade-up" data-aos-delay="300">
            <div className="icon-box">
              <i className="bi bi-binoculars"></i>
              <h3><a href="">Lorem Ipsum</a></h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
