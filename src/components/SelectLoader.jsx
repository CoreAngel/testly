import React, {useEffect, useState} from "react";
import {Input} from 'reactstrap'
import {connect} from 'react-redux'
import useHistoryPush from '../util/useHistoryPush'
import {setQuestions} from './../redux/questionStore'
import fetchFile from './../util/fetchFile'

const items = [
    {
        id: 0,
        label: 'Select...',
        path: ''
    },
    {
        id: 1,
        label: 'IO',
        path: 'io.json'
    },
    {
        id: 2,
        label: 'PSK',
        path: 'psk.json'
    }
];

const SelectLoader = ({setQuestionsAction}) => {
    const [selected, setSelected] = useState({
        id: 0,
        label: 'Select...',
        path: ''
    });

    const pushToList = useHistoryPush('/list');

    useEffect(() => {
        const fetchData = () => {
            if (selected.path === '') {
                return;
            }

            fetchFile(selected.path)
                .then(data => {
                    setQuestionsAction(data);
                    pushToList();
                });
        };

        fetchData();
    }, [selected]);

    const onChange = (e) => {
        const { value } = e.target;
        setSelected(items.find(item => item.label === value));
    };

    return (
        <div>
            <Input type='select' onChange={onChange} value={selected.label}>
                {items.map(item => <option value={item.label} key={item.id} disabled={item.path === ''}>{item.label}</option>)}
            </Input>
        </div>
    )

};

const mapDispatchToProps = {
    setQuestionsAction: setQuestions
};

export default connect(null, mapDispatchToProps)(SelectLoader);
