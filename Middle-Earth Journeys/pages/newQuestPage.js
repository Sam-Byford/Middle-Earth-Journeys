import React from 'react';
import { Component, useState, useEffect } from 'react'
import styled, { withTheme } from "styled-components/native";
import { View, StyleSheet, TextInput, Text, Image, Dimensions } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import firebase from '../components/Firebase';
import  TabNavigation  from '../components/TabNavigation';

function newQuestPage({route, navigation}) {

    const username = route.params.username;
    const activeQuest = route.params.activeQuest

    const [selectedDifficultyQuest1, setSelectedDifficultyQuest1] = useState("human");
    const [selectedDifficultyQuest2, setSelectedDifficultyQuest2] = useState("human");

    generateQuestID = () => {
      let result = '';
      let length = 15;
      let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
      return result;
    }

    updateActiveQuest = (questID) => {
      const ref = firebase
        .firestore()
        .collection('users')
        .doc(username)
        .update({
          activeQuest: questID
        })
        .then(() => {
          navigation.navigate('Quest', {
            questID: questID
          });
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        })
    }

    startNewQuest = (questName, questDifficulty) =>{
      let questID = generateQuestID();
        const ref = firebase
        .firestore()
        .collection('quests')
        .doc(questID)
        .set({
          questName: questName,
          totalDistance: 0,
          totalTime: 0,
          username: username,
          difficulty: questDifficulty,
          landmarksDiscovered: 0
        })
        .then(() => {
          setSelectedDifficultyQuest2("human")
          setSelectedDifficultyQuest2("human")
          updateActiveQuest(questID);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        })
    }

 return (
    <Container>
    <HeaderImage source={require("../assets/wallpaperflare.com_wallpaper.jpg")} />
    <Body> 
      <QuestContainer>
        <Subtitle>Quest Of The Ring</Subtitle>     
          <ImageContainer style={styles.questImageContainer}>
            <ProfileImage style={styles.questImage} source={require("../assets/j8v3w8mp8pa51.jpg")} resizeMode={'stretch'}/>
          </ImageContainer>
          <HalfCol>
            <Text>Quest Length: 2897 Middle Earth Km{'\n'}{'\n'}</Text>
            <Text>Quest Description: A darkness grows in the east, Sauron has returned to Mordor. The only hope of defeating him lies in throwing the One Ring into the fiery pits of Mt Doom. Join the Fellowship Of The Ring in their quest across Middle Earth to save the Age Of Men.  </Text>
          </HalfCol>
            <HalfCol style={styles.difficulty}>
                <Text>Difficulty: </Text>
            </HalfCol>
            <PickerContainer style={styles.picker}>
                <Picker 
                selectedValue={selectedDifficultyQuest1}
                onValueChange={(itemValue, itemIndex) => setSelectedDifficultyQuest1(itemValue)}>
                    <Picker.Item label="Hobbit" value="hobbit" />
                    <Picker.Item label="Human" value="human" />
                    <Picker.Item label="Balrog" value="balrog" />
                </Picker>
            </PickerContainer>
            <TouchButton>
                <Text style={{color: "white"}} onPress={() => startNewQuest("Ring", selectedDifficultyQuest1)}>Select Quest</Text>
            </TouchButton>

        <Subtitle>The Quest Of Erebor</Subtitle>     
          <ImageContainer style={styles.questImageContainer}>
            <ProfileImage style={styles.questImage} source={require("../assets/dbb35136c6d42522f986435ddae3bff4.jpg")} resizeMode={'stretch'}/>
          </ImageContainer>
          <HalfCol>
            <Text>Quest Length: 1594 Middle Earth Km{"\n"}{"\n"}</Text>
            <Text>Quest Description: The Dragon Smaug has held a tight grip on the dwarven stronghold of Erebor for too long and the rightful tenants want him gone. They require a burglar. Travel with Thorin Oakenshield and his band of dwarves to help reclaim the lonely mountain.</Text>
          </HalfCol>
            <HalfCol style={styles.difficulty}>
                <Text style={styles.difficulty}>Difficulty: </Text>
            </HalfCol>
            <PickerContainer>
                <Picker
                selectedValue={selectedDifficultyQuest2}
                onValueChange={(itemValue, itemIndex) => setSelectedDifficultyQuest2(itemValue)}>
                    <Picker.Item label="Hobbit" value="hobbit" />
                    <Picker.Item label="Human" value="human" />
                    <Picker.Item label="Balrog" value="balrog" />
                </Picker>
            </PickerContainer>
            <TouchButton>
                <Text style={{color: "white"}} onPress={() => startNewQuest("Erebor", selectedDifficultyQuest2)}>Select Quest</Text>
            </TouchButton>
        </QuestContainer>
        <TabNavigation username={username} navigation={navigation} questID={activeQuest}></TabNavigation>
    </Body>
</Container>
 );
}

const styles = StyleSheet.create({
    container: {},
     questImage: {

     },
     seperator:{
      borderTopWidth:3,
      borderColor:"white",
      paddingTop:10
     },
     questImageContainer: {
       borderColor: "black",
       borderWidth: 4
     },
     difficulty: {
        fontSize:23,
        paddingTop:0,
        textAlign: "center"
     },
     selectQuestBar:{
         marginTop: 10
     }
   });
   
   const Container = styled.View`
     flex: 1;
   `;
   
   const ImageContainer = styled.View`
    width:50%;
    margin-left:25%;
    margin-right:25%;
   `;
   
   const Subtitle = styled.Text`
     font-size: 35px;
     color: white;
     font-weight: 500;
     font-family: 'LOTR';
     text-align:center;

   `;
   
   const HeaderImage = styled.Image`
   justify-content:center;
     width: 100%;
     height: 100%;
   `;
   
   const ProfileImage = styled.Image`
    margin:0;
    width:100%;
    height:150px;
   `;
   
   const Body = styled.View`
  height: 100%;
  width: 100%;
  position: absolute;
  padding: 10px;
  flex:1;
  background-color: rgba(0,0,0,0.4);
   `;

const QuestContainer = styled.ScrollView`
margin-top: 120px;
flex-direction: column;
width:100%;
flex:1;
`;
   
   
   const HalfCol = styled.Text`
     color: white;
     flex: 1;
     flex-direction: row;
     justify-content: center;
     align-items: center;
     padding-left: 10px;
     margin-top:10px;
     height:100%;
     width: 100%;
   `;

    const PickerContainer = styled.View`
    border-width: 3px;
    border-radius: 10px;
    border-color: black;
    background-color: #fff;
    `;

   const TouchButton = styled.TouchableOpacity`
    width: 30%;
    padding: 15px;
    border-width: 2px;
    color: white;
    background-color: #6AA84F;
    text-align:center;
    justify-content:center;
    align-self:center;
    margin-top:10px;
    margin-bottom:10px;
   `;

export default newQuestPage;