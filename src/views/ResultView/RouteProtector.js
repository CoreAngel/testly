import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { routes } from 'static/routes';
import { testQuestionListProps } from 'utils/propTypes';
import ResultView from './ResultView';

const RouteProtector = ({ list }) => {
    const history = useHistory();
    let replacePath = null;

    if (list.length === 0) {
        replacePath = routes.Test;
    }

    useEffect(() => {
        if (replacePath) {
            history.replace(replacePath);
        }
    }, [replacePath, history]);

    return replacePath ? null : <ResultView />;
};

RouteProtector.propTypes = {
    list: testQuestionListProps.isRequired,
};

const mapStateToProps = ({ test: { list } }) => ({
    list,
});

export default connect(mapStateToProps)(RouteProtector);
