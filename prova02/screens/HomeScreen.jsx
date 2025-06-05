// screens/HomeScreen.js
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Text, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import BackgroundWrapper from '../components/BackgroundWrapper';

const features = [
  { icon: 'wrench', label: 'Controle de serviços realizados' },
  { icon: 'car', label: 'Cadastro de veículos por cliente' },
  { icon: 'calendar', label: 'Histórico e agendamentos' },
  { icon: 'message-text', label: 'Comunicação  com o cliente' },
];

export default function HomeScreen() {
  const titleOpacity = useSharedValue(0);
  const subtitleOpacity = useSharedValue(0);
  const featuresOpacity = useSharedValue(0);

  useEffect(() => {
    titleOpacity.value = withTiming(1, { duration: 800 });
    subtitleOpacity.value = withDelay(300, withTiming(1, { duration: 800 }));
    featuresOpacity.value = withDelay(600, withTiming(1, { duration: 800 }));
  }, []);

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [
      {
        translateY: titleOpacity.value === 1 ? 0 : 20,
      },
    ],
  }));

  const subtitleStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
    transform: [
      {
        translateY: subtitleOpacity.value === 1 ? 0 : 20,
      },
    ],
  }));

  const featuresStyle = useAnimatedStyle(() => ({
    opacity: featuresOpacity.value,
    transform: [
      {
        translateY: featuresOpacity.value === 1 ? 0 : 20,
      },
    ],
  }));

  return (
    <BackgroundWrapper>
      <Appbar.Header>
        <Appbar.Content title="Início" titleStyle={{ color: 'white' }} />
      </Appbar.Header>

      <View style={styles.container}>
        <Animated.View style={titleStyle}>
          <Text variant="headlineMedium" style={styles.title}>
            Bem-vindo à Oficina Do Igão
          </Text>
        </Animated.View>

        <Animated.View style={subtitleStyle}>
          <Text variant="bodyLarge" style={styles.subtitle}>
            Gerencie clientes, veículos e serviços com facilidade
          </Text>
        </Animated.View>

        <Animated.View style={[styles.featuresContainer, featuresStyle]}>
          {features.map(({ icon, label }) => (
            <Card key={icon} style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <MaterialCommunityIcons name={icon} size={36} color="#B00020" />
                <Text style={styles.featureText}>{label}</Text>
              </Card.Content>
            </Card>
          ))}
        </Animated.View>
      </View>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // título mais pra cima
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 40, // espaço do topo maior para o título
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '700',
    color: 'white',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 40,
    color: 'white',
  },
  featuresContainer: {
    width: '100%',
  },
  card: {
    marginBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.15)', // branco translúcido
    borderRadius: 12,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    marginLeft: 16,
    fontSize: 18,
    color: 'white',
  },
});
