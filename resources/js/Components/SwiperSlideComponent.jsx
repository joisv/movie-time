import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/virtual';
import Card from './Card';
const breakpoints = {
    240: {
      slidesPerView: 2,
      spaceBetween: 80,
    },
    300: {
      slidesPerView: 3,
      spaceBetween: 120
    },
    330: {
      slidesPerView: 3,
      spaceBetween: 90
    },
    400: {
      slidesPerView: 3,
      spaceBetween: 75
    },
    480: {
      slidesPerView: 4,
      spaceBetween: 100
    },
    620: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    738: {
      slidesPerView: 4,
      spaceBetween: 100
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 20
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 10
    },
    1280: {
      slidesPerView: 6,
      spaceBetween: 10
    },
  };


export default function SwiperSlideComponent({ datas }) {
    return (
        <Swiper
            navigation={true}
            breakpoints={breakpoints}
        >
            {datas.map((item, index) => (
                <SwiperSlide key={index}>
                    <Card item={item} />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
