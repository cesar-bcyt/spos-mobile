import React from 'react';
import { View, Text } from 'react-native';
import { Toolbar } from 'react-native-material-ui';
import IconButton from '../components/IconButton';
import { Fontisto } from '@expo/vector-icons'; 

const posList = [
  { title: "POS #1", text: ["Primer piso", "Raspberry1"], icon: <Fontisto name="shopping-pos-machine" size={24} color="black" /> },
  { title: "POS #2", text: ["Primer piso", "Raspberry2"], icon: <Fontisto name="shopping-pos-machine" size={24} color="black" /> },
]

export default function POSTab() {
  return (
    <View>
      <Toolbar
        centerElement="Administración de POS"
        rightElement={{
          menu: {
            icon: 'more-vert',
            labels: ["item 1", "item 2"]
          }
        }}
      />
      <View style={{ padding: 10}}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, }}>
          Equipos activos
        </Text>
        <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
          { posList.map((pos, index) => (
            <IconButton key={ index } icon={ pos.icon } title={ pos.title } text={ pos.text } style={{ flex: "1 0 21%" }} />
          ))}
        </View>
      </View>
    </View>
  );
}
