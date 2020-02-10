import { useEffect } from 'react';
import keyCodes from 'utils/keyCodes';

/**
 * @param {function} callback - Function called when escape button keyDown
 * @param {boolean} [isRun=true] - Is the hook run
 */
const useEscPress = (callback, isRun = true) => {
    useEffect(() => {
        if (!isRun) return () => {};

        const escPress = e => {
            const { keyCode } = e;
            if (keyCode === keyCodes.esc) {
                callback();
            }
        };

        window.addEventListener('keydown', escPress);
        return () => window.removeEventListener('keydown', escPress);
    }, [isRun, callback]);
};

export default useEscPress;
