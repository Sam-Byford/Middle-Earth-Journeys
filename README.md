# Middle-Earth-Journeys

## Application Demonstration
Video Link - https://www.youtube.com/watch?v=xYiqavLFaRQ

## Task Brief
Design and develop a mobile-only app. In other words, it should not be possible or desirable to use this app on a laptop or desktop computer. This could be due to the app only being useful in a context where a laptop or desktop would not be available, e.g. commuting, waking up, being in a new city, hiking, sitting in a lecture. Or it could be due to the app relying on features not commonly available on a desktop or laptop, e.g. accelerometer, GPS, compass, back-camera, etc.

Additionally, the app must adhere to one of the following themes:
* Mental health – apps or games that support, educate or inform users on
  improving their own mental health or that of those around them.
* Social distancing – apps or games that allow people to stay connected and
  engage in traditionally face-to-face social activities that are made difficult when
social distancing regulations are in place.
* Supporting fanbases – apps or games that help create, enhance or improve
  fanbases by bringing together fans of a particular band, film, tv show, sports
  team, etc… and providing a specialised and shared space for them to
  communicate about their common interest.

The app should showcase a thorough understanding of mobile design considerations (e.g. user interaction, user experience) and follow an iterative design approach. You must demonstrate a clear path from requirements analysis (with the use of personas and user stories) going through to the Five Planes of user experience and resulting in an iterative prototyping process. The design process should be deliberate and reflective with each step following logically from the previous.

It is important that the app goes beyond static pages but instead makes use of more advanced features of the device. Advanced features could include non-trivial inclusion of 3rd party APIs (e.g. weather, Google Places, Spotify, etc…) or appropriate use of phone hardware (such as sensors, accelerometer, camera, etc…).

## Overview
React Native Application that allows users to virtually run, walk or cycle a selection of famous middle earth quests.

![Combined1IT2](https://user-images.githubusercontent.com/32711675/128638578-5645c64f-9e22-4d84-a0ca-7fb43f3d2c7d.png)

Middle Earth Journeys is an exercise companion app that aims to encourage users to get out and partake in physical activity. It provides a more engaging way for less motivated individuals to get fit than conventional running apps by allowing users to follow in the footsteps of J. R. R. Tolkien’s Middle Earth heroes. Users can select from two different quest options and explore the land of Middle Earth whilst walking, running, or cycling. 

The application tracks user movement giving performance metrics such as distance covered, average pace and time spent. Then, depending on the difficulty the user selected, it calculates how far through the quest and whereabouts in Middle Earth they are. The quests are long and therefore are designed to be tackled in ‘sections’, each time the user resumes a quest, a section is created. When they pause the quest the section results (distance covered, time etc) are added to the total quest statistics. If they have travelled the required distance in middle earth, they will discover one of a plethora of landmarks. These landmarks are accompanied by videos, images and descriptive text which informs users about the location.

**NOTE:** The 'node_modules' folder has been deleted from this repositry to free up space. Check the 'Install' section for the list of packages/modules that are required to run the application 

## Install

`npm install`
* -S styled-components

`expo install`
* react-navigation-stack
*	@react-native-community/masked-view
* react-native-safe-area-context
* @react-navigation/native
* @react-navigation/stack
* react-native-screens
* expo-blur
* react-native-gesture-handler
* react-native-maps
* react-native-reanimated
* @react-native-async-storage/async-storage
* expo-font
* expo-app-loading
* react-native-maps
* Expo-location
