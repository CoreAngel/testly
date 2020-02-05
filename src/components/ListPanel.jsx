import React from "react";
import {connect} from "react-redux";
import ChooseList from "./ChooseList";

const ListPanel = ({questions}) => {
    return (
        <>
            <ChooseList/>
            {/*{ questions.length > 0 && <QuestionsList questions={questions}/> }*/}
        </>
    )
};

const mapStateToProps = (state) => {
    const { question } = state;

    return {
        questions: question
    }
};

export default connect(mapStateToProps)(ListPanel);
