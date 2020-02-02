import {useHistory} from 'react-router-dom'
import {useLocation} from 'react-router-dom'

const useHistoryPush = (path) => {
    const location = useLocation();
    const history = useHistory();

    if (location.pathname !== path) {
        return () => history.push(path);
    }

    return () => {};
};

export default useHistoryPush
