import CustomModal from "@/Components/CustomModal";
import AuthLayout from "@/Layouts/AuthLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { MdThumbUp, MdOutlineReportGmailerrorred, MdShare, MdDownload, MdOutlineSettings } from 'react-icons/md'
import { IoBookmark, } from "react-icons/io5";
import { BsThreeDotsVertical } from 'react-icons/bs'
import axios from "axios";
import { ImSpinner8 } from "react-icons/im";
import Radio from "@/Pages/Users/Partials/Radio";
import Download from "./Users/Partials/Download";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';

const isLiked = '#01AED3'

dayjs.extend(relativeTime);

export default function Stream({ auth, postdata }) {

    const [isDetail, setIsDetail] = useState(true);
    const [open, setOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const [like, setLike] = useState(false);
    const [bookmark, setBookmark] = useState(false);
    const [commentsCounts, setCommentsCounts] = useState('');
    const [modalContent, setModalContent] = useState(null);
    const [commentLoad, setCommentLoad] = useState(false);

    const date = new Date(postdata.release_date);
    const formattedDate = date.toLocaleDateString("en-US");

    const getComment = async () => {
        setCommentLoad(true)
        try {
            const response = await axios.get(route('api.postcomment', postdata.id))
            console.log(response);
            if (response.status === 200) {
                setComments(response.data.comments)
                setCommentsCounts(response.data.count)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setCommentLoad(false)
        }
    }
    const [data, setData] = useState({
        post_id: postdata.id,
        content: ''
    })
    async function submitComment(e) {
        e.preventDefault();
        if (auth.user) {
            setCommentLoad(true)
            try {
                const response = await axios.post(route('comment.store', data))
                console.log(response);
                if (response.status === 200) {
                    setOpen(false);
                    getComment();
                    setData(prev => ({
                        ...prev,
                        content: ''
                    }))
                }
            } catch (error) {
                console.log(error);
            } finally {
                setCommentLoad(false)
            }
        } else {
            router.visit(route('login'))
        }
    }

    async function handleLike() {
        if (auth.user) {
            setLike(prev => !prev);
            try {
                const response = await axios.post(route('post.like', postdata.id))
            } catch (error) {
                console.log(error);
            }
        } else {
            router.visit(route('login'));
        }
    }

    async function handleBookmark() {
        setBookmark((prevBookmark) => !prevBookmark);
        if (auth.user) {
            try {
                const response = await axios.post(route('post.bookmark', postdata.id))
                if (response === 200) {
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            router.visit(route('login'))
        }
    }
    const displayModal = (children) => {
        setModalContent(children);
        setOpen(true);
    };

    const handleReport = () => {
        const createComponent = <Radio onClose={() => setOpen(false)} itemId={postdata.id} setOpen={setOpen} auth={auth} />;
        displayModal(createComponent);
    }
    const handleDownload = () => {
        const createComponent = <Download onClose={() => setOpen(false)} setOpen={setOpen} />
        displayModal(createComponent);
    }

    useEffect(() => {
        const findLike = postdata.liked_by_users?.findIndex(element => element.id === auth.user?.id)
        if (findLike > -1) {
            setLike(true)
        }
        const finBookmark = postdata.bookmarked_by_users?.findIndex(el => el.id === auth.user?.id)
        if (finBookmark > -1) {
            setBookmark(true)
        }
        getComment();
    }, [])

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
                    <h1 className="font-medium text-xl sm:text-2xl ml-1 mt-2">{postdata.title}</h1>
                    <div className="space-y-5 sm:-space-y-0 sm:flex sm:justify-between p-1 items-center">
                        <div className="flex space-x-1 sm:text-sm text-sm font-extralight opacity-70">
                            <div>{postdata.original_title}</div>
                            <div>{postdata.views}</div>
                            <div>{formattedDate}</div>
                        </div>
                        <div className="flex space-x-2 justify-between text-sm sm:space-x-4 md:w-[36vw] lg:w-[25vw]">
                            <button onClick={() => handleLike()} className="flex w-full flex-col gap-1 items-center h-12">
                                <MdThumbUp size={'100%'} color={like ? isLiked : '#ffffff'} />
                                <span className="">like</span>
                            </button>
                            <button
                                type="button"
                                className="flex flex-col w-full gap-1 items-center h-12"
                                onClick={() => handleBookmark()}
                            >
                                <IoBookmark size={'100%'} color={bookmark ? isLiked : '#ffffff'} />
                                <span className="">bookmark</span>
                            </button>
                            <button
                                onClick={() => handleReport()}
                                type="button"
                                className="flex flex-col w-full gap-1 items-center h-12 text-[#f2cd00]">
                                <MdOutlineReportGmailerrorred size={'100%'} color="#f2cd00" />
                                <span className="">report</span>
                            </button>
                            <div className="flex flex-col w-full gap-1 items-center h-12">
                                <MdOutlineSettings size={'100%'} color="#ffffff" />
                                <span className="">quality</span>
                            </div>
                            <button
                                type="button"
                                className="flex flex-col w-full gap-1 items-center h-12"
                                onClick={() => handleDownload()}
                            >
                                <MdDownload size={'100%'} color="#ffffff" />
                                <span className="">download</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="block mt-0 text-text p-1 lg:w-[33%] w-full">
                    <span className="text-sm font-medium text-white sm:text-base">{`Comments ${commentsCounts}`}</span>
                    <div className="mt-2 space-x-2 flex items-start">
                        <div className="h-10 w-10 rounded-full overflow-hidden">
                            <LazyLoadImage
                                effect='blur'
                                src={`/storage/${auth.user.avatar}`}
                                className='w-full h-full object-cover'
                            />
                        </div>
                        <div className="w-full space-y-1">
                            <h3 className="font-medium">@{auth.user.name}</h3>
                            <form onSubmit={submitComment}>
                                <textarea
                                    id="comment"
                                    rows="4"
                                    className="block p-2.5 w-full md:w-[50%] lg:w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Write your thoughts here... (max 500 character)"
                                    value={data.content}
                                    onChange={(e) => setData(prev => ({
                                        ...prev,
                                        content: e.target.value
                                    }))}
                                    onKeyDown={(e) => { if (e.key === 'Enter') { submitComment(e) } }}
                                />
                            </form>
                        </div>

                    </div>
                    {/* display comment */}
                    {
                        commentLoad ? <div className="w-full h-44 flex justify-center items-center">
                            <ImSpinner8 size={28} color="#ffffff" className="animate-spin" />
                        </div> : <div className="space-y-4 mt-4 w-full">
                            {
                                comments.map((comment, index) => (
                                    <div className="flex items-center font-medium w-full justify-between  px-1 py-3" key={index}>
                                        <div className="flex space-x-1 w-full">
                                            <div className="h-10 w-10 rounded-full overflow-hidden">
                                                <LazyLoadImage
                                                    effect='blur'
                                                    src={`/storage/${comment.user.avatar}`}
                                                    className='w-full h-full object-cover'
                                                />
                                            </div>
                                            <div className="w-full space-y-1">
                                                <div className="flex space-x-1 items-center text-primaryBtn ">
                                                    <p className=" ">@{comment.user.name}</p>
                                                    <span className="text-xs">. {dayjs(comment.created_at).fromNow()}</span>
                                                </div>
                                                <p className=" text-white opacity-80 font-extralight">{comment.content}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <BsThreeDotsVertical size={15} color="#ffffff" />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    }


                </div>
            </div>
            {/* modal */}
            {open && (
                <CustomModal open={open} onClose={() => setOpen(false)}>
                    {modalContent}
                </CustomModal>
            )}
        </AuthLayout>
    )
}
