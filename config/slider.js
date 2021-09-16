export const articlesCarousel = {
  type: 'slider',
  // 'slider': not dynamically generate slides(no infinite loop)
  // 'carousel': dynamically create slides e.g when we reach at last slide we see first slide
  // next to it(changes slides without starting over)
  rewind: true,
  // only for type="slider" , slider will rewind to the first/last slide when it's
  // at the start/end.
  rewindDuration: 800, // rewinding animation duration in ms
  startAt: 0, // start index
  perView: 4, // number of slides visible on the single viewport
  focusAt: 0, // position of active slide related to viewport , 'center',0,1,2,...
  gap: 10, // size of the gap added between slides
  autoplay: false, // number of ms , false to stop autoplay
  hoverpause: true, // stop autoplay on hover
  keyboard: false, // allow for changing slides with left/right keyboard arrows
  swipeThreshold: 80, // only for mobile,min swipe distance to change slide,false for turn off
  dragThreshold: 150, // only for desktop,min drag distance to change slide,false for turn off
  perTouch: false, // max number of slides change when swipe/drag , false for  unlimited
  animationDuration: 400, // in ms
  animationTimingFunc: 'ease', // string ... 'linear','ease','ease-in','ease-out','ease-in-out',
  // 'cubic-bezier(0.165,0.840,0.440,1.000)' (default)
  direction: 'rtl', // 'ltr' , 'rtl'
  peek: 0, // distance value of the next/previous viewports which have to peek in the current view , 50px from left and 50px from right
  // peek and focusAt will affect each other , if we use focusAt: 'center' set peek:0
  breakpoints: {
    1100: { perView: 3, focusAt: 0 },
    800: { perView: 2 },
    500: { perView: 1.5 },
  },
  bound: true, // remove empty space for slider
};
