import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import { Label, LabelText } from './Select.style';

const Select = ({ label, items, defaultValue, onChange }) => {
    const [state, setState] = useState(items.find(({ value }) => value === defaultValue));

    const onLocalChange = ({ target: { value } }) => {
        const selectedItem = items.find(item => item.value === value);
        setState(selectedItem);
        onChange(selectedItem);
    };

    return (
        <Label>
            <LabelText>{label}</LabelText>
            <Input type="select" onChange={onLocalChange} value={state.value}>
                {items.map(item => (
                    <option value={item.value} key={item.id}>
                        {item.label}
                    </option>
                ))}
            </Input>
        </Label>
    );
};

Select.propTypes = {
    label: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        }),
    ).isRequired,
    defaultValue: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Select;
