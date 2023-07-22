import SwiperSlideComponent from "@/Components/SwiperSlideComponent";

export default function DisplayMovieWithSlide({ datas = [], title }) {
    return (
        <div className=''>
            <h1 className='text-primaryBtn text-2xl font-semibold py-2'>{ title }</h1>
           <SwiperSlideComponent datas={datas}/>
        </div>
    )
}
