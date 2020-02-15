import React from 'react';
import { connect } from 'react-redux';
import Question from 'components/Question/Question';
import { testProps } from 'utils/propTypes';
import { FailsContainer } from './ResultView.style';

const ResultView = ({ test: { list } }) => {
    const failedQuestions = list.filter(item => item.fails > 0).sort((i1, i2) => i1.index - i2.index);

    const failedCounter = failedQuestions.length;
    const questionNumber = list.length;

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

ResultView.propTypes = {
    test: testProps.isRequired,
};

const mapStateToProps = ({ test }) => ({
    test,
});

export default connect(mapStateToProps)(ResultView);
