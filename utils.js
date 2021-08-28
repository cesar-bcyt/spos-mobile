import axios from 'axios';
import store from './redux/store';
import { backendUrl } from './settings';

export function login(url, userId=1, password='password') {
  axios.post(url + '/auth?user_id=' + userId.toString() + '&password=' + password)
    .then(res => {
      // console.log('Token received: ' + res.data.token);
      store.dispatch({ type: 'set_token', payload: res.data.token })
      store.dispatch({ type: 'set_signed_in', payload: true })
      return res.data.token;
    })
    .catch(e => {
      store.dispatch({ type: 'set_token', payload: '(no obtenido)' })
      store.dispatch({ type: 'set_signed_in', payload: false })
      console.log(e);
    })
  return false;
}

export async function findServersOnLocalNetwork() {
  var results = [];
  const port = 8080;
  const maxOctet = 10;
  // const prefixes = ['192.168.0.', '10.0.0.'];
  // const prefixes = ['192.168.0.'];
  // for (const prefix in prefixes) {
  const prefix = '192.168.0.';
  for (var lastOctet = 2; lastOctet <= maxOctet; lastOctet++) {
    var ip = prefix + lastOctet.toString() + ':' + port.toString();
    try {
      const res = await axios.get('http://' + ip, { timeout: 100 });
      if (res.data.app === 'spos') {
        results.push(ip)
      }
    } catch (error) {
    }
  }
  // }
  return results;
}

export async function findUsersOnServer(ip) {
  const res = await axios.get(ip + '/users');
  if (res.data && res.data.data) {
    return res.data.data;
  }
  return [];
}
