import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addList as addListAct } from 'redux/addedListReducer';
import TextInput from 'components/TextInput';
import Spinner from 'components/Spinner';
import { getAddList } from 'utils/fetchData';
import { addedListProps } from 'utils/propTypes';
import { Container, Header, Button, Error } from './AddList.style';

const AddList = ({ addListAction, addedItems }) => {
    const [value, setValue] = useState('');
    const [status, setStatus] = useState({
        loading: false,
        error: '',
    });

    const loadData = async () => {
        try {
            const res = await getAddList(value);
            if (res.status === 200) {
                const data = await res.json();
                addListAction(data);
                setValue('');
                setStatus({
                    loading: false,
                    error: '',
                });
            } else if (res.status === 500) {
                setStatus({
                    loading: false,
                    error: 'Internal server error',
                });
            } else {
                setStatus({
                    loading: false,
                    error: 'Wrong list id',
                });
            }
        } catch (e) {
            setStatus({
                loading: false,
                error: 'Error with fetching data',
            });
        }
    };

    const handleChange = ({ target }) => {
        const { value: val } = target;
        setValue(val);
    };

    const handleClick = () => {
        const isAddedBefore = addedItems.find(({ key }) => key === value);
        if (isAddedBefore) {
            setStatus({
                loading: false,
                error: 'List already added',
            });
        }

        const isAddItem = value.length > 0 && !status.loading && !isAddedBefore;
        if (isAddItem) {
            setStatus({
                loading: true,
                error: '',
            });
            loadData();
        }
    };

    return (
        <Container>
            <Header>Add list</Header>
            <TextInput placeholder={"Type the list's id..."} onChange={handleChange} value={value} />
            <Button onClick={handleClick} disabled={status.loading}>
                {status.loading ? <Spinner size={18} /> : 'Add'}
            </Button>
            {status.error !== '' && <Error>{status.error}</Error>}
        </Container>
    );
};

AddList.propTypes = {
    addListAction: PropTypes.func.isRequired,
    addedItems: addedListProps.isRequired,
};

const mapStateToProps = ({ addedList: { items } }) => ({ addedItems: items });

const mapDispatchToProps = {
    addListAction: addListAct,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddList);
