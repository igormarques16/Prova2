export default function MapaScreen() {
  // Coordenadas fixas da localização da oficina
  const latitude = -15.8480882;
  const longitude = -48.0281534;

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          // Região inicial mostrada no mapa (centralizada nas coordenadas)
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.05,  // Zoom vertical
            longitudeDelta: 0.05, // Zoom horizontal
          }}
        >
          {/* Marcador indicando a localização da oficina */}
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
