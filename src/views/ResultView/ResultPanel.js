import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Question from '../../components/Question';

const FailsContainer = styled.p`
    margin-left: 35px;
`;

const ResultPanel = ({ questions }) => {
    const failedQuestions = questions.filter(item => item.fails > 0).sort((i1, i2) => i1.index - i2.index);

    const failedCounter = failedQuestions.length;
    const questionNumber = questions.length;

    return (
        <>
            <p>{`Failed answers: ${failedCounter}/${questionNumber}`}</p>
            <div>
                {failedQuestions.map(item => {
                    const { index, q, a, c, fails } = item;

                    return (
                        <>
                            <Question key={index} number={index + 1} question={q} answers={a} correct={c} />
                            <FailsContainer>Fails: {fails}</FailsContainer>
                        </>
                    );
                })}
            </div>
        </>
    );
};

ResultPanel.propTypes = {
    questions: PropTypes.arrayOf(
        PropTypes.shape({
            index: PropTypes.number.isRequired,
            q: PropTypes.string.isRequired,
            a: PropTypes.arrayOf(PropTypes.string).isRequired,
            c: PropTypes.number.isRequired,
            fails: PropTypes.number.isRequired,
        }),
    ).isRequired,
};

const mapStateToProps = store => {
    const {
        test: { questions },
    } = store;

    return {
        questions,
    };
};

export default connect(mapStateToProps)(ResultPanel);
