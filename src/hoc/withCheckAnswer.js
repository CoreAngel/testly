import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { answerType, testType } from 'static/list';
import { testQuestionProps, typeListProp } from 'utils/propTypes';
import { setSelected } from 'redux/testReducer';

const withCheckAnswer = Component => {
    // eslint-disable-next-line camelcase
    const Wrapper = ({
        index_withCheckAnswer: index,
        question_withCheckAnswer: question,
        listType_withCheckAnswer: type,
        questionsLength_withCheckAnswer: questionsLength,
        animationTime_withCheckAnswer: animationTime,
        setSelected_withCheckAnswer: setSelectedAction,
        ...props
    }) => {
        const correctAnswers = question.a.filter(({ c }) => c === answerType.Correct || c === answerType.NotSure);
        const isGoNext =
            type === testType.Single ? correctAnswers.some(({ s }) => s) : correctAnswers.every(({ s }) => s);
        const isQuestionsEnd = index + 1 === questionsLength;

        const checkAnswer = useCallback(
            ind => {
                if (isGoNext) return;

                const { a } = question;
                const isInAnswersRange = ind < a.length;
                const isInQuestionsRange = index < questionsLength;
                if (!isInAnswersRange || !isInQuestionsRange) return;

                const isCorrect = a[ind].c === answerType.Correct;
                const isNonSure = a[ind].c === answerType.NotSure;
                const isFail = !isCorrect && !isNonSure;

                setSelectedAction({ index: ind, fail: isFail });
            },
            [isGoNext, question, index, questionsLength, setSelectedAction],
        );

        return (
            <Component
                checkAnswer={checkAnswer}
                isGoNext={isGoNext}
                isQuestionsEnd={isQuestionsEnd}
                animationTime={animationTime}
                {...props}
            />
        );
    };

    Wrapper.propTypes = {
        index_withCheckAnswer: PropTypes.number.isRequired,
        question_withCheckAnswer: testQuestionProps.isRequired,
        listType_withCheckAnswer: typeListProp.isRequired,
        questionsLength_withCheckAnswer: PropTypes.number.isRequired,
        animationTime_withCheckAnswer: PropTypes.number.isRequired,
        setSelected_withCheckAnswer: PropTypes.func.isRequired,
    };

    const mapStateToProps = ({ test: { questions, index, type }, options: { animationTime } }) => ({
        index_withCheckAnswer: index,
        question_withCheckAnswer: questions[index],
        listType_withCheckAnswer: type,
        questionsLength_withCheckAnswer: questions.length,
        animationTime_withCheckAnswer: animationTime,
    });
    const mapDispatchToProps = {
        setSelected_withCheckAnswer: setSelected,
    };

    return connect(mapStateToProps, mapDispatchToProps)(Wrapper);
};

export default withCheckAnswer;
