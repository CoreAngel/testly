import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Provider } from './GlobalStyleContext';
import GlobalStyle from './GlobalStyle';

const GlobalStyleWrapper = ({ children }) => {
    const [overflowBody, setOverflowBody] = useState(null);

    return (
        <Provider
            value={{
                setOverflowBody,
            }}
        >
            <GlobalStyle overflowBody={overflowBody} />
            {children}
        </Provider>
    );
};

GlobalStyleWrapper.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default GlobalStyleWrapper;
