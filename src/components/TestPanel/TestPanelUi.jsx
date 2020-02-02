import React, {useCallback, useEffect} from "react";
import Question from "../Question";
import ButtonAnswers from "../ButtonAnswers";

const TestPanelUi = ({questionCounter, questionsNumber, question, answers, checkAnswer, keyPress}) => {

    const onClick = useCallback((event) => {
        const button = event.target;
        const index = button.getAttribute('data-index');
        button.blur();
        checkAnswer(+index);
    }, [checkAnswer]);

    const onKeyPress = useCallback((event) => {
        const {keyCode} = event;
        keyPress(keyCode);
    }, [keyPress]);

    useEffect(() => {
        window.addEventListener('keypress', onKeyPress);
        return () => window.removeEventListener('keypress', onKeyPress);
    }, [onKeyPress]);

    return (
        <div>
            <p>{questionCounter}/{questionsNumber}</p>
            <Question number={questionCounter} answers={answers} question={question}/>
            <ButtonAnswers answers={answers} onClick={onClick}/>
        </div>
    );
};

export default TestPanelUi;
