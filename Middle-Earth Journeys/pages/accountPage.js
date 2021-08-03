import React from 'react';
import { Component, useState, useEffect } from 'react'
import styled, { withTheme } from "styled-components/native";
import { View, StyleSheet, TextInput, Text, Image, Dimensions, ScrollView } from 'react-native';
import firebase from '../components/Firebase';
import { heros } from '../components/heroslist';
import { questsList } from '../components/questList'
import  TabNavigation  from '../components/TabNavigation';

function accountPage({route, navigation}) {

 const username = route.params.username;
 const profilePictureIndex = route.params.profilePicture; 
 const profileImage = heros[profilePictureIndex];
 const activeQuest = route.params.activeQuest;

 const [quests, setQuests] = useState([]);
 const [middleDistance, setMiddleDistance] = useState(0);

 useEffect(() => {
   //fetch quests from firebase
    const ref = firebase
    .firestore()
    .collection("quests")
    .where('username', '==', username)
    .onSnapshot(querySnapshot => {
        console.log('Total Landmarks: ', querySnapshot.size);
        setQuests([])
        if (querySnapshot.size > 0){
          if (quests.length != querySnapshot.size){
            for (var i = 0; i < querySnapshot.size; i++){
              //extract the data for each quest into an object
              let questData = querySnapshot.docs[i].data();
              //add document ID to this object (questID) so we have a reference to the questID
              questData.questID = querySnapshot.docs[i].id; 
              //calculate the quest miles covered by multiplier the real world miles travelled by the difficulty multiplier
              let multiplier = 1;
              if (questData.difficulty == 'human'){
                multiplier = 10;
              }
              else if (questData.difficulty == 'hobbit'){
                multiplier = 20;
              }
              questData.middleDistance = (questData.totalDistance * multiplier)
              setQuests(quests => [...quests, questData]);
            }            
          }
        }
        else {
          console.log("No associated quests for user: ", username)
        }
      });
      return () => ref();
z },[])

 selectQuest = (quest) =>{
  const ref = firebase
  .firestore()
  .collection('users')
  .doc(username) 
  .update({
    activeQuest: quest.questID
  })
  .then(() => {
    navigation.navigate('Quest', {
      questID: quest.questID
   });
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
  })
 }

 return (

    <Container>
        <HeaderImage source={require("../assets/wallpaperflare.com_wallpaper.jpg")} />
        <Body>      
            <ItemsLayout>
              <ImageContainer style={styles.profileRow}>
                <ProfileImage style={styles.profile} source={profileImage.file} resizeMode={'cover'}/>
              </ImageContainer>
              <HalfCol>
                <Text style={{fontSize:15}}>Username: {username}{'\n'}{'\n'}</Text>
                <Text style={{fontSize:15}}>Number of quests completed: 0{'\n'}{'\n'}</Text>
                <Text style={{fontSize:15}}>Distance Travelled: 6km{'\n'}{'\n'}</Text>
              </HalfCol>
            </ItemsLayout>
            <ItemsLayout>
            <ButtonContainer>
              <TouchButton onPress={() => navigation.navigate('NewQuest',{username: username, activeQuest: activeQuest})}>
                  <Text style={{color: "white"}}>New Quest</Text>
              </TouchButton>
            </ButtonContainer>
            </ItemsLayout>
            <ItemsLayout style={{marginTop:-35}}>
              <HalfCol style={styles.questsHeading}>
                <Text>Quests</Text>
              </HalfCol>
            </ItemsLayout>
            <QuestBar style={styles.questBar}></QuestBar>
            <QuestContainer>
              {quests.map((quest, index) => (
                <QuestLayout key={index}>
                  <ImageContainer style={styles.profileRow}>
                    <ProfileImage style={styles.profile} source={questsList[quest.questName].icon} resizeMode={'cover'}/>
                    <Overlay/>
                    <SelectQuestButton onPress={() => selectQuest(quest)}><Text style={styles.buttonTxt}>Select Quest</Text></SelectQuestButton>
                  </ImageContainer>
                  <HalfCol>
                    <Text style={{fontSize:15}}>Quest: {quest.questName}{'\n'}{'\n'}</Text>
                    <Text style={{fontSize:15}}>Difficulty: {quest.difficulty}{'\n'}{'\n'}</Text>
                    <Text style={{fontSize:15}}>Distance Travelled: {quest.totalDistance}km{'\n'}{'\n'}</Text>
                    <Text style={{fontSize:15}}>Quest Distance Travelled: {quest.middleDistance}km</Text>
                  </HalfCol>
                </QuestLayout>
              ))}
            </QuestContainer>
            <TabNavigation username={username} navigation={navigation} questID={activeQuest}></TabNavigation>
        </Body>    
    </Container>
 );
}

const styles = StyleSheet.create({
 container: {},
  profile: {
    width: 150,
    height: 150
  },
  profileRow: {
    borderColor: "black",
    borderWidth: 4
  },
  questBar:{
    borderTopWidth: 3,
    borderTopColor: "white",
    marginBottom: 5
  },
  questsHeading:{
    alignItems: "flex-start",
    fontSize: 35,
    fontFamily: 'LOTR'
  },
  buttonTxt: {
    color: 'white',
    fontSize: 20
  }
});

const ItemsLayout = styled.View`
 top: 120px;
 flex-direction: row;
 flex-wrap: wrap;
 align-items:center;
 justify-content:space-between;
 width:100%;
`;

const QuestBar = styled.View`
 top:120px;
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
 width:100%;
 margin-bottom: 20px;
`;

const QuestContainer = styled.ScrollView`
 margin-top: 120px;
 flex-direction: row;
 flex-wrap: wrap;
 width:100%;
`;

const Container = styled.View`
  flex: 1;
`;

const ImageContainer = styled.View`
  justify-content: center;
`;

const HeaderImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const ProfileImage = styled.Image`
 margin:0;
`;

const Body = styled.View`
  height: 100%;
  width: 100%;
  position: absolute;
  padding: 10px;
  flex:1;
  background-color: rgba(0,0,0,0.4);
`;


const HalfCol = styled.Text`
  color: white;
  flex: 1;
  flex-direction: column;
  justify-content:center;
  padding-left: 10px;
  height: 100%;
  width: 100%;
`;

const ButtonContainer = styled.View`
  top: 135px;
  height:100%;
  width:100%;
  align-items: flex-end;
`;

const TouchButton = styled.TouchableOpacity`
  width: 30%;
  padding: 20px;
  border-width: 2px;
  color: white;
  background-color: #6AA84F;
`;

const SelectQuestButton = styled.TouchableOpacity`
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export default accountPage;