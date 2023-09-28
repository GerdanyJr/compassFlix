import React, { useContext } from 'react';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignUp } from './src/screens/SignUp';
import { Login } from './src/screens/Login';
import { AuthContext, AuthContextProvider } from './src/store/AuthContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from './src/screens/Home';
import { Settings } from './src/screens/Settings';
import { Favorites } from './src/screens/Favorites';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MoviePage } from './src/screens/MoviePage';

const BottomTabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
function App(): JSX.Element {
  return (
    <AuthContextProvider>
      <NavigationContainer theme={DarkTheme}>
        <StatusBar translucent backgroundColor="transparent" />
        <RootStack />
      </NavigationContainer>
    </AuthContextProvider>
  );
}

function RootStack(): JSX.Element {
  const authCtx = useContext(AuthContext);
  return (
    true ? <AuthenticatedStack /> : <AuthenticateStack />
  )
}

function AuthenticatedStack(): JSX.Element {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={BottomTabsNavigator} name='MainScreen' />
      <Stack.Screen component={MoviePage} name='MoviePage' />
    </Stack.Navigator>
  );
}

function AuthenticateStack(): JSX.Element {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={Login} name='Login' />
      <Stack.Screen component={SignUp} name='SignUp' />
    </Stack.Navigator>
  )
}

function BottomTabsNavigator() {
  return (
    <BottomTabs.Navigator screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#C83F3F',
      tabBarLabelStyle: { fontSize: 12 }
    }}>
      <BottomTabs.Screen
        component={Home}
        name='Home'
        options={{
          tabBarIcon: ({ color, size, focused }) => <Ionicons name={focused ? 'home' : 'home-outline'} color={color} size={size} />
        }}
      />
      <BottomTabs.Screen
        component={Favorites}
        name='Favorites'
        options={{
          tabBarIcon: ({ color, size, focused }) => <Ionicons name={focused ? 'star' : 'star-outline'} color={color} size={size} />
        }}
      />
      <BottomTabs.Screen
        component={Settings}
        name='Settings'
        options={{
          tabBarIcon: ({ color, size, focused }) => <Ionicons name={focused ? 'settings' : 'settings-outline'} color={color} size={size} />
        }}
      />
    </BottomTabs.Navigator>
  )
}

export default App;
