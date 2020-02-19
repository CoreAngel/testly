import React from 'react';
import { connect } from 'react-redux';
import { MainContainer } from 'utils/style';
import Question from 'components/Question/Question';
import { testProps } from 'utils/propTypes';

const ResultView = ({ test: { list } }) => {
    const failedQuestions = list.filter(item => item.f).sort((i1, i2) => i1.id - i2.id);

    const failedCounter = failedQuestions.length;
    const questionNumber = list.length;

    return (
        <MainContainer>
            <p>{`Failed answers: ${failedCounter}/${questionNumber}`}</p>
            <div>
                {failedQuestions.map(item => {
                    const { id, q, a } = item;

                    return (
                        <>
                            <Question key={id} number={id + 1} question={q} answers={a} includeSelected />
                        </>
                    );
                })}
            </div>
        </MainContainer>
    );
};

ResultView.propTypes = {
    test: testProps.isRequired,
};

const mapStateToProps = ({ test }) => ({
    test,
});

export default connect(mapStateToProps)(ResultView);
