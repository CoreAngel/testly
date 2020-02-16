import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { routes } from 'static/routes';
import { testQuestionListProps } from 'utils/propTypes';
import TestPanel from './TestViewService';

const RouteProtector = ({ list, index }) => {
    const history = useHistory();
    let replacePath = null;

    if (list.length === 0) {
        replacePath = routes.Home;
    }

    if (index + 1 === list.length) {
        replacePath = routes.Result;
    }

    useEffect(() => {
        if (replacePath) {
            history.replace(replacePath);
        }
    }, [replacePath, history]);

    return replacePath ? null : <TestPanel />;
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
