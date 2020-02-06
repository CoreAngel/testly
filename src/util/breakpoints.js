export const maxBreakpoints = {
    mobile: 480,
};

export const checkIsMobile = () => window.matchMedia(`(max-width: ${maxBreakpoints.mobile}px)`).matches;
export const checkIsDesktop = () => !checkIsMobile();
