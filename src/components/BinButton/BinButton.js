import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { bin } from 'react-icons-kit/ikons/bin';
import { IconStyled, VisibilityHidden } from 'utils/style';
import { Container, SmallIcon, BigIcon } from './BinButton.style';

const BinButton = forwardRef(({ isVisible, isActive, ...rest }, ref) => {
    return (
        <Container ref={ref} isVisible={isVisible} isActive={isActive} {...rest}>
            <VisibilityHidden>Remove element dropdown</VisibilityHidden>
            <SmallIcon isVisible={isVisible} isActive={isActive}>
                <IconStyled icon={bin} size={20} />
            </SmallIcon>
            <BigIcon isActive={isActive}>
                <IconStyled icon={bin} size={32} />
            </BigIcon>
        </Container>
    );
});

BinButton.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    isActive: PropTypes.bool.isRequired,
};

export default BinButton;
