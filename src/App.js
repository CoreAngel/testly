import React from 'react';
import { Provider } from 'react-redux';
import store from 'redux/store';
import GlobalStyleWrapper from 'theme/GlobalStyleWrapper';
import MainView from 'views/MainView';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <Provider store={store}>
            <GlobalStyleWrapper>
                <MainView />
            </GlobalStyleWrapper>
        </Provider>
    );
};

export default App;
