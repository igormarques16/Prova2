import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import BackgroundWrapper from '../components/BackgroundWrapper';

export default function MapaScreen() {
  const latitude = -15.8480882;
  const longitude = -48.0281534;

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            coordinate={{ latitude, longitude }}
            title="Oficina do Igão"
            description="Localização da oficina"
          />
        </MapView>
      </View>
    </BackgroundWrapper>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  map: {
    width: width * 0.95,  // 95% da largura da tela
    height: height * 0.6,  // 60% da altura da tela — bem maior
    borderRadius: 16,
  },
});
