import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ic_keyboard_arrow_up as arrowUp } from 'react-icons-kit/md';
import { IconStyled } from 'utils/style';
import { Button, InnerWrapper, IconWrapper } from './BackToTopButton.style';

const BackToTopButton = ({ offset }) => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        const getOffsetTop = () => {
            const offsetTop = document.documentElement.scrollTop || document.body.scrollTop;
            const isActive = offsetTop >= offset;
            setActive(isActive);
        };

        window.addEventListener('scroll', getOffsetTop);
        return () => {
            window.removeEventListener('scroll', getOffsetTop);
        };
    }, [offset]);

    const clickBackToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <Button active={active} onClick={clickBackToTop}>
            <InnerWrapper>
                <IconWrapper>
                    <IconStyled icon={arrowUp} size={45} />
                </IconWrapper>
            </InnerWrapper>
        </Button>
    );
};

BackToTopButton.propTypes = {
    offset: PropTypes.number.isRequired,
};

export default BackToTopButton;
