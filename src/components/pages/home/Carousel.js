import React from 'react';
import Slider from 'react-slick';
import {} from './styles.module.scss';

function Carousel() {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    swipeToSlide: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    style: { zIndex: 999 },
  };

  return (
    <Slider {...settings}>
      <div>
        <video autoPlay loop muted allow="autoplay" width="100%" height="100%">
          <source src="./images/advert.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="sliderImg">
        <img src="./images/caroussel-2.jpg" alt="carousel" />
      </div>
      <div className="sliderImg">
        <img src="./images/caroussel-4.jpg" alt="carousel" />
      </div>
      <div className="sliderImg">
        <img src="./images/caroussel-5.jpg" alt="carousel" />
      </div>
    </Slider>
  );
}

export default Carousel;
