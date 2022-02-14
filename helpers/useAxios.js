import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import config from '../config';

axios.defaults.baseURL = config.api_server
const useAxios = ({ url, method, data = null, headers = null }) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);

    const runAxios = async () => {
        try {
            const res = await axios({
                method,
                url,
                data,
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
    }

    useEffect(() => {
        runAxios();
    }, [method, url, data, headers]);

    return { response, error, loading };
};

export default useAxios;