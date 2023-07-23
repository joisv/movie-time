import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";


export default function useHooks() {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [err, setErr] = useState('');


    const get = async (param, { onSuccess, onError }) => {
        setLoading(true);
        setErr('');

        try {
            const response = await axios.get(param);
            console.log(response);
            if (response.status === 200) {
                setData(response.data);
                onSuccess();
            }
        } catch (error) {
            const validationErrors = error?.response?.data;
            setErr(validationErrors);
            onError();
        } finally {
            setLoading(false);
        }
    };
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
    const destroy = async (param, { onSuccess, onError }) => {
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

    // useEffect(() => {
    //     console.log(data);
    // }, [data]);

    return {
        err,
        data,
        get,
        post,
        destroy,
        loading
    }

}
