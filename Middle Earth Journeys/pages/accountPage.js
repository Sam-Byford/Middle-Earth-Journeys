import React from 'react';
import styled, { withTheme } from "styled-components/native";
import { View, StyleSheet, TextInput, Text } from 'react-native';

function accountPage({route, navigation}) {
 return (
    <Container>
        <HeaderImage source={require("../assets/wallpaperflare.com_wallpaper.jpg")} />
        <Body>
            <Content>
              <TextHalfCol>LeftCol</TextHalfCol>
              <TextHalfCol onPress={() => navigation.navigate('Quest')}>Temp Quest Btn</TextHalfCol>
            </Content> 
        </Body>
    </Container>
 );
}

const styles = StyleSheet.create({
 container: {},
 button: {
    marginTop:25,
  },
});

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


const TextHalfCol = styled.Text`
  color: white;
  flex: 1;
  flex-direction: column;
  justify-content:center;
  text-align:center;
`;

export default accountPage;