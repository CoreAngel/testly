import React from 'react';
import PropTypes from 'prop-types';
import { ItemButton, List, ListItem, ListTitle, KeySpan } from './LoadList.style';
import useHistoryPush from '../../hooks/useHistoryPush';
import { routes } from '../../static/routes';

const LoadList = ({ showKey, title, items }) => {
    const pushToList = useHistoryPush(routes.List);

    const onClick = id => {
        pushToList(`/${id}`);
    };

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
