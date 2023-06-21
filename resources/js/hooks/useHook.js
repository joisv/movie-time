import axios from "axios";
import { useState } from "react";


export default function useHook() {
    
    const [ loading, setLoading ] = useState(false);
    const [ result, setResult ] = useState({});
    
    const setDataApi = async (url, id) => {
        setLoading(false)
        try {
            const res = await axios.post(route(url, id))
            setResult(res)
        } catch (error) {
            console.log(error);
        }finally {
            setLoading(true);
        }
        
    }

    const setReport = async (req) => {
        console.log(req);
        try {
            const res = await axios.post(route('report.store', req));
            setResult(res)
        } catch (error) {
            console.log(error);
        }
    }

    return{  
        setDataApi,
        loading,
        result,
        setReport
    }
     
}
