// Componente que exibe um quadrado animado com ícone, valor e label
const DashboardBox = ({ icon, label, value }) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.85);

  useEffect(() => {
    // Anima a opacidade e o tamanho ao montar o componente
    opacity.value = withTiming(1, { duration: 600 });
    scale.value = withTiming(1, { duration: 600 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.box, animatedStyle]}>
      <MaterialCommunityIcons name={icon} size={36} color="#D32F2F" /> {/* Ícone vermelho */}
      <Text style={styles.boxValue}>{value}</Text>
      <Text style={styles.boxLabel}>{label}</Text>
    </Animated.View>
  );
};

export default function DashboardScreen() {
  const [clientes, setClientes] = useState([]);
  const [veiculos, setVeiculos] = useState([]);
  const [servicos, setServicos] = useState([]);

  useEffect(() => {
    // Carrega os dados salvos localmente ao iniciar a tela
    const loadData = async () => {
      const c = JSON.parse(await AsyncStorage.getItem('clientes')) || [];
      const v = JSON.parse(await AsyncStorage.getItem('veiculos')) || [];
      const s = JSON.parse(await AsyncStorage.getItem('servicos')) || [];
      setClientes(c);
      setVeiculos(v);
      setServicos(s);
    };
    loadData();
  }, []);

  // Calcula agendamentos futuros e soma faturamento
  const agendamentos = servicos.filter(s => s.data && new Date(s.data) > new Date());
  const faturamento = servicos.reduce((sum, s) => sum + (parseFloat(s.valor) || 0), 0);

  return (
    <>
      <Appbar.Header style={{ backgroundColor: '#111' }}>
        <Appbar.Content title="Dashboard" titleStyle={{ color: '#D32F2F' }} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Quadrados com as principais estatísticas */}
        <DashboardBox icon="account-group" label="Clientes" value={clientes.length} />
        <DashboardBox icon="car-multiple" label="Veículos" value={veiculos.length} />
        <DashboardBox icon="tools" label="Serviços" value={servicos.length} />
        <DashboardBox icon="calendar-clock" label="Agendamentos" value={agendamentos.length} />
        <DashboardBox icon="currency-usd" label="Faturamento" value={`R$ ${faturamento.toFixed(2)}`} />
      </ScrollView>
    </>
  );
}
