import { createSlice } from '@reduxjs/toolkit';

const listSlice = createSlice({
    name: 'list',
    initialState: {
        list: {
            name: '',
            key: '',
            type: '',
            questions: [],
        },
    },
    reducers: {
        setList: (state, action) => ({
            ...state,
            list: { ...action.payload },
        }),
    },
});

const { actions, reducer } = listSlice;
const { setList } = actions;
export { setList };
export default reducer;
