import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import ListHeader from 'components/ListHeader';
import { getList } from 'utils/fetchData';
import { setList, finishLoadingWithError, finishLoadingWithSuccess, startLoading, setKey } from 'redux/listReducer';
import { listProps } from 'utils/propTypes';
import { MainContainer } from 'utils/style';
import QuestionsList from 'components/QuestionsList/QuestionsList';
import BackToTopButton from 'components/BackToTopButton';
import PropTypes from 'prop-types';
import { routes } from 'static/routes';
import Spinner from 'components/Spinner';
import { Container, SpinnerContainer, Error } from './ListView.style';

const ListView = ({
    list: { key, questions },
    match: {
        params: { id },
    },
    history: { replace },
    loading,
    error,
}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const isRedirectToFullPath = id === undefined && key !== '';
        if (isRedirectToFullPath) {
            replace(`${routes.List}/${key}`);
        }
    }, [id, key, replace]);

    useEffect(() => {
        let didCancel = false;

        const loadList = async () => {
            dispatch(startLoading());
            try {
                const res = await getList(id);

                if (res.status === 200) {
                    const data = await res.json();
                    if (!didCancel) {
                        dispatch(setList(data));
                    }
                } else if (res.status === 500) {
                    dispatch(finishLoadingWithError('Internal server error'));
                } else {
                    dispatch(finishLoadingWithError('Wrong list id'));
                    dispatch(setKey(id));
                }
            } catch (e) {
                dispatch(finishLoadingWithError('Problem witch fetching data'));
            }
        };

        const isLoadList = id !== undefined && key !== id;
        if (isLoadList) {
            loadList();
        }
        return () => {
            didCancel = true;
            dispatch(finishLoadingWithSuccess());
        };
    }, [id, key, dispatch]);

    const isShowQuestions = questions.length > 0 && !loading && error === '' && id === key;

    return (
        <MainContainer>
            <Container>
                <ListHeader isShowListInfo={isShowQuestions} />
                {error !== '' && <Error>{error}</Error>}
                {loading && (
                    <SpinnerContainer>
                        <Spinner size={40} />
                    </SpinnerContainer>
                )}
                {isShowQuestions && <QuestionsList questions={questions} />}
                <BackToTopButton offset={300} />
            </Container>
        </MainContainer>
    );
};

ListView.propTypes = {
    list: listProps.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string,
        }),
    }).isRequired,
    history: PropTypes.shape({
        replace: PropTypes.func.isRequired,
    }).isRequired,
};

const mapStateToProps = ({ list: { list, loading, error } }) => ({ list, loading, error });

export default connect(mapStateToProps)(ListView);
