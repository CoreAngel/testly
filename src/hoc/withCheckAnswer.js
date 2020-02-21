import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { answerType } from 'static/list';
import { testQuestionProps } from 'utils/propTypes';
import { setSelected } from 'redux/testReducer';

const withCheckAnswer = Component => {
    // eslint-disable-next-line camelcase
    const Wrapper = ({
        index_withCheckAnswer: index,
        question_withCheckAnswer: question,
        listLength_withCheckAnswer: listLength,
        animationTime_withCheckAnswer: animationTime,
        setSelected_withCheckAnswer: setSelectedAction,
        ...props
    }) => {
        const isListEnd = index + 1 === listLength;
        const isGoNext = question.a.filter(({ c }) => c).every(({ s }) => s);

        const checkAnswer = useCallback(
            ind => {
                if (isGoNext) return;

                const { a } = question;
                const isInAnswersRange = ind < a.length;
                const isInQuestionsRange = index < listLength;
                if (!isInAnswersRange || !isInQuestionsRange) return;

                const isCorrect = a[ind].c === answerType.Correct;
                const isNonSure = a[ind].c === answerType.NotSure;
                const isFail = !isCorrect && !isNonSure;

                setSelectedAction({ index: ind, fail: isFail });
            },
            [isGoNext, question, index, listLength, setSelectedAction],
        );

        return (
            <Component
                checkAnswer={checkAnswer}
                isGoNext={isGoNext}
                isListEnd={isListEnd}
                animationTime={animationTime}
                {...props}
            />
        );
    };

    Wrapper.propTypes = {
        index_withCheckAnswer: PropTypes.number.isRequired,
        question_withCheckAnswer: testQuestionProps.isRequired,
        listLength_withCheckAnswer: PropTypes.number.isRequired,
        animationTime_withCheckAnswer: PropTypes.number.isRequired,
        setSelected_withCheckAnswer: PropTypes.func.isRequired,
    };

    const mapStateToProps = ({ test: { list, index }, options: { animationTime } }) => ({
        index_withCheckAnswer: index,
        question_withCheckAnswer: list[index],
        listLength_withCheckAnswer: list.length,
        animationTime_withCheckAnswer: animationTime,
    });
    const mapDispatchToProps = {
        setSelected_withCheckAnswer: setSelected,
    };

    return connect(mapStateToProps, mapDispatchToProps)(Wrapper);
};

export default withCheckAnswer;
