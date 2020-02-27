import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { bin } from 'react-icons-kit/ikons/bin';
import { IconStyled, VisibilityHidden } from 'utils/style';
import { Container, Wrapper } from './BinButton.style';

const BinButton = forwardRef(({ isVisible, isActive, ...rest }, ref) => {
    return (
        <Container isVisible={isVisible} isActive={isActive} ref={ref} {...rest}>
            <Wrapper isActive={isActive}>
                <VisibilityHidden>Remove element</VisibilityHidden>
                <IconStyled icon={bin} size={32} />
            </Wrapper>
        </Container>
    );
});

BinButton.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    isActive: PropTypes.bool.isRequired,
};

export default BinButton;
