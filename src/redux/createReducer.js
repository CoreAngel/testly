import { createSlice } from '@reduxjs/toolkit';
import { testType } from 'static/list';
import { validateAnswer, validateAnswers, validateQuestion, validateTest } from '../utils/validation';

const checkQuestion = (question, field) => {
    const { q, d, a } = question;
    if (q[field].length !== 0) return true;
    if (d[field].length !== 0) return true;
    if (a[field].length !== 0) return true;

    const { answers } = a;
    return answers.some(item => item[field].length !== 0);
};

const stringWithValidation = {
    item: '',
    errors: [],
    warnings: [],
};

const initialState = {
    name: { ...stringWithValidation },
    password: { ...stringWithValidation },
    type: {
        item: testType.Multi,
        errors: [],
    },
    questions: [
        {
            lId: 0,
            q: { ...stringWithValidation },
            d: { ...stringWithValidation },
            a: {
                answers: [
                    {
                        lId: 0,
                        i: '',
                        c: true,
                        errors: [],
                        warnings: [],
                    },
                ],
                errors: [],
                warnings: [],
            },
            idIterator: 1,
            error: false,
            warning: false,
        },
    ],
    idIterator: 1,
    isLoading: false,
    error: '',
};

const createReduce = createSlice({
    name: 'create',
    initialState: { ...initialState },
    reducers: {
        reset: () => {
            return { ...initialState };
        },
        setLoadingStart: state => {
            return {
                ...state,
                isLoading: true,
                error: '',
            };
        },
        setLoadingEndError: (state, { payload }) => {
            return {
                ...state,
                isLoading: false,
                error: payload,
            };
        },
        setLoadingEndSuccess: state => {
            return {
                ...state,
                isLoading: false,
                errors: '',
            };
        },
        cleanError: state => ({
            ...state,
            error: '',
        }),
        mergeErrors: (state, { payload }) => {
            const { name, password, type, questions } = payload;

            const questionsList = state.questions.map((stateQuestion, questionIndex) => {
                const { q, d, a } = questions[questionIndex];

                const answers = stateQuestion.a.answers.map((item, answerIndex) => {
                    const payloadAnswer = a.answers[answerIndex];
                    return payloadAnswer === undefined
                        ? { ...item }
                        : {
                              ...item,
                              ...payloadAnswer,
                          };
                });

                return questions[questionIndex] === undefined
                    ? { ...stateQuestion }
                    : {
                          ...stateQuestion,
                          q: {
                              ...stateQuestion.q,
                              ...q,
                          },
                          d: {
                              ...stateQuestion.d,
                              ...d,
                          },
                          a: {
                              ...stateQuestion.a,
                              ...a,
                              answers,
                          },
                      };
            });

            const finallyQuestionList = questionsList.map(item => {
                return {
                    ...item,
                    error: checkQuestion(item, 'errors'),
                    warning: checkQuestion(item, 'warnings'),
                };
            });

            return {
                ...state,
                name: {
                    ...state.name,
                    ...name,
                },
                password: {
                    ...state.password,
                    ...password,
                },
                type: {
                    ...state.type,
                    ...type,
                },
                questions: finallyQuestionList,
            };
        },
        changeAnswerPosition: (state, { payload }) => {
            const { question, target, destination } = payload;
            const copyQuestions = [...state.questions];
            const questionIndex = state.questions.findIndex(({ lId }) => question === lId);
            if (questionIndex < 0) {
                return state;
            }
            const elem = copyQuestions.splice(questionIndex, 1)[0];

            const copyAnswers = [...elem.a.answers];
            const elemAnswer = copyAnswers.splice(target, 1)[0];
            copyAnswers.splice(destination, 0, elemAnswer);

            copyQuestions.splice(questionIndex, 0, {
                ...elem,
                a: {
                    ...elem.a,
                    answers: copyAnswers,
                },
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
            const elem = copyQuestions[questionIndex];
            const copyAnswers = [...elem.a.answers];

            copyAnswers.splice(target, 1);
            const newQuestion = {
                ...elem,
                a: {
                    ...elem.a,
                    answers: copyAnswers,
                },
            };
            copyQuestions.splice(questionIndex, 1, {
                ...newQuestion,
                error: checkQuestion(newQuestion, 'errors'),
                warning: checkQuestion(newQuestion, 'warnings'),
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
                q: { ...stringWithValidation },
                d: { ...stringWithValidation },
                a: {
                    answers: [
                        {
                            lId: 0,
                            i: '',
                            c: true,
                            errors: [],
                            warnings: [],
                        },
                    ],
                    errors: [],
                    warnings: [],
                },
                error: false,
                warning: false,
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
            const copyAnswers = [...copyQuestion.a.answers];

            copyAnswers.push({
                lId: copyQuestion.idIterator,
                i: '',
                errors: [],
                warnings: [],
            });

            copyQuestions.splice(payload, 1, {
                ...copyQuestion,
                a: {
                    ...copyQuestion.a,
                    answers: copyAnswers,
                },
                idIterator: copyQuestion.idIterator + 1,
            });

            return {
                ...state,
                questions: copyQuestions,
            };
        },
        setList: (state, { payload }) => {
            const { name, password, type } = payload;
            const validationResult = validateTest({ name, password });

            return {
                ...state,
                name: {
                    item: name,
                    ...validationResult.name,
                },
                password: {
                    item: password,
                    ...validationResult.password,
                },
                type: {
                    ...state.type,
                    item: type,
                },
            };
        },
        setQuestion: (state, { payload }) => {
            const { id, question } = payload;
            const copyQuestions = [...state.questions];
            const index = copyQuestions.findIndex(({ lId }) => lId === id);
            if (index < 0) {
                return state;
            }
            const { q, d } = question;
            const validationResult = validateQuestion({ q, d });

            const elem = copyQuestions[index];
            const newQuestion = {
                ...elem,
                q: {
                    item: q,
                    ...validationResult.q,
                },
                d: {
                    item: d,
                    ...validationResult.d,
                },
            };
            copyQuestions.splice(index, 1, {
                ...newQuestion,
                error: checkQuestion(newQuestion, 'errors'),
                warning: checkQuestion(newQuestion, 'warnings'),
            });

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

            const elem = copyQuestions[indexQuestion];
            const copyAnswers = [...elem.a.answers];
            const indexAnswer = copyAnswers.findIndex(({ lId }) => lId === idAnswer);
            if (indexAnswer < 0) {
                return state;
            }

            const { i } = answer;
            const validationResultAnswer = validateAnswer({ i });
            copyAnswers.splice(indexAnswer, 1, {
                ...copyAnswers[indexAnswer],
                ...validationResultAnswer,
                ...answer,
            });

            const validationResultAnswers = validateAnswers(copyAnswers);
            const newQuestion = {
                ...elem,
                a: {
                    ...elem.a,
                    ...validationResultAnswers,
                    answers: copyAnswers,
                },
            };
            copyQuestions.splice(indexQuestion, 1, {
                ...newQuestion,
                error: checkQuestion(newQuestion, 'errors'),
                warning: checkQuestion(newQuestion, 'warnings'),
            });

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
    mergeErrors,
    cleanError,
    setLoadingEndError,
    setLoadingEndSuccess,
    setLoadingStart,
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
    mergeErrors,
    cleanError,
    setLoadingEndError,
    setLoadingEndSuccess,
    setLoadingStart,
};
export default reducer;
