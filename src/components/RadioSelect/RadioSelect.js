import React from 'react';
import PropTypes from 'prop-types';
import { radioSelectItemsProps } from 'utils/propTypes';
import { VisibilityHidden } from 'utils/style';
import { colors } from 'utils/colors';
import { Container, Label, LabelText, Radio } from './RadioSelect.style';

const RadioSelect = ({ name, direction, items, visibleLabel, value, onChange }) => {
    const handleChange = item => {
        onChange(item);
    };

    return (
        <Container direction={direction}>
            {items.map((item, index) => {
                const { value: itemValue, label, color: bgColor } = item;
                const color = bgColor !== undefined ? bgColor : colors.White50;
                return (
                    // eslint-disable-next-line react/no-array-index-key
                    <Label key={index} isVisible={visibleLabel}>
                        <VisibilityHidden
                            as="input"
                            type="radio"
                            name={name}
                            checked={value === itemValue}
                            onChange={() => handleChange(item)}
                        />
                        <Radio isChecked={value === itemValue} color={color} />
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
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

RadioSelect.defaultProps = {
    visibleLabel: true,
    direction: 'vertical',
};

export default RadioSelect;
