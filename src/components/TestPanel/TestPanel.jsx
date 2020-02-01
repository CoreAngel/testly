import React, {useCallback, useEffect} from "react";
import Question from "../Question";
import styled from "styled-components";
import {Button} from "reactstrap";
import {connect} from "react-redux";
import {nextQuestion, addFail} from "../../redux/testStore";
import keyCodes from "../../util/keyCodes";

const TestPanel = ({questions, currentIndex, nextQuestionAction, addFailAction}) => {
   const { q, a, c } = questions[currentIndex];

    const checkAnswer = useCallback((index) => {
        if (c === index) {
            if (currentIndex + 1 < questions.length) {
                nextQuestionAction()
            }
        } else {
            console.log('lol')
            addFailAction(currentIndex);
        }
    }, [currentIndex, questions.length, nextQuestionAction, addFailAction, c]);

    const keyPressFun = useCallback((event) => {
        const {keyCode} = event;

        let index;
        if (keyCode >= keyCodes.N1 && keyCode <= keyCodes.N9) {
            index = keyCode - keyCodes.N1;
        } else if (keyCode >= keyCodes.a && keyCode <= keyCodes.z) {
            index = keyCode - keyCodes.a;
        } else if (keyCode >= keyCodes.A && keyCode <= keyCodes.Z) {
            index = keyCode - keyCodes.A;
        } else {
            return;
        }

        if (index >= a.length) {
            return;
        }

        checkAnswer(index);
    }, [checkAnswer, a.length]);

    const onClick = (event) => {
        const button = event.target;
        const index = button.getAttribute('data-index');
        button.blur();
        checkAnswer(+index);
    };

    useEffect(() => {
        window.addEventListener('keypress', keyPressFun);
        return () => window.removeEventListener('keypress', keyPressFun);
    }, [keyPressFun, checkAnswer]);

    return (
        <div>
            <p>{currentIndex + 1}/{questions.length}</p>
            <Question number={currentIndex + 1} answers={a} question={q}/>
            <ButtonContainer>
                {
                    a.map((item, index) => (
                        <ButtonWithMargin data-index={index} key={index} color='primary' onClick={onClick}>
                            {String.fromCharCode(keyCodes.A + index)}
                        </ButtonWithMargin>)
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

const ButtonWithMargin = styled(Button)`
  margin: 0 10px;
`;

const mapStateToProps = (store) => {
    const {test: {questions, currentIndex}} = store;

    return {
        questions,
        currentIndex
    }
};

const mapDispatchToProps = {
    nextQuestionAction: nextQuestion,
    addFailAction: addFail
};

export default connect(mapStateToProps, mapDispatchToProps)(TestPanel);
