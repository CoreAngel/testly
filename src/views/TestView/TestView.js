import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { testProps } from 'utils/propTypes';
import TestHeader from 'components/TestHeader';
import Answers from 'components/Answers';
import { nextQuestion } from 'redux/testReducer';
import { TestQuestion } from './TestView.style';

const TestView = ({ test: { index, name, key, list }, nextQuestionAction }) => {
    const [position, setPosition] = useState(index);
    const question = list[position];
    const { q, a } = question;

    useEffect(() => {
        setPosition(prevPos => {
            const isShouldSetPositionOnLastQuestion = prevPos === index - 1;
            return isShouldSetPositionOnLastQuestion ? index : prevPos;
        });
    }, [index]);

    return (
        <>
            <TestHeader
                index={index}
                position={position}
                setPosition={setPosition}
                listLength={list.length}
                testKey={key}
                name={name}
            />
            <TestQuestion>{q}</TestQuestion>
            <Answers answers={a} index={index} position={position} nextQuestion={nextQuestionAction} />
        </>
    );
};

TestView.propTypes = {
    test: testProps.isRequired,
    nextQuestionAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ test }) => ({ test });
const mapDispatchToProps = {
    nextQuestionAction: nextQuestion,
};

export default connect(mapStateToProps, mapDispatchToProps)(TestView);
