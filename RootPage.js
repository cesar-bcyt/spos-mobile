import React from 'react';
import { connect } from 'react-redux';
import TabWrapper from './TabWrapper';
import LoginPage from './LoginPage';

function RootPage(props) {
  const { signedIn } = props;

  if (signedIn) {
    return <TabWrapper />
  } else {
    return <LoginPage />
  }

}

function mapStateToProps(state, ownProps) {
  return {
    signedIn: state.signedIn
  };
}

export default connect(mapStateToProps)(RootPage);
