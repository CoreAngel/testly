import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { VisibilityHidden, IconStyled } from 'utils/style';
import keyCodes from 'utils/keyCodes';
import { ic_keyboard_arrow_left as arrowLeft, ic_keyboard_arrow_right as arrowRight } from 'react-icons-kit/md';

import { Name, Key, InfoWrapper, Wrapper, Position, Container, Button } from './TestHeader.style';

const TestHeader = ({ position, index, name, testKey, listLength, setPosition }) => {
    const goPrev = useCallback(() => {
        setPosition(prevPos => (prevPos > 0 ? prevPos - 1 : prevPos));
    }, [setPosition]);
    const goNext = useCallback(() => {
        setPosition(prevPos => (prevPos < index ? prevPos + 1 : prevPos));
    }, [setPosition, index]);

    useEffect(() => {
        const onKeyDown = e => {
            const { keyCode } = e;

            if (keyCode === keyCodes.arrowLeft) {
                goPrev();
            }
            if (keyCode === keyCodes.arrowRight) {
                goNext();
            }
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [goNext, goPrev]);

    return (
        <Container>
            <Button disabled={position === 0} onClick={goPrev}>
                <VisibilityHidden>Prev question</VisibilityHidden>
                <IconStyled icon={arrowLeft} size={32} />
            </Button>
            <Wrapper>
                <Position>
                    {position + 1}/{listLength}
                </Position>
                <InfoWrapper>
                    <Name>{name}</Name>
                    <Key>{testKey}</Key>
                </InfoWrapper>
            </Wrapper>
            <Button disabled={position === index} onClick={goNext}>
                <VisibilityHidden>Prev question</VisibilityHidden>
                <IconStyled icon={arrowRight} size={32} />
            </Button>
        </Container>
    );
};

TestHeader.propTypes = {
    position: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    testKey: PropTypes.string.isRequired,
    listLength: PropTypes.number.isRequired,
    setPosition: PropTypes.func.isRequired,
};

export default TestHeader;
