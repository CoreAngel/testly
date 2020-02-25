import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { routes } from 'static/routes';
import { childrenProps } from 'utils/propTypes';

const RouteProtector = ({ children, questionsLength }) => {
    const { replace } = useHistory();
    let replacePath = null;

    if (questionsLength === 0) {
        replacePath = routes.Home;
    }

    useEffect(() => {
        if (replacePath) {
            replace(replacePath);
        }
    }, [replacePath, replace]);

    return replacePath ? null : children;
};

RouteProtector.propTypes = {
    children: childrenProps.isRequired,
    questionsLength: PropTypes.number.isRequired,
};

const mapStateToProps = ({ test: { questions } }) => ({
    questionsLength: questions.length,
});

export default connect(mapStateToProps)(RouteProtector);
