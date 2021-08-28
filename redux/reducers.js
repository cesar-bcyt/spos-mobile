const initialState = {
  token: null,
  signedIn: false
}

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'set_token':
      return {...state, token: action.payload}
      break;
    case 'set_signed_in':
      return {...state, signedIn: action.payload}
      break;
    default:
      return state;
  }
}
