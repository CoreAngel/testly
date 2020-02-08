import React from 'react';
import { Provider } from 'react-redux';
import store from 'redux/store';
import MainView from 'views/MainView';

const App = () => {
    return (
        <Provider store={store}>
            <MainView />
        </Provider>
    );
};

export default App;
