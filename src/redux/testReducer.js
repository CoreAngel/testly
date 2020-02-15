import { createSlice } from '@reduxjs/toolkit';

const testSlice = createSlice({
    name: 'test',
    initialState: {
        name: '',
        key: '',
        list: [],
        index: 0,
    },
    reducers: {
        setTest: (state, action) => ({
            ...action.payload,
            index: 0,
        }),
        nextQuestion: state => {
            const { index, list } = state;

            if (index + 1 >= list.length) {
                return state;
            }

            return {
                ...state,
                index: index + 1,
            };
        },
        prevQuestion: state => {
            const { index } = state;

            if (index - 1 < 0) {
                return state;
            }

            return {
                ...state,
                index: index - 1,
            };
        },
        addFail: state => {
            const { list, index } = state;

            const copyList = [...list];
            copyList.splice(index, 1, {
                ...copyList[index],
                fails: copyList[index].fails + 1,
            });

            return {
                ...state,
                list: copyList,
            };
        },
    },
});

const { actions, reducer } = testSlice;
const { setTest, nextQuestion, prevQuestion, addFail } = actions;
export { setTest, nextQuestion, prevQuestion, addFail };
export default reducer;
