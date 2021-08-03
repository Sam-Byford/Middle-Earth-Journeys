import React from 'react';
import { Component, useState, useEffect, useRef } from 'react'
import styled, { withTheme } from "styled-components/native";
import { View, StyleSheet, TextInput, Text, Dimensions, Alert, ScrollView, rgba } from 'react-native';
import { calculateTime } from "../components/CalculateTime";
import { calculateDistance } from "../components/CalculateDistance";
import { questsList } from '../components/questList'
import  QuestStats  from '../components/QuestStats';
import  PerformanceMetrics  from '../components/PerformanceMetrics';
import  Sections  from '../components/Sections';
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import  TabNavigation  from '../components/TabNavigation';
import AppLoading from 'expo-app-loading';
import firebase from '../components/Firebase';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer'

function questPage({route, navigation}) {

  const questID = route.params.questID;
  
  const mountedRef = useRef(false)
  const watchRef = useRef();

  const [TOTAL_QUEST_DISTANCE, setTotalQuestDistance] = useState(0);

  let tracking_data = []; //empty array  
  
  const [watch, setWatch] = useState(null)
  watchRef.current = watch;

  const [loaded, setIsLoaded] = useState(false);
  const [questName, setQuestName] = useState("");
  const [username, setUsername] = useState("");
  const [difficulty, setQuestDifficulty] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [selectedTab, setSelectedTab] = useState('quest');
  const [trackingData, setTrackingData] = useState([]);
  const [title, setTitle] = useState("");

  const [totalDistance, setTotalDistance] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [totalFormattedTime, setTotalFormattedTime] = useState("");
  const [averagePace, setAvgPace] = useState("");
  const [sections, setSections] = useState([]);
  const [questDistance, setQuestDistance] = useState(0);
  const [questProgress, setQuestProgress] = useState(0);
  const [landmarksDiscovered, setLandmarksDiscovered] = useState(0);
  const [initialLoad, setInitialLoad] = useState(true);
  const [sectionDistance, setSectionDistance] = useState(0);

  let [tabContent, setTabContent] = useState(<QuestStats questDistance={questDistance}></QuestStats>);
  let InitialTabContent = <QuestStats questDistance={questDistance} questProgress={questProgress} landmarksDiscovered={landmarksDiscovered}></QuestStats>
  
  const geolocationPositionOptions = {
    distanceInterval: 1,
    accuracy: Location.Accuracy.BestForNavigation //ensures it tracks every time user moves 1 meter
  };   

  formatTime = (time) =>{
    let final_time_m = Math.floor(time / 60);
    let final_time_s = Math.floor(time - (final_time_m * 60));
    return(final_time_m + ":" + final_time_s);
  }

  calculateQuestDistance = (totalDistance) => {
    let multiplier = 1;
    if (difficulty == "hobbit"){
      multiplier = 20;
    }
    else if (difficulty == "human"){
      multiplier = 10;
    }
    let convertedDistance = totalDistance * multiplier;
    return convertedDistance
  }

  getQuestInfo = () =>{
    const ref = firebase
      .firestore()
      .collection('quests')
      .doc(questID)
      .onSnapshot(documentSnapshot =>{
        console.log("Route Update")
        if (mountedRef.current){
        console.log("Mounted")
        if (documentSnapshot.exists){
          let questData = documentSnapshot.data();
          setQuestDifficulty(questData.difficulty);
          setLandmarksDiscovered(questData.landmarksDiscovered);
          let questDistance = calculateQuestDistance(questData.totalDistance);
          setQuestDistance(questDistance);
          setQuestName(questData.questName);
          setUsername(questData.username);
          setTotalDistance(questData.totalDistance);
          setTotalTime(questData.totalTime);
          setTotalFormattedTime(formatTime(questData.totalTime));
          let averageP = questData.totalDistance/questData.totalTime;
          setAvgPace(formatTime(averageP))
          let currentQuestProgress = 0;
          if (questData.questName == 'Ring') { 
            setTitle("Quest Of The Ring") 
            setTotalQuestDistance(2897);
            console.log("Distance:", questDistance)
            currentQuestProgress = (questDistance / 2897) * 100
            setQuestProgress(currentQuestProgress);
          }
          else {
            setTitle("The Quest of Erebor")
            setTotalQuestDistance(1594);
            currentQuestProgress = (questDistance / 1594) * 100
            setQuestProgress(currentQuestProgress);
          }
          getQuestSections();
        }
        else{
          let errorMessage = "Error Fetching Quest Data";
          Alert.alert("Registration Error:",errorMessage)
        }
        }      
      });
      return () => ref();
  };

  getQuestSections = () =>{
    const ref = firebase
      .firestore()
      .collection('sections')
      .where('questID', '==', questID)
      .get()
      .then(querySnapshot =>{
        if (mountedRef.current){
        setSections([])
        if (querySnapshot.size > 0){
          if (sections.length != querySnapshot.size){
            for (var i = 0; i < querySnapshot.size; i++){
              //console.log("Test: ", querySnapshot.docs[i].data())
              let sectionData = querySnapshot.docs[i].data();
              let formattedTime = formatTime(sectionData["time"]);
              let sectionArr = [sectionData["date"],sectionData["distance"],formattedTime,sectionData["avgPace"]];
              setSections(sections => [...sections, sectionArr]);
            }            
          }
        }
        else {
          console.log("No associated sections for user: ", username)
        }
        setIsLoaded(true);
        }
      });
  }

 // effect just for tracking mounted state
  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  useEffect(() => {
    setIsLoaded(false)
    getQuestInfo();
    try{
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            console.log("Location Permissions: ", status)
            if (status !== "granted") {
                alert("Permission to access location was denied");
                return;
            }
        })()
    }
    catch(error){
        console.log(error)
    }
    return() => {
      setSections([]);
      if (watchRef.current != null){
        watchRef.current.remove();
      }
    }
  }, []);

  onGeolocation = (position) => {
    var g = {
        timestamp: position.timestamp,
        coords: {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
        },
    };
    //push an array into an array (multidimensional)
    tracking_data.push(g);
    console.log("TRACKING", tracking_data);
    //update state to access the tracking data
    setTrackingData(tracking_data);
    let distanceStr = calculateDistance(trackingData);
    let distanceInt = parseInt(distanceStr)
    setSectionDistance(distanceInt);
  };

  startTracking = async () => {
    //update state to swap button
    setIsTracking(true);
   
   console.log("start tracking");
    // Start tracking the User
    //watchPosition- Returns the device's current position when a change in position is detected
    let promise = await Location.watchPositionAsync(
      geolocationPositionOptions, //options for watching position
      onGeolocation, //called on every watch success        
    );
    setWatch(promise);
  };

  updateQuestInfo = (trackingData, time, totalDistance, sectionDistance, timeFormatted, averagePace, landmarks) =>{
    const ref = firebase
      .firestore()
      .collection('quests')
      .doc(questID) 
      .update({
        totalDistance: totalDistance,
        totalTime: (time + totalTime),
        landmarksDiscovered: landmarks
      })
      .then(() => {
        navigation.navigate("RealMap", {
          routeCoords: trackingData,
          distance: sectionDistance,
          time: timeFormatted,
          pace: averagePace
        });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      })
  }

  landmarkCheck = (currentDate, trackingData, time, totalDistance,sectionDistance,questDistance, timeFormatted, averagePace) => {
    //The actual implementation will have a more complex object/dictionary for storing landmarks, below is for the basic implementation
    let landmarks = landmarksDiscovered;
    let flag = false;
    let discoveredLandmark = {}
    console.log("New Quest Distance: ", questDistance)
    if (questDistance == '20' && questName == 'Ring'){
      flag = true;
      landmarks = landmarks + 1;
      discoveredLandmark = {
        name: 'Bree',
        quest: 'Ring',
        dateDiscovered: currentDate.toDateString()
      }
    }
    else if (questDistance == '20' && questName == 'Erebor'){
      flag = true;
      landmarks = landmarks + 1;
      discoveredLandmark = {
        name: 'Rivendell',
        quest: 'Erebor',
        dateDiscovered: currentDate.toDateString()
      }
    }
    //add landmark to firebase if one was found
    if (flag){
      const ref = firebase
      .firestore()
      .collection('landmarks')
      .add({
        name: discoveredLandmark['name'],
        quest: discoveredLandmark['quest'],
        dateDiscovered: discoveredLandmark['dateDiscovered'],
        username: username
      })
      .then(() => {
        let Message = "Check the landmarks page to view the new location";
        Alert.alert("Landmark Discovered!:",Message)
        updateQuestInfo(trackingData, time,totalDistance,sectionDistance, timeFormatted, averagePace, landmarks);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      })
    }
    else{
      updateQuestInfo(trackingData, time,totalDistance,sectionDistance, timeFormatted, averagePace, landmarks);
    }
  }

  addSection = () => {
    let distanceStr = calculateDistance(trackingData);
    let sectionDistance = parseInt(distanceStr) + 1;
    let time = calculateTime(trackingData);
    let timeFormatted = formatTime(time);
    let averagePaceSec = sectionDistance/time
    let averagePaceFormatted = formatTime(averagePaceSec)
    let timestamp = Date.now();
    let currentDate = new Date(timestamp);
    let newTotalDistance = (sectionDistance + totalDistance)
    let newQuestDistance = calculateQuestDistance(newTotalDistance);
    if (time != 0){
    const ref = firebase
      .firestore()
      .collection('sections')
      .add({
        questID: questID,
        date: currentDate.toDateString(),
        distance: sectionDistance,
        username: username,
        time: time,
        avgPace: averagePaceFormatted
      })
      .then(() => {
        // go to map when finished
        //updateQuestInfo(trackingData, time,distanceInt, timeFormatted, averagePaceFormatted);
        landmarkCheck(currentDate, trackingData, time, newTotalDistance,sectionDistance,newQuestDistance, timeFormatted, averagePaceFormatted);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      })
    }
  }

  stopTracking = () => {
    // Stop tracking the user
    console.log("Stopping Tracking");
    watch.remove();
    setIsTracking(false);
    addSection();
    // Reset watch_id and tracking_data
    setWatch(null);
    tracking_data = null;
    setTrackingData([]);
    setSectionDistance(0);
  } 

  middleMap = () =>{
    navigation.navigate("MiddleEarthMap", {
      questDistance: questDistance,
      landmarksDiscovered: landmarksDiscovered
    });
  }

 selectTab = (tab) => {
   setInitialLoad(false);
   setSelectedTab(tab);
   if (tab == 'quest'){
    setTabContent(<QuestStats questDistance={questDistance} questProgress={questProgress} landmarksDiscovered={landmarksDiscovered}></QuestStats>);
   }
   else if (tab == 'metrics'){
    setTabContent(<PerformanceMetrics time={totalFormattedTime} distance={totalDistance} avgPace={averagePace}></PerformanceMetrics>);
   }
   else{
    setTabContent(<Sections tableData={sections}></Sections>);
   }
 } 

 if (!loaded) {
  return <AppLoading />;
}
else {
 return (
 <Container>
     <HeaderImage source={require("../assets/wallpaperflare.com_wallpaper.jpg")} />
     <Body>
        <Title><Text style={styles.questsHeading}>{title}</Text></Title>
        <ImageContainer style={styles.profileRow}>
          <QuestImage source={questsList[questName].header} resizeMode={'cover'}/>
        </ImageContainer>
        <ScrollView style={{marginTop:120}} >
          <QuestContainer>
            <TouchButton onPress={() => middleMap()} disabled={isTracking} style={isTracking? styles.disabledButton : styles.button}>
              <Text>Middle Earth Map</Text>
            </TouchButton>
            {isTracking ? (               
              <TouchButton onPress={() => stopTracking()} style={styles.stopButton}>
                  <Text style={styles.buttonTxt}>Pause Quest</Text>
              </TouchButton>
            ) : (
              <TouchButton onPress={() => startTracking()} style={styles.startButton}>
                  <Text style={styles.buttonTxt}>Resume Quest</Text>
              </TouchButton>
            )}
            <Break></Break>
            {isTracking ? (
              <StopwatchContainer>
                <Text style={styles.metricsText}>Elapsed Time:</Text>
                <Stopwatch start={isTracking} options={options}>
                </Stopwatch>
                <Text style={styles.metricsText}>Distance Travelled:</Text>
                <Distance style={styles.metricsText}>{sectionDistance} km</Distance>
                <Text style={styles.metricsText}>{'\n'}{'\n'}Note: Leaving this page will stop tracking</Text>
              </StopwatchContainer>
            ) : (
            <QuestInfo>
              <TabButton onPress={() => selectTab('quest')} style={selectedTab == 'quest' ? styles.selectedTab : styles.tab}>
                <Text style={styles.buttonTxt}>Quest Stats</Text>
              </TabButton>
              <TabButton onPress={() => selectTab('metrics')} style={selectedTab == 'metrics' ? styles.selectedTab : styles.tab}>
                <Text style={styles.buttonTxt}>Performance Metrics</Text>
              </TabButton>
              <TabButton onPress={() => selectTab('sections')} style={selectedTab == 'sections' ? styles.selectedTab : styles.tab}>
                <Text style={styles.buttonTxt}>Sections</Text>
              </TabButton>             
                {initialLoad ? (<TabContainer>
                    {InitialTabContent}</TabContainer>
                  ):(<TabContainer>
                    {tabContent}</TabContainer>
                  )
                }  
            </QuestInfo>
            )}
          </QuestContainer>
        </ScrollView>
        <TabNavigation username={username} navigation={navigation} questID={questID}></TabNavigation>    
     </Body>
 </Container>
 );
}
}

