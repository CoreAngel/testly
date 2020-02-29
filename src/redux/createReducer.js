import { createSlice } from '@reduxjs/toolkit';
import { testType } from 'static/list';

const initialState = {
    name: '',
    password: '',
    type: testType.Multi,
    questions: [
        {
            lId: 0,
            q: '',
            d: '',
            a: [{ lId: 0, i: '', c: true }],
            idIterator: 1,
        },
    ],
    idIterator: 1,
};

const createReduce = createSlice({
    name: 'create',
    initialState: { ...initialState },
    reducers: {
        reset: () => {
            return { ...initialState };
        },
        changeAnswerPosition: (state, { payload }) => {
            const { question, target, destination } = payload;
            const copyQuestions = [...state.questions];
            const questionIndex = state.questions.findIndex(({ lId }) => question === lId);
            if (questionIndex < 0) {
                return state;
            }
            const elem = copyQuestions.splice(questionIndex, 1)[0];

            const copyAnswers = [...elem.a];
            const elemAnswer = copyAnswers.splice(target, 1)[0];
            copyAnswers.splice(destination, 0, elemAnswer);

            copyQuestions.splice(questionIndex, 0, {
                ...elem,
                a: copyAnswers,
            });

            return {
                ...state,
                questions: copyQuestions,
            };
        },
        changeQuestionPosition: (state, { payload }) => {
            const { target, destination } = payload;

            const copyQuestions = [...state.questions];
            const elem = copyQuestions.splice(target, 1)[0];
            copyQuestions.splice(destination, 0, elem);

            return {
                ...state,
                questions: copyQuestions,
            };
        },
        deleteQuestion: (state, { payload }) => {
            const copyQuestions = [...state.questions];
            copyQuestions.splice(payload, 1);

            return {
                ...state,
                questions: copyQuestions,
            };
        },
        deleteAnswer: (state, { payload }) => {
            const { question, target } = payload;
            const questionIndex = state.questions.findIndex(({ lId }) => Number.parseInt(question, 10) === lId);
            if (questionIndex < 0) {
                return state;
            }
            const copyQuestions = [...state.questions];
            const copyAnswers = [...copyQuestions[questionIndex].a];

            copyAnswers.splice(target, 1);
            copyQuestions.splice(questionIndex, 1, {
                ...copyQuestions[questionIndex],
                a: copyAnswers,
            });

            return {
                ...state,
                questions: copyQuestions,
            };
        },
        addQuestion: state => {
            const copyQuestions = [...state.questions];
            copyQuestions.push({
                lId: state.idIterator,
                q: '',
                d: '',
                a: [{ lId: 0, i: '', c: true }],
                idIterator: 1,
            });

            return {
                ...state,
                questions: copyQuestions,
                idIterator: state.idIterator + 1,
            };
        },
        addAnswer: (state, { payload }) => {
            const copyQuestions = [...state.questions];
            const copyQuestion = copyQuestions[payload];
            const copyAnswers = [...copyQuestion.a];

            copyAnswers.push({
                lId: copyQuestion.idIterator,
                i: '',
            });

            copyQuestions.splice(payload, 1, {
                ...copyQuestion,
                a: copyAnswers,
                idIterator: copyQuestion.idIterator + 1,
            });

            return {
                ...state,
                questions: copyQuestions,
            };
        },
        setList: (state, { payload }) => {
            return {
                ...state,
                ...payload,
            };
        },
        setQuestion: (state, { payload }) => {
            const { id, question } = payload;
            const copyQuestions = [...state.questions];
            const index = copyQuestions.findIndex(({ lId }) => lId === id);
            if (index < 0) {
                return state;
            }
            const newQuestion = {
                ...copyQuestions[index],
                ...question,
            };
            copyQuestions.splice(index, 1, newQuestion);

            return {
                ...state,
                questions: copyQuestions,
            };
        },
        setAnswer: (state, { payload }) => {
            const { idQuestion, idAnswer, answer } = payload;
            const copyQuestions = [...state.questions];
            const indexQuestion = copyQuestions.findIndex(({ lId }) => lId === idQuestion);
            if (indexQuestion < 0) {
                return state;
            }

            const copyAnswers = [...copyQuestions[indexQuestion].a];
            const indexAnswer = copyAnswers.findIndex(({ lId }) => lId === idAnswer);
            if (indexAnswer < 0) {
                return state;
            }

            copyAnswers.splice(indexAnswer, 1, answer);

            const newQuestion = {
                ...copyQuestions[indexQuestion],
                a: copyAnswers,
            };
            copyQuestions.splice(indexQuestion, 1, newQuestion);

            return {
                ...state,
                questions: copyQuestions,
            };
        },
    },
});

const { actions, reducer } = createReduce;
const {
    addQuestion,
    addAnswer,
    changeQuestionPosition,
    changeAnswerPosition,
    deleteQuestion,
    deleteAnswer,
    reset,
    setQuestion,
    setList,
    setAnswer,
} = actions;
export {
    addQuestion,
    addAnswer,
    changeQuestionPosition,
    changeAnswerPosition,
    deleteQuestion,
    deleteAnswer,
    reset,
    setQuestion,
    setList,
    setAnswer,
};
export default reducer;
