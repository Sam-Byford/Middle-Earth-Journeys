import React from 'react';
import styled from 'styled-components/native';
import { View, StyleSheet, TextInput, Text, Dimensions, Alert, rgba, ScrollView } from 'react-native';
import * as Progress from 'react-native-progress';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const QuestStats = props => (
    <ScrollView><StatsContainer>
       <Title><TitleText>Quest Statistics</TitleText></Title>
       <Progress.Bar style={{marginTop:10}} progress={(props.questProgress/100)} width={null} height={30} color={'#6AA84F'} borderColor={'white'}>
          <ProgressText>Quest Completion: {props.questProgress}%</ProgressText>
       </Progress.Bar>
       <ItemsLayout>
         <Subheading style={{borderColor:'white', borderRightWidth:2,}}>        
            <Text>Quest Km{'\n'}Travelled</Text>
         </Subheading>
         <Subheading>
            <Text>Landmarks Discovered</Text>
         </Subheading>
       </ItemsLayout>
       <ItemsLayout>
         <HalfCol>        
            <Octicons name="milestone" size={36} color='#6AA84F' />
         </HalfCol>
         <HalfCol>
         <MaterialCommunityIcons name="castle" size={36} color='#6AA84F' />
         </HalfCol>
       </ItemsLayout>
       <ItemsLayout>
         <HalfCol>        
            <Text style={{fontSize:18}}>{props.questDistance}</Text>
         </HalfCol>
         <HalfCol>
            <Text style={{fontSize:18}}>{props.landmarksDiscovered}</Text>
         </HalfCol>
       </ItemsLayout>
    </StatsContainer></ScrollView>
   );

export default QuestStats;

const StatsContainer = styled.View`
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

const ProgressText = styled.Text`
  position:absolute;
  left:10px;
  color:white;
  height:100%;
  width:100%;
  top:5px;
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

const Subheading = styled.Text`
  color: white;
  flex: 1;
  flex-direction: column;
  padding-left: 10px;
  height:100%;
  text-align:center;
  font-size:18px;
`;
