import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { childrenProp } from 'utils/propTypes';
import { Container, Checkbox, IconWrapper, Icon } from './Toggler.style';

const Toggler = ({ children, onChange, selected, size }) => {
    const [value, setValue] = useState(selected);

    const toggle = () => {
        setValue(prevValue => {
            onChange(!prevValue);
            return !prevValue;
        });
    };

    return (
        <Container>
            <IconWrapper size={size} checked={value}>
                <Checkbox type="checkbox" onChange={toggle} checked={value} />
                <Icon size={size} checked={value} />
            </IconWrapper>
            {children}
        </Container>
    );
};

Toggler.propTypes = {
    children: childrenProp.isRequired,
    onChange: PropTypes.func.isRequired,
    selected: PropTypes.bool,
    size: PropTypes.number,
};

Toggler.defaultProps = {
    size: 20,
    selected: false,
};

export default Toggler;
