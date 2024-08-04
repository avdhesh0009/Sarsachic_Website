import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper-bundle.css';
import img1 from '../../images/deal1.png';
import img2 from '../../images/deal2.png';
import img3 from '../../images/text.png';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

function Swipe() {
    return (
        <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={100}
            slidesPerView={2}
            navigation
            pagination={{ clickable: true }}


        >

            <SwiperSlide><img src={img1} alt="" /></SwiperSlide>
            <SwiperSlide><img src={img2} alt="" /></SwiperSlide>
            <SwiperSlide><img src={img1} alt="" /></SwiperSlide>
            <SwiperSlide><img src={img2} alt="" /></SwiperSlide>

        </Swiper>
    )
}

export default Swipe;