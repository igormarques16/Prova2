import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Text } from 'react-native-paper';

export default function ServicosScreen() {
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Serviços" />
      </Appbar.Header>
      <Text style={styles.text}>Tela de Serviços</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  text: { margin: 20 }
});
