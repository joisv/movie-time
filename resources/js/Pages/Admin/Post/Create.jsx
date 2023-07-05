import GenerateButton from "@/Components/GenerateButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import { BiArrowBack } from 'react-icons/bi'

export default function Index({ auth, genres }) {

  const { data, setData, errors, post, processing } = useForm({
    title:'',
    release_date: '',
    original_language: '',
    original_title: '',
    popularity: '',
    revenue: '',
    runtime: '',
    status: '',
    tagline: '',
    tmdb_id: '',
    imdb_id: '',
    vote_average: '',
    vote_count: '',
    genres:[],
    overview: '',
    adult: false,
    video: false,
    poster_path: null,
    backdrop_path: null
})
function submit(e) {
    e.preventDefault()
    post(route('post.store'))
}
  
  return (
    <div className='bg-gray-100' >
        <Head title="Dashboard" />
        <div className="py-12">
            <div className="max-w-3xl mx-auto sm:px-6 lg:px-8 bg-white">
              <button type='button' onClick={() => window.history.back()}>
               <BiArrowBack size={30} color='#000000' />
              </button>
              <div className="border-gray-300 border-y  p-4">
                <form onSubmit={submit} className='space-y-3'>
                  <div className="grid grid-cols-2 gap-2">
                  <div>
                    <InputLabel htmlFor="title" value="Title" />
                      <TextInput
                          id="title"
                          type="text"
                          name="title"
                          value={data.title}
                          className="mt-1 block w-full p-2 focus:border"
                          autoComplete="off"
                          placeholder='Nimona'
                          onChange={(e) => setData('title', e.target.value)}
                      />
                    <InputError message={errors.title} className="mt-2" />
                  </div>
                  <div>
                    <InputLabel htmlFor="tagline" value="Tagline" />
                      <TextInput
                          id="tagline"
                          type="text"
                          name="tagline"
                          value={data.tagline}
                          className="mt-1 block w-full p-2 focus:border"
                          autoComplete="off"
                          placeholder='A new hero takes shape.'
                          onChange={(e) => setData('tagline', e.target.value)}
                      />
                    <InputError message={errors.tagline} className="mt-2" />
                  </div>
                  <div>
                    <InputLabel htmlFor="release_date" value="release_date" />
                      <TextInput
                          id="release_date"
                          type="text"
                          name="release_date"
                          value={data.release_date}
                          className="mt-1 block w-full p-2 focus:border"
                          autoComplete="off"
                          placeholder='23/06/2023'
                          onChange={(e) => setData('release_date', e.target.value)}
                      />
                    <InputError message={errors.release_date} className="mt-2" />
                  </div>
                  <div>
                    <InputLabel htmlFor="original_language" value="original_language" />
                      <TextInput
                          id="original_language"
                          type="text"
                          name="original_language"
                          value={data.original_language}
                          className="mt-1 block w-full p-2 focus:border"
                          autoComplete="off"
                          placeholder='en'
                          onChange={(e) => setData('original_language', e.target.value)}
                      />
                    <InputError message={errors.original_language} className="mt-2" />
                  </div>
                  <div>
                    <InputLabel htmlFor="original_title" value="original_title" />
                      <TextInput
                          id="original_title"
                          type="text"
                          name="original_title"
                          value={data.original_title}
                          className="mt-1 block w-full p-2 focus:border"
                          autoComplete="off"
                          placeholder='nimona'
                          onChange={(e) => setData('original_title', e.target.value)}
                      />
                    <InputError message={errors.original_title} className="mt-2" />
                  </div>
                  <div>
                    <InputLabel htmlFor="popularity" value="popularity" />
                      <TextInput
                          id="popularity"
                          type="text"
                          name="popularity"
                          value={data.popularity}
                          className="mt-1 block w-full p-2 focus:border"
                          autoComplete="off"
                          placeholder='100586'
                          onChange={(e) => setData('popularity', e.target.value)}
                      />
                    <InputError message={errors.popularity} className="mt-2" />
                  </div>
                  <div>
                    <InputLabel htmlFor="revenue" value="revenue" />
                      <TextInput
                          id="revenue"
                          type="text"
                          name="revenue"
                          value={data.revenue}
                          className="mt-1 block w-full p-2 focus:border"
                          autoComplete="off"
                          placeholder='2000000'
                          onChange={(e) => setData('revenue', e.target.value)}
                      />
                    <InputError message={errors.revenue} className="mt-2" />
                  </div>
                  <div>
                    <InputLabel htmlFor="runtime" value="runtime" />
                      <TextInput
                          id="runtime"
                          type="text"
                          name="runtime"
                          value={data.runtime}
                          className="mt-1 block w-full p-2 focus:border"
                          autoComplete="off"
                          placeholder='90'
                          onChange={(e) => setData('runtime', e.target.value)}
                      />
                    <InputError message={errors.runtime} className="mt-2" />
                  </div>
                  <div>
                    <InputLabel htmlFor="status" value="status" />
                      <TextInput
                          id="status"
                          type="text"
                          name="status"
                          placeholder='released'
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
                          type="text"
                          name="tmdb_id"
                          placeholder='t746732'
                          value={data.tmdb_id}
                          className="mt-1 block w-full p-2 focus:border"
                          autoComplete="off"
                          onChange={(e) => setData('tmdb_id', e.target.value)}
                      />
                    <InputError message={errors.tmdb_id} className="mt-2" />
                  </div>
                  <div>
                    <InputLabel htmlFor="imdb_id" value="Imdb id" />
                      <TextInput
                          id="imdb_id"
                          type="text"
                          name="imdb_id"
                          placeholder='961323'
                          value={data.imdb_id}
                          className="mt-1 block w-full p-2 focus:border"
                          autoComplete="off"
                          onChange={(e) => setData('imdb_id', e.target.value)}
                      />
                    <InputError message={errors.imdb_id} className="mt-2" />
                  </div>
                  <div>
                    <InputLabel htmlFor="vote_average" value="vote_average" />
                      <TextInput
                          id="vote_average"
                          type="text"
                          name="vote_average"
                          placeholder='8.0'
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
                          type="text"
                          name="vote_count"
                          placeholder='20000'
                          value={data.vote_count}
                          className="mt-1 block w-full p-2 focus:border"
                          autoComplete="off"
                          onChange={(e) => setData('vote_count', e.target.value)}
                      />
                    <InputError message={errors.vote_count} className="mt-2" />
                  </div>
                  <div className="flex space-x-4">
                      <div>
                      <InputLabel htmlFor="adult" value="Adult ?" />
                        <TextInput 
                          id="adult"
                          type="checkbox"
                          name="adult"
                          value={data.adult}
                          className="mt-1 block w-fit p-2 focus:border"
                          autoComplete="off"
                          onChange={(e) => setData('adult', e.target.checked)}
                          checked={data.adult}
                        />
                        <InputError message={errors.adult} className="mt-2" />
                      </div>
                      <div>
                      <InputLabel htmlFor="adult" value="Video ?" />
                        <TextInput 
                          id="video"
                          type="checkbox"
                          name="video"
                          value={data.video}
                          className="mt-1 block w-fit p-2 focus:border"
                          autoComplete="off"
                          onChange={(e) => setData('video', e.target.checked)}
                          checked={data.video}
                        />
                        <InputError message={errors.video} className="mt-2" />
                      </div>
                  </div>
                  <div>
                    <InputLabel htmlFor='backdrop' value={'Backdrop'} />
                    <input className="block w-full text-sm  border  rounded-lg cursor-pointer  text-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400" id="backdrop" type="file" onChange={(e) => setData('backdrop_path', e.target.files[0])}/>
                  </div>
                  <div>
                    <InputLabel htmlFor='poster' value={'Poster'} />
                    <input className="block w-full text-sm  border  rounded-lg cursor-pointer  text-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400" id="poster" type="file" onChange={(e) => setData('poster_path', e.target.files[0])}/>
                    <InputError message={errors.poster_path} className="mt-2" />
                  </div>
                  </div>
                  <div className=' mt-4 w-full h-32 overflow-auto mb-4 border-2 border-gray-200 rounded-md p-2 flex flex-wrap space-x-2'>
                  {
                    genres?.map((genre, index) => (
                      <div className={`p-1 w-fit h-fit relative border-2  rounded-md ${errors.genres ? 'border-red-400' : 'border-gray-400'} `} key={index}>
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
                  <InputError  message={errors.genres} />
                  <textarea id="overview" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-sm border border-gray-300 focus:ring-0 focus:border-blue-500 font-medium" value={data.overview} onChange={(e) => setData('overview', e.target.value)} placeholder='A knight framed for a tragic crime teams with a scrappy, shape-shifting teen to prove his innocence.'></textarea>
                  <InputError message={errors.overview} className="mt-2" />
                  <div className='z-50 mt-5'>
                      <GenerateButton type={'submit'} disabled={processing} className='bg-purple-700'>
                        post
                    </GenerateButton>
                  </div>
                </form>
              </div>
            </div>
        </div>
    </div>
  )
} 
