import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Appbar, FAB, List, Portal, Dialog, Button, TextInput, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundWrapper from '../components/BackgroundWrapper';

export default function ClientesScreen() {
  const [clientes, setClientes] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState({ nome: '', telefone: '', email: '', endereco: '' });

  useEffect(() => {
    loadClientes();
  }, []);

  const loadClientes = async () => {
    const data = await AsyncStorage.getItem('clientes');
    if (data) setClientes(JSON.parse(data));
  };

  const saveClientes = async (data) => {
    await AsyncStorage.setItem('clientes', JSON.stringify(data));
    setClientes(data);
  };

  const handleSave = () => {
    const { nome, telefone, email, endereco } = form;
    if (!nome || !telefone || !email || !endereco) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }
    const updated = [...clientes];
    if (editingIndex !== null) {
      updated[editingIndex] = form;
    } else {
      updated.push(form);
    }
    saveClientes(updated);
    setForm({ nome: '', telefone: '', email: '', endereco: '' });
    setEditingIndex(null);
    setVisible(false);
  };

  const handleEdit = (index) => {
    setForm(clientes[index]);
    setEditingIndex(index);
    setVisible(true);
  };

  const handleDelete = (index) => {
    Alert.alert('Excluir Cliente', 'Deseja realmente excluir este cliente?', [
      { text: 'Cancelar' },
      {
        text: 'Excluir', onPress: () => {
          const updated = clientes.filter((_, i) => i !== index);
          saveClientes(updated);
        }
      }
    ]);
  };

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
      <Appbar.Header>
        <Appbar.Content title="Clientes" titleStyle={{ color: 'white' }} />
      </Appbar.Header>

      <FlatList
        data={clientes}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <List.Item
            title={item.nome}
            titleStyle={{ color: 'white' }}
            description={`Telefone: ${item.telefone}\nEmail: ${item.email}\nEndereço: ${item.endereco}`}
            descriptionStyle={{ color: 'white' }}
            left={() => <List.Icon icon="account" color="white" />}
            onPress={() => handleEdit(index)}
            right={() => (
              <IconButton
                icon="delete"
                onPress={() => handleDelete(index)}
                iconColor="white"
              />
            )}
          />
        )}
      />

      <View style={styles.fabContainer}>
        <FAB
          icon="plus"
          label="Novo Cliente"
          style={styles.fab}
          onPress={() => {
            setVisible(true);
            setForm({ nome: '', telefone: '', email: '', endereco: '' });
            setEditingIndex(null);
          }}
        />
        <FAB
          icon="refresh"
          label="Resetar"
          style={styles.fab}
          onPress={resetClientes}
        />
      </View>

      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>{editingIndex !== null ? 'Editar Cliente' : 'Novo Cliente'}</Dialog.Title>
          <Dialog.Content>
            <TextInput label="Nome" value={form.nome} onChangeText={(nome) => setForm({ ...form, nome })} style={styles.input} />
            <TextInput label="Telefone" value={form.telefone} onChangeText={(telefone) => setForm({ ...form, telefone })} style={styles.input} />
            <TextInput label="Email" value={form.email} onChangeText={(email) => setForm({ ...form, email })} style={styles.input} />
            <TextInput label="Endereço" value={form.endereco} onChangeText={(endereco) => setForm({ ...form, endereco })} style={styles.input} />
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
  fabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 16,
    width: '100%',
  },
  fab: {
    flex: 1,
    marginHorizontal: 4,
  },
  input: {
    color: 'white',
  },
});
