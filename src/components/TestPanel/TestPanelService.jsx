import React from "react";
import {connect} from "react-redux";
import TestPanelUi from "./TestPanelUi";
import {nextQuestion, addFail} from "../../redux/testStore";
import keyCodes from "../../util/keyCodes";

const TestPanelService = ({questions, currentIndex, nextQuestionAction, addFailAction}) => {
   const { q, a, c } = questions[currentIndex];

    const checkAnswer = (index) => {
        if (c === index) {
            if (currentIndex + 1 < questions.length) {
                nextQuestionAction()
            }
        } else {
            addFailAction(currentIndex);
        }
    };

    const onKeyPress = (keyCode) => {
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
    };

    return <TestPanelUi
        answers={a}
        question={q}
        checkAnswer={checkAnswer}
        keyPress={onKeyPress}
        questionCounter={currentIndex + 1}
        questionsNumber={questions.length}
    />;
};


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

export default connect(mapStateToProps, mapDispatchToProps)(TestPanelService);
