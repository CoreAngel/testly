import React, { useEffect, useState } from 'react';
import { Input } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loaderItems } from '../../static/loader';
import useHistoryPush from '../../util/useHistoryPush';
import { setQuestions } from '../../redux/questionStore';
import fetchFile from '../../util/fetchFile';

const SelectLoader = ({ setQuestionsAction }) => {
    const [selected, setSelected] = useState(loaderItems.find(item => item.path === ''));

    const pushToList = useHistoryPush('/list');

    useEffect(() => {
        const fetchData = () => {
            if (selected.path === '') {
                return;
            }

            fetchFile(selected.path).then(data => {
                setQuestionsAction(data);
                pushToList();
            });
        };

        fetchData();
    }, [selected]);

    const onChange = e => {
        const { value } = e.target;
        setSelected(loaderItems.find(item => item.label === value));
    };

    return (
        <div>
            <Input type="select" onChange={onChange} value={selected.label}>
                {loaderItems.map(item => (
                    <option value={item.label} key={item.id} disabled={item.path === ''}>
                        {item.label}
                    </option>
                ))}
            </Input>
        </div>
    );
};

SelectLoader.propTypes = {
    setQuestionsAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    setQuestionsAction: setQuestions,
};

export default connect(null, mapDispatchToProps)(SelectLoader);
