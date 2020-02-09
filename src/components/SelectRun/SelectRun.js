import React, { useState } from 'react';
import { Button, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import useHistoryPush from 'utils/useHistoryPush';
import { setTest } from 'redux/testStore';
import { shuffle } from 'utils/array';
import { runTypes, runItems } from 'static/run';
import { routes } from 'static/routes';
import { Container } from './SelectRun.style';

const SelectRun = ({ questions, setTestAction }) => {
    const [selected, setSelected] = useState(runItems.find(item => item.value === runTypes.Q_RANDOM_A_RANDOM));
    const pushToTest = useHistoryPush(routes.Test);

    const onChange = e => {
        const { value } = e.target;
        setSelected(runItems.find(item => item.value === value));
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
                fails: 0,
            }));
        }

        return testQuestions
            .map(item => {
                const { a, c } = item;
                return {
                    ...item,
                    a: a.map((aItem, aIndex) => ({
                        a: aItem,
                        c: aIndex === c,
                    })),
                    fails: 0,
                };
            })
            .map(item => {
                return {
                    ...item,
                    a: shuffle(item.a),
                };
            })
            .map(item => {
                const aCorrectIndex = item.a.findIndex(aItem => aItem.c);
                return {
                    ...item,
                    a: item.a.map(aItem => aItem.a),
                    c: aCorrectIndex,
                };
            });
    };

    const prepareTest = (testQuestions, runType) => {
        const preparedQuestions = prepareQuestions(testQuestions, runType);
        return prepareAnswers(preparedQuestions, runType);
    };

    const runTest = runType => {
        if (questions.length === 0) {
            return;
        }

        const testQuestions = prepareTest(questions, runType);
        setTestAction(testQuestions);
        pushToTest();
    };

    return (
        <Container>
            <Input type="select" onChange={onChange} value={selected.value}>
                {runItems.map(item => (
                    <option value={item.value} key={item.id}>
                        {item.label}
                    </option>
                ))}
            </Input>
            <Button color="success" onClick={() => runTest(selected.value)}>
                Run
            </Button>
        </Container>
    );
};

SelectRun.propTypes = {
    questions: PropTypes.arrayOf(
        PropTypes.shape({
            index: PropTypes.number.isRequired,
            q: PropTypes.string.isRequired,
            a: PropTypes.arrayOf(PropTypes.string).isRequired,
            c: PropTypes.number.isRequired,
        }),
    ).isRequired,
    setTestAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ question }) => ({
    questions: question,
});

const mapDispatchToProps = {
    setTestAction: setTest,
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectRun);
