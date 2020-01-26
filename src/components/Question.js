import React from "react";
import styled from "styled-components";

const Question = ({number, question, answers, correct}) => {
    return (
        <QuestionContainer>
            <QuestionText>{`${number}. ${question}`}</QuestionText>
            <AnswersList>
                {answers.map((item, index) => <Answer correct={index === correct} key={index}>{item}</Answer>)}
            </AnswersList>
        </QuestionContainer>
    )
};

const QuestionContainer = styled.div`
    padding: 10px;
`;
const QuestionText = styled.p`
    font-weight: bold;
`;
const AnswersList = styled.ul`
    list-style-type: lower-alpha;
`;

const Answer = styled.li`
    background-color: ${({correct}) => correct ? 'green' : 'none'};
`;

export default Question;
