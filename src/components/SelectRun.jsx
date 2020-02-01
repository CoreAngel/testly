import React, {useState} from "react";
import styled from "styled-components";
import {Button, Input} from "reactstrap";
import {connect} from "react-redux";
import {useHistory, useLocation} from "react-router-dom";
import {setTest} from "../redux/testStore";
import {shuffle} from "../util/array";

export const runTypes = {
    Q_ORDERED_A_ORDERED: 'Q_ORDERED_A_ORDERED',
    Q_ORDERED_A_RANDOM: 'Q_ORDERED_A_RANDOM',
    Q_RANDOM_A_ORDERED: 'Q_RANDOM_A_ORDERED',
    Q_RANDOM_A_RANDOM: 'Q_RANDOM_A_RANDOM'
};

const items = [
    {
        id: 0,
        label: 'Questions Ordered - Answers Ordered',
        value: runTypes.Q_ORDERED_A_ORDERED
    },
    {
        id: 1,
        label: 'Questions Ordered - Answers Random',
        value: runTypes.Q_ORDERED_A_RANDOM
    },
    {
        id: 2,
        label: 'Questions Random - Answers Ordered',
        value: runTypes.Q_RANDOM_A_ORDERED
    },
    {
        id: 3,
        label: 'Questions Random - Answers Random',
        value: runTypes.Q_RANDOM_A_RANDOM
    }
];

const SelectLoader = ({questions, setTestAction}) => {
    const [selected, setSelected] = useState({
        id: 3,
        label: 'Questions Random - Answers Random',
        value: runTypes.Q_RANDOM_A_RANDOM
    });
    const history = useHistory();
    const location = useLocation();

    const onChange = (e) => {
        const value = e.target.value;
        setSelected(items.find(item => item.value === value));
    };

    const prepareQuestions = (testQuestions, runType) => {
        if (runType === runTypes.Q_RANDOM_A_ORDERED || runType === runTypes.Q_RANDOM_A_RANDOM) {
            return shuffle(testQuestions);
        }

        return testQuestions;
    };

    const prepareAnswers = (testQuestions, runType) => {
        if (runType !== runTypes.Q_ORDERED_A_RANDOM && runType !== runTypes.Q_RANDOM_A_RANDOM) {
            return testQuestions.map(item => ({
                ...item,
                fails: 0
            }));
        }

        return testQuestions.map(item => {
            const {a, c} = item;
            return {
                ...item,
                a: a.map((aItem, aIndex) => ({
                    a: aItem,
                    c: aIndex === c
                })),
                fails: 0
            }
        }).map(item => {
            return {
                ...item,
                a: shuffle(item.a)
            }
        }).map(item => {
            const aCorrectIndex = item.a.findIndex(aItem => aItem.c);
            return {
                ...item,
                a: item.a.map(aItem => aItem.a),
                c: aCorrectIndex
            }
        });
    };

    const prepareTest = (testQuestions, runType) => {
        const preparedQuestions = prepareQuestions(testQuestions, runType);
        return prepareAnswers(preparedQuestions, runType);
    };

    const runTest = (runType) => {
        if (questions.length === 0) {
            return;
        }

        const testQuestions = prepareTest(questions, runType);
        setTestAction(testQuestions);
        if (location.pathname !== '/test') {
            history.push('test');
        }
    };


    return (
        <Container>
            <Input type='select' onChange={onChange} value={selected.value}>
                {items.map(item => <option value={item.value} key={item.id}>{item.label}</option>)}
            </Input>
            <Button color='success' onClick={() => runTest(selected.value)}>Run</Button>
        </Container>
    )
};

const Container = styled.div`
  display: flex;
`;

const mapStateToProps = (store) => {
    const {question} = store;
    return {
        questions: question
    }
};

const mapDispatchToProps = {
    setTestAction: setTest
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectLoader);
