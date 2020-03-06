import React, { useState } from 'react';
import { MainContainer, IconStyled } from 'utils/style';
import { plus } from 'react-icons-kit/ikons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EditList from 'components/EditList';
import { editProps } from 'utils/propTypes';
import BackButton from 'components/BackButton';
import BackToTopButton from 'components/BackToTopButton';
import { validateAll } from 'utils/validation';
import Modal from 'components/Modal';
import { cross } from 'react-icons-kit/icomoon';
import { createTest } from 'utils/fetchData';
import { addList } from 'redux/addedListReducer';
import { setList } from 'redux/listReducer';
import {
    setList as setCreateList,
    setAnswer,
    setQuestion,
    addAnswer,
    changeQuestionPosition,
    changeAnswerPosition,
    deleteQuestion,
    deleteAnswer,
    addQuestion,
    reset,
    mergeErrors,
    setLoading,
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
    ModalContainer,
    ModalText,
    ModalTextYellow,
    ExitButton,
    ButtonsContainer,
    ButtonSaveModal,
    ErrorInfo,
    WarningInfo,
} from './CreateListView.style';
import useHistoryPush from '../../hooks/useHistoryPush';
import { routes } from '../../static/routes';

const getTestDataFromStore = ({ name, password, type, questions }) => {
    const questionsMapped = questions.map(({ q, d, a: { answers } }) => {
        const answersMapped = answers
            .filter(({ i }) => i !== '')
            .map(({ i, c }) => {
                const answerResult = { i, c };
                if (answerResult.c === undefined) {
                    delete answerResult.c;
                }
                return answerResult;
            });
        const questionResult = {
            q: q.item,
            d: d.item,
            a: answersMapped,
        };
        if (questionResult.d === '') {
            delete questionResult.d;
        }
        return questionResult;
    });
    const testResult = {
        name: name.item,
        password: password.item,
        type: type.item,
        questions: questionsMapped,
    };
    if (testResult.password === '') {
        delete testResult.password;
    }
    return testResult;
};

const mapFieldToErrors = field => {
    if (field === undefined || field.length === 0) {
        return {
            errors: [],
        };
    }
    return {
        errors: field,
    };
};

const mapServerErrorsValidationToStore = res => {
    const result = {};
    result.name = mapFieldToErrors(res.name);
    result.password = mapFieldToErrors(res.password);
    result.type = mapFieldToErrors(res.type);
    result.questions = [];

    if (res.questions !== undefined) {
        res.questions.forEach(({ position, errors }) => {
            const answers = [];
            if (errors.a.answers !== undefined) {
                errors.a.errors.forEach(({ position: positionAnswer, error: answerError }) => {
                    answers[positionAnswer] = answerError;
                });
            }

            result.questions[position] = {
                q: mapFieldToErrors(errors.q),
                d: mapFieldToErrors(errors.d),
                a: {
                    errors: errors.a.errors === undefined ? [] : errors.a.errors,
                    answers,
                },
            };
        });
    }
    return result;
};

const CreateListView = ({
    create,
    setCreateListAction,
    setAnswerAction,
    setQuestionAction,
    addQuestionAction,
    addAnswerAction,
    changeQuestionPositionAction,
    changeAnswerPositionAction,
    deleteQuestionAction,
    deleteAnswerAction,
    resetAction,
    mergeErrorsActions,
    setLoadingAction,
    addListAction,
    setListAction,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState('');
    const [isError, setIsError] = useState(false);
    const [isWarning, setIsWarning] = useState(false);
    const pushToList = useHistoryPush(`${routes.List}/`);

    const handlerSave = () => {
        if (create.isLoading) return;

        const { errors, warnings, results } = validateAll(create);
        setIsError(errors);
        setIsWarning(warnings);
        mergeErrorsActions(results);
        if (!errors) {
            setIsModalOpen(true);
        }
    };

    const handleSaveServer = async () => {
        setIsModalOpen(false);
        setError('');
        if (isWarning) return;
        const test = getTestDataFromStore(create);
        setLoadingAction(true);
        try {
            const res = await createTest(test);
            if (res.status === 200) {
                const data = await res.json();
                setListAction(data);
                addListAction({ key: data.key, name: data.name });
                resetAction();
                pushToList(data.key);
            } else if (res.status === 400) {
                const data = await res.json();
                const errors = mapServerErrorsValidationToStore(data);
                mergeErrorsActions(errors);
            } else {
                setError('Internal server error');
            }
        } catch (e) {
            setError('Cannot fetch data');
        } finally {
            setLoadingAction(false);
        }
    };

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
                        <ButtonSave onClick={handlerSave}>Save</ButtonSave>
                    </Buttons>
                </Header>
                {error !== '' && <ErrorInfo>{error}</ErrorInfo>}
                {isError && <ErrorInfo>You must correct the errors before save</ErrorInfo>}
                {isWarning && <WarningInfo>You have warnings, the server save will not be available</WarningInfo>}
                <EditList
                    list={create}
                    debounce={200}
                    setList={setCreateListAction}
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
            <Modal exitOnEscape setIsOpen={setIsModalOpen} exitWithClickOutside isOpen={isModalOpen}>
                <ModalContainer>
                    <ExitButton onClick={() => setIsModalOpen(false)}>
                        <IconStyled icon={cross} size={22} />
                    </ExitButton>
                    <ModalText>You can choose between save on server or save on local browser.</ModalText>
                    <ModalTextYellow>Yellow warnings are restrictions for save on server</ModalTextYellow>
                    {isWarning && <WarningInfo>You have warnings, the server save will not be available</WarningInfo>}
                    <ButtonsContainer>
                        <ButtonSaveModal
                            onClick={() => {
                                setIsModalOpen(false);
                            }}
                        >
                            Local
                        </ButtonSaveModal>
                        <ButtonSaveModal onClick={handleSaveServer}>Server</ButtonSaveModal>
                    </ButtonsContainer>
                </ModalContainer>
            </Modal>
        </MainContainer>
    );
};

CreateListView.propTypes = {
    create: editProps.isRequired,
    setCreateListAction: PropTypes.func.isRequired,
    setAnswerAction: PropTypes.func.isRequired,
    setQuestionAction: PropTypes.func.isRequired,
    addQuestionAction: PropTypes.func.isRequired,
    addAnswerAction: PropTypes.func.isRequired,
    changeQuestionPositionAction: PropTypes.func.isRequired,
    changeAnswerPositionAction: PropTypes.func.isRequired,
    deleteQuestionAction: PropTypes.func.isRequired,
    deleteAnswerAction: PropTypes.func.isRequired,
    resetAction: PropTypes.func.isRequired,
    mergeErrorsActions: PropTypes.func.isRequired,
    setLoadingAction: PropTypes.func.isRequired,
    addListAction: PropTypes.func.isRequired,
    setListAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ create }) => ({ create });

const mapDispatchToProps = {
    setCreateListAction: setCreateList,
    setAnswerAction: setAnswer,
    setQuestionAction: setQuestion,
    addQuestionAction: addQuestion,
    addAnswerAction: addAnswer,
    changeQuestionPositionAction: changeQuestionPosition,
    changeAnswerPositionAction: changeAnswerPosition,
    deleteQuestionAction: deleteQuestion,
    deleteAnswerAction: deleteAnswer,
    resetAction: reset,
    mergeErrorsActions: mergeErrors,
    setLoadingAction: setLoading,
    addListAction: addList,
    setListAction: setList,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateListView);
