import React, {useEffect} from "react";
import Question from "./Question";
import styled from "styled-components";
import {Button} from "reactstrap";

const TestPanel = ({testQuestions, setTestQuestions, currentQuestion, setCurrentQuestion, setEndTest}) => {
    const { q, a, c } = testQuestions.slice(currentQuestion, currentQuestion + 1).pop();

    const checkAnswer = (index) => {
        console.log(index);
        if (c === index) {
            if (currentQuestion + 1 < testQuestions.length) {
                setCurrentQuestion(currentQuestion + 1)
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

        checkAnswer(index);
    };

    const onClick = (event) => {
        const button = event.target;
        const index = button.getAttribute('data-index');
        checkAnswer(+index);
    };

    useEffect(() => {
        window.addEventListener('keypress', keyUpFun);
        return () => window.removeEventListener('keypress', keyUpFun);
    }, [keyUpFun, checkAnswer]);

    return (
        <div>
            <p>{currentQuestion + 1}/{testQuestions.length}</p>
            <Question number={currentQuestion + 1} answers={a} question={q}/>
            <ButtonContainer>
                {
                    a.map((item, index) => (
                        <ButtonWithMaring data-index={index} key={index} color='primary' onClick={onClick}>
                            {String.fromCharCode(65 + index)}
                        </ButtonWithMaring>)
                    )
                }
            </ButtonContainer>
        </div>
    );
};

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 50px;
`;

const ButtonWithMaring = styled(Button)`
  margin: 0 10px;
`;

export default TestPanel;
