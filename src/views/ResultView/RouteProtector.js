import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import ResultView from './ResultView';

const RouteProtector = ({ questions }) => {
    const history = useHistory();

    if (questions.length === 0) {
        history.replace('/test');
        return null;
    }

    return <ResultView />;
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
};

const mapStateToProps = store => {
    const {
        test: { questions },
    } = store;

    return {
        questions,
    };
};

export default connect(mapStateToProps)(RouteProtector);