const options = {
  container: {
    padding: 5,
    borderRadius: 5,
    width: '100%',
    justifyContent:'center',
    alignItems:'center',
    marginBottom:5
  },
  text: {
    fontSize: 30,
    color: '#FFF',
    marginLeft: 7,
  }
};

const styles = StyleSheet.create({
 container: {},
 profileRow: {
  borderColor: "black",
  borderWidth: 4
},
questsHeading:{
  fontSize: 35,
  fontFamily: 'LOTR',
  color: 'white',
  textAlign: 'center'
},
stopButton:{
  backgroundColor: 'red'
},
startButton:{
  backgroundColor: '#6AA84F'
},
buttonTxt: {
  color:'white'
},
bar:{
  borderTopWidth: 2,
  borderTopColor: "white",
},
selectedTab:{
  backgroundColor: '#34656d',
  borderColor: '#dddd'
},
tab: {
  borderColor: '#dddd'
},
button:{
  
},
disabledButton:{
  backgroundColor: 'rgba(255,255,255,0.5)'
},
metricsText:{
  color:'white',
  fontSize:24,
  textAlign:'center'
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
  flex: 1;
  flex-direction:row;
`;

const Break = styled.View`
  width: 100%;
`;

const HeaderImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const QuestImage = styled.Image`
 margin:0;
 width:100%;
 height:100%;
`;

const Body = styled.View`
  height: 100%;
  width: 100%;
  position: absolute;
  padding: 10px;
  flex:1;
  background-color: rgba(0,0,0,0.4);
`;

const QuestInfo = styled.View`
  flex-direction:row;
  flex-wrap:wrap;
  align-items:center;
  justify-content:space-evenly;
`;

const TouchButton = styled.TouchableOpacity`
  height: 55px;
  padding: 10px;
  border-width: 2px;
  color: black;
  background-color: white;
  align-items: center;
  justify-content:center;
  margin-bottom:15px;
  flex-direction:column;
`;

const TabButton = styled.TouchableOpacity`
  height: 50px;
  padding: 10px;
  border-width: 2px;
  align-items: center;
  justify-content:center;
  border-radius:40px;
  margin-bottom:20px;
`;

const ImageContainer = styled.View`
  height: 25%;
  width: 100%;
  top:120px;
`;

const StopwatchContainer = styled.View`
  flex-direction:row;
  flex-wrap:wrap;
  align-items:center;
  justify-content:space-evenly;
  margin-top:25px;
`;

const QuestContainer = styled.View`
  padding: 10px;
  flex-direction:row;
  flex-wrap:wrap;
  align-items:center;
  justify-content:space-evenly;
`;

const TabContainer = styled.View`
 padding: 10px;
 width: 100%;
 flex-direction: row;
`;

const Title = styled.View`
  width: 100%;
  top:120px;
`;

const Distance = styled.Text`
  width: 100%;
  text-align:center;
`;


export default questPage;
