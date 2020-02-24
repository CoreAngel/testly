import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { VisibilityHidden } from 'utils/style';
import { Input, Container, Label } from './TextInput.style';

const TextInput = forwardRef(({ placeholder, onChange, ...props }, ref) => {
    return (
        <Container>
            <Input ref={ref} type="text" placeholder={placeholder} onChange={onChange} {...props} />
            <Label>
                <VisibilityHidden>{placeholder}</VisibilityHidden>
            </Label>
        </Container>
    );
});

TextInput.propTypes = {
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default TextInput;
