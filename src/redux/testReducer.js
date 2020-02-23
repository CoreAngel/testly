import { createSlice } from '@reduxjs/toolkit';
import { testType } from 'static/list';

const testSlice = createSlice({
    name: 'test',
    initialState: {
        name: '',
        key: '',
        type: testType.Single,
        questions: [],
        index: 0,
        end: false,
    },
    reducers: {
        setTest: (state, action) => ({
            ...action.payload,
            index: 0,
            end: false,
        }),
        setQuestions: (state, action) => ({
            ...state,
            questions: [...action.payload],
            index: 0,
            end: false,
        }),
        nextQuestion: state => {
            const { index, questions } = state;

            if (index + 1 >= questions.length) {
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
            const { questions, index } = state;
            const { index: selectedAnswerIndex, fail } = action.payload;

            const copyQuestions = [...questions];
            const copyQuestion = { ...copyQuestions[index] };
            const copyAnswers = [...copyQuestion.a];

            copyAnswers.splice(selectedAnswerIndex, 1, {
                ...copyAnswers[selectedAnswerIndex],
                s: true,
            });

            const finalQuestion = {
                ...copyQuestion,
                a: copyAnswers,
            };

            copyQuestions.splice(index, 1, {
                ...finalQuestion,
                f: fail || !!finalQuestion.f,
            });

            return {
                ...state,
                questions: copyQuestions,
            };
        },
    },
});

const { actions, reducer } = testSlice;
const { setTest, setQuestions, nextQuestion, setSelected, setEnd } = actions;
export { setTest, setQuestions, nextQuestion, setSelected, setEnd };
export default reducer;
