import { createSlice } from '@reduxjs/toolkit';

const listSlice = createSlice({
    name: 'list',
    initialState: {
        name: '',
        key: '',
        list: [],
    },
    reducers: {
        setList: (state, action) => ({ ...action.payload }),
    },
});

const { actions, reducer } = listSlice;
const { setList } = actions;
export { setList };
export default reducer;
