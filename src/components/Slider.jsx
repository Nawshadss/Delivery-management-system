import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SLiderOne from "../assets/pexels-julius-silver-240301-753331.jpg";
import SLidertwo from "../assets/pexels-pixabay-262353.jpg";
import SLiderThree from "../assets/pexels-tima-miroshnichenko-6170396.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function App() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img className="max-h-[400px] w-full" src={SLiderOne} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="max-h-[400px] w-full" src={SLidertwo} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="max-h-[400px] w-full" src={SLiderThree} alt="" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
