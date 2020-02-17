import { createSlice } from '@reduxjs/toolkit';

const testSlice = createSlice({
    name: 'test',
    initialState: {
        name: '',
        key: '',
        type: '',
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

            if (fail) {
                copyList.splice(index, 1, {
                    ...finalQuestion,
                    f: true,
                });
            } else {
                copyList.splice(index, 1, {
                    ...finalQuestion,
                });
            }

            return {
                ...state,
                list: copyList,
            };
        },
    },
});

const { actions, reducer } = testSlice;
const { setTest, nextQuestion, setSelected } = actions;
export { setTest, nextQuestion, setSelected };
export default reducer;
