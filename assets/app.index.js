//document ready
document.addEventListener('DOMContentLoaded', function(event) {

  document.querySelectorAll('[data-slider]').forEach(item => {

    let slider_parent = item.parentNode;

    let slider = new Flickity(item, {
      contain: true,
      draggable: false,
      prevNextButtons: false,
      pageDots: false,
      wrapAround: false,
      pauseAutoPlayOnHover: false
    });

    let totalSlides = slider.cells.length - 1;

    let scrollDir = 0; //idle
    let lastScroll = 9999;
    let scrollIdle = 300; // time interval that we consider a new scroll event
    let sel = slider.selectedIndex;
    slider_parent.onwheel = wheel;

    function wheel(e) {
      let delta = e.deltaY;
      let timeNow = performance.now();
    
      let scrollDown = (delta > 0 && ( scrollDir != 1 || timeNow > lastScroll + scrollIdle) ) ? true : false;
      let scrollUp = (delta < 0 && ( scrollDir != 2 || timeNow > lastScroll + scrollIdle)) ? true : false;

      if ((scrollDown && sel >= totalSlides) || (scrollUp && sel <= 0) ) {
        console.log('no more slides');
        return;
      }

      e.preventDefault();
      if (scrollDown && sel < totalSlides) {
        console.log('scroll down');
        slider.next(true);
        sel = sel + 1;
        scrollDir = 1;
      } else if (scrollUp && sel > 0) {
        console.log('scroll up');
        slider.previous(true);
        sel = sel - 1;
        scrollDir = 2;
      }
      
      lastScroll = timeNow;
    }


  });


  // Detect mobile swiping
  // let pageWidth = window.innerWidth || document.body.clientWidth;
  // let treshold = Math.max(1,Math.floor(0.01 * (pageWidth)));
  // let touchstartX = 0;
  // let touchstartY = 0;
  // let touchendX = 0;
  // let touchendY = 0;

  // const limit = Math.tan(45 * 1.5 / 180 * Math.PI);
  // const gestureZone = hero_element;

  // gestureZone.addEventListener('touchstart', function(event) {
  //   touchstartX = event.changedTouches[0].screenX;
  //   touchstartY = event.changedTouches[0].screenY;
  // }, false);

  // gestureZone.addEventListener('touchend', function(event) {
  //   touchendX = event.changedTouches[0].screenX;
  //   touchendY = event.changedTouches[0].screenY;
  //   handleGesture(event);
  // }, false);

  // function handleGesture(e) {
  //     let x = touchendX - touchstartX;
  //     let y = touchendY - touchstartY;
  //     let xy = Math.abs(x / y);
  //     let yx = Math.abs(y / x);
  //     if (Math.abs(x) > treshold || Math.abs(y) > treshold) {
  //         if (yx <= limit) {
  //             if (x < 0) {
  //                 hero.previous(true);
  //             } else {
  //                 hero.next(true);
  //             }
  //         }
  //         if (xy <= limit) {
  //             if (y < 0) {
  //                 hero.previous(true);
  //             } else {
  //                 hero.next(true);
  //             }
  //         }
  //     }
  // }

});
