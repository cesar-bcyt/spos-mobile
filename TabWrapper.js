import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNavigation } from 'react-native-material-ui';
import { withTheme } from 'react-native-material-ui';
import HomeTab from './tabs/HomeTab';
import SettingsTab from './tabs/SettingsTab';
import StockTab from './tabs/StockTab';
import POSTab from './tabs/POSTab';
import Ionicons from '@expo/vector-icons/Ionicons';
import { connect } from 'react-redux';
import store from './redux/store';

function TabWrapper(props) {
  const [active, _setActive] = useState(props.active);
  const { theme } = props;

  function refreshTab() {
    _setActive(store.getState().activeTab);
  }

  store.subscribe(refreshTab);

  function setActive(tab) {
    _setActive(tab);
    store.dispatch({ type: 'set_active_tab', payload: tab });
  }

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
  );
}

function mapStateToProps(state, ownProps) {
  return {
    active: state.activeTab
  };
}

export default connect(mapStateToProps)(withTheme(TabWrapper));
