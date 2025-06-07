// screens/ServicosScreen.js
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Appbar, FAB, List, Portal, Dialog, Button, TextInput, IconButton } from 'react-native-paper';
import axios from 'axios';
import BackgroundWrapper from '../components/BackgroundWrapper';

export default function ServicosScreen() {
  const [servicos, setServicos] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState({ tipo: '', descricao: '', valor: '', veiculo: '', data: '' });

  // Carrega serviços da API externa no primeiro carregamento
  useEffect(() => {
    fetchServicos();
  }, []);

  const fetchServicos = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      // Pega apenas os 5 primeiros serviços
      setServicos(response.data.slice(0, 5));
    } catch (error) {
      Alert.alert('Erro', 'Falha ao carregar serviços da API.');
      console.error(error);
    }
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
    setServicos(updated);
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
          setServicos(updated);
        }
      }
    ]);
  };

  const resetServicos = () => {
    fetchServicos();
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
            titleStyle={{ color: 'white' }}
            description={`Descrição: ${item.descricao}, Valor: R$${item.valor}`}
            descriptionStyle={{ color: 'white' }}
            left={() => <List.Icon icon="wrench" color="white" />}
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
          label="Novo Serviço"
          onPress={() => {
            setVisible(true);
            setForm({ tipo: '', descricao: '', valor: '', veiculo: '', data: '' });
            setEditingIndex(null);
          }}
          style={styles.fab}
        />
        <FAB
          icon="refresh"
          label="Resetar"
          onPress={resetServicos}
          style={styles.fab}
          small
        />
      </View>

      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>{editingIndex !== null ? 'Editar Serviço' : 'Novo Serviço'}</Dialog.Title>
          <Dialog.Content>
            <TextInput label="Tipo" value={form.tipo} onChangeText={(tipo) => setForm({ ...form, tipo })} style={styles.input} />
            <TextInput label="Descrição" value={form.descricao} onChangeText={(descricao) => setForm({ ...form, descricao })} style={styles.input} />
            <TextInput label="Valor" value={form.valor} onChangeText={(valor) => setForm({ ...form, valor })} keyboardType="numeric" style={styles.input} />
            <TextInput label="Veículo" value={form.veiculo} onChangeText={(veiculo) => setForm({ ...form, veiculo })} style={styles.input} />
            <TextInput label="Data" value={form.data} onChangeText={(data) => setForm({ ...form, data })} style={styles.input} />
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
    justifyContent: 'flex-end',
    gap: 8,
    paddingRight: 16,
    paddingBottom: 16,
  },
  fab: {
    marginLeft: 8,
  },
  input: {
    color: 'white',
  },
});
