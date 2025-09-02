import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');

export default function PetroVigilanteApp() {
  const [location, setLocation] = useState('');
  const [region, setRegion] = useState({
    latitude: -22.505,
    longitude: -43.167,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
  });

  // Exemplo de marcador fixo (pode ser dinâmico se conectar a uma API)
  const markerCoord = { latitude: -22.505, longitude: -43.167 };

  const onSearchPress = () => {
    // Aqui você implementaria a pesquisa real de endereço via API (ex: Google Maps Geocoding)
    alert(`Pesquisar por: ${location}`);
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://i.imgur.com/1Jq8s7k.png' }}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}>PetroVigilante</Text>
      </View>

      {/* Input de endereço */}
      <TextInput
        style={styles.input}
        placeholder="RUA, BAIRRO, DISTRITO, CIDADE"
        placeholderTextColor="#eee"
        value={location}
        onChangeText={setLocation}
      />

      {/* Mapa */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={setRegion}
          mapType="standard"
        >
          <Marker coordinate={markerCoord} title="Localização Exemplo" />
        </MapView>

        {/* Ícone de alerta */}
        <View style={styles.alertIconContainer}>
          <View style={styles.alertIconBackground}>
            <Text style={styles.alertIconText}>!</Text>
          </View>
        </View>
      </View>

      {/* Botão Pesquisar */}
      <TouchableOpacity style={styles.searchButton} onPress={onSearchPress}>
        <Text style={styles.searchButtonText}>PESQUISAR LOCAL</Text>
        <Icon name="search" size={20} color="#000" />
      </TouchableOpacity>

      {/* Rodapé */}
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>PetroVigilante ©</Text>
      </View>

      {/* Anúncio */}
      <View style={styles.adBanner}>
        <Text style={styles.adText}>ANUNCIE AQUI</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6babc7',
    paddingTop: 40,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#6babc7',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  logo: {
    width: 38,
    height: 38,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    color: '#cceeff',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: '90%',
    backgroundColor: '#6babc7',
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 6,
    color: '#eee',
    fontWeight: '700',
    fontSize: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  mapContainer: {
    width: '90%',
    height: 280,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 10,
  },
  map: {
    flex: 1,
  },
  alertIconContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  alertIconBackground: {
    backgroundColor: '#ffeb3b',
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  alertIconText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  searchButton: {
    backgroundColor: '#cceeff',
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: 45,
    marginBottom: 10,
  },
  searchButtonText: {
    fontWeight: '700',
    fontSize: 16,
    marginRight: 10,
    color: '#000',
  },
  footer: {
    backgroundColor: '#6babc7',
    width: '100%',
    alignItems: 'center',
    marginBottom: 0,
  },
  footerTitle: {
    fontSize: 22,
    fontWeight: 'italic',
    color: '#cceeff',
    marginVertical: 5,
  },
  adBanner: {
    backgroundColor: '#d2691e',
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  adText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 15,
  },
});
