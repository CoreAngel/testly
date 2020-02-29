import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { radioSelectItemsProps } from 'utils/propTypes';
import { VisibilityHidden } from 'utils/style';
import { colors } from 'utils/colors';
import { Container, Label, LabelText, Radio } from './RadioSelect.style';

const RadioSelect = ({ name, direction, items, visibleLabel, defaultValue, onChange }) => {
    const [state, setState] = useState(items.find(item => item.value === defaultValue));

    const handleChange = value => {
        setState(value);
        onChange(value);
    };

    return (
        <Container direction={direction}>
            {items.map((item, index) => {
                const { value, label, color: bgColor } = item;
                const color = bgColor !== undefined ? bgColor : colors.White50;
                return (
                    // eslint-disable-next-line react/no-array-index-key
                    <Label key={index} isVisible={visibleLabel}>
                        <VisibilityHidden
                            as="input"
                            type="radio"
                            name={name}
                            checked={state.value === value}
                            onChange={() => handleChange(item)}
                        />
                        <Radio isChecked={state.value === value} color={color} />
                        <LabelText isVisible={visibleLabel}>{label}</LabelText>
                    </Label>
                );
            })}
        </Container>
    );
};

RadioSelect.propTypes = {
    name: PropTypes.string.isRequired,
    visibleLabel: PropTypes.bool,
    direction: PropTypes.oneOf(['vertical', 'horizontal']),
    items: radioSelectItemsProps.isRequired,
    defaultValue: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

RadioSelect.defaultProps = {
    visibleLabel: true,
    direction: 'vertical',
};

export default RadioSelect;
