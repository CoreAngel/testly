import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { routes } from 'static/routes';
import TestPanel from './TestViewService';

const RouteProtector = ({ questions, currentIndex }) => {
    const history = useHistory();

    if (questions.length === 0) {
        history.replace(routes.Home);
        return null;
    }

    if (currentIndex === questions.length - 1) {
        history.replace(routes.Result);
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

const mapStateToProps = ({ test: { questions, currentIndex } }) => ({
    questions,
    currentIndex,
});

export default connect(mapStateToProps)(RouteProtector);