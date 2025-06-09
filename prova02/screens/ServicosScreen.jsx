// screens/ServicosScreen.js
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Appbar, FAB, List, Portal, Dialog, Button, TextInput, IconButton } from 'react-native-paper';
import BackgroundWrapper from '../components/BackgroundWrapper';

export default function ServicosScreen() {
  const [servicos, setServicos] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState({ tipo: '', descricao: '', valor: '', veiculo: '', data: '' });

  useEffect(() => {
    carregarServicosFixos();
  }, []);

  const carregarServicosFixos = () => {
    const servicosFixos = [
      { tipo: 'Troca de óleo', descricao: 'Troca completa de óleo', valor: '150', veiculo: 'Gol', data: '2025-06-08' },
      { tipo: 'Alinhamento', descricao: 'Alinhamento e balanceamento', valor: '100', veiculo: 'Civic', data: '2025-06-07' },
      { tipo: 'Revisão', descricao: 'Revisão dos 10.000 km', valor: '350', veiculo: 'HB20', data: '2025-06-06' },
      { tipo: 'Freio', descricao: 'Troca de pastilhas', valor: '200', veiculo: 'Uno', data: '2025-06-05' },
      { tipo: 'Pintura', descricao: 'Retoque no para-choque', valor: '500', veiculo: 'Onix', data: '2025-06-04' },
    ];
    setServicos(servicosFixos);
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

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title="Serviços" titleStyle={{ color: 'white' }} />
        </Appbar.Header>

        <FlatList
          data={servicos}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item, index }) => (
            <List.Item
              title={item.tipo}
              titleStyle={{ color: 'white' }}
              description={`Descrição: ${item.descricao}, Valor: R$${item.valor}`}
              descriptionStyle={{ color: 'white' }}
              left={() => (
                <List.Icon
                  icon="wrench"
                  color="white"
                  style={{ transform: [{ rotate: '15deg' }] }}
                />
              )}
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
            onPress={carregarServicosFixos}
            style={styles.fab}
            small
          />
        </View>

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
      </View>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fabContainer: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    flexDirection: 'row',
    gap: 8,
  },
  fab: {
    marginLeft: 8,
  },
});
