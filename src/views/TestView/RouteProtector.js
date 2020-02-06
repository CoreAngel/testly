import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import TestPanel from './TestPanelService';

const RouteProtector = ({ questions, currentIndex }) => {
    const history = useHistory();

    if (questions.length === 0) {
        history.replace('/');
        return null;
    }

    if (currentIndex === questions.length - 1) {
        history.replace('/result');
        return null;
    }

    return <TestPanel />;
};

RouteProtector.propTypes = {
    questions: PropTypes.arrayOf(
        PropTypes.shape({
            index: PropTypes.number.isRequired,
            q: PropTypes.string.isRequired,
            a: PropTypes.arrayOf(PropTypes.string).isRequired,
            c: PropTypes.number.isRequired,
            fails: PropTypes.number.isRequired,
        }),
    ).isRequired,
    currentIndex: PropTypes.number.isRequired,
};

const mapStateToProps = store => {
    const {
        test: { questions, currentIndex },
    } = store;

    return {
        questions,
        currentIndex,
    };
};

export default connect(mapStateToProps)(RouteProtector);
