import React from 'react';
import PropTypes from 'prop-types';
import { VisibilityHidden, IconStyled } from 'utils/style';
import { ic_keyboard_arrow_left as arrowLeft } from 'react-icons-kit/md/ic_keyboard_arrow_left';
import { ic_keyboard_arrow_right as arrowRight } from 'react-icons-kit/md/ic_keyboard_arrow_right';
import { Name, Key, InfoWrapper, Wrapper, Position, Container, Button } from './TestHeader.style';

const TestHeader = ({ position, index, name, testKey, listLength, setPosition }) => {
    const goPrev = () => setPosition(prevPos => (prevPos > 0 ? prevPos - 1 : prevPos));
    const goNext = () => setPosition(prevPos => (prevPos < index ? prevPos + 1 : prevPos));

    return (
        <Container>
            <Button disabled={position === 0} onClick={goPrev}>
                <VisibilityHidden>Prev question</VisibilityHidden>
                <IconStyled icon={arrowLeft} size={32} />
            </Button>
            <Wrapper>
                <Position>
                    {index + 1}/{listLength}
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
