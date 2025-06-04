import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Text } from 'react-native-paper';

export default function VeiculosScreen() {
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Veículos" />
      </Appbar.Header>
      <Text style={styles.text}>Tela de Veículos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  text: { margin: 20 }
});
