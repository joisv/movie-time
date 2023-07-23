import axios from "axios";
import { useState } from "react";


export default function useHooks() {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const [err, setErr] = useState('');

    const onSuccess = (response, callback) => {
        setData(response)
    }

    // const onError = (error, callback) => {
    //     const validationErrors = error?.response?.data?.errors;
    //     setErr(validationErrors)
    // }

    const get = async (param, { onSuccess, onError }) => {
        setLoading(true)
        setErr('')
        try {
            const response = await axios.get(param)
            setData(response)
            if (response.status === 200) {
                onSuccess()
            }

        } catch (error) {
            const validationErrors = error?.response?.data;
            setErr(validationErrors)
            onError()
        } finally {
            setLoading(false);
        }
    }
    const post = async (param, { onSuccess, onError }) => {
        setLoading(true)
        setErr('')
        try {
            const response = await axios.post(param)
            setData(response)
            if (response.status === 200) {
                onSuccess()
            }

        } catch (error) {
            const validationErrors = error?.response?.data;
            setErr(validationErrors)
            onError()
        } finally {
            setLoading(false);
        }
    }
    const destroy = async (param,  { onSuccess, onError }) => {
        setLoading(true)
        try {
            const response = await axios.delete(param)
            setData(response)
        } catch (error) {
            onError(error)
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
