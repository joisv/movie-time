import GenerateButton from '@/Components/GenerateButton';
import InputComponent from '@/Components/InputComponent';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
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
    <div className='bg-gray-100' >
        <Head title="Dashboard" />
        <div className="py-12">
            <div className="max-w-3xl mx-auto sm:px-6 lg:px-8 bg-white">
              <button type='button' onClick={() => router.visit(route('post.index'))}>
               <BiArrowBack size={30} color='#000000' />
              </button>
                <div className="border-gray-300 border-y  p-4">
                      <form onSubmit={submit} className='space-y-3'>
                      <InputComponent
                         value={data.title}
                         onChange={(e) => setData('title', e.target.value)}
                         def='title'
                         className={title}
                         placeholder='title'
                       />
                       <div>
                          <InputLabel htmlFor="release_date" value="release_date" />
                            <TextInput
                                id="release_date"
                                type="release_date"
                                name="release_date"
                                value={data.release_date}
                                className="mt-1 block w-full p-2 focus:border"
                                autoComplete="off"
                                onChange={(e) => setData('release_date', e.target.value)}
                            />
                          <InputError message={errors.release_date} className="mt-2" />
                       </div>
                       <div>
                          <InputLabel htmlFor="original_language" value="original_language" />
                            <TextInput
                                id="original_language"
                                type="original_language"
                                name="original_language"
                                value={data.original_language}
                                className="mt-1 block w-full p-2 focus:border"
                                autoComplete="off"
                                onChange={(e) => setData('original_language', e.target.value)}
                            />
                          <InputError message={errors.original_language} className="mt-2" />
                       </div>
                       <div>
                          <InputLabel htmlFor="original_title" value="original_title" />
                            <TextInput
                                id="original_title"
                                type="original_title"
                                name="original_title"
                                value={data.original_title}
                                className="mt-1 block w-full p-2 focus:border"
                                autoComplete="off"
                                onChange={(e) => setData('original_title', e.target.value)}
                            />
                          <InputError message={errors.original_title} className="mt-2" />
                       </div>
                       <div>
                          <InputLabel htmlFor="popularity" value="popularity" />
                            <TextInput
                                id="popularity"
                                type="popularity"
                                name="popularity"
                                value={data.popularity}
                                className="mt-1 block w-full p-2 focus:border"
                                autoComplete="off"
                                onChange={(e) => setData('popularity', e.target.value)}
                            />
                          <InputError message={errors.popularity} className="mt-2" />
                       </div>
                       <div>
                          <InputLabel htmlFor="revenue" value="revenue" />
                            <TextInput
                                id="revenue"
                                type="revenue"
                                name="revenue"
                                value={data.revenue}
                                className="mt-1 block w-full p-2 focus:border"
                                autoComplete="off"
                                onChange={(e) => setData('revenue', e.target.value)}
                            />
                          <InputError message={errors.revenue} className="mt-2" />
                       </div>
                       <div>
                          <InputLabel htmlFor="runtime" value="runtime" />
                            <TextInput
                                id="runtime"
                                type="runtime"
                                name="runtime"
                                value={data.runtime}
                                className="mt-1 block w-full p-2 focus:border"
                                autoComplete="off"
                                onChange={(e) => setData('runtime', e.target.value)}
                            />
                          <InputError message={errors.runtime} className="mt-2" />
                       </div>
                       <div>
                          <InputLabel htmlFor="status" value="status" />
                            <TextInput
                                id="status"
                                type="status"
                                name="status"
                                value={data.status}
                                className="mt-1 block w-full p-2 focus:border"
                                autoComplete="off"
                                onChange={(e) => setData('status', e.target.value)}
                            />
                          <InputError message={errors.status} className="mt-2" />
                       </div>
                       <div>
                          <InputLabel htmlFor="tmdb_id" value="tmdb_id" />
                            <TextInput
                                id="tmdb_id"
                                type="tmdb_id"
                                name="tmdb_id"
                                value={data.tmdb_id}
                                className="mt-1 block w-full p-2 focus:border"
                                autoComplete="off"
                                onChange={(e) => setData('tmdb_id', e.target.value)}
                            />
                          <InputError message={errors.tmdb_id} className="mt-2" />
                       </div>
                       <div>
                          <InputLabel htmlFor="vote_average" value="vote_average" />
                            <TextInput
                                id="vote_average"
                                type="vote_average"
                                name="vote_average"
                                value={data.vote_average}
                                className="mt-1 block w-full p-2 focus:border"
                                autoComplete="off"
                                onChange={(e) => setData('vote_average', e.target.value)}
                            />
                          <InputError message={errors.vote_average} className="mt-2" />
                       </div>
                       <div>
                          <InputLabel htmlFor="vote_count" value="vote_count" />
                            <TextInput
                                id="vote_count"
                                type="vote_count"
                                name="vote_count"
                                value={data.vote_count}
                                className="mt-1 block w-full p-2 focus:border"
                                autoComplete="off"
                                onChange={(e) => setData('vote_count', e.target.value)}
                            />
                          <InputError message={errors.vote_count} className="mt-2" />
                       </div>
                       <div>
                          <InputLabel htmlFor="vote_count" value="vote_count" />
                            <TextInput
                                id="vote_count"
                                type="vote_count"
                                name="vote_count"
                                value={data.vote_count}
                                className="mt-1 block w-full p-2 focus:border"
                                autoComplete="off"
                                onChange={(e) => setData('vote_count', e.target.value)}
                            />
                          <InputError message={errors.vote_count} className="mt-2" />
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
