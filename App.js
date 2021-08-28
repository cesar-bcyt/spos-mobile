import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { ThemeContext, getTheme } from 'react-native-material-ui';
import { theme } from './theme';
import { login } from './utils';
import TabWrapper from './TabWrapper';
import LoginPage from './LoginPage';
import store from './redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <ThemeContext.Provider value={getTheme(theme)}>
        { store.getState().signedIn ? <TabWrapper /> : <LoginPage /> }
        <StatusBar style="auto" />
      </ThemeContext.Provider>
    </Provider>
  );
}
