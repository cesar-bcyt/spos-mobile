import React, { useState } from 'react';
import { View, Text, Picker } from 'react-native';

export default function UserSelector(props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const { server } = props;
  console.log(props);
  const [items, setItems] = useState([
    {label: server, value: 'admin'},
    {label: 'vendedor1', value: 'vendedor1'},
    {label: 'vendedor2', value: 'vendedor2'},
  ]);

  return (
  );
}
