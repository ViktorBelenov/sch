!(function($) {
    "use strict";

    const swiper = new Swiper('.js-advertising-slider', {
        loop: true,
        spaceBetween: 0,
        grabCursor: true,
        slidesPerView: 1,
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
        },    
        speed: 1500,    
        pagination: {
            el: '.js-advertising-slider .swiper-pagination',
        },           

    });  

})(jQuery);
