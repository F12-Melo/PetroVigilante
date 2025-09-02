import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null);
  const [marcadores, setMarcadores] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada para acessar a localização.');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  const adicionarMarcador = (evento) => {
    const coordenadas = evento.nativeEvent.coordinate;
    const novoMarcador = {
      id: Date.now(),
      latitude: coordenadas.latitude,
      longitude: coordenadas.longitude,
      tipo: 'risco',
      descricao: 'Foco de risco adicionado pelo usuário',
    };

    setMarcadores([...marcadores, novoMarcador]);
  };

  if (!location) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.header}>
        <Image source={require('./assets/icon.png')} style={styles.logo} />
        <Text style={styles.headerTitle}>PetroVigilante</Text>
      </View>

      <Text style={styles.locationText}>RUA, BAIRRO, DISTRITO, CIDADE</Text>

      <MapView
        style={styles.map}
        showsUserLocation
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onLongPress={adicionarMarcador}
      >
        {marcadores.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.tipo}
            description={marker.descricao}
            pinColor="red"
          />
        ))}
      </MapView>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="PESQUISAR LOCAL"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.adButton}>
          <Text style={styles.adText}>ANUNCIE AQUI</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#6dc3ff',
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  locationText: {
    backgroundColor: '#63b7e6',
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    fontWeight: '600',
  },
  map: {
    flex: 1,
  },
  searchContainer: {
    position: 'absolute',
    bottom: 90,
    left: 10,
    right: 10,
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  searchButton: {
    padding: 10,
  },
  searchIcon: {
    fontSize: 20,
  },
  footer: {
    backgroundColor: '#f97316',
    paddingVertical: 12,
    alignItems: 'center',
  },
  adButton: {
    paddingVertical: 6,
  },
  adText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
