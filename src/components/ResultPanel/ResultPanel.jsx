import React from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import Question from "../Question";

const ResultPanel = ({questions}) => {
    const failedQuestions = questions
        .filter(item => item.fails > 0)
        .sort((i1, i2) => i1.index - i2.index);

    return (
        <>
            <p>Failed answers: {failedQuestions.length}/{questions.length}</p>
            <div>
                {failedQuestions.map(item => {
                    const {index, q, a, c, fails} = item;
                    return <>
                            <Question key={index} number={index + 1} question={q} answers={a} correct={c}/>
                            <FailsContainer>Fails: {fails}</FailsContainer>
                        </>
                })}
            </div>
        </>
    )
};

const FailsContainer = styled.p`
  margin-left: 35px;
`;

const mapStateToProps = (store) => {
    const {test: {questions}} = store;

    return {
        questions
    }
};

export default connect(mapStateToProps)(ResultPanel);
