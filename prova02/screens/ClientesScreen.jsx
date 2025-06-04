import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, FAB, List } from 'react-native-paper';

export default function ClientesScreen() {
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Clientes" />
      </Appbar.Header>

      <List.Section>
        <List.Item title="João da Silva" description="CPF: 123.456.789-00" left={() => <List.Icon icon="account" />} />
      </List.Section>

      <FAB
        icon="plus"
        label="Novo Cliente"
        style={styles.fab}
        onPress={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
