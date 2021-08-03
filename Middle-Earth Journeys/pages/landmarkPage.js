import React from 'react';
import { Component, useState, useEffect, useRef } from 'react'
import styled, { withTheme } from "styled-components/native";
import { View, StyleSheet, TextInput, Text, Dimensions, Alert, ScrollView, rgba, Video } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

function landmarkPage({route, navigation}) {  
    
    const title = route.params.title;
    const questName = route.params.questName;
    const dateDiscovered = route.params.dateDiscovered;
    
 return (
    <Container>
    <HeaderImage source={require("../assets/wallpaperflare.com_wallpaper.jpg")} />
    <Body>
    <Title><Text style={styles.questsHeading}>{title}</Text></Title>   
    {title == 'Bree' ? (
    <Content>
        <YoutubePlayer style={styles.youtube} height={235} play={true} videoId={'WmghV5AimjU'}/>
        <QuestContainer>
            <QuestLayout>
                <ImageContainer style={styles.profileRow}>
                    <ProfileImage style={styles.profile} source={require("../assets/PrancingPony.jpg")} resizeMode={'cover'}/>
                </ImageContainer>
                <HalfCol>
                    <Text style={styles.white}>Bree was an ancient settlement of men in Eriador by the time of the Third Age of Middle-earth, but after the collapse of the North-kingdom which claimed it, Bree continued to thrive without any central authority or government for many centuries. Bree had become the most westerly settlement of men in all of Middle-earth by the time of the War of the Ring, and became one of only three or four inhabited settlements in all of Eriador. At the time of The Lord of the Rings, Bree-land was the only part of Middle-earth where Men and Hobbits dwelt side by side in peace. Being located on the most important crossroads in the north, on the crossing of the Great East Road and the Greenway, people would pass through Bree. The Prancing Pony had many rooms, but the local people did not seem accustomed to many travellers.</Text>
                </HalfCol>
                <SubTitle><Text style={styles.landmarkSubHeading}>Landmark Discovered</Text></SubTitle>
                <HalfCol style={{width:'100%'}}>
                    <Text style={styles.white}>Quest Discovered on: {questName}{'\n'}{'\n'}</Text>
                    <Text style={styles.white}>Date Discovered on: {dateDiscovered}</Text>
                </HalfCol>
            </QuestLayout>
        </QuestContainer>    
    </Content>       
    ) : (
    <Content>
        <YoutubePlayer style={styles.youtube} height={235} play={true} videoId={'QmDl8YjwIG8'}/>
        <QuestContainer>
            <QuestLayout>
                <ImageContainer style={styles.profileRow}>
                    <ProfileImage style={styles.profile} source={require("../assets/rivendell2.jpg")} resizeMode={'cover'}/>
                </ImageContainer>
                <HalfCol>
                    <Text style={styles.white}>Rivendell, also known as Imladris, was an Elven town and the house of Elrond located in Middle-earth. It is described as "The Last Homely House East of the Sea" in reference to Valinor, which was west of the Great Sea in Aman. The peaceful, sheltered town of Rivendell was located at the edge of a narrow gorge of the river Bruinen (one of the main approaches to Rivendell comes from the nearby Ford of Bruinen), but well hidden in the moorlands and foothills of the Misty Mountains.</Text>
                </HalfCol>
                <SubTitle><Text style={styles.landmarkSubHeading}>Landmark Discovered</Text></SubTitle>
                <HalfCol style={{width:'100%'}}>
                    <Text style={styles.white}>Quest Discovered on: {questName}{'\n'}{'\n'}</Text>
                    <Text style={styles.white}>Date Discovered on: {dateDiscovered}</Text>
                </HalfCol>
            </QuestLayout>
        </QuestContainer>
    </Content> 
    )}
    </Body>
</Container>
 );
}

const styles = StyleSheet.create({
 container: {},
 white:{
     color:'white',
     fontSize: 16
 },
 questsHeading:{
    fontSize: 35,
    fontFamily: 'LOTR',
    color: 'white',
    textAlign: 'center',
    marginBottom:10
  },
  landmarkSubHeading:{
    fontSize: 28,
    fontFamily: 'LOTR',
    color: 'white',
    textAlign: 'center',
    marginBottom:10,
    marginTop:10
  },
  youtube:{
  },
  profile: {
    width: 175,
    height: 175
  },
  profileRow: {
    borderColor: "black",
    borderWidth: 4,
    marginBottom:10
  },
});

const Title = styled.View`
  width: 100%;
  top:120px;
`;

const SubTitle = styled.View`
  color: white;
  flex-direction: row;
  flex:1;
  padding-left: 10px;
  flex-wrap:wrap;
`;

const Container = styled.View`
  flex: 1;
`;

const Content = styled.ScrollView`
  flex: 1;
  margin-top:120px;
  color:white;
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
  flex:1;
  background-color: rgba(0,0,0,0.4);
`;

const QuestLayout = styled.View`
 flex-direction: column;
 flex-wrap: wrap;
 align-items:center;
 justify-content:space-between;
 margin-bottom: 20px;
`;

const QuestContainer = styled.ScrollView`
 flex-direction: column;
 flex-wrap: wrap;
 width:100%;
`;

const ImageContainer = styled.View`
  justify-content: center;
`;

const ProfileImage = styled.Image`
 margin:0;
`;

const HalfCol = styled.Text`
  color: white;
  flex-direction: row;
  padding-left: 10px;
  height: 100%;
  flex-wrap:wrap;
  flex:1;
  text-align:left;
`;

export default landmarkPage;