import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../components/LandingContent.css';

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";



import pro1 from "../assets/one.jpg";
import pro2 from "../assets/two.jpg";
import pro3 from "../assets/three.jpg";
import pro4 from "../assets/four.jpg";
import pro5 from "../assets/five.jpg";


const LandingContent = () => {
    return(

    <div className="html">
    <div className="container">
      <h1 className="heading">Popular Products</h1>
      <Swiper
        effect={'coverflow'}
        grabCursor= {true}
        centeredSlides= {true}
        loop= {true}
        slidesPerView={'auto'}
        coverflowEffect={
            {
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            } }
            pagination ={{el: '.swiper-pagination', clickable:true}}
            navigation ={{
                nextEl:'.swiper-button-next',
                prevEl:'.swiper-button-prev',
                clickable: true,

            }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="swiper_container"
      >
        <SwiperSlide>
            <img src={pro1} alt="pro"/>
        </SwiperSlide>
        <SwiperSlide>
            <img src={pro2} alt="pro"/>
        </SwiperSlide>
        <SwiperSlide>
            <img src={pro3} alt="pro"/>
        </SwiperSlide>
        <SwiperSlide>
            <img src={pro4} alt="pro"/>
        </SwiperSlide>
        <SwiperSlide>
            <img src={pro5} alt="pro"/>
        </SwiperSlide>

            <div className="slider-controller">
                <div className="swiper-button-prev slider-arrow">
                    <ion-icon name="arrow-back-outline"></ion-icon>
                </div>
                <div className="swiper-button-next slider-arrow">
                    <ion-icon name="arrow-forward-outline"></ion-icon>
                </div>
                <div className="swiper-pagination"></div>
            </div>

    </Swiper> 
    </div>
    </div>
    )

};

export default LandingContent;