// App.js
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MoviesScreen from './screens/MoviesScreen';
import SearchScreen from './screens/SearchScreen';
import TvShowsScreen from './screens/TvShowsScreen';
import MovieDetails from './screens/MovieDetails';
import TvShowDetails from './screens/TvShowDetails';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MoviesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MoviesHome" component={MoviesScreen} />
      <Stack.Screen name="MovieDetails" component={MovieDetails} />
    </Stack.Navigator>
  );
}

function TvShowsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TvShowsHome" component={TvShowsScreen} />
      <Stack.Screen name="TvShowDetails" component={TvShowDetails} />
    </Stack.Navigator>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SearchHome" component={SearchScreen} />
      <Stack.Screen name="MovieDetails" component={MovieDetails} />
      <Stack.Screen name="TvShowDetails" component={TvShowDetails} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Movies" component={MoviesStack} />
          <Tab.Screen name="Search" component={SearchStack} />
          <Tab.Screen name="TV Shows" component={TvShowsStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}






