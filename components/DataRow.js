import React from 'react';
import { formatPrice } from '../misc.js';
import { View, Text } from 'react-native';

export default function DataRow(props) {
  const { left, right, money, allbold } = props;
  return (
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, marginBottom: 10 }}>
      <Text>{left}</Text>
      { money ? (
        <Text style={{ fontWeight: 'bold' }}>$ {formatPrice(right)}</Text>
          ) : (
        <Text>{right}</Text>
        )
      }
    </View>
  );
}

