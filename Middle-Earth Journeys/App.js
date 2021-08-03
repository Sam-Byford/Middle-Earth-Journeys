import * as React from 'react';
import { Component, useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import "react-native-gesture-handler"
import { BlurView } from 'expo-blur';
import styled, { withTheme } from "styled-components/native";

import accountPage from "./pages/accountPage";
import createAccountPage from "./pages/createAccountPage"
import landingPage from "./pages/landingPage"
import landmarkListPage from "./pages/landmarkListPage"
import landmarkPage from "./pages/landmarkPage"
import middleEarthMapPage from "./pages/middleEarthMapPage"
import newQuestPage from "./pages/newQuestPage"
import questPage from "./pages/questPage"
import realMapPage from "./pages/realMapPage"

import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native';
import { SafeAreaProvider} from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const Stack = createStackNavigator();

const LandingOps= ({navigation, screenProps}) => ({
  headerTransparent: true,
  headerTitleAllowFontScaling: true,
  headerTitle: <Text style={{fontSize: 35}}>Middle Earth Journeys</Text>,
  headerTitleAlign: "center",
  headerBackTitleVisible: true,
  headerStyle: {
    height: 100,
  },
  headerTitleStyle: {
    fontWeight:"500",
    fontFamily: "LOTR",
    },
  headerStatusBarHeight:50, // puts text verticle centre
  headerTintColor: '#fff',
  headerLeft: () => (
    <Text></Text>
  ),
 })
 const BackOps= ({navigation, screenProps}) => ({
  headerTransparent: true,
  animationEnabled: false,
  headerTitleAllowFontScaling: true,
  headerTitle: <Text style={{fontSize: 35}}>Middle Earth Journeys</Text>,
  headerTitleAlign: "center",
  headerBackTitleVisible: true,
  headerStyle: {
    height: 100,
  },
  headerTitleStyle: {
    fontWeight:"500",
    fontFamily: "LOTR",
    },
  headerStatusBarHeight:50, // puts text verticle centre
  headerTintColor: '#fff',
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons style={{marginLeft:10, color:'white'}} name="arrow-back" size={48} color="black" />
    </TouchableOpacity> //burger menu will go here
  ),
 })
 const DefaultOps= ({navigation, screenProps}) => ({
  headerTransparent: true,
  headerTitleAllowFontScaling: true,
  headerTitle: <Text style={{fontSize: 35}}>Middle Earth Journeys</Text>,
  headerTitleAlign: "center",
  headerBackTitleVisible: true,
  headerStyle: {
    height: 100,
  },
  headerTitleStyle: {
    fontWeight:"500",
    fontFamily: "LOTR",
    },
  headerStatusBarHeight:50, // puts text verticle centre
  headerTintColor: '#fff',
  headerRight: () => (
    <TouchableOpacity onPress={() => navigation.navigate('Landing')}>
      <FontAwesome style={{marginRight:10, color:'white'}} name="sign-out" size={40} color="black" />
    </TouchableOpacity> //burger menu will go here
  ),
  headerLeft: () => (
    <Text></Text>
  ),
 })

function App() {

  let [fontsLoaded] = useFonts({
    'LOTR': require('./assets/BilboSwashCaps-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  else {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={landingPage} options={LandingOps} fontSize="35px" />
            <Stack.Screen name="CreateAccount" component={createAccountPage} options={BackOps}/>
            <Stack.Screen name="Account" component={accountPage} options={DefaultOps} />
            <Stack.Screen name="NewQuest" component={newQuestPage} options={BackOps} />
            <Stack.Screen name="LandmarkList" component={landmarkListPage} options={BackOps} />
            <Stack.Screen name="Landmark" component={landmarkPage} options={BackOps} />
            <Stack.Screen name="MiddleEarthMap" component={middleEarthMapPage} options={BackOps} />
            <Stack.Screen name="RealMap" component={realMapPage} options={BackOps} />
            <Stack.Screen name="Quest" component={questPage} options={BackOps} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default App;