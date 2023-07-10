import React from 'react';
import FasticketProvider from './redux/Provider';
import Router from './Router';

const App = () => {
  return (
    <FasticketProvider>
      <Router />
    </FasticketProvider>
  );
};

export default App;
