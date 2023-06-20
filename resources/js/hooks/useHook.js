import axios from "axios";
import { useState } from "react";


export default function useHook() {
    
    const [ loading, setLoading ] = useState(false);
    const [ result, setResult ] = useState('');
    
    const likePost = async (id) => {
        setLoading(false)
        try {
            const res = await axios.post(route('post.postlike', id))
            setResult(res)
        } catch (error) {
            console.log(error);
        }finally {
            setLoading(true);
        }
        
    }

    const postComment = async () => {

        try {
            const res = axios.post(route('comment.store'))
        } catch (error) {
            console.log(error)
        }
        
    }

    return{  
        likePost,
        loading,
        result,
        postComment
    }
     
}
