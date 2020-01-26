import React from "react";
import styled from "styled-components";
import Question from "./Question";

const EndPanel = ({testQuestions}) => {
    const failedQuestions = testQuestions
        .filter(item => item.fails > 0)
        .sort((i1, i2) => i1.index - i2.index);

    return (
        <>
            <p>Failed questions: {failedQuestions.length}/{testQuestions.length}</p>
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

export default EndPanel;
