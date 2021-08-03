import React from 'react';
import { Component, useState, useEffect } from 'react'
import styled, { withTheme } from "styled-components/native";
import { View, StyleSheet, TextInput, Text, Dimensions } from 'react-native';
import MapView, {Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import mapStyle from "../components/MapStyle"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

function realMapPage({route, navigation}) {

  const data = route.params.routeCoords;
  const routetime = route.params.time;
  const distance = route.params.distance;
  const pace = route.params.pace;

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
                strokeColor="#6AA84F"
                strokeWidth={4}
                geodesic={true}
                showsMyLocationButton={false}
              />
            </MapView>
          </Content>
          <InformationContainer>
            <Subtitle style={styles.heading}>
              <SubText>Journey Statistics</SubText>
            </Subtitle>       
            <IconContainer>
              <FontAwesome name="globe" size={36} color='#6AA84F' />
              <Metrics>Distance: {distance}km</Metrics>
            </IconContainer>
            <IconContainer>
              <MaterialCommunityIcons name="clock-fast" size={36} color='#6AA84F' />
              <Metrics>Time: {routetime}</Metrics>
            </IconContainer>
            <IconContainer>
              <FontAwesome5 name="running" size={36} color='#6AA84F' />
              <Metrics>Avg Pace Per Km: {pace}</Metrics>
            </IconContainer>
          </InformationContainer>
        </Body>
    </Container>
 );
}

const styles = StyleSheet.create({
  container: {},
  map: {
    width: '100%',
    height: '100%',
  },
  heading: {
  },
});

export default realMapPage;

const Container = styled.View`
  flex: 1;
`;

const Content = styled.View`
  flex-direction: row;
  width:100%;
  height:50%;
  top:120px;
`;

const InformationContainer = styled.View`
  flex-direction: row;
  width:100%;
  height:100%;
  flex-wrap:wrap;
  flex:1;
  margin-top:120px;
`;

const IconContainer = styled.View`
  color: white;
  flex: 1;
  flex-direction: column;
  padding-left: 10px;
  height:100%;
  width: 100%;
  text-align:center;
  align-items:center;
  margin-top:10px;
`;


const HeaderImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const Subtitle = styled.View`
  margin-top:5px;
  width:100%;
  border-bottom-width:3px;
  border-bottom-color:white;
`;

const SubText = styled.Text`
  font-size: 32px;
  color: white;
  font-weight: 500;
  font-family: 'normal';
  text-align:center;
`;

const Metrics = styled.Text`
  font-size: 20px;
  color: white;
  font-weight: 500;
  font-family: 'normal';
  text-align:center;
`;

const Body = styled.View`
  height: 100%;
  width: 100%;
  position: absolute;
  padding: 10px;
  background-color: rgba(0,0,0,0.4);
`;