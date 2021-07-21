import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BottomNavigation } from 'react-native-material-ui';
import HomeTab from './tabs/HomeTab';
import SettingsTab from './tabs/SettingsTab';
import StockTab from './tabs/StockTab';
import POSTab from './tabs/POSTab';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemeContext, getTheme } from 'react-native-material-ui';
import { theme } from './theme';
import { titleCase } from './misc';

export default function App() {
  const [active, setActive] = useState('home');

  const bottomTabs = {
    home: {
      icon: 'storefront',
      label: 'Resumen',
      component: <HomeTab setActive={setActive} />
    },
    pos: {
      icon: 'settings-cell',
      label: 'POS',
      component: <POSTab />
    },
    stock: {
      icon: 'assignment',
      label: 'Stock',
      component: <StockTab />
    },
    settings: {
      icon: 'settings',
      label: 'Ajustes',
      component: <SettingsTab />
    },
  };

  function activeTab() {
    return bottomTabs[active].component;
  }

  return (
    <ThemeContext.Provider value={getTheme(theme)}>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.palette.extraColors.background }}>
        <View style={{ flex: 1, }}>
          { activeTab() }
        </View>
        <View>
          <BottomNavigation active={active} labels={false} hidden={false}>
            { Object.keys(bottomTabs).map( key => (
                <BottomNavigation.Action
                  key={key}
                  icon={bottomTabs[key].icon}
                  label={bottomTabs[key].label}
                  onPress={() => setActive(key)}
                />
            ))}
          </BottomNavigation>
        </View>
      </SafeAreaView>
      <StatusBar style="auto" />
    </ThemeContext.Provider>
  );
}
