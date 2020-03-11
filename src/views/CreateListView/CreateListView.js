import React, { useCallback, useState } from 'react';
import { MainContainer, IconStyled } from 'utils/style';
import { plus } from 'react-icons-kit/ikons';
import { cross } from 'react-icons-kit/icomoon';
import { connect, useDispatch } from 'react-redux';
import EditList from 'components/EditList';
import { editProps } from 'utils/propTypes';
import BackButton from 'components/BackButton';
import BackToTopButton from 'components/BackToTopButton';
import Spinner from 'components/Spinner';
import { validateAll } from 'utils/validation';
import Modal from 'components/Modal';
import LocalSaveProvider from 'views/CreateListView/SaveProviders/LocalSaveProvider';
import ServerSaveProvider from 'views/CreateListView/SaveProviders/ServerSaveProvider';
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
    mergeErrors,
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

const CreateListView = ({ create }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isWarning, setIsWarning] = useState(false);
    const dispatch = useDispatch();

    const setListAction = useCallback(payload => dispatch(setList(payload)), [dispatch]);
    const setAnswerAction = useCallback(payload => dispatch(setAnswer(payload)), [dispatch]);
    const setQuestionAction = useCallback(payload => dispatch(setQuestion(payload)), [dispatch]);
    const addQuestionAction = useCallback(payload => dispatch(addQuestion(payload)), [dispatch]);
    const addAnswerAction = useCallback(payload => dispatch(addAnswer(payload)), [dispatch]);
    const changeQuestionPositionAction = useCallback(payload => dispatch(changeQuestionPosition(payload)), [dispatch]);
    const changeAnswerPositionAction = useCallback(payload => dispatch(changeAnswerPosition(payload)), [dispatch]);
    const deleteQuestionAction = useCallback(payload => dispatch(deleteQuestion(payload)), [dispatch]);
    const deleteAnswerAction = useCallback(payload => dispatch(deleteAnswer(payload)), [dispatch]);

    const handlerSave = () => {
        if (create.isLoading) return;

        const { errors, warnings, results } = validateAll(create);
        setIsError(errors);
        setIsWarning(warnings);
        dispatch(mergeErrors(results));
        if (!errors) {
            setIsModalOpen(true);
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
                        <ButtonReset onClick={() => dispatch(reset())}>Reset</ButtonReset>
                        <ButtonSave onClick={handlerSave}>
                            {create.isLoading ? <Spinner size={20} /> : 'Save'}
                        </ButtonSave>
                    </Buttons>
                </Header>
                {create.error !== '' && <ErrorInfo>{create.error}</ErrorInfo>}
                {isError && <ErrorInfo>You must correct the errors before save</ErrorInfo>}
                {isWarning && <WarningInfo>You have warnings, the server save will not be available</WarningInfo>}
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
            <Modal exitOnEscape exitWithClickOutside setIsOpen={setIsModalOpen} isOpen={isModalOpen}>
                <ModalContainer>
                    <ExitButton onClick={() => setIsModalOpen(false)}>
                        <IconStyled icon={cross} size={22} />
                    </ExitButton>
                    <ModalText>You can choose between save on server or save on local browser.</ModalText>
                    <ModalTextYellow>Yellow warnings are restrictions for save on server</ModalTextYellow>
                    {isWarning && <WarningInfo>You have warnings, the server save will not be available</WarningInfo>}
                    <ButtonsContainer>
                        <LocalSaveProvider>
                            {handler => <ButtonSaveModal onClick={handler}>Local</ButtonSaveModal>}
                        </LocalSaveProvider>
                        <ServerSaveProvider>
                            {handler => {
                                const serverSaveHandler = () => {
                                    if (isWarning) return;
                                    handler();
                                    setIsModalOpen(false);
                                };
                                return <ButtonSaveModal onClick={serverSaveHandler}>Server</ButtonSaveModal>;
                            }}
                        </ServerSaveProvider>
                    </ButtonsContainer>
                </ModalContainer>
            </Modal>
        </MainContainer>
    );
};

CreateListView.propTypes = {
    create: editProps.isRequired,
};

const mapStateToProps = ({ create }) => ({ create });

export default connect(mapStateToProps)(CreateListView);
