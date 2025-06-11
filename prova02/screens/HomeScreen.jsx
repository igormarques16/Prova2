import React, { useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Appbar, Text, Card, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import BackgroundWrapper from '../components/BackgroundWrapper';

// Array com as funcionalidades exibidas na tela inicial
const features = [
  { icon: 'wrench', label: 'Serviços Realizados', description: 'Registre e acompanhe os serviços feitos em cada veículo.' },
  { icon: 'car', label: 'Cadastro de veículos por cliente', description: 'Associe veículos aos clientes e mantenha tudo organizado.' },
  { icon: 'calendar-check', label: 'Histórico e agendamentos', description: 'Veja o histórico de atendimentos e gerencie novos agendamentos.' },
];

export default function HomeScreen({ navigation }) {
  // Valores para controlar animações de opacidade
  const titleOpacity = useSharedValue(0);
  const subtitleOpacity = useSharedValue(0);
  const featuresOpacity = useSharedValue(0);

  // Executa animações sequenciais quando o componente monta
  useEffect(() => {
    titleOpacity.value = withTiming(1, { duration: 800 });
    subtitleOpacity.value = withDelay(300, withTiming(1, { duration: 800 }));
    featuresOpacity.value = withDelay(600, withTiming(1, { duration: 800 }));
  }, []);

  // Estilos animados para título, subtítulo e lista de features
  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleOpacity.value === 1 ? 0 : 20 }],
  }));
  const subtitleStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
    transform: [{ translateY: subtitleOpacity.value === 1 ? 0 : 20 }],
  }));
  const featuresStyle = useAnimatedStyle(() => ({
    opacity: featuresOpacity.value,
    transform: [{ translateY: featuresOpacity.value === 1 ? 0 : 20 }],
  }));

  return (
    // Fundo customizado para a tela
    <BackgroundWrapper style={styles.background}>
      {/* Barra superior */}
      <Appbar.Header elevated style={styles.appbar}>
        <Appbar.Content title="Oficina Do Igão" titleStyle={styles.appbarTitle} />
      </Appbar.Header>

      {/* Conteúdo principal com scroll */}
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Título animado */}
        <Animated.View style={titleStyle}>
          <Text variant="headlineMedium" style={styles.title}>
            Bem-vindo à Oficina
          </Text>
        </Animated.View>

        {/* Subtítulo animado */}
        <Animated.View style={subtitleStyle}>
          <Text variant="bodyLarge" style={styles.subtitle}>
            Gerencie clientes, veículos e serviços com facilidade
          </Text>
        </Animated.View>

        {/* Lista animada de funcionalidades */}
        <Animated.View style={[styles.featuresContainer, featuresStyle]}>
          {features.map(({ icon, label, description }) => (
            <Card key={icon} style={styles.card} elevation={5}>
              <Card.Content style={styles.cardContent}>
                <MaterialCommunityIcons name={icon} size={44} color="#FF4B3E" />
                <View style={{ marginLeft: 20, flex: 1 }}>
                  <Text style={styles.featureText}>{label}</Text>
                  <Text style={styles.featureDescription}>{description}</Text>
                </View>
              </Card.Content>
            </Card>
          ))}

          {/* Botões para navegar para outras telas */}
          <View style={styles.buttonsRow}>
            <Button
              mode="contained"
              style={[styles.button, { marginRight: 12 }]}
              onPress={() => navigation.navigate('Serviços')}
              contentStyle={{ paddingVertical: 8 }}
              labelStyle={styles.buttonLabel}
            >
              Ver Serviços
            </Button>

            <Button
              mode="contained"
              style={styles.button}
              onPress={() => navigation.navigate('Mapa')}
              contentStyle={{ paddingVertical: 8 }}
              labelStyle={styles.buttonLabel}
            >
              Localização
            </Button>
          </View>
        </Animated.View>
      </ScrollView>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#1e1e1e',
  },
  appbar: {
    backgroundColor: '#121212',
    elevation: 6,
  },
  appbarTitle: {
    color: '#fff',
    fontWeight: '700',
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 40,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 1.2,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 28,
    color: '#ccc',
    fontStyle: 'italic',
  },
  featuresContainer: {
    width: '100%',
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#292929',
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    borderWidth: 0,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  featureText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 6,
  },
  featureDescription: {
    fontSize: 14,
    color: '#ddd',
    lineHeight: 20,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  button: {
    flex: 1,
    backgroundColor: '#FF3B30',
    borderRadius: 24,
    width: undefined,
  },
  buttonLabel: {
    color: '#fff',
    fontWeight: '700',
  },
});
