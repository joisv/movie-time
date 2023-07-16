import { Head, router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import axios from "axios";

import CustomModal from "@/Components/CustomModal";
import AuthLayout from "@/Layouts/AuthLayout";
import ServerOption from "./Users/Partials/ServerOption";
import Download from "./Users/Partials/Download";
import Radio from "@/Pages/Users/Partials/Radio";

import { MdThumbUp, MdOutlineReportGmailerrorred, MdDownload, MdOutlineSettings, MdMenu } from 'react-icons/md'
import { IoBookmark, } from "react-icons/io5";
import { BsThreeDotsVertical } from 'react-icons/bs'
import { ImSpinner8 } from "react-icons/im";
import { LazyLoadImage } from "react-lazy-load-image-component";
import dayjs from "dayjs";
import 'react-lazy-load-image-component/src/effects/blur.css';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FaUserCircle } from "react-icons/fa";
import InputError from "@/Components/InputError";

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
    const [res, setRes] = useState([]);
    const [ err, setErr ] = useState('')

    const date = new Date(postdata.release_date);
    const formattedDate = date.toLocaleDateString("en-US");

    const getComment = async () => {
        setCommentLoad(true)
        try {
            const response = await axios.get(route('api.postcomment', postdata.id))
            if (response.status === 200) {
                setRes(response.data)
                setComments(response.data.comments.data)
                setCommentsCounts(response.data.count)
            }
        } catch (error) {
           setErr(error.response.data.message)
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
                if (response.status === 200) {
                    setOpen(false);
                    getComment();
                    setData(prev => ({
                        ...prev,
                        content: ''
                    }))
                }
            } catch (error) {
                setErr(error.response.data.message)
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
        const createComponent = <Download onClose={() => setOpen(false)} datas={postdata.downloads} />
        displayModal(createComponent);
    }

    const [serverState, setServerState] = useState('');

    function server(newServerState) {
        setServerState(newServerState);
    }

    const handleQuality = () => {
        const createComponent = <ServerOption onClose={() => setOpen(false)} datas={postdata.streams} setServer={server} />
        displayModal(createComponent);
    }

    const loadMore = async () => {
        try {
            const respo = await axios.get(res?.comments.next_page_url);
            console.log(respo);
            if (respo.status === 200) {
                const newComments = [...comments, ...respo.data.comments.data];
                setComments(newComments);
                setRes(respo.data);
            }
        } catch (error) {
            throw new Error(error);
        }
    };

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
    console.log(err);
    return (
        <AuthLayout user={auth?.user} isDetail={isDetail} setIsDetail={setIsDetail}>
            <button type="button" className={`absolute -top-7  p-1 ease-in duration-500 ${isDetail ? 'bg-transparent' : 'bg-gray-700 left-1'}`} onClick={() => setIsDetail((prev) => !prev)}>
                <MdMenu size={25} color='#ffffff'/>
            </button>
            <Head title="Stream" />
            <div className="lg:flex lg:gap-2 lg:relative space-y-6 sm:space-y-0">
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
                    <h1 className="font-medium text-base sm:text-2xl ml-1 mt-2">{postdata.title}</h1>
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
                            <button type="button" className="flex flex-col w-full gap-1 items-center h-12" onClick={() => handleQuality()}>
                                <MdOutlineSettings size={'100%'} color="#ffffff" />
                                <span className="">quality</span>
                            </button>
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
                <div className="block mt-0 text-text p-1 lg:max-w-[31%] w-full overflow-ellipsis">
                    <div className="px-1 py-2 text-text text-xs font-medium opacity-75">
                        <h4>Comments must be polite, relevant, and free from illegal content or inappropriate promotions according to our guidelines.</h4>
                    </div>
                    <span className="text-sm font-medium text-white sm:text-base">{`Comments ${commentsCounts}`}</span>
                    <div className="mt-2 space-x-2 flex items-start mb-10">
                        <div className="">
                            {
                                auth.user?.avatar ? <LazyLoadImage
                                    effect='blur'
                                    src={`/storage/${auth.user?.avatar}`}
                                    className='h-10 w-10 rounded-full object-cover object-top'
                                /> : <FaUserCircle size={40} color='#ffffff' />
                            }
                        </div>
                        <div className="w-full space-y-1">
                            <h3 className="font-medium mb-5">@{auth.user ? auth.user?.name : 'guest'}</h3>
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
                                <InputError message={err} className="mt-2"/>
                            </form>
                        </div>

                    </div>
                    {/* display comment */}
                    {
                        commentLoad ? <div className="w-full h-44 flex justify-center items-center">
                            <ImSpinner8 size={28} color="#ffffff" className="animate-spin" />
                        </div> : <div className="space-y-10 mt-4 w-full">
                            {
                                comments.map((comment, index) => (
                                    <div className="flex items-start font-medium w-full justify-between px-1 relative" key={index}>
                                        <div className="flex justify-end w-full ">
                                            <div className="absolute left-0">
                                                {
                                                    comment.user?.avatar ? <LazyLoadImage
                                                        effect='blur'
                                                        src={`/storage/${comment.user?.avatar}`}
                                                        className='h-10 w-10 rounded-full object-cover object-top'
                                                    /> : <FaUserCircle size={35} color='#ffffff' />
                                                }
                                            </div>
                                            <div className="w-[85%] space-y-1">
                                                <div className="flex space-x-1 items-center text-primaryBtn ">
                                                    <p className=" ">@{comment.user?.name}</p>
                                                    <span className="text-xs">. {dayjs(comment.created_at).fromNow()}</span>
                                                </div>
                                                <div className="max-w-full ">
                                                    <p className="text-gray-300 text-sm font-extralight break-all">
                                                        {comment.content}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="absolute top-0 -right-2 opacity-70">
                                            <BsThreeDotsVertical size={17} color="#ffffff" />
                                        </div> */}
                                    </div>
                                ))
                            }
                            {
                                res.comments?.next_page_url != null ? <div className="w-full flex items-center justify-center">
                                    <button
                                        type="button"
                                        className=" text-white bg-secondaryAccent  hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-semibold text-base px-5 py-2 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex justify-center gap-1 items-center min-w-[13vw]"
                                        onClick={loadMore}
                                    >
                                        load more
                                        {/* {
                                                     processing ? <ImSpinner8 size={24} color='#ffffff' className='animate-spin' /> : 'Login Now'
                                                 } */}
                                    </button>
                                </div> : null
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
