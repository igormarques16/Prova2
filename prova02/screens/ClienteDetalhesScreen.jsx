// screens/ClienteDetalhesScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import BackgroundWrapper from '../components/BackgroundWrapper';

export default function ClienteDetalhesScreen({ route, navigation }) {
  const { cliente } = route.params;

  return (
    <BackgroundWrapper>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Detalhes do Cliente" />
      </Appbar.Header>

      <View style={styles.content}>
        <Text variant="titleLarge">{cliente.nome}</Text>
        <Text>CPF: {cliente.cpf}</Text>
        <Text>Telefone: {cliente.telefone}</Text>
        
      </View>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 20,
  },
});
