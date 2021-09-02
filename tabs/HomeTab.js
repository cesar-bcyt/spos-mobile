import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Button, Card, Toolbar } from 'react-native-material-ui';
import DataRow from '../components/DataRow';
import WarningSnackbar from '../components/WarningSnackbar';
import IconButton from '../components/IconButton';
import { useStore } from 'react-redux';
import { sales, productsStock } from '../exampleData.js';
import store from '../redux/store';
import axios from 'axios';

export default function HomeTab(props) {
  const [warningIsVisble, setWarningIsVisible] = useState(true);
  const [token, setToken] = useState(null);
  const [serverAddress, setServerAddress] = useState(null);
  const [latestSales, setLatestSales] = useState(null);
  const [stockAlerts, setStockAlerts] = useState(null);
  const { setActive } = props;
  const store = useStore();

  useEffect(() => {
    if (store.getState()) {
      const { serverAddress, token } = store.getState();
      axios.get(serverAddress + '/summary/latest')
        .then(res => {
          setLatestSales(res.data);
        })
        .catch(err => {
          console.log(err);
        })
      axios.get(serverAddress + '/summary/stockAlerts')
        .then(res => {
          setStockAlerts(res.data);
        })
    }
    setToken(token);
    setServerAddress(serverAddress);
  }, [token])

  return (
    <ScrollView>
      <Toolbar
        centerElement="SPOS Manager"
        rightElement={{
          menu: {
            icon: 'more-vert',
            labels: ["item 1", "item 2"]
          }
        }}
      />
      <View style={{ flexDirection: 'column', paddingTop: warningIsVisble ? 0 : 5, justifyContent: 'space-around' }}>
        { stockAlerts && stockAlerts.length > 0 &&
          <WarningSnackbar text={stockAlerts.length.toString() + " productos bajo stock mínimo"} visible={warningIsVisble} onPress={ () => setWarningIsVisible(false) }/>
        }
        <View style={{ flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <IconButton icon="bar-chart" title="Tendencias" style={{ flex: 1 }}/>
            <IconButton icon="cash-outline" title="Impuestos" style={{ width: '50%' }}/>
            <IconButton icon="receipt" title="Últimos DTE" style={{ flex: 1 }}/>
          </View>
        </View>
        <Card>
          <View style={{ padding: 10 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Últimas ventas</Text>
            { latestSales && ['hoy', 'semana', 'mes', 'histórico'].map((key, index) => (
              <DataRow money key={index} left={"Total " + key} right={latestSales[key].totalRevenue} />
            ))}
            <View style={{ height: 5 }} />
            <Button raised primary text="Ver detalles" />
          </View>
        </Card>
        <Card>
          <View style={{ padding: 10 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Alertas de stock</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{ width: 130, justifyContent: 'center', alignItems: 'flex-start'}}>
                <Text style={{ fontWeight: 'bold'}}>Producto</Text>
              </View>
              <View style={{ width: 100, justifyContent: 'center', alignItems: 'flex-start'}}>
                <Text style={{ fontWeight: 'bold'}}>Stock mínimo</Text>
              </View>
              <View style={{ width: 100, justifyContent: 'center', alignItems: 'flex-end'}}>
                <Text style={{ fontWeight: 'bold'}}>Stock actual</Text>
              </View>
            </View>
            { stockAlerts && stockAlerts.slice(0, 5).map((item, index) => (
              <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{ width: 100, justifyContent: 'center', alignItems: 'flex-start'}}>
                  <Text>{item.title.slice(0, 8) + '...'}</Text>
                </View>
                <View style={{ width: 50, justifyContent: 'center', alignItems: 'flex-start'}}>
                  <Text>{Math.floor(item.min)}</Text>
                </View>
                <View style={{ width: 50, justifyContent: 'center', alignItems: 'flex-end'}}>
                  <Text>{Math.floor(item.qty)}</Text>
                </View>
              </View>
            ))}
            <View style={{ height: 5 }} />
            <Button raised primary text="Ver detalles" onPress={ () => store.dispatch({ type: 'set_active_tab', payload: 'stock' }) }/>
          </View>
        </Card>
    {
        // <Text>TOKEN: { token }</Text>
    }
      </View>
    </ScrollView>
  );
}
