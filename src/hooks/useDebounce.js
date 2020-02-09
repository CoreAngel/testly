import { useState, useEffect } from 'react';

const useDebounce = (value, delay) => {
    const [returnValue, setValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setValue(value), delay);
        return () => clearTimeout(handler);
    }, [value]);

    return returnValue;
};

export default useDebounce;
