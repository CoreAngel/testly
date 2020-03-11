import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { originType } from 'static/list';
import { setList } from 'redux/listReducer';
import { addList } from 'redux/localListsReducer';
import { reset, cleanError } from 'redux/createReducer';
import { editProps } from 'utils/propTypes';
import useHistoryPush from 'hooks/useHistoryPush';
import { routes } from 'static/routes';
import prepareDataToLocalSave from './shared/prepareDataToLocalSave';
import filterNecessaryDataFromState from './shared/filterNecessaryDataFromState';

const LocalSaveProvider = ({ children, keys, create }) => {
    const pushToList = useHistoryPush(`${routes.List}/`);
    const dispatch = useDispatch();

    const handler = () => {
        dispatch(cleanError());
        const test = filterNecessaryDataFromState(create);
        const preparedTest = prepareDataToLocalSave(test, keys);
        dispatch(
            setList({
                preparedTest,
                origin: originType.Local,
            }),
        );
        dispatch(addList(preparedTest));
        dispatch(reset());
        pushToList(`${originType.Local}/${preparedTest.key}`);
    };

    return children(handler);
};

LocalSaveProvider.propTypes = {
    children: PropTypes.func.isRequired,
    create: editProps.isRequired,
    keys: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = ({ create, localLists }) => ({ create, keys: localLists.lists.map(({ key }) => key) });

export default connect(mapStateToProps)(LocalSaveProvider);
