import React, {useEffect} from "react";
import Question from "./Question";
import styled from "styled-components";

const TestPanel = ({testQuestions, setTestQuestions, currentQuestion, setCurrentQuestion, setEndTest}) => {
    const { q, a, c } = testQuestions.slice(currentQuestion, currentQuestion + 1).pop();

    const keyUpFun = event => {
        const {keyCode} = event;

        let index;
        if (keyCode >= 49 && keyCode <= 57) {
            index = keyCode - 49;
        } else if (keyCode >= 65 && keyCode <= 90) {
            index = keyCode - 65;
        } else if (keyCode >= 97 && keyCode <= 122) {
            index = keyCode - 97;
        } else {
            return;
        }

        if (index >= a.length) {
            return;
        }

        if (c === index) {
            if (currentQuestion + 1 < testQuestions.length) {
                setCurrentQuestion(currentQuestion+1)
            } else {
                setCurrentQuestion(0);
                setEndTest(true);
            }
        } else {
            const arrCopy = [...testQuestions];
            const current = arrCopy[currentQuestion];
            arrCopy.splice(currentQuestion, 1, {
                ...current,
                fails: current.fails + 1,
            });
            setTestQuestions(arrCopy)
        }
    };

    useEffect(() => {
        window.addEventListener('keypress', keyUpFun);
        return () => window.removeEventListener('keypress', keyUpFun);
    }, [keyUpFun]);

    return (
        <Container>
            <p>{currentQuestion + 1}/{testQuestions.length}</p>
            <Question number={currentQuestion + 1} answers={a} question={q}/>
        </Container>
    );
};

const Container = styled.div`
  
`;

export default TestPanel;
