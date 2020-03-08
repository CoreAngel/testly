import { createSlice } from '@reduxjs/toolkit';
import { originType, testType } from 'static/list';

const listSlice = createSlice({
    name: 'list',
    initialState: {
        list: {
            name: '',
            key: '',
            origin: originType.Local,
            type: testType.Single,
            protected: false,
            questions: [],
        },
        loading: false,
        error: '',
    },
    reducers: {
        setList: (state, { payload }) => ({
            ...state,
            list: { ...payload },
            loading: false,
            error: '',
        }),
        setListIdentifier: (state, { payload: { key, origin } }) => ({
            ...state,
            list: {
                ...state.list,
                key,
                origin,
            },
        }),
        startLoading: state => ({ ...state, loading: true, error: '' }),
        finishLoadingWithSuccess: state => ({
            ...state,
            loading: false,
            error: '',
        }),
        finishLoadingWithError: (state, { payload }) => ({
            ...state,
            loading: false,
            error: payload,
        }),
    },
});

const { actions, reducer } = listSlice;
const { setList, finishLoadingWithError, finishLoadingWithSuccess, startLoading, setListIdentifier } = actions;
export { setList, finishLoadingWithError, finishLoadingWithSuccess, startLoading, setListIdentifier };
export default reducer;
