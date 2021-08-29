import React from 'react';
import RootPage from './RootPage';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { theme } from './theme';
import { ThemeContext, getTheme } from 'react-native-material-ui';
import store from './redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <ThemeContext.Provider value={getTheme(theme)}>
        <RootPage />
        <StatusBar style="auto" />
      </ThemeContext.Provider>
    </Provider>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    signedIn: state.signedIn
  };
}
