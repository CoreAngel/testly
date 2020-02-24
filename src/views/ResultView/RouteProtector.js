import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { routes } from 'static/routes';
import PropTypes from 'prop-types';
import { childrenProps } from 'utils/propTypes';

const RouteProtector = ({ children, questionsLength, index, end }) => {
    const history = useHistory();
    let replacePath = null;

    if (questionsLength === 0) {
        replacePath = routes.Test;
    }

    if (index === 0 && !end) {
        replacePath = routes.Test;
    }

    useEffect(() => {
        if (replacePath) {
            history.replace(replacePath);
        }
    }, [replacePath, history]);

    return replacePath ? null : children;
};

RouteProtector.propTypes = {
    children: childrenProps.isRequired,
    questionsLength: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    end: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ test: { questions, index, end } }) => ({
    questionsLength: questions.length,
    index,
    end,
});

export default connect(mapStateToProps)(RouteProtector);
