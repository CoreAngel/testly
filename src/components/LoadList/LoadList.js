import React from 'react';
import PropTypes from 'prop-types';
import { ItemButton, List, ListItem, ListTitle, KeySpan } from './LoadList.style';

const LoadList = ({ showKey, title, items, onClick }) => {
    return (
        <>
            <ListTitle>{title}</ListTitle>
            <List>
                {items.map(({ id, key, label }) => (
                    <ListItem key={id}>
                        <ItemButton onClick={() => onClick(key)}>
                            {label} {showKey && <KeySpan>({key})</KeySpan>}
                        </ItemButton>
                    </ListItem>
                ))}
            </List>
        </>
    );
};

LoadList.propTypes = {
    showKey: PropTypes.bool,
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            key: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

LoadList.defaultProps = {
    showKey: false,
};

export default LoadList;
