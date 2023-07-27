import Card from '@/Components/Card'
import useHooks from '@/hooks/useHooks'
import React from 'react'
import { useEffect } from 'react'
import BannerSlider from './HomePartials/BannerSlider'

export default function Recomendation({ isDetail }) {
    const { data, loading, get, err } = useHooks()
    useEffect(() => {
        get(route('recomendation.movies'), {
            onSuccess: () => {
            },
            onError: () => {
                console.log(err);
            }
        })
    }, [])
    return (
        <div className='p-2'>
            <h1 className='text-primaryBtn text-2xl font-semibold py-2'>Recomendations</h1>
            <div className="md:flex md:space-between md:gap-3">
                <div className={`md:w-[65%] grid h-fit ${isDetail ? 'md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:grid-cols-4 grid-cols-3 gap-2 max-[375px]:grid-cols-2' : 'grid-cols-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-4 gap-2 max-[375px]:grid-cols-2'}`}>
                    {
                        data.map((data, index) => (
                            <div key={index}>
                                <Card item={data} />
                            </div>
                        ))
                    }
                </div>
                <div className="flex flex-col items-center md:w-[35%] border border-secondaryAccent rounded-md">
                    <h1 className='text-primaryBtn text-2xl font-semibold py-2 w-full px-4'>Banner</h1>
                    <div className='w-full relative'>
                        <BannerSlider />
                    </div>
                </div>
            </div>
        </div>
    )
}
