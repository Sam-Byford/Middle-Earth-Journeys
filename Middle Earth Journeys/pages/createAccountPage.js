import React from 'react';
import styled, { withTheme } from "styled-components/native";
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Dimensions } from 'react-native';
import Hero from '../components/hero';
import { heros } from '../components/heroslist';

function createAccountPage({route, navigation}) {
 return (
    <Container>
        <HeaderImage styles={styles.Himage} source={require("../assets/wallpaperflare.com_wallpaper.jpg")} />
        <Body>
            <Content>
                <Subtitle style={styles.heading}>Create Account</Subtitle>
                <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="black"
                />
                <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="black"
                />
                <Subtitle>Select Hero</Subtitle>
                <ItemsLayout>
                    {heros.map((hero, index) => (
                    <TouchableOpacity key={index}>
                        <Hero title={hero.title} src={hero.file} key={index} />
                    </TouchableOpacity>
                  ))}
                </ItemsLayout>
                <TouchButton onPress={() => navigation.navigate('Account')} style={styles.button}>
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
      }
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
  background-color: rgba(0,0,0,0.3);
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