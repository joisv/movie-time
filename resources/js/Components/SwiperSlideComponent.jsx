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
      spaceBetween: 50
    },
    330: {
      slidesPerView: 3,
      spaceBetween: 40
    },
    400: {
      slidesPerView: 3,
      spaceBetween: 55
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
      spaceBetween: 50
    },
    584: {
      slidesPerView: 4,
      spaceBetween: 10
    },
    622: {
      slidesPerView: 4,
      spaceBetween: 10
    },
    640: {
      slidesPerView: 3,
      spaceBetween: 3
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 10
    },
    1280: {
      slidesPerView: 7,
      spaceBetween: 70
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
