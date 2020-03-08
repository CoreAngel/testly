import React from 'react';
import PropTypes from 'prop-types';
import useHistoryPush from 'hooks/useHistoryPush';
import { routes } from 'static/routes';
import { addedListItemObj } from 'utils/propTypes';
import { originType } from 'static/list';
import { bin } from 'react-icons-kit/ikons/bin';
import { IconStyled } from 'utils/style';
import { Container, ItemButton, List, ListItem, ListTitle, KeySpan, DeleteButton } from './LoadList.style';

const LoadList = ({ showKey, title, items, deleteAction }) => {
    const pushToList = useHistoryPush(routes.List);

    const handleClick = (key, origin) => {
        pushToList(`/${origin}/${key}`);
    };

    return (
        items.length > 0 && (
            <Container>
                <ListTitle>{title}</ListTitle>
                <List>
                    {items.map(({ id, key, origin, name }) => (
                        <ListItem key={id}>
                            <ItemButton onClick={() => handleClick(key, origin)}>
                                {name} {showKey && <KeySpan>({key})</KeySpan>}
                            </ItemButton>
                            <DeleteButton onClick={() => deleteAction(key)}>
                                <IconStyled icon={bin} size={16} />
                            </DeleteButton>
                        </ListItem>
                    ))}
                </List>
            </Container>
        )
    );
};

LoadList.propTypes = {
    showKey: PropTypes.bool,
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            ...addedListItemObj,
            origin: PropTypes.oneOf([originType.Local, originType.Server]).isRequired,
        }),
    ).isRequired,
    deleteAction: PropTypes.func.isRequired,
};

LoadList.defaultProps = {
    showKey: false,
};

export default LoadList;
