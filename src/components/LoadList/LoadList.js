import React from 'react';
import PropTypes from 'prop-types';
import useHistoryPush from 'hooks/useHistoryPush';
import { routes } from 'static/routes';
import { addedListProps } from 'utils/propTypes';
import { ItemButton, List, ListItem, ListTitle, KeySpan } from './LoadList.style';

const LoadList = ({ showKey, title, items }) => {
    const pushToList = useHistoryPush(routes.List);

    const handleClick = id => {
        pushToList(`/${id}`);
    };

    return (
        <>
            <ListTitle>{title}</ListTitle>
            <List>
                {items.map(({ id, key, name }) => (
                    <ListItem key={id}>
                        <ItemButton onClick={() => handleClick(key)}>
                            {name} {showKey && <KeySpan>({key})</KeySpan>}
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
    items: addedListProps.isRequired,
};

LoadList.defaultProps = {
    showKey: false,
};

export default LoadList;
