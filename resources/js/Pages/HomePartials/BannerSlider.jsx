import React from 'react'
import DisplayMovieWithSlide from './DisplayMovieWithSlide'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import SwiperAuto from '@/Components/SwiperAuto'
import { router } from '@inertiajs/react'
import { SwiperSlide } from 'swiper/react'

const getData = async (param) => {
    try {
        const response = await axios.get(param);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
}
export default function BannerSlider() {
    const [datas, setDatas] = useState([]);
    const [img, setImg] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            const [response] = await Promise.all([
                getData(route('get.banner')),
            ]);

            setDatas(response)
            console.log(response);
            const bannerImg = response.map(item => item.banner_img)
            setImg(bannerImg)
        })();
    }, [])


    const isRedirect = async (q) => {
        (async () => {
            const [response] = await Promise.all([
                getData(route('banner.visit', { slug : q })),
            ]);

            response ? router.visit(route('post.show', q)) : window.open(q, '_blank')
        })();
    }
    return (
        <SwiperAuto
            img={img}
            className=''
            onVisit={isRedirect}
        >
            {datas.map((data, index) => (
                <SwiperSlide key={index} virtualIndex={index} >
                    <div
                        className={`bg-contain bg-no-repeat bg-center rounded-sm flex flex-col justify-center sm:px-14 px-3 min-h-[25vh] h-full w-full cursor-pointer`}
                        style={{
                            backgroundImage: `url(/storage/${data.banner_img})`
                        }}
                        onClick={() => isRedirect(data.redirect_to)}
                    >
                    </div>
                </SwiperSlide>
            ))}
        </SwiperAuto>

    )
}
