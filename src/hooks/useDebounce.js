import { useState, useEffect } from 'react';

const useDebounce = (value, delay) => {
    const [returnValue, setValue] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => setValue(value), delay);
        return () => clearTimeout(timeout);
    }, [value, delay]);

    return returnValue;
};

export default useDebounce;
