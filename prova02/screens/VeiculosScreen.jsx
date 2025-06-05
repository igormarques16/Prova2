// screens/VeiculosScreen.js
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Appbar, FAB, List, Portal, Dialog, Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundWrapper from '../components/BackgroundWrapper';

export default function VeiculosScreen() {
  const [veiculos, setVeiculos] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState({ placa: '', modelo: '', marca: '', ano: '', cor: '' });

  useEffect(() => {
    loadVeiculos();
  }, []);

  const loadVeiculos = async () => {
    const data = await AsyncStorage.getItem('veiculos');
    if (data) setVeiculos(JSON.parse(data));
  };

  const saveVeiculos = async (data) => {
    await AsyncStorage.setItem('veiculos', JSON.stringify(data));
    setVeiculos(data);
  };

  const handleSave = () => {
    if (!form.placa || !form.modelo || !form.marca || !form.ano || !form.cor) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }
    const updated = [...veiculos];
    if (editingIndex !== null) {
      updated[editingIndex] = form;
    } else {
      updated.push(form);
    }
    saveVeiculos(updated);
    setForm({ placa: '', modelo: '', marca: '', ano: '', cor: '' });
    setEditingIndex(null);
    setVisible(false);
  };

  const handleEdit = (index) => {
    setForm(veiculos[index]);
    setEditingIndex(index);
    setVisible(true);
  };

  const handleDelete = (index) => {
    Alert.alert('Excluir Veículo', 'Deseja realmente excluir este veículo?', [
      { text: 'Cancelar' },
      {
        text: 'Excluir', onPress: () => {
          const updated = veiculos.filter((_, i) => i !== index);
          saveVeiculos(updated);
        }
      }
    ]);
  };

  return (
    <BackgroundWrapper>
      <Appbar.Header>
        <Appbar.Content title="Veículos" />
      </Appbar.Header>

      <FlatList
        data={veiculos}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <List.Item
            title={item.placa}
            description={`Modelo: ${item.modelo}, Marca: ${item.marca}`}
            left={() => <List.Icon icon="car" />}
            onPress={() => handleEdit(index)}
            right={() => (
              <List.Icon icon="delete" onPress={() => handleDelete(index)} />
            )}
          />
        )}
      />

      <FAB
        icon="plus"
        label="Novo Veículo"
        style={styles.fab}
        onPress={() => {
          setVisible(true);
          setForm({ placa: '', modelo: '', marca: '', ano: '', cor: '' });
          setEditingIndex(null);
        }}
      />

      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>{editingIndex !== null ? 'Editar Veículo' : 'Novo Veículo'}</Dialog.Title>
          <Dialog.Content>
            <TextInput label="Placa" value={form.placa} onChangeText={(placa) => setForm({ ...form, placa })} />
            <TextInput label="Modelo" value={form.modelo} onChangeText={(modelo) => setForm({ ...form, modelo })} />
            <TextInput label="Marca" value={form.marca} onChangeText={(marca) => setForm({ ...form, marca })} />
            <TextInput label="Ano" value={form.ano} onChangeText={(ano) => setForm({ ...form, ano })} keyboardType="numeric" />
            <TextInput label="Cor" value={form.cor} onChangeText={(cor) => setForm({ ...form, cor })} />
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
