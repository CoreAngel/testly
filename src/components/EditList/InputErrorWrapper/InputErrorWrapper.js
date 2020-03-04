import React from 'react';
import PropTypes from 'prop-types';
import { childrenProps } from 'utils/propTypes';
import { ErrorWrapper, ErrorInfo } from './InputErrorWrapper.style';

const InputErrorWrapper = ({ children, item }) => {
    return (
        <>
            <ErrorWrapper error={item.errors.length !== 0} warning={item.warnings.length !== 0}>
                {children}
            </ErrorWrapper>
            {item.errors.map((text, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <ErrorInfo key={index} error>
                    {text}
                </ErrorInfo>
            ))}
            {item.warnings.map((text, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <ErrorInfo key={index} warning>
                    {text}
                </ErrorInfo>
            ))}
        </>
    );
};

InputErrorWrapper.propTypes = {
    children: childrenProps.isRequired,
    item: PropTypes.shape({
        errors: PropTypes.arrayOf(PropTypes.string).isRequired,
        warnings: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
};

export default InputErrorWrapper;
