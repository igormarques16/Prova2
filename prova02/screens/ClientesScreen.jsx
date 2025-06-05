// screens/ClientesScreen.js
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Appbar, FAB, List, Portal, Dialog, Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundWrapper from '../components/BackgroundWrapper';

export default function ClientesScreen() {
  const [clientes, setClientes] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState({ nome: '', cpf: '', telefone: '', email: '', endereco: '' });

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
    if (!form.nome || !form.cpf || !form.telefone || !form.email || !form.endereco) {
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
    setForm({ nome: '', cpf: '', telefone: '', email: '', endereco: '' });
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

  return (
    <BackgroundWrapper>
      <Appbar.Header>
        <Appbar.Content title="Clientes" />
      </Appbar.Header>

      <FlatList
        data={clientes}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <List.Item
            title={item.nome}
            description={`CPF: ${item.cpf}\nTel: ${item.telefone}`}
            left={() => <List.Icon icon="account" />}
            onPress={() => handleEdit(index)}
            right={() => (
              <List.Icon icon="delete" onPress={() => handleDelete(index)} />
            )}
          />
        )}
      />

      <FAB
        icon="plus"
        label="Novo Cliente"
        style={styles.fab}
        onPress={() => { setVisible(true); setForm({ nome: '', cpf: '', telefone: '', email: '', endereco: '' }); setEditingIndex(null); }}
      />

      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>{editingIndex !== null ? 'Editar Cliente' : 'Novo Cliente'}</Dialog.Title>
          <Dialog.Content>
            <TextInput label="Nome" value={form.nome} onChangeText={(nome) => setForm({ ...form, nome })} />
            <TextInput label="CPF" value={form.cpf} onChangeText={(cpf) => setForm({ ...form, cpf })} keyboardType="numeric" />
            <TextInput label="Telefone" value={form.telefone} onChangeText={(telefone) => setForm({ ...form, telefone })} keyboardType="phone-pad" />
            <TextInput label="Email" value={form.email} onChangeText={(email) => setForm({ ...form, email })} keyboardType="email-address" />
            <TextInput label="Endereço" value={form.endereco} onChangeText={(endereco) => setForm({ ...form, endereco })} />
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
