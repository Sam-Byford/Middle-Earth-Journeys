import React from 'react';
import styled from 'styled-components/native';
import { View, StyleSheet, TextInput, Text, Dimensions, Alert, rgba, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const TabNavigation = props => (
  <BottomTabBar>
    <TabCol onPress={() => props.navigation.navigate('LandmarkList',{username: props.username, questID: props.questID})}>
      <MaterialCommunityIcons name="castle" size={40} color='#6AA84F' />
      <TabText>Landmarks</TabText>
    </TabCol>
    <TabCol onPress={() => props.navigation.navigate('Quest',{questID: props.questID})}>
      <Fontisto name="map" size={40} color='#6AA84F' />
      <TabText>Current Adventure</TabText>
    </TabCol>      
    <TabCol onPress={() => props.navigation.navigate('NewQuest',{username: props.username, activeQuest: props.questID})}>
      <MaterialCommunityIcons name="earth-plus" size={40} color='#6AA84F'  />
      <TabText>New Quest</TabText>
    </TabCol>
  </BottomTabBar>
   );

export default TabNavigation;

const TabText = styled.Text`
 color:white;
 font-size:15px;
 text-align:center;
`;

const TabCol = styled.TouchableOpacity`
  color: white;
  flex-direction: column;
  align-items:center;
  padding-left: 10px;
  padding-right:10px;
  padding-top:5px;
  padding-bottom:0;
  height:100%;
`;

const BottomTabBar = styled.View`
 border-top-color:white;
 border-top-width:3px;
 width: 100%;
 padding:20px;
 padding-top:0px;
 padding-bottom:0;
 flex-direction:row;
`;
