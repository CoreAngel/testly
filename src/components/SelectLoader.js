import React, {useEffect, useState} from "react";
import {Input} from 'reactstrap'

const SelectLoader = ({setQuestions}) => {
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

    useEffect(() => {
        if (selected.path == null) {
            return;
        }
        const absoluteUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname.replace(/\/$/, '')}`;
        fetch(`${absoluteUrl}/data/${selected.path}`)
            .then(data => data.json())
            .then(data => data.map((item, index) => {
                const correctIndex = item.c.trim().toLowerCase().charCodeAt(0) - 97;
                return {
                    ...item,
                    index,
                    c: correctIndex
                }
            }))
            .then(data => setQuestions(data));
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

export default SelectLoader;
