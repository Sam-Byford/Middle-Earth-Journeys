import React from 'react';
import styled from 'styled-components/native';
import { View, StyleSheet, TextInput, Text, Dimensions, Alert, ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

let tableHead = ['Date', 'Distance (Km)', 'Time', 'Avg Pace'];
      /*let tableData = [
        ['1', '2', '3', '4'],
        ['a', 'b', 'c', 'd'],
        ['1', '2', '3', '456\n789'],
        ['a', 'b', 'c', 'd'],
        ['a', 'b', 'c', 'd'],
        ['a', 'b', 'c', 'd'],
        ['a', 'b', 'c', 'd'],
        ['a', 'b', 'c', 'd']
      ];*/

const Sections = props => (
     <SectionsContainer>
       <Title><TitleText>Sections</TitleText></Title>     
       <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={tableHead} style={{height: 40, backgroundColor: '#f1f8ff'}} textStyle={{margin: 6}}/>
          <Rows data={props.tableData} textStyle={{margin: 6, color: 'white'}}/>
       </Table>
    </SectionsContainer>
   );

export default Sections;

const SectionsContainer = styled.View`
 flex: 1;
`;

const Title = styled.View`
  width: 100%;
`;

const TitleText = styled.Text`
  font-size: 25px;
  color: white;
  text-align: center;
  margin-bottom:10px;
`;

