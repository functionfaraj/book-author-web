import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import config from '../config';

axios.defaults.baseURL = config.api_server
const useAxios = ({ url, method, data = null, headers = null }) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);
    const get = useCallback(async () => {
        try {
            const res = await axios({
                method: 'GET',
                url,
                headers,
            });
            if (res) {
                setResponse(res.data);
                setloading(false);
            }
        } catch (err) {
            setloading(false);
            setError(err.message);
        }
    }, [method, url, data, headers])

    const post = useCallback(async (data) => {
        try {
            const res = await axios({
                method: 'POST',
                url,
                data,
                headers,
            });
            if (res) {
                setResponse(res.data);
                setloading(false);
                return res
            }
        } catch (err) {
            setloading(false);
            setError(err.message);
            return err
        }
    }, [method, url, data, headers])

    const put = useCallback(async (url, data) => {
        try {
            const res = await axios({
                method: 'PUT',
                url,
                data,
                headers,
            });
            if (res) {
                setResponse(res.data);
                setloading(false);
                return res
            }
        } catch (err) {
            setloading(false);
            setError(err.message);
            return err
        }
    }, [method, url, data, headers])

    const delet = useCallback(async () => {
        try {
            const res = await axios({
                method: 'DELETE',
                url,
                data,
                headers,
            });
            if (res) {
                setResponse(res.data);
                setloading(false);
                return res
            }
        } catch (err) {
            setloading(false);
            setError(err.message);
            return err
        }
    }, [method, url, data, headers])

    return { response, error, loading, post, get, put, delet };
};

export default useAxios;