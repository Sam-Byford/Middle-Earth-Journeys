import React from 'react';
import { Component, useState, useEffect, useRef } from 'react'
import styled, { withTheme } from "styled-components/native";
import { View, StyleSheet, TextInput, Text, Dimensions, Alert, ScrollView, rgba } from 'react-native';
import firebase from '../components/Firebase';
import { landmarkList } from '../components/landmarkList'
import  TabNavigation  from '../components/TabNavigation';


function landmarkListPage({route, navigation}) {

    const username = route.params.username;
    const questID = route.params.questID;

    const [landmarks, setLandmarks] = useState([]);

    useEffect(() => {
        const ref = firebase
        .firestore()
        .collection("landmarks")
        .where('username', '==', username)
        .onSnapshot(querySnapshot => {
            console.log('Total Quests: ', querySnapshot.size);
            setLandmarks([])
            if (querySnapshot.size > 0){
              if (landmarks.length != querySnapshot.size){
                for (var i = 0; i < querySnapshot.size; i++){
                  //console.log("Test: ", querySnapshot.docs[i].data())
                  let landmarkData = querySnapshot.docs[i].data();
                  setLandmarks(landmarks => [...landmarks, landmarkData]);
                }            
              }
            }
            else {
              console.log("No associated landmarks for user: ", username)
            }
          });
          return () => ref();
     },[])

    selectLandmark = (landmark) =>{
        navigation.navigate('Landmark', {
            questName: landmark.quest,
            title: landmark.name,
            dateDiscovered: landmark.dateDiscovered
         });
    }

 return (
    <Container>
        <HeaderImage source={require("../assets/wallpaperflare.com_wallpaper.jpg")} />
        <Body>
        <Title><Text style={styles.questsHeading}>Landmarks</Text></Title>
        <QuestContainer>
              {landmarks.map((landmark, index) => (
                <QuestLayout key={index}>
                  <ImageContainer style={styles.profileRow}>
                    <ProfileImage style={styles.profile} source={landmarkList[landmark.name].icon} resizeMode={'cover'}/>
                    <Overlay/>
                    <SelectLandmarkButton onPress={() => selectLandmark(landmark)}><Text style={styles.buttonTxt}>Select Landmark</Text></SelectLandmarkButton>
                  </ImageContainer>
                  <HalfCol>
                    <Text style={styles.aboutTxt}>Landmark: {landmark.name}{'\n'}{'\n'}</Text>
                    <Text style={styles.aboutTxt}>Quest: {landmark.quest}{'\n'}{'\n'}</Text>
                    <Text style={styles.aboutTxt}>Date Discovered:{'\n'}{landmark.dateDiscovered}</Text>
                  </HalfCol>
                </QuestLayout>
              ))}
        </QuestContainer>
        <TabNavigation username={username} navigation={navigation} questID={questID}></TabNavigation>
        </Body>
    </Container>
 );
}

const styles = StyleSheet.create({
 container: {},
 questsHeading:{
    fontSize: 35,
    fontFamily: 'LOTR',
    color: 'white',
    textAlign: 'center',
    borderBottomWidth: 3,
    borderBottomColor:'white',
    marginBottom:10
  },
  profile: {
    width: 150,
    height: 150
  },
  profileRow: {
    borderColor: "black",
    borderWidth: 4
  },
  buttonTxt: {
    color: 'white',
    fontSize: 20,
    textAlign:'center'
  },
  aboutTxt:{
    fontSize:16,
    textAlign:'center',
    width:50
  }
});

const Title = styled.View`
  width: 100%;
  top:120px;
`;

const Container = styled.View`
  flex: 1;
`;

const HeaderImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const HalfCol = styled.Text`
  color: white;
  flex-direction: row;
  flex:1;
  padding-left: 10px;
  height: 100%;
  width:100%;
  text-align:center;
  align-items:center;
  justify-content:center;
`;

const SelectLandmarkButton = styled.TouchableOpacity`
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Body = styled.View`
  height: 100%;
  width: 100%;
  position: absolute;
  padding: 10px;
  flex:1;
  background-color: rgba(0,0,0,0.4);
`;

const Overlay = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: black;
  opacity: 0.3;
`;

const QuestLayout = styled.View`
 flex-direction: row;
 flex-wrap: wrap;
 align-items:center;
 justify-content:space-between;
 margin-bottom: 20px;
`;

const QuestContainer = styled.ScrollView`
 margin-top: 120px;
 flex-direction: row;
 flex-wrap: wrap;
 width:100%;
`;

const ImageContainer = styled.View`
  justify-content: center;
`;

const ProfileImage = styled.Image`
 margin:0;
`;

export default landmarkListPage;