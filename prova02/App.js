import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Importando telas
import HomeScreen from './screens/HomeScreen';
import ClientesScreen from './screens/ClientesScreen';
import VeiculosScreen from './screens/VeiculosScreen';
import ServicosScreen from './screens/ServicosScreen';
import MapaScreen from './screens/MapaScreen';
import DashboardScreen from './screens/DashboardScreen';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarIcon: ({ color, size }) => {
                let iconName;

                switch (route.name) {
                  case 'Home':
                    iconName = 'home';
                    break;
                  case 'Clientes':
                    iconName = 'account-group';
                    break;
                  case 'Veículos':
                    iconName = 'car';
                    break;
                  case 'Serviços':
                    iconName = 'tools';
                    break;
                  case 'Mapa':
                    iconName = 'map';
                    break;
                  case 'Dashboard':
                    iconName = 'view-dashboard';
                    break;
                }

                return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: '#6200ee',
              tabBarInactiveTintColor: 'gray',
            })}
          >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Clientes" component={ClientesScreen} />
            <Tab.Screen name="Veículos" component={VeiculosScreen} />
            <Tab.Screen name="Serviços" component={ServicosScreen} />
            <Tab.Screen name="Mapa" component={MapaScreen} />
            <Tab.Screen name="Dashboard" component={DashboardScreen} />

          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
