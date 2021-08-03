import React from 'react';
import { Component, useState, useEffect } from 'react'
import styled, { withTheme } from "styled-components/native";
import { View, StyleSheet, TextInput, ActivityIndicator, Text, Dimensions, Image, LogBox, Alert } from 'react-native';
import firebase from '../components/Firebase';

function landingPage({route, navigation}) {
  
  LogBox.ignoreLogs(['Setting a timer']); //ignores the weird timeout errors in console window

  const [userID, setID] = useState("");
  const [password, setPassword] = useState("");

  authenticate = () => {
    console.log(userID, password)
    const ref = firebase
      .firestore()
      .collection("users")
      .where('username', '==', userID)
      .where('password', '==', password)
      .onSnapshot(querySnapshot => {
        console.log('Total Users: ', querySnapshot.size);
        if (querySnapshot.size > 0){
          const DocSnapshot = querySnapshot.docs[0];
          console.log('User data: ', DocSnapshot.data());
          navigation.navigate('Account', {
            username: DocSnapshot.data().username,
            profilePicture: DocSnapshot.data().image,
            activeQuest: DocSnapshot.data().activeQuest
          });
        }
        else {
          let errorMessage = "Invalid Username or password";
          Alert.alert("Authentication Error:",errorMessage)
        }
      });
      return () => ref();
  }

 return (
    <Container>
        <HeaderImage styles={styles.Himage} source={require("../assets/wallpaperflare.com_wallpaper.jpg")} />
        <Body>
            <Content>
                <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="black"
                onChangeText={(text) => setID(text)}
                />
                <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="black"
                onChangeText={(password) => setPassword(password)}
                />
                <TouchButton onPress={() => authenticate()} /*onPress={() => navigation.navigate('Account')}*/>
                    <Text>Login</Text>
                </TouchButton>
                <TouchButton onPress={() => navigation.navigate('CreateAccount')} style={styles.button}>
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
        marginTop:25,
    },
    Himage: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    }
  });

const Container = styled.View`
  flex: 1;
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

const Subtitle = styled.Text`
  font-size: 20px;
  color: white;
  font-weight: 500;
  padding-left: 15px;
  padding-top: 15px;
`;

const Body = styled.View`
  height: 100%;
  width: 100%;
  position: absolute;
  padding: 10px;
  background-color: rgba(0,0,0,0.4);
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

export default landingPage;