import React from 'react';
import { androidSettings } from 'react-icons-kit/ionicons/androidSettings';
import { IconStyled } from 'utils/style';
import Select from 'components/Select';
import { runItems } from 'static/run';
import { setAnswers, setQuestions } from 'redux/optionsReducer';
import { useDispatch, connect } from 'react-redux';
import { optionOrderProps } from 'utils/propTypes';
import { Container, Header, HeaderWrapper, OptionRow } from './Modal.style';

const Modal = ({ questions, answers }) => {
    const dispatch = useDispatch();

    const setQuestion = ({ value }) => {
        dispatch(setQuestions(value));
    };

    const setAnswer = ({ value }) => {
        dispatch(setAnswers(value));
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
        </Container>
    );
};

Modal.propTypes = {
    questions: optionOrderProps.isRequired,
    answers: optionOrderProps.isRequired,
};

const mapStateToProps = ({ options: { questions, answers } }) => ({ questions, answers });

export default connect(mapStateToProps)(Modal);
