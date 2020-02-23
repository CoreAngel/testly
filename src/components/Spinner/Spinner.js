import React from 'react';
import { spinner2 } from 'react-icons-kit/icomoon';
import { IconStyled, VisibilityHidden } from 'utils/style';
import PropTypes from 'prop-types';
import { Wrapper } from './Spinner.style';

const Spinner = ({ size }) => {
    return (
        <Wrapper>
            <VisibilityHidden>Loader icon</VisibilityHidden>
            <IconStyled icon={spinner2} size={size} />
        </Wrapper>
    );
};

Spinner.propTypes = {
    size: PropTypes.number,
};

Spinner.defaultProps = {
    size: 40,
};

export default Spinner;
