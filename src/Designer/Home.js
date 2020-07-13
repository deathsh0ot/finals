import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

const items = [
  {
    src: 'https://images.pexels.com/photos/6444/pencil-typography-black-design.jpg',
    altText: 'Smart cursus',
    caption: 'Smart Cursus',
    text: "Welcome Designer"
  },
  {
    src: 'https://thereview.ca/wp-content/uploads/2020/03/person-at-computer-web.jpg',
    altText: 'Model interface',
    caption: 'Here you can design the cursus you want, we provide a convenient interface to make your work easier',
    text : 'Check the page of Curriculum Models. An interface that gives you the opportunity to add, edit and delete your design of the cursus'
  },
  {
    src: 'https://admin-ahead.com/wp-content/uploads/2013/03/slide-computer-racks.jpg',
    altText: 'User interface',
    caption: 'Because project holders need access to your design, we implemented a User interface',
    text: 'You are the administrator, you can provide them with the password you want and give them access anytime you want'
  }
];

const Home = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item) => {
    return (
      <CarouselItem
        // onExiting={() => setAnimating(false)}
        // onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} height="400" width="800"/>
        <CarouselCaption  captionHeader={item.caption} captionText={item.text} class="slider-text" />    
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
}

export default Home;