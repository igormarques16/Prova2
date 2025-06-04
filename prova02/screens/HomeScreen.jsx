// screens/HomeScreen.js
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Appbar, Card, Title, Paragraph } from 'react-native-paper';
import BackgroundWrapper from '../components/BackgroundWrapper';

export default function HomeScreen() {
  return (
    <BackgroundWrapper>
      <Appbar.Header>
        <Appbar.Content title="Início" />
      </Appbar.Header>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Bem-vindo à Oficina Fácil</Title>
          <Paragraph>Gerencie clientes, veículos e serviços com facilidade.</Paragraph>
        </Card.Content>
      </Card>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  card: { margin: 20, elevation: 4 },
});
