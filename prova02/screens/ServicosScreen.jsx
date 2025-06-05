// screens/ServicosScreen.js
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Appbar, FAB, List, Portal, Dialog, Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundWrapper from '../components/BackgroundWrapper';

export default function ServicosScreen() {
  const [servicos, setServicos] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState({ tipo: '', descricao: '', valor: '', veiculo: '', data: '' });

  useEffect(() => {
    loadServicos();
  }, []);

  const loadServicos = async () => {
    const data = await AsyncStorage.getItem('servicos');
    if (data) setServicos(JSON.parse(data));
  };

  const saveServicos = async (data) => {
    await AsyncStorage.setItem('servicos', JSON.stringify(data));
    setServicos(data);
  };

  const handleSave = () => {
    if (!form.tipo || !form.descricao || !form.valor || !form.veiculo || !form.data) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }
    const updated = [...servicos];
    if (editingIndex !== null) {
      updated[editingIndex] = form;
    } else {
      updated.push(form);
    }
    saveServicos(updated);
    setForm({ tipo: '', descricao: '', valor: '', veiculo: '', data: '' });
    setEditingIndex(null);
    setVisible(false);
  };

  const handleEdit = (index) => {
    setForm(servicos[index]);
    setEditingIndex(index);
    setVisible(true);
  };

  const handleDelete = (index) => {
    Alert.alert('Excluir Serviço', 'Deseja realmente excluir este serviço?', [
      { text: 'Cancelar' },
      {
        text: 'Excluir', onPress: () => {
          const updated = servicos.filter((_, i) => i !== index);
          saveServicos(updated);
        }
      }
    ]);
  };

  return (
    <BackgroundWrapper>
      <Appbar.Header>
        <Appbar.Content title="Serviços" titleStyle={{ color: 'white' }} />
      </Appbar.Header>

      <FlatList
        data={servicos}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <List.Item
            title={item.tipo}
            description={`Descrição: ${item.descricao}\nValor: R$${item.valor}\nVeículo: ${item.veiculo}\nData: ${item.data}`}
            left={() => <List.Icon icon="wrench" />}
            onPress={() => handleEdit(index)}
            right={() => (
              <List.Icon icon="delete" onPress={() => handleDelete(index)} />
            )}
          />
        )}
      />

      <FAB
        icon="plus"
        label="Novo Serviço"
        style={styles.fab}
        onPress={() => {
          setVisible(true);
          setForm({ tipo: '', descricao: '', valor: '', veiculo: '', data: '' });
          setEditingIndex(null);
        }}
      />

      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>{editingIndex !== null ? 'Editar Serviço' : 'Novo Serviço'}</Dialog.Title>
          <Dialog.Content>
            <TextInput label="Tipo" value={form.tipo} onChangeText={(tipo) => setForm({ ...form, tipo })} />
            <TextInput label="Descrição" value={form.descricao} onChangeText={(descricao) => setForm({ ...form, descricao })} />
            <TextInput label="Valor" value={form.valor} onChangeText={(valor) => setForm({ ...form, valor })} keyboardType="numeric" />
            <TextInput label="Veículo" value={form.veiculo} onChangeText={(veiculo) => setForm({ ...form, veiculo })} />
            <TextInput label="Data" value={form.data} onChangeText={(data) => setForm({ ...form, data })} />
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
