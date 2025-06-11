export default function ServicosScreen() {
  // Estado para armazenar lista de serviços
  const [servicos, setServicos] = useState([]);
  // Estado para controlar visibilidade do diálogo de formulário
  const [visible, setVisible] = useState(false);
  // Estado para armazenar índice do serviço que está sendo editado (null = novo)
  const [editingIndex, setEditingIndex] = useState(null);
  // Estado para armazenar os dados do formulário de serviço
  const [form, setForm] = useState({ nome: '', preco: '', duracao: '' });

  useEffect(() => {
    loadServicos(); // Carrega serviços do AsyncStorage ao montar a tela
  }, []);

  // Função para carregar serviços salvos no armazenamento local
  const loadServicos = async () => {
    const data = await AsyncStorage.getItem('servicos');
    if (data) setServicos(JSON.parse(data));
  };

  // Salva a lista atualizada de serviços no AsyncStorage e no estado local
  const saveServicos = async (data) => {
    await AsyncStorage.setItem('servicos', JSON.stringify(data));
    setServicos(data);
  };

  // Valida formulário e salva serviço (novo ou editado)
  const handleSave = () => {
    const { nome, preco, duracao } = form;
    if (!nome || !preco || !duracao) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    const updated = [...servicos];
    if (editingIndex !== null) {
      updated[editingIndex] = form; // Atualiza serviço existente
    } else {
      updated.push(form); // Adiciona novo serviço
    }

    saveServicos(updated); // Salva a lista atualizada
    setForm({ nome: '', preco: '', duracao: '' }); // Limpa formulário
    setEditingIndex(null); // Reseta índice de edição
    setVisible(false); // Fecha diálogo
  };

  // Abre diálogo para editar serviço existente
  const handleEdit = (index) => {
    setForm(servicos[index]);
    setEditingIndex(index);
    setVisible(true);
  };

  // Confirma exclusão e remove serviço da lista
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

  // Reseta lista com serviços exemplo pré-definidos
  const resetServicos = () => {
    const exemplos = [
      { nome: 'Troca de óleo', preco: '150', duracao: '30 minutos' },
      { nome: 'Alinhamento e balanceamento', preco: '120', duracao: '40 minutos' },
      { nome: 'Revisão completa', preco: '600', duracao: '3 horas' },
      { nome: 'Troca de pastilhas de freio', preco: '200', duracao: '1 hora' },
      { nome: 'Diagnóstico eletrônico', preco: '100', duracao: '20 minutos' },
    ];
    saveServicos(exemplos);
  };

  // FlatList renderiza cards de serviços, cada card pode ser editado ou excluído
  // FABs para criar novo serviço ou resetar lista
  // Dialog para inserir ou editar dados do serviço
}
