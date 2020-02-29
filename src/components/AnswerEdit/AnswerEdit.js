import React, { memo, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { ic_menu as menu } from 'react-icons-kit/md/ic_menu';
import { dropAnimationStyles, typesDnD } from 'utils/dragAndDrop';
import RadioSelect from 'components/RadioSelect';
import TextInput from 'components/TextInput';
import { Draggable } from 'react-beautiful-dnd';
import { answerTypeAsString } from 'static/list';
import { colors } from 'utils/colors';
import { createAnswerProp } from 'utils/propTypes';
import { IconStyled } from 'utils/style';
import { answerTypeToStringType, answerStringTypeToType } from 'utils/list';
import useDebounce from 'hooks/useDebounce';
import { setAnswer } from 'redux/createReducer';
import { connect } from 'react-redux';
import { Answer, Reorder, Wrapper, RadioWrapper } from './AnswerEdit.style';

const radioItems = [
    {
        label: 'Correct',
        value: answerTypeAsString.Correct,
        color: colors.Green,
    },
    {
        label: 'Not Sure',
        value: answerTypeAsString.NotSure,
        color: colors.Yellow,
    },
    {
        label: 'Incorrect',
        value: answerTypeAsString.Incorrect,
        color: colors.Red,
    },
];

const AnswerEdit = ({ answer, questionId, position, setAnswerAction }) => {
    const [state, setState] = useState(answer);
    const isInitialMount = useRef(true);
    const debouncedState = useDebounce(state, 200);

    const { lId: answerId, c: correct } = answer;
    const defaultValue = answerTypeToStringType(correct);

    const handleTextChange = ({ target }) => {
        setState(prev => ({
            ...prev,
            [target.name]: target.value,
        }));
    };

    const handleRadioChange = ({ value }) => {
        setState(prev => ({
            ...prev,
            c: answerStringTypeToType(value),
        }));
    };

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else if (debouncedState === state) {
            setAnswerAction({
                idQuestion: Number.parseInt(questionId, 10),
                idAnswer: Number.parseInt(answerId, 10),
                answer: debouncedState,
            });
        }
    }, [debouncedState, setAnswerAction, state, questionId, answerId]);

    return (
        <Draggable
            key={`${questionId}-${answerId}`}
            draggableId={`${typesDnD.Answers}-${questionId}-${answerId}`}
            index={position}
        >
            {({ draggableProps, innerRef, dragHandleProps }, snapshot) => (
                <Answer ref={innerRef} {...draggableProps} style={dropAnimationStyles(draggableProps.style, snapshot)}>
                    <Wrapper>
                        <Reorder {...dragHandleProps}>
                            <IconStyled icon={menu} size={22} />
                        </Reorder>
                        <RadioWrapper>
                            <RadioSelect
                                name={questionId}
                                items={radioItems}
                                visibleLabel={false}
                                direction="horizontal"
                                defaultValue={defaultValue}
                                onChange={handleRadioChange}
                            />
                        </RadioWrapper>
                    </Wrapper>
                    <TextInput onChange={handleTextChange} value={state.i} name="i" placeholder="Answer" />
                </Answer>
            )}
        </Draggable>
    );
};

AnswerEdit.propTypes = {
    answer: createAnswerProp.isRequired,
    questionId: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired,
    setAnswerAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    setAnswerAction: setAnswer,
};

const AnswerEditWithMemo = memo(AnswerEdit);
export default connect(null, mapDispatchToProps)(AnswerEditWithMemo);
