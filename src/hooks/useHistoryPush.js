import { useHistory, useLocation } from 'react-router-dom';

const useHistoryPush = path => {
    const { pathname } = useLocation();
    const { push } = useHistory();

    if (pathname !== path) {
        return (param = '') => push(path + param);
    }

    return () => {};
};

export default useHistoryPush;
