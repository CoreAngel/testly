import PropTypes from 'prop-types';
import { useDispatch, connect } from 'react-redux';
import useHistoryPush from 'hooks/useHistoryPush';
import { routes } from 'static/routes';
import { editProps } from 'utils/propTypes';
import { createTest } from 'utils/fetchData';
import { originType } from 'static/list';
import { setList } from 'redux/listReducer';
import { addList } from 'redux/addedListReducer';
import { reset, mergeErrors, setLoadingEndError, setLoadingStart } from 'redux/createReducer';
import filterNecessaryDataFromState from './shared/filterNecessaryDataFromState';
import mapServerValidationErrorsToState from './shared/mapServerValidationErrorsToState';

const ServerSaveProvider = ({ children, create }) => {
    const pushToList = useHistoryPush(`${routes.List}/`);
    const dispatch = useDispatch();

    const handler = async () => {
        dispatch(setLoadingStart());
        const test = filterNecessaryDataFromState(create);
        try {
            const res = await createTest(test);
            if (res.status === 200) {
                const data = await res.json();
                dispatch(
                    setList({
                        ...data,
                        origin: originType.Server,
                    }),
                );
                dispatch(addList({ key: data.key, name: data.name }));
                dispatch(reset());
                pushToList(`${originType.Server}/${data.key}`);
            } else if (res.status === 400) {
                const data = await res.json();
                const errors = mapServerValidationErrorsToState(data);
                dispatch(mergeErrors(errors));
            } else {
                dispatch(setLoadingEndError('Internal server error'));
            }
        } catch (e) {
            console.log(e);
            dispatch(setLoadingEndError('Cannot fetch data'));
        }
    };

    return children(handler);
};

ServerSaveProvider.propTypes = {
    children: PropTypes.func.isRequired,
    create: editProps.isRequired,
};

const mapStateToProps = ({ create }) => ({ create });

export default connect(mapStateToProps)(ServerSaveProvider);
