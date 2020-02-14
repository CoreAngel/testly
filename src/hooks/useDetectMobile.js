import { useEffect, useState } from 'react';
import { checkIsMobile } from '../utils/breakpoints';

const useDetectMobile = () => {
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        const detectIsMobile = () => {
            const match = checkIsMobile();

            if (match !== isMobile) {
                setIsMobile(match);
            }
        };
        detectIsMobile();

        window.addEventListener('DOMContentLoaded', detectIsMobile);
        window.addEventListener('resize', detectIsMobile);
        window.addEventListener('orientationchange', detectIsMobile);
        return () => {
            window.removeEventListener('DOMContentLoaded', detectIsMobile);
            window.removeEventListener('resize', detectIsMobile);
            window.removeEventListener('orientationchange', detectIsMobile);
        };
    }, [isMobile]);

    return isMobile;
};

export default useDetectMobile;
