import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { testProps } from 'utils/propTypes';
import { MainContainer } from 'utils/style';
import TestHeader from 'components/TestHeader';
import Answers from 'components/Answers';
import { TestQuestion } from './TestView.style';

const TestView = ({ test: { index, name, key, questions } }) => {
    const [position, setPosition] = useState(index);

    const question = questions[position];
    const { q, a } = question;

    useEffect(() => {
        setPosition(prevPos => {
            const isShouldSetPositionOnLastQuestion = prevPos === index - 1;
            return isShouldSetPositionOnLastQuestion ? index : prevPos;
        });
    }, [index]);

    return (
        <>
            <MainContainer>
                <TestHeader
                    index={index}
                    position={position}
                    setPosition={setPosition}
                    questionsLength={questions.length}
                    testKey={key}
                    name={name}
                />
                <TestQuestion>{q}</TestQuestion>
            </MainContainer>
            <Answers answers={a} position={position} />
        </>
    );
};

TestView.propTypes = {
    test: testProps.isRequired,
};

const mapStateToProps = ({ test }) => ({ test });

export default connect(mapStateToProps)(TestView);
