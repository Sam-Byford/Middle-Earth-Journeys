import React from 'react';
import { View, StyleSheet } from 'react-native';
import styled, { withTheme } from "styled-components/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

function middleEarthMapPage({route, navigation}) {

 const questDistance = route.params.questDistance;
 const landmarksDiscovered = route.params.landmarksDiscovered;

 return (
    <Container>
    <HeaderImage source={require("../assets/wallpaperflare.com_wallpaper.jpg")} />
    <Body>
      <Content>
      <ImageContainer style={styles.profileRow}>
          <MiddleMap source={require("../assets/middleMapCustom.jpg")} resizeMode={'cover'}/>
        </ImageContainer>
      </Content>
      <InformationContainer>
        <Subtitle style={styles.heading}>
            <SubText>Quest Summary</SubText>
        </Subtitle>       
        <IconContainer>
            <MaterialCommunityIcons name="castle" size={36} color='#6AA84F' />
            <Metrics>Landmarks Discovered: {landmarksDiscovered}</Metrics>
        </IconContainer>
        <IconContainer>
            <Octicons name="milestone" size={36} color='#6AA84F' />
            <Metrics>Middle Earth Miles Travelled: {questDistance}</Metrics>
        </IconContainer>
        </InformationContainer>
    </Body>
</Container>
 );
}

const styles = StyleSheet.create({
    container: {},
    map: {
      width: '100%',
      height: '100%',
    },
    heading: {
    },
    profileRow: {
        borderColor: "black",
        borderWidth: 4
    },
});
  
  const Container = styled.View`
    flex: 1;
  `;
  
  const Content = styled.View`
    flex-direction: row;
    width:100%;
    height:50%;
    top:120px;
  `;

const ImageContainer = styled.View`
height: 100%;
width: 100%;
`;
  
  const InformationContainer = styled.View`
    flex-direction: row;
    width:100%;
    height:100%;
    flex-wrap:wrap;
    flex:1;
    margin-top:120px;
  `;
  
  const IconContainer = styled.View`
    color: white;
    flex: 1;
    flex-direction: column;
    padding-left: 10px;
    height:100%;
    width: 100%;
    text-align:center;
    align-items:center;
    margin-top:10px;
  `;
  
  
  const HeaderImage = styled.Image`
    width: 100%;
    height: 100%;
  `;
  
  const Subtitle = styled.View`
    margin-top:5px;
    width:100%;
    border-bottom-width:3px;
    border-bottom-color:white;
  `;
  
  const SubText = styled.Text`
    font-size: 32px;
    color: white;
    font-weight: 500;
    font-family: 'normal';
    text-align:center;
  `;
  
  const Metrics = styled.Text`
    font-size: 20px;
    color: white;
    font-weight: 500;
    font-family: 'normal';
    text-align:center;
  `;
  
  const Body = styled.View`
    height: 100%;
    width: 100%;
    position: absolute;
    padding: 10px;
    background-color: rgba(0,0,0,0.4);
  `;

  
const MiddleMap = styled.Image`
margin:0;
width:100%;
height:100%;
`;

export default middleEarthMapPage;