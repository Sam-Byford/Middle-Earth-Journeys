import React from 'react';
import styled from 'styled-components/native';
import { View, StyleSheet, TextInput, Text, Dimensions, Alert, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const PerformanceMetrics = props => (
    <ScrollView><MetricsContainer>
       <Title><TitleText>Performance Metrics</TitleText></Title>
    <ItemsLayout style={{marginTop:20}}>
    <Subheading>        
       <Text>Total Time Travelled</Text>
    </Subheading>
    <IconContainer>
      <MaterialCommunityIcons name="clock-fast" size={36} color='#6AA84F' />
      <Text style={{fontSize:18}}>{'\n'}{props.time}</Text>
    </IconContainer>  
  </ItemsLayout>
  <ItemsLayout style={{marginTop:20}}>
    <Subheading>        
       <Text>Average Pace</Text>
    </Subheading>
    <IconContainer>
    <FontAwesome5 name="running" size={36} color='#6AA84F' />
      <Text style={{fontSize:18}}>{'\n'}{props.avgPace}</Text>
    </IconContainer>  
  </ItemsLayout>
  <ItemsLayout style={{marginTop:20}}>
    <Subheading>        
       <Text>Total Km Travelled</Text>
    </Subheading>
    <IconContainer>
    <FontAwesome name="globe" size={36} color='#6AA84F' />
      <Text style={{fontSize:18}}>{'\n'}{props.distance}</Text>
    </IconContainer>  
  </ItemsLayout>
  </MetricsContainer></ScrollView>
   );

export default PerformanceMetrics;

const MetricsContainer = styled.View`

`;

const ItemsLayout = styled.View`
 margin-top:10px;
 flex-direction: row;
 flex-wrap: wrap;
 align-items:center;
 justify-content:space-between;
 width:100%;
`;


const Title = styled.View`
  width: 100%;
`;

const TitleText = styled.Text`
  font-size: 25px;
  color: white;
  text-align: center;
`;

const HalfCol = styled.Text`
  color: white;
  flex: 1;
  flex-direction: column;
  padding-left: 10px;
  height:100%;
  width: 100%;
  text-align:center;
`;

const IconContainer = styled.Text`
  color: white;
  flex: 1;
  flex-direction: column;
  padding-left: 10px;
  height:100%;
  width: 100%;
  text-align:center;
`;

const Subheading = styled.Text`
  color: white;
  flex: 1;
  flex-direction: column;
  height:100%;
  text-align:center;
  border-bottom-color:white;
  border-bottom-width:1px;
  font-size:18px;
  padding-top:10px;
`;