import {createSlice} from '@reduxjs/toolkit'

const testSlice = createSlice({
    name: 'test',
    initialState: {
        currentIndex: 0,
        questions: []
    },
    reducers: {
        setTest: (state, action) => ({
            ...state,
            currentIndex: 0,
            questions: [...action.payload]
        }),
        nextQuestion: (state) => {
            const {currentIndex, questions} = state;

            if (currentIndex + 1 >= questions.length) {
                return state;
            }

            return {
                ...state,
                currentIndex: currentIndex + 1
            }
        },
        prevQuestion: (state) => {
            const {currentIndex} = state;

            if (currentIndex - 1 < 0) {
                return state;
            }

            return {
                ...state,
                currentIndex: currentIndex - 1
            }
        },
        addFail: (state) => {
            const {questions, currentIndex} = state;

            const copyQuestions = [...questions];
            copyQuestions.splice(currentIndex, 1, {
                ...copyQuestions[currentIndex],
                fails: copyQuestions[currentIndex].fails + 1
            });

            return {
                ...state,
                questions: copyQuestions
            }
        }
    }
});

const { actions, reducer } = testSlice;
const { setTest, nextQuestion, prevQuestion, addFail } = actions;
export { setTest, nextQuestion, prevQuestion, addFail }
export default reducer;
