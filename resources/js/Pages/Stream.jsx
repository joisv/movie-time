import CustomModal from "@/Components/CustomModal";
import GenerateButton from "@/Components/GenerateButton";
import AuthLayout from "@/Layouts/AuthLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import { IoSendSharp } from 'react-icons/io5'
import { MdThumbUp, MdOutlineThumbsUpDown, MdOutlineReportGmailerrorred, MdShare, MdDownload } from 'react-icons/md'
import { IoBookmarkOutline, IoBookmark,  } from "react-icons/io5";
import {BsThreeDotsVertical} from 'react-icons/bs'

export default function Stream({ auth, postdata, comments }) {
    const [ isDetail, setIsDetail ] = useState(true);
    const [ modalComment, setModalComment ] = useState(false)
    const date = new Date(postdata.release_date);
    const formattedDate = date.toLocaleDateString("en-US");

    const { data, post, errors, progress, setData, reset } = useForm({
        post_id: postdata.id,
        user_id: auth.user?.id,
        content: ''
    })

    function submitComment(e){
        e.preventDefault();
        auth.user ? post(route('comment.store'), {
            onSuccess: () => {
                reset(),
                setModalComment(false)
            }
        }) : alert('login dulu');
    }
    console.log(comments);
  return (
    <AuthLayout user={auth?.user} isDetail={isDetail} setIsDetail={setIsDetail}>
        <Head title="Stream" />
        <div className="lg:flex lg:gap-2 lg:relative">
            <div className="max-w-screen-lg w-full lg:w-[80%]  top-0 sm:relative text-text">
                <div className="w-full relative" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src="https://www.youtube.com/embed/jfKfPfyJRdk"
                        title="Video Player"
                        allowFullScreen
                    ></iframe>
                </div>
                {/* title */}
                <h1 className="font-medium text-xl sm:text-3xl ml-1 mt-2">{ postdata.title }</h1>
                <div className="space-y-5 sm:-space-y-5 sm:flex sm:justify-between p-1">
                    <div className="flex space-x-1 sm:text-base text-sm">
                        <div>{postdata.original_title}</div>
                        <div>view</div>
                        <div>{formattedDate}</div>
                    </div>
                    <div className="flex space-x-2 justify-between text-sm sm:space-x-4">
                        <div className="flex flex-col gap-1 items-center">
                            <MdThumbUp size={19} color='#ffffff'/>
                            <span className="lg:hidden">like</span>
                        </div>
                        <div className="flex flex-col gap-1 items-center">
                            <IoBookmark size={19} color="#ffffff"/>
                            <span className="lg:hidden">bookmark</span>
                        </div>
                        <div className="flex flex-col gap-1 items-center">
                            <MdOutlineReportGmailerrorred size={21} color="#ffffff" />
                            <span className="lg:hidden">report</span>
                        </div>
                        <div className="flex flex-col gap-1 items-center">
                            <MdShare size={19} color="#ffffff" />
                            <span className="lg:hidden">share</span>
                        </div>
                        <div className="flex flex-col gap-1 items-center">
                            <MdDownload size={21} color="#ffffff" />
                            <span className="lg:hidden">download</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="block mt-0 text-text p-1 lg:w-[25%] w-full">
                <span className="text-sm font-medium text-primaryBtn sm:text-base">Comments 10</span>
                <div className="mt-2">
                    <button 
                    onClick={() => setModalComment(prev => !prev)}
                    className="h-14 bg-secondaryBtn text-sm text-accent flex items-center w-full">
                        <p className="text-base">add comment...</p>
                    </button>
                    {/* <hr className="opacity-30"/> */}
                </div>
                {/* display comment */}
                <div className="space-y-4 mt-4 w-full">
                    {
                        comments.map((comment, index) => (
                            <div className="flex items-center font-medium w-full justify-between" key={index}>
                                <div className="space-y-1">
                                <p className="text-xs sm:text-sm text-primaryBtn">@{comment.user.name}</p>
                                <p className="text-sm sm:text-base text-text opacity-80 font-extralight">{comment.content}</p>
                                </div>
                                <div>
                                    <BsThreeDotsVertical  size={15} color="#ffffff"/>
                                </div>
                            </div>

                        ))
                    }
                </div>
            </div>
        </div>
         {/* modal */}
       <CustomModal open={modalComment} onClose={() => setModalComment(false)}>
            
            <form onSubmit={submitComment}>
                <div className="w-[85vw] sm:w-[60vw] mb-2 rounded-lg bg-secondaryBtn p-3">
                    <div className=" bg-secondaryBtn">
                        <textarea id="comment" rows="4" className="w-full px-0 text-sm text-text bg-secondaryBtn border-0 focus:ring-0"    
                            placeholder="Write a comment..." 
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                        />
                    </div>
                    {/* <hr className="opacity-40"/> */}
                    <button type="submit" className="p-2">
                        <IoSendSharp size={20} color="#ffffff" />
                    </button>
                </div>
            </form>
    
           </CustomModal>
    </AuthLayout>
  )
}