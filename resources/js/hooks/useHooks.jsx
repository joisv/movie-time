import axios from "axios";
import { useState } from "react";


export default function useHooks() {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const [err, setErr] = useState('');

    const isError = (error) => {
        const validationErrors = error?.response?.data?.errors;
        setErr(validationErrors)
    }

    const get = async (param) => {
        setLoading(true)
        setErr('')
        try {
            const res = await axios.get(param)
            setData(res.data)
        } catch (error) {
            isError(error)
        } finally {
            setLoading(false);
        }
    }
    const post = async (param) => {
        setLoading(true)
        setErr('')
        try {
            const res = await axios.post(param)
            setData(res)
        } catch (error) {
            isError(error)
        } finally {
            setLoading(false);
        }

    }
    const destroy = async (param) => {
        setLoading(true)
        try {
            const res = await axios.delete(param)
            setData(res)
        } catch (error) {
            isError(error)
        } finally {
            setLoading(false);
        }

    }


    return {
        err,
        data,
        get,
        post,
        destroy,
        loading
    }

}
