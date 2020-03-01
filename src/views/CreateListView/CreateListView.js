import React from 'react';
import { MainContainer, IconStyled } from 'utils/style';
import { plus } from 'react-icons-kit/ikons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EditList from 'components/EditList';
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
} from 'redux/createReducer';
import { editProps } from 'utils/propTypes';
import { Container, HeaderText, Header } from './CreateListView.style';

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
}) => {
    return (
        <MainContainer>
            <Container>
                <Header>
                    <IconStyled icon={plus} size={28} />
                    <HeaderText>Create test</HeaderText>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateListView);
