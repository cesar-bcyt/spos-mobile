import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button, Card, Toolbar } from 'react-native-material-ui';
import DataRow from '../components/DataRow';
import WarningSnackbar from '../components/WarningSnackbar';
import IconButton from '../components/IconButton';
import { sales, productsStock } from '../exampleData.js';

export default function HomeTab(props) {
  const [warningIsVisble, setWarningIsVisible] = useState(true);
  const { setActive } = props;
  return (
    <View>
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
        <WarningSnackbar text={"4 productos bajo stock mínimo"} visible={warningIsVisble} onPress={ () => setWarningIsVisible(false) }/>
        <View style={{ flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <IconButton icon="bar-chart" title="Tendencias" text={["Agregación", "y predicciones"]} style={{ flex: 1 }}/>
            <IconButton icon="cash-outline" title="Impuestos" text={["Detalles impuestos", "mensuales"]} style={{ width: '50%' }}/>
            <IconButton icon="receipt" title="Últimos DTE" text={["Ver últimos DTE"]} style={{ flex: 1 }}/>
          </View>
        </View>
        <Card>
          <View style={{ padding: 10, }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Últimas ventas</Text>
            { Object.keys(sales).map(key => (
              <DataRow money left={"Total " + key} right={sales[key]} />
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
            { productsStock.map((item, index) => (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{ width: 100, justifyContent: 'center', alignItems: 'flex-start'}}>
                  <Text>{item.name}</Text>
                </View>
                <View style={{ width: 50, justifyContent: 'center', alignItems: 'flex-start'}}>
                  <Text>{item.minimum}</Text>
                </View>
                <View style={{ width: 50, justifyContent: 'center', alignItems: 'flex-end'}}>
                  <Text>{item.qty}</Text>
                </View>
              </View>
            ))}
            <View style={{ height: 5 }} />
            <Button raised primary text="Ver detalles" />
          </View>
        </Card>
      </View>
    </View>
  );
}
