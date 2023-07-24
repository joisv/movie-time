import 'swiper/css';
import 'swiper/css/virtual';
import  { Autoplay, Virtual, } from 'swiper';
import { SwiperSlide, Swiper } from 'swiper/react';

export default function SwiperAuto({ children }) {
    return (
        <Swiper
            modules={[Virtual, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            centeredSlides={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            loop={true}
            virtual
        >
           {children}
        </Swiper>
    )
}
