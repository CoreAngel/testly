import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { routes } from 'static/routes';
import { testQuestionListProps } from 'utils/propTypes';
import ResultView from './ResultView';

const RouteProtector = ({ list }) => {
    const history = useHistory();

    if (list.length === 0) {
        history.replace(routes.Test);
        return null;
    }

    return <ResultView />;
};

RouteProtector.propTypes = {
    list: testQuestionListProps.isRequired,
};

const mapStateToProps = ({ test: { list } }) => ({
    list,
});

export default connect(mapStateToProps)(RouteProtector);
