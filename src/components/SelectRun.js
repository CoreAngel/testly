import React, {useState} from "react";
import styled from "styled-components";
import {Button, Input} from "reactstrap";

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

const SelectLoader = ({runTest}) => {
    const [selected, setSelected] = useState({
        id: 3,
        label: 'Questions Random - Answers Random',
        value: runTypes.Q_RANDOM_A_RANDOM
    });

    const onChange = (e) => {
        const value = e.target.value;
        setSelected(items.find(item => item.value === value));
    };

    return (
        <Constiner>
            <Input type='select' onChange={onChange} value={selected.value}>
                {items.map(item => <option value={item.value} key={item.id}>{item.label}</option>)}
            </Input>
            <Button color='success' onClick={() => runTest(selected.value)}>Run</Button>
        </Constiner>
    )
};

const Constiner = styled.div`
  display: flex;
`;

export default SelectLoader;
