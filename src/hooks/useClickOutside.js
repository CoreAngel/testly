import { useEffect } from 'react';

/**
 * @param {object} params - Parameters for hook
 * @param {function} params.callback - Function called when clicked outside target
 * @param {ref} params.targetRef - Ref for target element (click event will be ignoring)
 * @param {ref} [params.containerRef=document] - Ref for element on which set click event
 * @param {boolean} [params.isRun=true] - Is the hook run
 */
const useClickOutside = params => {
    const defaultParams = {
        containerRef: { current: document },
        isRun: true,
    };
    const { isRun } = { ...defaultParams, ...params };

    useEffect(() => {
        const { callback, targetRef, containerRef } = { ...defaultParams, ...params };
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
    }, [isRun]);
};

export default useClickOutside;
