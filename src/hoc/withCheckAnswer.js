import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { answerType } from 'static/list';
import { testProps } from 'utils/propTypes';
import { setSelected } from 'redux/testReducer';

const withCheckAnswer = Component => {
    // eslint-disable-next-line camelcase
    const Wrapper = ({
        test_withCheckAnswer: test,
        animationTime__withCheckAnswer: animationTime,
        setSelected_withCheckAnswer: setSelectedAction,
        ...props
    }) => {
        const { list, index } = test;
        const question = list[index];

        const isEndList = index + 1 === list.length;
        const isGoNext = question.a.filter(({ c }) => c).every(({ s }) => s);

        const checkAnswer = ind => {
            if (isGoNext) return;

            const { a } = question;
            const isInAnswersRange = ind < a.length;
            const isInQuestionsRange = index < list.length;
            if (!isInAnswersRange || !isInQuestionsRange) return;

            const isCorrect = a[ind].c === answerType.Correct;
            const isNonSure = a[ind].c === answerType.NotSure;
            const isFail = !isCorrect && !isNonSure;

            setSelectedAction({ index: ind, fail: isFail });
        };

        return (
            <Component
                checkAnswer={checkAnswer}
                isGoNext={isGoNext}
                isEndList={isEndList}
                animationTime={animationTime}
                {...props}
            />
        );
    };

    Wrapper.propTypes = {
        test_withCheckAnswer: testProps.isRequired,
        animationTime__withCheckAnswer: PropTypes.number.isRequired,
        setSelected_withCheckAnswer: PropTypes.func.isRequired,
    };

    const mapStateToProps = ({ test, options: { animationTime } }) => ({
        test_withCheckAnswer: test,
        animationTime__withCheckAnswer: animationTime,
    });
    const mapDispatchToProps = {
        setSelected_withCheckAnswer: setSelected,
    };

    return connect(mapStateToProps, mapDispatchToProps)(Wrapper);
};

export default withCheckAnswer;
