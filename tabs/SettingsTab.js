import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Checkbox, Divider, Button, Card, Toolbar } from 'react-native-material-ui';
import DataRow from '../components/DataRow';

export default function SettingsTab() {
  return (
    <ScrollView>
      <Toolbar
        centerElement="Ajustes"
      />
      <Card>
        <View style={{ padding: 10, flexDirection: 'column', justifyContent: 'space-around' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
            Prefencias básicas
          </Text>
          <DataRow left="Nombre de la tienda" right="Test Store" />
          <DataRow left="Dirección" right="Av. Chile 222, Las Condes, Santiago" />
          <DataRow left="Email" right="test@store.cl" />
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
            Información DTE
          </Text>
          <DataRow left="RUT" right="11.111.111-1" />
          <DataRow left="Razón Social" right="Tienda de Prueba SpA" />
          <DataRow left="Llave privada" right="llave_privada.asc" />

          <Text>DTEs activadas:</Text>
          <Checkbox label="Boletas electrónicas" checked={true} />
          <Checkbox label="Facturas" checked={false} />
          <Checkbox label="Notas de crédito" checked={false} />

          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
            Configuración avanzada
          </Text>
          <DataRow left="Usuario" right="admin" />
          <DataRow left="IP del Servidor" right="192.168.0.6" />
          <DataRow left="Versión API" right="0.1" />
          <Divider />
          <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
            <Button raised primary text="Guardar cambios" />
          </View>
        </View>
      </Card>
    </ScrollView>
  );
}
