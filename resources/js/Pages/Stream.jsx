import CustomModal from "@/Components/CustomModal";
import GenerateButton from "@/Components/GenerateButton";
import AuthLayout from "@/Layouts/AuthLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { IoSendSharp } from 'react-icons/io5'
import { MdThumbUp, MdOutlineThumbsUpDown, MdOutlineReportGmailerrorred, MdShare, MdDownload } from 'react-icons/md'
import { IoBookmarkOutline, IoBookmark,  } from "react-icons/io5";
import {BsThreeDotsVertical} from 'react-icons/bs'

export default function Stream({ auth,  }) {
    const [ isDetail, setIsDetail ] = useState(true);
    const [ modalComment, setModalComment ] = useState(false)

  return (
    <AuthLayout user={auth?.user} isDetail={isDetail} setIsDetail={setIsDetail}>
        <Head title="Stream" />
        <div className="lg:flex lg:gap-2 lg:relative">
            <div className="max-w-screen-lg w-full  top-0 sm:relative text-text">
                <div className="w-full relative" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src="https://www.youtube.com/embed/jfKfPfyJRdk"
                        title="Video Player"
                        allowFullScreen
                    ></iframe>
                </div>
                {/* title */}
                <h1 className="font-medium text-xl sm:text-3xl ml-1 mt-2">InterStellar</h1>
                <div className="space-y-5 sm:-space-y-5 sm:flex sm:justify-between p-1">
                    <div className="flex space-x-1 sm:text-base text-sm">
                        <div>original_title</div>
                        <div>view</div>
                        <div>created_at</div>
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
            <div className="block mt-0 text-text p-1">
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
                    <div className="space-y-2 mt-4 w-full">
                        <div className="flex items-center font-medium w-full justify-between">
                            <div className="space-y-1">
                            <p className="text-xs sm:text-sm text-primaryBtn">user_38298</p>
                            <p className="text-sm sm:text-base opacity-80 font-extralight">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, delectus.</p>
                            </div>
                            <div>
                                <BsThreeDotsVertical  size={15} color="#ffffff"/>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
         {/* modal */}
       <CustomModal open={modalComment} onClose={() => setModalComment(false)}>
            
            <form>
                <div class="w-[85vw] sm:w-[60vw] mb-2 rounded-lg bg-secondaryBtn p-3">
                    <div class=" bg-secondaryBtn">
                        <textarea id="comment" rows="4" class="w-full px-0 text-sm text-text bg-secondaryBtn border-0 focus:ring-0" placeholder="Write a comment..." ></textarea>
                    </div>
                    {/* <hr className="opacity-40"/> */}
                    <div className="p-2">
                        <IoSendSharp size={20} color="#ffffff" />
                    </div>
                </div>
            </form>
    
           </CustomModal>
    </AuthLayout>
  )
}
