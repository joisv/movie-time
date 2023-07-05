import axios from "axios";
import { useState } from "react";


export default function useHook() {
    
    const [ loading, setLoading ] = useState(false);
    const [ result, setResult ] = useState({});
    const [ err, setErr ] = useState('');
    
    const callback = {
        onSuccess: () => {
          // logika untuk onSuccess
        },
        onError: () => {
          // logika untuk onError
        }
      };
    
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
    const index = async (url, id) => {
        setLoading(false)
        try {
            const res = await axios.get(route(url, id))
            setResult(res)
        } catch (error) {
            console.log(error);
        }finally {
            setLoading(true);
        }
        
    }
    const store = async (url, req) => {
        setLoading(true)
        setErr('')
        try {
            const res = await axios.post(route(url, req))
            setResult(res)
        } catch (error) {
            if (error.res.status === 422) {
                const validationErrors = error.res.data.errors;
                setErr(validationErrors)
            } else {
                setErr(error.res.status);
            }  
        }finally {
            setLoading(false);
        }
        
    }
    const destroy = async (url, req) => {
        setLoading(true)
        try {
            const res = await axios.delete(route(url, req))
            setResult(res)
        } catch (error) {
            if (error.response.status === 422) {
                const validationErrors = error.response.data.errors;
                setErr(validationErrors)
            } else {
                setErr(error.response.status);

            }  
        }finally {
            setLoading(false);
        }
        
    }

    

    const setReport = async (req) => {
        try {
            const res = await axios.post(route('report.store', req));
            setResult(res)
        } catch (error) {
            console.log(error);
        }
    }

    const setHistory = async (dataHistory) => {
        try {
            const response = await axios.post(route('history.store', dataHistory));
        } catch (error) {
            console.log(error);
        }
    }

    const generateMovie = async (id) => {
        setLoading(true)
        setErr('');
        try {
            const response = await axios.post(route('generate',id))
            setResult(response)
        } catch (error) {
            setErr(error.response.data);
        } finally {
            setLoading(false)
        }
    }
    
    const generateGenreMovie = async () => {
        setLoading(true);
        setErr('');
        try {
            const response = await axios.get(route('generate.genre'));
            setResult(response)
        } catch (error) {
            setErr(error.response.data);
        } finally {
            setLoading(false)
        }
    }
    return{  
        setDataApi,
        loading,
        result,
        setReport,
        setHistory,
        generateMovie,
        generateGenreMovie,
        err,
        index,
        store,
        destroy,
    }
     
}
