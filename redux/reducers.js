const initialState = {
  token: null,
  signedIn: false,
  serverAddress: null,
  activeTab: 'home',
}

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'set_token':
      return {...state, token: action.payload}
      break;
    case 'set_signed_in':
      return {...state, signedIn: action.payload}
      break;
    case 'set_server_address':
      return {...state, serverAddress: action.payload}
      break;
    case 'set_active_tab':
      return {...state, activeTab: action.payload}
      break;
    default:
      return state;
  }
}
