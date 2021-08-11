import { useEffect, useState } from 'react';

const useFetch = (path) => {
    const [loading, setLoading] = useState(true);
    const [hasError, setError] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(path);

                if (response.status === 404) {
                    return;
                }

                if (response.status !== 200) {
                    setError(true);
                    return;
                }

                setData(await response.json());
            } catch (e) {
                console.error(e);
                setError(true);
            } finally {
                setLoading(false);
            }
        })();
    }, [path]);

    return { loading, hasError, data };
};

export { useFetch };
