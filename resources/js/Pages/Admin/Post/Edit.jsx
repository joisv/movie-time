import GenerateButton from '@/Components/GenerateButton';
import InputComponent from '@/Components/InputComponent';
import { Head, router, useForm } from '@inertiajs/react';
import { BiArrowBack } from 'react-icons/bi'

const title = {
    className: 'sm:text-3xl font-semibold text-xl ',
    translate: '    -translate-y-5'
}
const defInput = {
    className: 'text-base sm:font-medium font-extralight',
    translate: '-translate-y-5'
}
export default function Edit({ auth, postdata, genres }) {

    const { data, setData, errors, put, processing } = useForm({
        title: postdata.title,
        release_date: postdata.release_date,
        original_language: postdata.original_language,
        original_title: postdata.original_title,
        popularity: postdata.popularity,
        revenue: postdata.revenue,
        runtime: postdata.runtime,
        status: postdata.status,
        tagline: postdata.tagline,
        tmdb_id: postdata.tmdb_id,
        vote_average: postdata.vote_average,
        vote_count: postdata.vote_count,
        genres: postdata.genres.map(genre => genre.id),
        overview: postdata.overview
    })

    function submit(e) {
        e.preventDefault()
        put(route('post.update', postdata.id))
    }
    console.log(data.genres);
  return (
    <div className='bg-white' >
        <Head title="Dashboard" />
        <div className="py-12">
            <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
              <button type='button' onClick={() => router.visit(route('post'))}>
               <BiArrowBack size={30} color='#000000' />
              </button>
                <div className="border-gray-300 border-y  p-4">
                      <form onSubmit={submit}>
                      <InputComponent
                         value={data.title}
                         onChange={(e) => setData('title', e.target.value)}
                         def='title'
                         className={title}
                         placeholder='title'
                       />
                       <div className='mt-4'>
                       <InputComponent
                         value={data.release_date}
                         onChange={(e) => setData('release_date', e.target.value)}
                         def='2/6/2002'
                         className={defInput}
                         placeholder='release date'
                       />
                       </div>
                       <div className='mt-4'>
                       <InputComponent
                         value={data.original_language}
                         onChange={(e) => setData('original_language', e.target.value)}
                         def='in'
                         className={defInput}
                         placeholder='original language'
                         />
                        </div>
                       <div className='mt-4'>
                       <InputComponent
                         value={data.original_title}
                         onChange={(e) => setData('original_title', e.target.value)}
                         def='joisdev@'
                         className={defInput}
                         placeholder='original title'
                         />
                        </div>
                       <div className='mt-4'>
                        <InputComponent
                         value={data.popularity}
                         onChange={(e) => setData('popularity', e.target.value)}
                         def='2002'
                         className={defInput}
                         placeholder='popularity'
                         />
                        </div>
                       <div className='mt-4'>
                        <InputComponent
                         value={data.revenue}
                         onChange={(e) => setData('revenue', e.target.value)}
                         def='rp0'
                         className={defInput}
                         placeholder='revenue'
                         />
                        </div>
                       <div className='mt-4'>
                        <InputComponent
                         value={data.runtime}
                         onChange={(e) => setData('runtime', e.target.value)}
                         def='0 min'
                         className={defInput}
                         placeholder='runtime'
                         />
                        </div>
                       <div className='mt-4'>
                        <InputComponent
                         value={data.status}
                         onChange={(e) => setData('status', e.target.value)}
                         def='release'
                         className={defInput}
                         placeholder='status'
                         />
                        </div>
                       <div className='mt-4'>
                        <InputComponent
                         value={data.tmdb_id}
                         onChange={(e) => setData('tmdb_id', e.target.value)}
                         def='02062002'
                         className={defInput}
                         placeholder='tmdb_id'
                         />
                        </div>
                       <div className='mt-4'>
                        <InputComponent
                         value={data.vote_average}
                         onChange={(e) => setData('vote_average', e.target.value)}
                         def='200206'
                         className={defInput}
                         placeholder='vote_average'
                         />
                        </div>
                       <div className='mt-4'>
                        <InputComponent
                         value={data.vote_count}
                         onChange={(e) => setData('vote_count', e.target.value)}
                         def='200202'
                         className={defInput}
                         placeholder='vote_count'
                         />
                        </div>
                       <div className='mt-4'>
                        <InputComponent
                         value={data.popularity}
                         onChange={(e) => setData('popularity', e.target.value)}
                         def='2002026'
                         className={defInput}
                         placeholder='popularity'
                         />
                        </div>
                       <div className=' mt-4 w-full h-32 overflow-auto mb-4 border-2 border-gray-200 rounded-md p-2 flex flex-wrap space-x-2'>
                        {
                          genres.map((genre, index) => (
                            <div className="p-1 w-fit h-fit relative border-2 border-gray-400 rounded-md " key={index}>
                                    <input 
                                      type="checkbox" 
                                      className="opacity-50 absolute" 
                                      id={`genre${index}`} 
                                      value={genre.id}
                                      onChange={(e) => {
                                        const isChecked = e.target.checked;
                                        setData(prev => ({
                                          ...prev,
                                          genres: isChecked ? [...prev.genres, genre.id] : prev.genres.filter(id => id !== genre.id)
                                        }));
                                      }}
                                      checked={data.genres.includes(genre.id)}  
                                    />
                                    <label htmlFor={`genre${index}`} className="px-2 py-1 font-medium text-primaryBtn">{ genre.name }</label>
                            </div>  
                          ))
                        }
                        </div>
                        <textarea id="overview" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-sm border border-gray-300 focus:ring-0 focus:border-blue-500 font-medium" placeholder="Write your thoughts here..." value={data.overview} onChange={(e) => setData('overview', e.target.value)}></textarea>
                      <div className='z-50 mt-5'>
                         <GenerateButton type={'submit'} disabled={processing} className='bg-purple-700' handleButton={() => {}}>
                            update
                       </GenerateButton>
                      </div>
                      </form>
                </div>
            </div>
        </div>
    </div>
  )
}
