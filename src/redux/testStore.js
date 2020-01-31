import {createSlice} from '@reduxjs/toolkit'

const testSlice = createSlice({
    name: 'test',
    initialState: [],
    reducers: {
        setTest: (state, action) => [...action.payload],
    }
});

const { actions, reducer } = testSlice;
const { setTest } = actions;
export {setTest}
export default reducer;
