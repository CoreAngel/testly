import { finishLoadingWithError, setList, setListIdentifier, startLoading } from 'redux/listReducer';
import { store } from 'redux/store';
import { originType } from 'static/list';

const LocalLoadServer = {
    load: (id, dispatch) => {
        dispatch(startLoading());
        const state = store.getState();
        const {
            localLists: { lists },
        } = state;
        const list = lists.find(({ key }) => key === id);
        if (list === null) {
            dispatch(finishLoadingWithError('Wrong list id'));
            dispatch(
                setListIdentifier({
                    key: id,
                    origin: originType.Local,
                }),
            );
        }
        dispatch(
            setList({
                ...list,
                origin: originType.Local,
            }),
        );
    },
    cancel: () => {},
};

export default LocalLoadServer;
