import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import AuthClass from './AuthClass';
import LiveDataContainer from './LiveDataContainer';

const store = configureStore();

function App() {
  const authClass = new AuthClass();
  authClass.configure();

  return (
    <Provider store={store}>
      <LiveDataContainer />
    </Provider>
  );
}

export default App;
