import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Appbar, FAB, List, Portal, Dialog, Button, TextInput, IconButton, Card, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundWrapper from '../components/BackgroundWrapper';

export default function ClientesScreen() {
  // Estado para lista de clientes e controle do diálogo de formulário
  const [clientes, setClientes] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState({ nome: '', telefone: '', email: '', endereco: '' });

  // Carrega os clientes salvos no AsyncStorage ao iniciar
  useEffect(() => {
    loadClientes();
  }, []);

  // Função para carregar clientes do armazenamento local
  const loadClientes = async () => {
    const data = await AsyncStorage.getItem('clientes');
    if (data) setClientes(JSON.parse(data));
  };

  // Salva clientes no AsyncStorage e atualiza estado local
  const saveClientes = async (data) => {
    await AsyncStorage.setItem('clientes', JSON.stringify(data));
    setClientes(data);
  };

  // Salva ou atualiza cliente a partir do formulário
  const handleSave = () => {
    const { nome, telefone, email, endereco } = form;
    if (!nome || !telefone || !email || !endereco) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }
    const updated = [...clientes];
    if (editingIndex !== null) {
      updated[editingIndex] = form; // Edita cliente existente
    } else {
      updated.push(form); // Adiciona novo cliente
    }
    saveClientes(updated);
    setForm({ nome: '', telefone: '', email: '', endereco: '' });
    setEditingIndex(null);
    setVisible(false);
  };

  // Preenche formulário para edição e abre diálogo
  const handleEdit = (index) => {
    setForm(clientes[index]);
    setEditingIndex(index);
    setVisible(true);
  };

  // Confirmação para exclusão do cliente
  const handleDelete = (index) => {
    Alert.alert('Excluir Cliente', 'Deseja realmente excluir este cliente?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          const updated = clientes.filter((_, i) => i !== index);
          saveClientes(updated);
        },
      },
    ]);
  };

  // Reseta lista de clientes para um conjunto fixo de exemplo
  const resetClientes = () => {
    const novos = [
      { nome: 'João Silva', telefone: '11988887777', email: 'joao@gmail.com', endereco: 'Rua A, 123' },
      { nome: 'Maria Souza', telefone: '11999996666', email: 'maria@gmail.com', endereco: 'Rua B, 456' },
      { nome: 'Carlos Lima', telefone: '11888885555', email: 'carlos@gmail.com', endereco: 'Rua C, 789' },
      { nome: 'Ana Paula', telefone: '11777774444', email: 'ana@gmail.com', endereco: 'Rua D, 101' },
      { nome: 'Fernanda Dias', telefone: '11666663333', email: 'fernanda@gmail.com', endereco: 'Rua E, 202' },
    ];
    saveClientes(novos);
  };

  return (
    <BackgroundWrapper>
      {/* Barra superior com título */}
      <Appbar.Header>
        <Appbar.Content title="Clientes" titleStyle={{ color: '#222', fontWeight: '700', fontSize: 22 }} />
      </Appbar.Header>

      {/* Lista de clientes exibida com FlatList */}
      <FlatList
        contentContainerStyle={{ padding: 10 }}
        data={clientes}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Card mode="elevated" style={styles.card}>
            {/* Card com nome, telefone e email */}
            <Card.Title
              title={<Text style={styles.title}>{item.nome}</Text>}
              subtitle={<Text style={styles.subtitle}>{`${item.telefone} • ${item.email}`}</Text>}
              left={(props) => <List.Icon {...props} icon="account-circle" color="#fff" />}
              right={() => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {/* Botões para editar e excluir */}
                  <IconButton icon="pencil" color="#fff" onPress={() => handleEdit(index)} />
                  <IconButton icon="delete" color="#fff" onPress={() => handleDelete(index)} />
                </View>
              )}
            />
            {/* Exibe endereço do cliente */}
            <Card.Content>
              <List.Item
                title={<Text style={styles.label}>Endereço</Text>}
                description={<Text style={styles.description}>{item.endereco}</Text>}
                left={(props) => <List.Icon {...props} icon="map-marker" color="#ccc" />}
              />
            </Card.Content>
          </Card>
        )}
      />

      {/* Botões flutuantes para adicionar novo cliente ou resetar lista */}
      <View style={styles.fabContainer}>
        <FAB
          icon="plus"
          style={[styles.fab, { backgroundColor: '#D32F2F' }]}
          color="#fff"
          label="Novo Cliente"
          onPress={() => {
            setVisible(true);
            setForm({ nome: '', telefone: '', email: '', endereco: '' });
            setEditingIndex(null);
          }}
        />
        <FAB
          icon="refresh"
          style={[styles.fab, { backgroundColor: '#B71C1C' }]}
          label="Resetar"
          onPress={resetClientes}
          color="#fff"
        />
      </View>

      {/* Diálogo para criação/edição de cliente */}
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>{editingIndex !== null ? 'Editar Cliente' : 'Novo Cliente'}</Dialog.Title>
          <Dialog.Content>
            {/* Formulário para nome, telefone, email e endereço */}
            <TextInput
              label="Nome"
              value={form.nome}
              onChangeText={(nome) => setForm({ ...form, nome })}
              style={styles.input}
              mode="outlined"
            />
            <TextInput
              label="Telefone"
              value={form.telefone}
              onChangeText={(telefone) => setForm({ ...form, telefone })}
              style={styles.input}
              keyboardType="phone-pad"
              mode="outlined"
            />
            <TextInput
              label="Email"
              value={form.email}
              onChangeText={(email) => setForm({ ...form, email })}
              style={styles.input}
              keyboardType="email-address"
              mode="outlined"
            />
            <TextInput
              label="Endereço"
              value={form.endereco}
              onChangeText={(endereco) => setForm({ ...form, endereco })}
              style={styles.input}
              mode="outlined"
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>Cancelar</Button>
            <Button onPress={handleSave}>Salvar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: '#292929',
    borderWidth: 0,
    elevation: 4,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  subtitle: {
    color: '#ccc',
    fontSize: 14,
  },
  label: {
    color: '#aaa',
    fontWeight: '600',
  },
  description: {
    color: '#ddd',
  },
  fabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
  },
  fab: {
    flex: 1,
    marginHorizontal: 8,
  },
  input: {
    marginBottom: 10,
  },
});
