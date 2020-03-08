import { finishLoadingWithError, setList, setListIdentifier, startLoading } from 'redux/listReducer';
import { getList } from 'utils/fetchData';
import { originType } from 'static/list';

let didCancel = false;

const ServerLoadService = {
    load: async (id, dispatch) => {
        didCancel = false;

        dispatch(startLoading());
        try {
            const res = await getList(id);

            if (res.status === 200) {
                const data = await res.json();
                if (!didCancel) {
                    dispatch(
                        setList({
                            ...data,
                            origin: originType.Server,
                        }),
                    );
                }
            } else if (res.status === 500) {
                dispatch(finishLoadingWithError('Internal server error'));
            } else {
                dispatch(finishLoadingWithError('Wrong list id'));
                dispatch(
                    setListIdentifier({
                        key: id,
                        origin: originType.Server,
                    }),
                );
            }
        } catch (e) {
            dispatch(finishLoadingWithError('Problem witch fetching data'));
        }
    },
    cancel: () => {
        didCancel = true;
    },
};

export default ServerLoadService;
