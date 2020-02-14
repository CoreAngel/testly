export const maxBreakpoints = {
    mobile: 480,
};

export const checkIsMobile = () => window.matchMedia(`screen and (max-width: ${maxBreakpoints.mobile}px)`).matches;
export const checkIsDesktop = () => !checkIsMobile();
