import React from 'react';
import PropTypes from 'prop-types';
import { androidSettings } from 'react-icons-kit/ionicons/androidSettings';
import { IconStyled } from 'utils/style';
import Select from 'components/Select';
import { runItems } from 'static/run';
import { setAnswers, setQuestions, setAnimation } from 'redux/optionsReducer';
import { useDispatch, connect } from 'react-redux';
import { optionOrderProps } from 'utils/propTypes';
import Toggler from 'components/Toggler';
import { Container, Header, HeaderWrapper, OptionRow, TogglerText } from './Modal.style';

const Modal = ({ questions, answers, animation }) => {
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

    return (
        <Container>
            <HeaderWrapper>
                <IconStyled icon={androidSettings} size={28} />
                <Header>Options</Header>
            </HeaderWrapper>
            <OptionRow>
                <Select label="Questions:" items={runItems} defaultValue={questions} onChange={setQuestion} />
            </OptionRow>
            <OptionRow>
                <Select label="Answers:" items={runItems} defaultValue={answers} onChange={setAnswer} />
            </OptionRow>
            <OptionRow>
                <Toggler onChange={setAnimationValue} selected={animation}>
                    <TogglerText>Animations</TogglerText>
                </Toggler>
            </OptionRow>
        </Container>
    );
};

Modal.propTypes = {
    questions: optionOrderProps.isRequired,
    answers: optionOrderProps.isRequired,
    animation: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ options: { questions, answers, animation } }) => ({ questions, answers, animation });

export default connect(mapStateToProps)(Modal);
