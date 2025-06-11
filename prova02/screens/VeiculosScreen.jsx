import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Appbar, FAB, List, Portal, Dialog, Button, TextInput, IconButton, Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundWrapper from '../components/BackgroundWrapper';

export default function VeiculosScreen() {
  // Estado para lista de veículos
  const [veiculos, setVeiculos] = useState([]);
  // Estado para controle de diálogo visível
  const [visible, setVisible] = useState(false);
  // Estado para armazenar índice do veículo sendo editado, null se novo
  const [editingIndex, setEditingIndex] = useState(null);
  // Estado para dados do formulário (modelo, marca, placa, ano, cor)
  const [form, setForm] = useState({ modelo: '', marca: '', placa: '', ano: '', cor: '' });

  // Carrega veículos do AsyncStorage ao montar o componente
  useEffect(() => {
    loadVeiculos();
  }, []);

  // Função para carregar dados salvos
  const loadVeiculos = async () => {
    const data = await AsyncStorage.getItem('veiculos');
    if (data) {
      setVeiculos(JSON.parse(data));
    }
  };

  // Salva dados atualizados no AsyncStorage e no estado
  const saveVeiculos = async (data) => {
    await AsyncStorage.setItem('veiculos', JSON.stringify(data));
    setVeiculos(data);
  };

  // Valida e salva um veículo novo ou editado
  const handleSave = () => {
    // Validação simples para todos os campos
    if (!form.modelo || !form.marca || !form.placa || !form.ano || !form.cor) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }
    const updated = [...veiculos];
    if (editingIndex !== null) {
      // Edita veículo existente
      updated[editingIndex] = form;
    } else {
      // Adiciona novo veículo
      updated.push(form);
    }
    saveVeiculos(updated);
    setForm({ modelo: '', marca: '', placa: '', ano: '', cor: '' });
    setEditingIndex(null);
    setVisible(false);
  };

  // Abre diálogo para edição com dados preenchidos
  const handleEdit = (index) => {
    setForm(veiculos[index]);
    setEditingIndex(index);
    setVisible(true);
  };

  // Confirmação para deletar veículo da lista
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

  // Reseta lista com veículos de exemplo pré-definidos
  const resetVeiculos = async () => {
    const exemplos = [
      { modelo: 'Onix', marca: 'Chevrolet', placa: 'ABC1D23', ano: '2022', cor: 'Preto' },
      { modelo: 'HB20', marca: 'Hyundai', placa: 'XYZ4F56', ano: '2021', cor: 'Branco' },
      { modelo: 'Gol', marca: 'Volkswagen', placa: 'QWE7T89', ano: '2020', cor: 'Prata' },
      { modelo: 'Corolla', marca: 'Toyota', placa: 'RTY3G12', ano: '2023', cor: 'Cinza' },
      { modelo: 'Argo', marca: 'Fiat', placa: 'UIO9J76', ano: '2022', cor: 'Vermelho' },
    ];
    await saveVeiculos(exemplos);
  };

  return (
    <BackgroundWrapper>
      {/* Cabeçalho com título */}
      <Appbar.Header>
        <Appbar.Content 
          title="Veículos" 
          titleStyle={{
            color: '#222',        
            fontWeight: '700',     
            fontSize: 22,         
            letterSpacing: 0.5,  
            fontFamily: 'System',  
            textShadowColor: 'rgba(0,0,0,0.1)', 
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 2,
          }} 
        />
      </Appbar.Header>

      {/* Lista de veículos usando FlatList */}
      <FlatList
        data={veiculos}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Card style={styles.card} onPress={() => handleEdit(index)}>
            <Card.Title
              title={`${item.modelo} - ${item.placa}`}
              subtitle={`Marca: ${item.marca} | Ano: ${item.ano} | Cor: ${item.cor}`}
              titleStyle={{ color: 'white' }}
              subtitleStyle={{ color: 'white' }}
              left={() => <List.Icon icon="car" color="white" />}
              right={() => (
                <IconButton icon="delete" onPress={() => handleDelete(index)} iconColor="white" />
              )}
            />
          </Card>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Botões flutuantes para adicionar novo veículo ou resetar */}
      <View style={styles.fabContainer}>
        <FAB
          icon="plus"
          label="Novo Veículo"
          style={[styles.fab, { backgroundColor: '#D32F2F' }]} 
          color="#fff" 
          onPress={() => {
            setVisible(true);
            setForm({ modelo: '', marca: '', placa: '', ano: '', cor: '' });
            setEditingIndex(null);
          }}
        />
        <FAB
          icon="refresh"
          label="Resetar"
          style={[styles.fab, { backgroundColor: '#B71C1C' }]} 
          color="#fff" 
          onPress={resetVeiculos}
        />
      </View>

      {/* Dialog para adicionar/editar veículo */}
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

// Estilos usados no componente
const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: '#292929',  
    borderWidth: 0,
    elevation: 4,
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
