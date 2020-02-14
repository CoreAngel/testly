import React from 'react';
import { androidSettings } from 'react-icons-kit/ionicons/androidSettings';
import { IconStyled } from 'utils/style';
import Select from 'components/Select';
import { runItems, runTypes } from 'static/run';
import { Container, Header, HeaderWrapper, OptionRow } from './Modal.style';

const Modal = () => {
    const onChange = value => {
        console.log(value);
    };

    return (
        <Container>
            <HeaderWrapper>
                <IconStyled icon={androidSettings} size={28} />
                <Header>Options</Header>
            </HeaderWrapper>
            <OptionRow>
                <Select label="Questions:" items={runItems} defaultValue={runTypes.RANDOM} onChange={onChange} />
            </OptionRow>
            <OptionRow>
                <Select label="Answers:" items={runItems} defaultValue={runTypes.RANDOM} onChange={onChange} />
            </OptionRow>
        </Container>
    );
};

export default Modal;
