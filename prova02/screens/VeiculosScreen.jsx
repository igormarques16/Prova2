import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Appbar, FAB, List, Portal, Dialog, Button, TextInput, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import BackgroundWrapper from '../components/BackgroundWrapper';

export default function VeiculosScreen() {
  const [veiculos, setVeiculos] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState({ modelo: '', marca: '', placa: '', ano: '', cor: '' });

  useEffect(() => {
    loadVeiculos();
  }, []);

  const loadVeiculos = async () => {
    const data = await AsyncStorage.getItem('veiculos');
    if (data) {
      setVeiculos(JSON.parse(data));
    }
  };

  const saveVeiculos = async (data) => {
    await AsyncStorage.setItem('veiculos', JSON.stringify(data));
    setVeiculos(data);
  };

  const handleSave = () => {
    if (!form.modelo || !form.marca || !form.placa || !form.ano || !form.cor) {
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
    setForm({ modelo: '', marca: '', placa: '', ano: '', cor: '' });
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
        text: 'Excluir',
        onPress: () => {
          const updated = veiculos.filter((_, i) => i !== index);
          saveVeiculos(updated);
        },
      },
    ]);
  };

  const resetVeiculos = async () => {
    try {
      const response = await axios.get('https://my.api.mockaroo.com/carros.json?key=9a2eac10');
      const primeiros5 = response.data.slice(0, 5);
      await saveVeiculos(primeiros5);
    } catch (error) {
      Alert.alert('Erro ao carregar dados da API', error.message);
    }
  };

  return (
    <BackgroundWrapper>
      <Appbar.Header>
        <Appbar.Content title="Veículos" titleStyle={{ color: 'white' }} />
      </Appbar.Header>

      <FlatList
        data={veiculos}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <List.Item
            title={`${item.modelo} - ${item.placa}`}
            titleStyle={{ color: 'white' }}
            description={`Marca: ${item.marca}, Ano: ${item.ano}, Cor: ${item.cor}`}
            descriptionStyle={{ color: 'white' }}
            left={() => <List.Icon icon="car" color="white" />}
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
          label="Novo Veículo"
          style={styles.fab}
          onPress={() => {
            setVisible(true);
            setForm({ modelo: '', marca: '', placa: '', ano: '', cor: '' });
            setEditingIndex(null);
          }}
        />
        <FAB
          icon="refresh"
          label="Resetar"
          style={styles.fab}
          onPress={resetVeiculos}
        />
      </View>

      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>{editingIndex !== null ? 'Editar Veículo' : 'Novo Veículo'}</Dialog.Title>
          <Dialog.Content>
            <TextInput label="Modelo" value={form.modelo} onChangeText={(modelo) => setForm({ ...form, modelo })} style={styles.input} />
            <TextInput label="Marca" value={form.marca} onChangeText={(marca) => setForm({ ...form, marca })} style={styles.input} />
            <TextInput label="Placa" value={form.placa} onChangeText={(placa) => setForm({ ...form, placa })} style={styles.input} />
            <TextInput label="Ano" value={form.ano} onChangeText={(ano) => setForm({ ...form, ano })} keyboardType="numeric" style={styles.input} />
            <TextInput label="Cor" value={form.cor} onChangeText={(cor) => setForm({ ...form, cor })} style={styles.input} />
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
    margin: 16,
  },
  fab: {
    flex: 1,
    marginHorizontal: 5,
  },
  input: {
    color: 'white',
  },
});
