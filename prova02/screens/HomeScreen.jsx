import React, { useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
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
  { icon: 'wrench', label: 'Serviços Realizados' },
  { icon: 'car', label: 'Cadastro de veículos por cliente' },
  { icon: 'calendar-check', label: 'Histórico e agendamentos' },  
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
    <BackgroundWrapper style={styles.background}>
      <Appbar.Header elevated style={styles.appbar}>
        <Appbar.Content
          title="Oficina Do Igão"
          titleStyle={styles.appbarTitle}
        />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Animated.View style={titleStyle}>
          <Text variant="headlineMedium" style={styles.title}>
            Bem-vindo à Oficina
          </Text>
        </Animated.View>

        <Animated.View style={subtitleStyle}>
          <Text variant="bodyLarge" style={styles.subtitle}>
            Gerencie clientes, veículos e serviços com facilidade
          </Text>
        </Animated.View>

        <Animated.View style={[styles.featuresContainer, featuresStyle]}>
          {features.map(({ icon, label }) => (
            <Card key={icon} style={styles.card} elevation={5}>
              <Card.Content style={styles.cardContent}>
                <MaterialCommunityIcons name={icon} size={38} color="#800000" />
                <Text style={styles.featureText}>{label}</Text>
              </Card.Content>
            </Card>
          ))}
        </Animated.View>
      </ScrollView>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#C0C0C0',
  },
  appbar: {
    backgroundColor: '#1B1B1B',
    elevation: 6,
  },
  appbarTitle: {
    color: '#C0C0C0',
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
    marginBottom: 16,
    fontWeight: '900',
    color: '#C0C0C0', 
    letterSpacing: 1,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 32,
    color: '#CCCCCC',
    fontStyle: 'italic',
  },
  featuresContainer: {
    width: '100%',
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#222222',
    borderRadius: 16,
    shadowColor: '#A9A9A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#A9A9A9',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    marginLeft: 20,
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
  },
});
