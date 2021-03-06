import React from 'react';
import PropTypes from 'prop-types';
import { androidSettings } from 'react-icons-kit/ionicons';
import { cross } from 'react-icons-kit/icomoon';
import { IconStyled } from 'utils/style';
import Select from 'components/Select';
import { runItems } from 'static/run';
import { setAnswers, setQuestions, setAnimation, setDescription } from 'redux/optionsReducer';
import { useDispatch, connect } from 'react-redux';
import { optionOrderProps } from 'utils/propTypes';
import Toggler from 'components/Toggler';
import Modal from 'components/Modal';
import { Container, Header, HeaderWrapper, OptionRow, TogglerText, ExitButton } from './Options.style';

const Options = ({ questions, answers, animation, description, isOpen, setIsOpen }) => {
    const dispatch = useDispatch();

    const setQuestion = ({ value }) => {
        dispatch(setQuestions(value));
    };

    const setAnswer = ({ value }) => {
        dispatch(setAnswers(value));
    };

    const setAnimationValue = value => {
        dispatch(setAnimation(value));
    };

    const setDescriptionValue = value => {
        dispatch(setDescription(value));
    };

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} exitOnEscape exitWithClickOutside>
            <Container>
                <ExitButton onClick={() => setIsOpen(false)}>
                    <IconStyled icon={cross} size={22} />
                </ExitButton>
                <HeaderWrapper>
                    <IconStyled icon={androidSettings} size={28} />
                    <Header>Options</Header>
                </HeaderWrapper>
                <OptionRow>
                    <Select label="Questions:" items={runItems} value={questions} onChange={setQuestion} />
                </OptionRow>
                <OptionRow>
                    <Select label="Answers:" items={runItems} value={answers} onChange={setAnswer} />
                </OptionRow>
                <OptionRow>
                    <Toggler onChange={setAnimationValue} selected={animation}>
                        <TogglerText>Animations</TogglerText>
                    </Toggler>
                </OptionRow>
                <OptionRow>
                    <Toggler onChange={setDescriptionValue} selected={description}>
                        <TogglerText>Descriptions</TogglerText>
                    </Toggler>
                </OptionRow>
            </Container>
        </Modal>
    );
};

Options.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setIsOpen: PropTypes.func.isRequired,
    questions: optionOrderProps.isRequired,
    answers: optionOrderProps.isRequired,
    animation: PropTypes.bool.isRequired,
    description: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ options: { questions, answers, animation, description } }) => ({
    questions,
    answers,
    animation,
    description,
});

export default connect(mapStateToProps)(Options);
