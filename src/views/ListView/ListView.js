import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import ListHeader from 'components/ListHeader';
import { listProps } from 'utils/propTypes';
import { MainContainer } from 'utils/style';
import QuestionsList from 'components/QuestionsList/QuestionsList';
import BackToTopButton from 'components/BackToTopButton';
import PropTypes from 'prop-types';
import { routes } from 'static/routes';
import Spinner from 'components/Spinner';
import { getOriginType } from 'utils/list';
import LoadService from 'views/ListView/LoadService/LoadService';
import { Container, SpinnerContainer, Error } from './ListView.style';

const ListView = ({
    list: { key, origin, questions },
    match: {
        params: { id, origin: originPath },
    },
    history: { replace },
    loading,
    error,
}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const isRedirect = (id === undefined || getOriginType(originPath) === null) && key !== '';
        if (isRedirect) {
            replace(`${routes.List}/${origin}/${key}`);
        }
    }, [id, originPath, origin, key, replace]);

    useEffect(() => {
        const isLoadList = id !== undefined && originPath !== undefined && key !== id;
        if (isLoadList) {
            const cancelFn = LoadService(id, originPath, dispatch);
            return () => cancelFn();
        }
        return () => {};
    }, [id, originPath, key, dispatch]);

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
            origin: PropTypes.string,
        }),
    }).isRequired,
    history: PropTypes.shape({
        replace: PropTypes.func.isRequired,
    }).isRequired,
};

const mapStateToProps = ({ list: { list, loading, error } }) => ({ list, loading, error });

export default connect(mapStateToProps)(ListView);
