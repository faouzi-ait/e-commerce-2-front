import React from 'react';
import Slider from 'react-slick';

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
    { src: './images/caroussel-1.jpg' },
    { src: './images/caroussel-2.jpg' },
    { src: './images/caroussel-4.jpg' },
  ];

  return (
    <Slider {...settings}>
      <video autoPlay loop muted allow="autoplay" width="100%" height="100%">
        {/* <source src="./images/advert.mp4" type="video/mp4" /> */}
        <source src="./images/advert.webm" type="video/webm" />
      </video>
      {carouselSource.map((item, i) => (
        <div className="sliderImg" key={i}>
          <img src={item.src} alt="carousel" />
        </div>
      ))}
    </Slider>
  );
}

export default Carousel;
