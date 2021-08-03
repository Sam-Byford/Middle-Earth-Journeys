import React from 'react';
import { Component, useState, useEffect } from 'react'
import styled, { withTheme } from "styled-components/native";
import { View, StyleSheet, TextInput, Text, Dimensions } from 'react-native';
import { calculateTime } from "../components/CalculateTime";
import { calculateDistance } from "../components/CalculateDistance";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

function questPage({route, navigation}) {

  let tracking_data = []; //empty array
  let watch_id = null; // ID of the geolocation
  let data = {};
  
  const text = "TestRun";

  const [isTracking, setIsTracking] = useState(false);
  const [trackingData, setTrackingData] = useState([]);
  const geolocationPositionOptions = {
    useSignificantChanges: true,
  };   

  useEffect(() => {
    try{
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== "granted") {
                alert("Permission to access location was denied");
                return;
            }
        })()
    }
    catch(error){
        console.log(error)
    }
  },[]);

  onGeolocation = (position) => {
    //console.log("onGeolocation");
    var g = {
        timestamp: position.timestamp,
        coords: {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
        },
    };
    //push an array into an array (multidimensional)
    tracking_data.push(g);
    console.log("TRACKING", tracking_data);
    //update state to access the tracking data
    setTrackingData(tracking_data);
  };
  onGeolocationError = (positionError) => {
    Alert("Geolocation error", JSON.stringify(positionError));
  }; 

  startTracking = () => {
    //update state to swap button
   setIsTracking(true);
   
   console.log("start tracking");
    // Start tracking the User
    //watchPosition- Returns the device's current position when a change in position is detected
    //google api stuff, constantly watches and records user position
    watch_id = navigator.geolocation.watchPosition(
        onGeolocation, //called on every watch success
        onGeolocationError, //called on every watch error
        geolocationPositionOptions //options for watching position
    );
  };

  stopTracking = async () => {
    // Stop tracking the user
    console.log("STOP TRACKING", trackingData);
    navigator.geolocation.clearWatch(watch_id);
    try {
        const value = await AsyncStorage.getItem("myroutes");
        console.log("Retrieved value: ", value)
        if (value !== null) {
            // We have data!!
            console.log("updating storage");
            data = JSON.parse(value);
            console.log("tracking_data", trackingData);
            // create a new object with the input field name and add tracking data
            let newroute = { [text]: trackingData };
            console.log("new obj", newroute);
            // merge data
            Object.assign(data, newroute);
            // Save the tracking data
            //console.log("assigned", data)
            // update state – clear input field. Switch bool to toggle button
            setIsTracking(false);
            // add storage
            try {
                await AsyncStorage.setItem("myroutes", JSON.stringify(data));
            } 
            catch (error) {
                // Error saving data
                Alert("error");
            }
        }   
        else{
          console.log("adding storage");
          console.log("tracking_data", trackingData);
          let newroute = { [text]: trackingData };
          console.log("new obj", newroute);
          setIsTracking(false);
          try {
            await AsyncStorage.setItem("myroutes", JSON.stringify(newroute));
          } 
          catch (error) {
            Alert("error");
          }
        }
        // go to map when finished
        navigation.navigate("RealMap", {
          routeCoords: trackingData,
          distance: calculateDistance(trackingData),
          time: calculateTime(trackingData),
        });
        // Reset watch_id and tracking_data
        watch_id = null;
        tracking_data = null;
        setTrackingData([]);
    } 
    catch (error) {
        console.log(error);
    }         
}

 return (
 <Container>
     <HeaderImage source={require("../assets/wallpaperflare.com_wallpaper.jpg")} />
     <Body>
        <Content>
          {isTracking ? (               
            <TouchButton onPress={() => stopTracking()} style={styles.button}>
                <Text>Pause Quest</Text>
            </TouchButton>
          ) : (
            <TouchButton onPress={() => startTracking()} style={styles.button}>
                <Text>Resume Quest</Text>
            </TouchButton>
          )}
            <TouchButton onPress={() => navigation.navigate('RealMap')} style={styles.button}>
                <Text>Real Map</Text>
            </TouchButton>
        </Content>
     </Body>
 </Container>
 );
}

const styles = StyleSheet.create({
 container: {}
});

export default questPage;

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