import React, { useState, useEffect } from 'react';
import { Alert, Dimensions, StyleSheet, Text, View, Location, Permissions } from 'react-native';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


export default function App() {
  const [pin, setPin] = React.useState({
    latitude: 37.78825,
    longitude: -122.4324,
  })
  const [region, setRegion] = React.useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
  })

return (
  <View style={{ marginTop: 50, flex: 1 }}> 
    <GooglePlacesAutocomplete
    placeholder="Search"
    fetchDetails={true}
    GooglePlacesSearchQuery={{
      rankby: "distance"
    }}
    onPress={(data, details = null ) => {
      console.log(data, details)
      setRegion({
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng
      })
    }}
    query={{
      key: "AIzaSyCxcTWNpradtti3oeGorK6qu3dEpUs6Um8",
      language: "en",
      components: "country:us",
      types: "address",
      radius: 30000,
      location: `${region.latitude}, ${region.longitude}`
    }}
    styles={{
      container: { flex: 0, position: "absolute", width: "100%", zIndex: 1 },
      listView: { backgroundColor: "white" }
    }}
  />
    <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider="google"
      >
        <Marker 
        coordinate={pin}
        pinColor="purple"
        draggable={true}
        onDragStart={(e)=> {
          console.log("Start", e.nativeEvent.coordinates)
        }}
        
           onDragEnd={(e)=> {
          setPin({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude
          })
        }}
        >
          <Callout>
            <Text> Found me! </Text>
          </Callout>
          </Marker>
          <Circle center={pin}
          radius={1000}
          />
      </MapView>
    </View>
  )
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  }
});
