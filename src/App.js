import React from 'react';
import FasticketProvider from './redux/Provider';
import Router from './Router';
import FetchUserInfo from './utils/FetchUserInfo';

const App = () => {
  return (
    <FasticketProvider>
      <Router />
      <FetchUserInfo />
    </FasticketProvider>
  );
};

export default App;
