import React from "react";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import TestPanel from "./TestPanel";

const RouteProtector = ({questions, currentIndex}) => {
    const history = useHistory();

    if (questions.length === 0) {
        history.replace('/');
        return null;
    }

    if (currentIndex === questions.length - 1) {
        history.replace('/result');
        return null;
    }

    return <TestPanel />
};

const mapStateToProps = (store) => {
    const {test: {questions, currentIndex}} = store;

    return {
        questions,
        currentIndex
    }
};

export default connect(mapStateToProps)(RouteProtector);
