import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import { selectProps } from 'utils/propTypes';
import { Label, LabelText } from './Select.style';

const Select = ({ label, items, defaultValue, onChange }) => {
    const [state, setState] = useState(items.find(({ value }) => value === defaultValue));

    const handleLocalChange = ({ target: { value } }) => {
        const selectedItem = items.find(item => item.value === value);
        setState(selectedItem);
        onChange(selectedItem);
    };

    return (
        <Label>
            <LabelText>{label}</LabelText>
            <Input type="select" onChange={handleLocalChange} value={state.value}>
                {items.map(({ id, value, label: iLabel }) => (
                    <option value={value} key={id}>
                        {iLabel}
                    </option>
                ))}
            </Input>
        </Label>
    );
};

Select.propTypes = {
    label: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(selectProps).isRequired,
    defaultValue: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Select;
