import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import store from '../redux/store';
import axios from 'axios';

export default function StockTab() {
  const [stockAlerts, setStockAlerts] = useState(null);

  useEffect(() => {
    if (store.getState()) {
      const { serverAddress } = store.getState();
      axios.get(serverAddress + '/summary/stockAlerts')
        .then(res => {
          setStockAlerts(res.data);
        })
    }
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
      <ScrollView containerStyle={{ padding: 10, }}>
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
        { stockAlerts && stockAlerts.map((item, index) => (
          <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{ width: 100, justifyContent: 'center', alignItems: 'flex-start'}}>
              <Text>{item.title + '...'}</Text>
            </View>
            <View style={{ width: 50, justifyContent: 'center', alignItems: 'flex-start'}}>
              <Text>{Math.floor(item.min)}</Text>
            </View>
            <View style={{ width: 50, justifyContent: 'center', alignItems: 'flex-end'}}>
              <Text>{Math.floor(item.qty)}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
