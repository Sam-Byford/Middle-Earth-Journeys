import React from 'react';
import { Component, useState, useEffect } from 'react'
import styled, { withTheme } from "styled-components/native";
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Dimensions, ActivityIndicator, Alert } from 'react-native';
import Hero from '../components/hero';
import { heros } from '../components/heroslist';
import firebase from '../components/Firebase';

function createAccountPage({route, navigation}) {

  const [selectedHero, setSelectedHero] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  updateHero = (index) => {
    setSelectedHero(index)
    console.log(selectedHero);
  }

  register = () => {
    const ref = firebase
      .firestore()
      .collection('users')
      .doc(username)
      .set({
        image: selectedHero,
        password: password,
        username: username,
        activeQuest: ""
      })
      .then(() => {
        console.log("User added!")
        setSelectedHero(null)
        setUsername("")
        setPassword("")
        navigation.navigate('Account', {
          username: username,
          profilePicture: selectedHero,
        });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      })
  }

  signUp = () => {
    if (username && password && (selectedHero != null)){
      const ref = firebase
        .firestore()
        .collection('users')
        .doc(username)
        .get()
        .then(documentSnapshot =>{
          if (documentSnapshot.exists){
            let errorMessage = "Username already exists";
            Alert.alert("Registration Error:",errorMessage)
          }
          else{
            register();
          }
        })
    }
    else{
      let errorMessage = "Ensure you have entered a username & password and selected a hero";
      Alert.alert("Authentication Error:",errorMessage)
    }
  }
  return (
    <Container>
        <HeaderImage styles={styles.Himage} source={require("../assets/wallpaperflare.com_wallpaper.jpg")} />
        <Body>
            <Content>
                <Subtitle style={styles.heading}>Create Account</Subtitle>
                <TextInput
                style={styles.input}
                placeholder="Username - Must Be Unique"
                placeholderTextColor="black"
                onChangeText={(username) => setUsername(username)}/>
                <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="black"
                onChangeText={(password) => setPassword(password)}/>
                <Subtitle>Select Hero</Subtitle>
                <ItemsLayout>
                    {heros.map((hero, index) => (
                    <TouchableOpacity onPress={() => updateHero(index)} key={index} >
                        <Hero title={hero.title} src={hero.file} key={index} />
                    </TouchableOpacity>
                  ))}
                </ItemsLayout>
                <TouchButton onPress={() => signUp()} style={styles.button}>
                    <Text>SignUp</Text>
                </TouchButton>
            </Content> 
        </Body>
    </Container> 
 );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 2,
        paddingLeft: 10,
        color: "black",
        backgroundColor: "white"
      },
      button: {
          marginTop:40,
      },
      heading: {
        marginBottom:0,
        paddingTop: 0,
        fontSize: 40,
        marginTop:0
      },
      Himage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      },
      activity: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
      },
});

const Container = styled.View`
  flex: 1;
`;

const Subtitle = styled.Text`
  font-size: 35px;
  color: white;
  font-weight: 500;
  padding-left: 15px;
  margin-bottom:-35px;
  font-family: 'LOTR';
  text-align:center;
`;

const Content = styled.View`
  height: 100%;
  width: 100%;
  padding: 10px;
  top:120px;
`;

const HeaderImage = styled.Image`
  top: -10px;
  left: -850px;
`;

const Body = styled.View`
  height: 100%;
  width: 100%;
  position: absolute;
  padding: 10px;
  background-color: rgba(0,0,0,0.4);
`;

const ItemsLayout = styled.View`
 flex-direction: row;
 flex-wrap: wrap;
 align-items:center;
 justify-content:space-between;
 width:100%;
`;

const TouchButton = styled.TouchableOpacity`
  width: 50%;
  height: 10%;
  border-width: 2px;
  color: black;
  background-color: white;
  margin: auto auto;
  align-items:center;
  justify-content:center;
`;

export default createAccountPage;