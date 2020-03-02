import React from 'react';
import { MainContainer, IconStyled } from 'utils/style';
import { plus } from 'react-icons-kit/ikons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EditList from 'components/EditList';
import { editProps } from 'utils/propTypes';
import BackButton from 'components/BackButton';
import BackToTopButton from 'components/BackToTopButton';
import {
    setList,
    setAnswer,
    setQuestion,
    addAnswer,
    changeQuestionPosition,
    changeAnswerPosition,
    deleteQuestion,
    deleteAnswer,
    addQuestion,
    reset,
} from 'redux/createReducer';
import {
    Container,
    HeaderText,
    Header,
    BackButtonWrapper,
    Buttons,
    Title,
    ButtonReset,
    ButtonSave,
} from './CreateListView.style';

const CreateListView = ({
    create,
    setListAction,
    setAnswerAction,
    setQuestionAction,
    addQuestionAction,
    addAnswerAction,
    changeQuestionPositionAction,
    changeAnswerPositionAction,
    deleteQuestionAction,
    deleteAnswerAction,
    resetAction,
}) => {
    return (
        <MainContainer>
            <Container>
                <BackButtonWrapper>
                    <BackButton label="back" />
                </BackButtonWrapper>
                <Header>
                    <Title>
                        <IconStyled icon={plus} size={28} />
                        <HeaderText>Create test</HeaderText>
                    </Title>
                    <Buttons>
                        <ButtonReset onClick={() => resetAction()}>Reset</ButtonReset>
                        <ButtonSave>Save</ButtonSave>
                    </Buttons>
                </Header>
                <EditList
                    list={create}
                    debounce={200}
                    setList={setListAction}
                    setAnswer={setAnswerAction}
                    setQuestion={setQuestionAction}
                    addQuestion={addQuestionAction}
                    addAnswer={addAnswerAction}
                    changeQuestionPosition={changeQuestionPositionAction}
                    changeAnswerPosition={changeAnswerPositionAction}
                    deleteQuestion={deleteQuestionAction}
                    deleteAnswer={deleteAnswerAction}
                />
            </Container>
            <BackToTopButton offset={300} />
        </MainContainer>
    );
};

CreateListView.propTypes = {
    create: editProps.isRequired,
    setListAction: PropTypes.func.isRequired,
    setAnswerAction: PropTypes.func.isRequired,
    setQuestionAction: PropTypes.func.isRequired,
    addQuestionAction: PropTypes.func.isRequired,
    addAnswerAction: PropTypes.func.isRequired,
    changeQuestionPositionAction: PropTypes.func.isRequired,
    changeAnswerPositionAction: PropTypes.func.isRequired,
    deleteQuestionAction: PropTypes.func.isRequired,
    deleteAnswerAction: PropTypes.func.isRequired,
    resetAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ create }) => ({ create });

const mapDispatchToProps = {
    setListAction: setList,
    setAnswerAction: setAnswer,
    setQuestionAction: setQuestion,
    addQuestionAction: addQuestion,
    addAnswerAction: addAnswer,
    changeQuestionPositionAction: changeQuestionPosition,
    changeAnswerPositionAction: changeAnswerPosition,
    deleteQuestionAction: deleteQuestion,
    deleteAnswerAction: deleteAnswer,
    resetAction: reset,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateListView);
