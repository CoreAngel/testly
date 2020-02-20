import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { routes } from 'static/routes';
import PropTypes from 'prop-types';

const RouteProtector = ({ children, listLength, index, end }) => {
    const history = useHistory();
    let replacePath = null;

    if (listLength === 0) {
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
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
    listLength: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    end: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ test: { list, index, end } }) => ({
    listLength: list.length,
    index,
    end,
});

export default connect(mapStateToProps)(RouteProtector);
