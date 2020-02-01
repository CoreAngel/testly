import React from "react";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import ResultPanel from "./ResultPanel";

const RouteProtector = ({questions}) => {
    const history = useHistory();

    if (questions.length === 0) {
        history.replace('/');
        return null;
    }

    return <ResultPanel />
};

const mapStateToProps = (store) => {
    const {test: {questions}} = store;

    return {
        questions,
    }
};

export default connect(mapStateToProps)(RouteProtector);
