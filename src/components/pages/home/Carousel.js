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

  const carouselSource = [
    { src: './images/caroussel-2.jpg' },
    { src: './images/caroussel-3.jpg' },
    { src: './images/caroussel-4.jpg' },
  ];

  return (
    <Slider {...settings}>
      <video autoPlay loop muted allow="autoplay" width="100%" height="100%">
        <source src="./images/advert.mp4" type="video/mp4" />
      </video>
      {carouselSource.map((item) => (
        <div className="sliderImg">
          <img src={item.src} alt="carousel" />
        </div>
      ))}
    </Slider>
  );
}

export default Carousel;
