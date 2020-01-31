import React, {useEffect, useState} from "react";
import {Input} from 'reactstrap'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {useLocation} from 'react-router-dom'
import {setQuestions} from './../redux/questionStore'
import fetchFile from './../util/fetchFile'

const SelectLoader = ({setQuestionsAction}) => {
    const [selected, setSelected] = useState({
        id: 0,
        label: 'Select...',
        path: null
    });
    const [items] = useState([
        {
            id: 0,
            label: 'Select...',
            path: null
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
    ]);

    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        if (selected.path == null) {
            return;
        }

        fetchFile(selected.path)
            .then(data => {
                setQuestionsAction(data);
                if (location.pathname !== '/list') {
                    history.push('/list');
                }
            });
    }, [selected]);

    const onChange = (e) => {
        const value = e.target.value;
        setSelected(items.find(item => item.label === value));
    };

    return (
        <div>
            <Input type='select' onChange={onChange} value={selected.label}>
                {items.map(item => <option value={item.label} key={item.id} disabled={item.path == null}>{item.label}</option>)}
            </Input>
        </div>
    )

};

const mapDispatchToProps = {
    setQuestionsAction: setQuestions
};

export default connect(null, mapDispatchToProps)(SelectLoader);
