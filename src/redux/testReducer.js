import { createSlice } from '@reduxjs/toolkit';
import { testType } from 'static/list';

const testSlice = createSlice({
    name: 'test',
    initialState: {
        name: '',
        key: '',
        type: testType.Single,
        list: [],
        index: 0,
        end: false,
    },
    reducers: {
        setTest: (state, action) => ({
            ...action.payload,
            index: 0,
            end: false,
        }),
        setList: (state, action) => ({
            ...state,
            list: [...action.payload],
            index: 0,
            end: false,
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
        setEnd: state => ({
            ...state,
            end: true,
        }),
        setSelected: (state, action) => {
            const { list, index } = state;
            const { index: selectedAnswerIndex, fail } = action.payload;

            const copyList = [...list];
            const copyQuestion = { ...copyList[index] };
            const copyAnswers = [...copyQuestion.a];

            copyAnswers.splice(selectedAnswerIndex, 1, {
                ...copyAnswers[selectedAnswerIndex],
                s: true,
            });

            const finalQuestion = {
                ...copyQuestion,
                a: copyAnswers,
            };

            copyList.splice(index, 1, {
                ...finalQuestion,
                f: fail || !!finalQuestion.f,
            });

            return {
                ...state,
                list: copyList,
            };
        },
    },
});

const { actions, reducer } = testSlice;
const { setTest, setList, nextQuestion, setSelected, setEnd } = actions;
export { setTest, setList, nextQuestion, setSelected, setEnd };
export default reducer;
