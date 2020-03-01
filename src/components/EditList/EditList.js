import React from 'react';
import PropTypes from 'prop-types';
import { editProps } from 'utils/propTypes';
import List from 'components/EditList/List';
import { ActionsContext } from 'components/EditList/ActionsContext';
import DnDProvider from 'components/EditList/DnDProvider';
import BinButton from 'components/EditList/BinButton';

const EditList = ({
    list,
    debounce,
    setList,
    setAnswer,
    setQuestion,
    addQuestion,
    addAnswer,
    changeQuestionPosition,
    changeAnswerPosition,
    deleteQuestion,
    deleteAnswer,
}) => {
    return (
        <ActionsContext.Provider
            value={{
                debounce,
                setList,
                setAnswer,
                setQuestion,
                addQuestion,
                addAnswer,
                changeQuestionPosition,
                changeAnswerPosition,
                deleteQuestion,
                deleteAnswer,
            }}
        >
            <DnDProvider>
                <List list={list} />
                <BinButton />
            </DnDProvider>
        </ActionsContext.Provider>
    );
};

EditList.propTypes = {
    list: editProps.isRequired,
    debounce: PropTypes.number.isRequired,
    setList: PropTypes.func.isRequired,
    setAnswer: PropTypes.func.isRequired,
    setQuestion: PropTypes.func.isRequired,
    addQuestion: PropTypes.func.isRequired,
    addAnswer: PropTypes.func.isRequired,
    changeQuestionPosition: PropTypes.func.isRequired,
    changeAnswerPosition: PropTypes.func.isRequired,
    deleteQuestion: PropTypes.func.isRequired,
    deleteAnswer: PropTypes.func.isRequired,
};

export default EditList;
