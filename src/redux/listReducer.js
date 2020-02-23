import { createSlice } from '@reduxjs/toolkit';
import { testType } from 'static/list';

const listSlice = createSlice({
    name: 'list',
    initialState: {
        list: {
            name: '',
            key: '',
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
        setKey: (state, { payload }) => ({
            ...state,
            list: {
                ...state.list,
                key: payload,
            },
        }),
        startLoading: state => ({ ...state, loading: true }),
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
const { setList, finishLoadingWithError, finishLoadingWithSuccess, startLoading, setKey } = actions;
export { setList, finishLoadingWithError, finishLoadingWithSuccess, startLoading, setKey };
export default reducer;
