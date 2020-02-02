import React from 'react';
import {Provider} from 'react-redux';
import store from './redux/store'
import Main from './components/Main'


const App = () => {
  return (
      <Provider store={store}>
        <Main/>
      </Provider>
  );
};

export default App;
