import React, { useState, useEffect } from 'react';
import { Toolbar } from 'react-native-material-ui';
import { withTheme } from 'react-native-material-ui';
import { TextInput, Picker, StatusBar, Button, View, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { findServersOnLocalNetwork, findUsersOnServer, login } from './utils';
import store from './redux/store';

function LoginPage(props) {
  const { theme } = props;
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState("");
  const [selectedServer, _setSelectedServer] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [lookingForServers, setLookingForServers] = useState(true);
  const [waitingForLogin, setWaitingForLogin] = useState(false);
  const [users, setUsers] = useState([{label: 'Seleccione un servidor primero', value: null}]);
  const [servers, setServers] = useState([
    {label: '(Buscando)...', value: 'buscando'},
  ]);

  function setSelectedServer(server) {
    store.dispatch({ type: 'set_server_address', payload: server.value });
    _setSelectedServer(server);
  }

  async function findServers() {
    setServers([{label: '(Buscando)...', value: 'buscando'}])
    setLookingForServers(true);
    const ips = await findServersOnLocalNetwork();
    var newServers = [];
    if (ips.length > 0) {
      ips.forEach(ip => {
        newServers.push({label: ip, value: 'http://' + ip});
      });
    }
    newServers.push({label: 'Ingresar manualmente', value: 'manual'});
    setServers(newServers);
    setSelectedServer(newServers[0])
    if (newServers[0].value !== 'manual') {
      const rawUsers = await findUsersOnServer(newServers[0].value);
      var users = [];
      for (var i = 0; i<rawUsers.length; i++) {
        users.push({
          label: rawUsers[i].name,
          value: rawUsers[i].id,
        })
      }
      setUsers(users);
      if (users.length > 0) {
        setSelectedUser(users[0]);
      }
    }
    setLookingForServers(false);
  }

  useEffect(() => {
    findServers();
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.palette.extraColors.background, marginTop: StatusBar.currentHeight }}>
      <View style={{ flex: 1 }}>
        <Toolbar
          centerElement="SPOS Manager"
        />
      </View>
      <View style={{ flex: 2, paddingLeft: 10, paddingRight: 10, justifyContent: 'flex-start', alignItems: 'center' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Ingreso</Text>
        <View style={{ height: 5 }} />
        <View style={{ zIndex: 100 }}>
          <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ flex: 1, fontWeight: 'bold' }}>Servidor</Text>
            <View style={{ flex: 2, }}>
              { (selectedServer && selectedServer.value !== 'manual') ? (
                <Picker
                  selectedValue={selectedServer}
                  onValueChange={(itemValue, itemIndex) => setSelectedServer(itemValue)}>
                    { servers.map((item, index) => (
                      <Picker.Item key={index} label={item.label} value={item.value} />
                    ))}
                </Picker>
              ) : (
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                  <TextInput placeholder={"IP o nombre del servidor"} style={{ height: 40, margin: 10, width: '100%', borderWidth: 1, padding: 10 }} />
                </View>
              )}
            </View>
          </View>
        </View>
        <View style={{ height: 5 }} />
        <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flex: 1, width: 5 }} />
          <View style={{ flex: 2}}>
            <Button title={ lookingForServers ? "Buscando..." : "Buscar servidores" } onPress={findServers} />
          </View>
        </View>
        <View style={{ height: 5 }} />
        <View style={{ zIndex: 4 }} disabled={true} >
          <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ flex: 1, fontWeight: 'bold' }}>Usuario</Text>
            <View style={{ flex: 2, }}>
            <Picker
              selectedValue={selectedUser}
              onValueChange={(itemValue, itemIndex) => setSelectedUser(itemValue)}>
              { users.map((item, index) => (
                <Picker.Item key={index} label={item.label} value={item.value} />
              ))}
            </Picker>
            </View>
          </View>
        </View>
        <View style={{ height: 5 }} />
        <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ flex: 1, fontWeight: 'bold' }}>Contraseña</Text>
          <View style={{ flex: 2, }}>
            <TextInput value={password} onChangeText={setPassword} style={{ height: 40, width: '100%', borderWidth: 1, padding: 10 }} autoCorrect={false} autoCapitalize='none' placeholder={"Contraseña"} />
          </View>
        </View>
        <View style={{ height: 5 }} />
        <View style={{ zIndex: -5 }}>
          <Button primary raised title="entrar" zIndex={1} style={{ zIndex: 1}} onPress={ () => {
            const token = login(selectedServer.value, selectedUser.value, password);
            if (token) {
              console.log('TOKEN', token);
            }
          }} />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default withTheme(LoginPage);
