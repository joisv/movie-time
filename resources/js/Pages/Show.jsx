import { Head, Link, useForm } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import useHook from '@/hooks/useHook';

import CustomModal from '@/Components/CustomModal';
import Radio from '@/Components/Radio';
import Toast from '@/Components/Toast';
import AuthLayout from '@/Layouts/AuthLayout';

export default function Show({ auth, postdata, comments }) {

    const [ like, setLike ] = useState(false);
    const [ bookmark, setBookmark ] = useState(false);
    const [ openModal, setOpenModal ] = useState(false);
    const [ openToast, setOpenToast ] = useState(false);

    const { setDataApi, result } = useHook()

    const { data, post, errors, progress, setData, reset } = useForm({
        post_id: postdata.id,
        user_id: auth.user?.id,
        content: ''
    })
    
    useEffect(() => {
       const finArray = postdata.liked_by_users?.findIndex(element => element.id === auth.user?.id)
       if(finArray > -1){
        setLike(true)
       }
    },[postdata])
    
    function submit(e){
        e.preventDefault();
        auth.user ? post(route('comment.store'), {
            onSuccess: () => reset()
        }) : alert('login dulu');
    }
    const likeUrl = 'post.postlike'
    const bookmarkUrl = 'post.bookmark'

    function handleLike () {
        if(auth.user){
            setLike((prevlike) => !prevlike)
            setDataApi(likeUrl, postdata.id)
        } else {
            alert('login dulu');
        }
    }

    function handleBookmark(){
        if(auth.user){
            setBookmark((prevBookmark) => !prevBookmark)
            setDataApi(bookmarkUrl, postdata.id)
        } else {
            alert('login dulu');
        }
    }
  return (
    <>
    <AuthLayout user={auth?.user}>
    <Head title="Welcome" />
    <div className="relative min-h-screen bg-center bg-gray-100  dark:bg-gray-900 selection:bg-red-500 selection:text-white">
        
        <div className='p-10'>
            <h1 className='font-semibold'>{ postdata.title }</h1>
            <p>{postdata.description}</p>
            

            {/* like */}
            
            <div className='flex space-x-3'>
                <button className={`px-2 my-3 rounded-sm ${like ? 'bg-blue-600 text-white' : 'bg-gray-300'}`} onClick={handleLike}>
                        like {postdata.like}
                </button>
                <button className={`px-2 my-3 rounded-sm ${bookmark ? 'bg-lime-400 text-white' : 'bg-gray-300'}`} onClick={handleBookmark}>
                        bookmark { postdata.bookmark }
                </button>
                <button type="button" className='px-2 my-3 rounded-sm bg-red-500 text-white' onClick={() => setOpenModal(true)}>report</button>
            </div>
            
            {/* comment form */}
            <form onSubmit={submit}>
                <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                        <label htmlFor="comment" className="sr-only">Your comment</label>
                        <textarea id="comment" rows="4" className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." 
                        required
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                        ></textarea>
                    </div>
                    <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                        <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                            Post comment
                        </button>
                    </div>
                </div>
            </form>
            <p className="ml-auto text-xs text-gray-500 dark:text-gray-400">Remember, contributions to this topic should follow our <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">Community Guidelines</a>.</p>
                
                {/* comment */}

                {
                    comments?.map((comment, index) => (
                        <div className='mb-5 p-3 bg-gray-400 rounded-md' key={index}>
                            <h1 className='mb-1 font-medium text-lg'>{comment.user.name}</h1>
                            <p>{comment.content}</p>
                        </div>
                    ))
                }
        </div>  
     
    </div>
    </AuthLayout>
     <CustomModal open={openModal} onClose={() => setOpenModal(false)}>
        <Radio onClose={() => setOpenModal(false)} itemId={postdata.id} auth={auth} setOpenModal={setOpenModal}/>
     </CustomModal>
     </>
  )
}
