import React from "react";
import Question from './Question'

const QuestionsList = ({questions}) => {

    return (
        <div>
            {questions.map((item, index) =><Question key={index} number={index + 1} question={item.q} answers={item.a} correct={item.c}/>)}
        </div>
    )
};

export default QuestionsList;
