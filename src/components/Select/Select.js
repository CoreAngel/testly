import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import { selectProps } from 'utils/propTypes';
import { Label, LabelText } from './Select.style';

const Select = ({ label, items, value, onChange }) => {
    const handleLocalChange = ({ target: { value: targetValue } }) => {
        const selectedItem = items.find(item => item.value === targetValue);
        onChange(selectedItem);
    };

    return (
        <Label>
            <LabelText>{label}</LabelText>
            <Input type="select" onChange={handleLocalChange} value={value}>
                {items.map(({ id, value: itemValue, label: iLabel }) => (
                    <option value={itemValue} key={id}>
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
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Select;
