import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import "react-native-gesture-handler"
import { BlurView } from 'expo-blur';

import accountPage from "./pages/accountPage";
import createAccountPage from "./pages/createAccountPage"
import landingPage from "./pages/landingPage"
import landmarkListPage from "./pages/landmarkListPage"
import landmarkPage from "./pages/landmarkPage"
import middleEarthMapPage from "./pages/middleEarthMapPage"
import newQuestPage from "./pages/newQuestPage"
import questPage from "./pages/questPage"
import realMapPage from "./pages/realMapPage"

import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { SafeAreaProvider} from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const Stack = createStackNavigator();
const Ops={
  headerTransparent: true,
  headerTitleAllowFontScaling: true,
  headerTitle: <Text style={{fontSize: 35}}>Middle Earth Journeys</Text>,
  headerTitleAlign: "center",
  headerStyle: {
    height: 100,
  },
  headerTitleStyle: {
    fontWeight:"500",
    fontFamily: "LOTR",
    },
  headerStatusBarHeight:50, // puts text verticle centre
  headerTintColor: '#fff',
  headerLeft: () => (
    <Text></Text> //burger menu will go here
  ),
 }

function App() {

  let [fontsLoaded] = useFonts({
    'LOTR': require('./assets/BilboSwashCaps-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  else {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing" screenOptions={Ops}>
            <Stack.Screen name="Landing" component={landingPage} options={Ops} fontSize="35px" />
            <Stack.Screen name="CreateAccount" component={createAccountPage} options={Ops}/>
            <Stack.Screen name="Account" component={accountPage} options={Ops} />
            <Stack.Screen name="NewQuest" component={newQuestPage} options={Ops} />
            <Stack.Screen name="LandmarkList" component={landmarkListPage} options={Ops} />
            <Stack.Screen name="Landmark" component={landmarkPage} options={Ops} />
            <Stack.Screen name="MiddleEarthMap" component={middleEarthMapPage} options={Ops} />
            <Stack.Screen name="RealMap" component={realMapPage} options={Ops} />
            <Stack.Screen name="Quest" component={questPage} options={Ops} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;