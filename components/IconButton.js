import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Card } from 'react-native-material-ui';
import { Ionicons } from '@expo/vector-icons';
import { withTheme } from 'react-native-material-ui';

function IconButton(props) {
  const { icon, title, text, style } = props;
  return (
    <TouchableOpacity>
      <Card style={style}>
        <View style={{ padding: 10, flexDirection: 'column', alignItems: 'center' }}>
          { typeof icon === 'string' ? (
                <Ionicons name={icon} size={30} color={props.theme.palette.primaryColor} />
              ) : (
                icon
              )
          }
          <Text style={{ fontWeight: 'bold' }}>{ title }</Text>
          { 
            text && text.map((line, index) => (
              <View key={index} style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 13, color: props.theme.palette.secondaryTextColor, width: '100%' }}>{ line }</Text>
              </View>
            ))
          }
        </View>
      </Card>
    </TouchableOpacity>
  );
}

export default withTheme(IconButton);
