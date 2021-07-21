import React from 'react';
import { withTheme } from 'react-native-material-ui';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function WarningSnackbar(props) {
  const { visible, onPress, text } = props;
  const { backgroundColor, extraColors: {primaryTextColor} } = props.theme.palette;
  if (visible) {
    return (
      <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: props.theme.palette.extraColors.warning, marginBottom: 4 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name='warning' color={props.theme.palette.primaryTextColor} size={25} />
          <Text style={{ color: props.theme.palette.primaryTextColor, fontWeight: 'bold' }}>{text}</Text>
        </View>
        <Ionicons name='arrow-forward' color={props.theme.palette.primaryTextColor} size={25} />
      </TouchableOpacity>
    );
  } else {
    return <></>
  }
}

export default withTheme(WarningSnackbar);
