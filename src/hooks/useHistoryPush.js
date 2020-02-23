import { useHistory, useLocation } from 'react-router-dom';

const useHistoryPush = path => {
    const location = useLocation();
    const history = useHistory();

    if (location.pathname !== path) {
        return (param = '') => history.push(path + param);
    }

    return () => {};
};

export default useHistoryPush;
