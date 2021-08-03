import React from 'react';
import { Component, useState, useEffect } from 'react'
import styled, { withTheme } from "styled-components/native";
import { View, StyleSheet, TextInput, Text, Dimensions } from 'react-native';
import MapView, {Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import mapStyle from "../components/MapStyle"

function realMapPage({route, navigation}) {

  const data = route.params.routeCoords;
  const routetime = route.params.time;
  const distance = route.params.distance;

  console.log("params are", data);
  const coords = [];
  data.filter((e) => e.coords).map((e) =>
    coords.push({
      latitude: e.coords.latitude,
      longitude: e.coords.longitude,
    })
  );

  const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };

  fitAllMarkers = (coords) => {
    googlemap.fitToCoordinates(coords, {
    edgePadding: DEFAULT_PADDING,
    animated: true,
    });
  };

  console.log("Distance: ", distance);
  console.log("Time: ", routetime);

 return (
    <Container>
        <HeaderImage source={require("../assets/wallpaperflare.com_wallpaper.jpg")} />
        <Body>
          <Content>
            <MapView 
              style={styles.map} 
              provider={PROVIDER_GOOGLE} 
              customMapStyle={mapStyle} 
              ref={(ref) => {
                googlemap = ref; //'googlemap' is just a name that refers to THIS map, could be changed to anything else
              }}
              onMapReady={(e) =>{
                fitAllMarkers(coords);
              }}
            >
              <Polyline
                coordinates={coords}
                strokeColor="#FFF000"
                strokeWidth={4}
                geodesic={true}
                showsMyLocationButton={false}
              />
            </MapView>
          </Content>
        </Body>
    </Container>
 );
}

const styles = StyleSheet.create({
  container: {},
  map: {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  },

});

export default realMapPage;

const Container = styled.View`
  flex: 1;
`;

const Content = styled.View`
  height: 100%;
  width: 100%;
  padding: 10px;
  top:120px;
  flex: 1;
  flex-direction:row;
`;

const HeaderImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const Body = styled.View`
  height: 100%;
  width: 100%;
  position: absolute;
  padding: 10px;
  background-color: rgba(0,0,0,0.3);
`;

const TouchButton = styled.TouchableOpacity`
  width: 50%;
  height: 10%;
  padding: 10px;
  border-width: 2px;
  padding-left: 10px;
  color: black;
  background-color: white;
  margin: 50px auto;
  align-items:center;
  justify-content:center;
`;

const TextFullCol = styled.Text`
  color: white;
  flex: 1;
  flex-direction: column;
  justify-content:center;
  text-align:center;
`;