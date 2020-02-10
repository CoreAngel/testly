import { useEffect } from 'react';

/**
 * @param {function} callback - Function called when clicked outside target
 * @param {ref} targetRef - Ref for target element (click event will be ignoring)
 * @param {object} options - Optional parameters for hook
 * @param {ref} [options.containerRef=document] - Ref for element on which set click event
 * @param {boolean} [options.isRun=true] - Is the hook run
 */
const useClickOutside = (callback, targetRef, { containerRef = { current: document }, isRun = true } = {}) => {
    useEffect(() => {
        if (!isRun) return () => {};

        const clickOutside = e => {
            const { target } = e;
            const targetElem = targetRef.current;

            if (!targetElem.contains(target)) {
                callback();
            }
        };

        const container = containerRef.current;
        container.addEventListener('click', clickOutside);
        return () => container.removeEventListener('click', clickOutside);
    }, [isRun, targetRef, containerRef, callback]);
};

export default useClickOutside;
