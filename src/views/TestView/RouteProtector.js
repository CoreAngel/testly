import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { routes } from 'static/routes';
import { testQuestionListProps } from 'utils/propTypes';
import TestPanel from './TestViewService';

const RouteProtector = ({ list, index }) => {
    const history = useHistory();

    if (list.length === 0) {
        history.replace(routes.Home);
        return null;
    }

    if (index === list.length - 1) {
        history.replace(routes.Result);
        return null;
    }

    return <TestPanel />;
};

RouteProtector.propTypes = {
    list: testQuestionListProps.isRequired,
    index: PropTypes.number.isRequired,
};

const mapStateToProps = ({ test: { list, index } }) => ({
    list,
    index,
});

export default connect(mapStateToProps)(RouteProtector);
