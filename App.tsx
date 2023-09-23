import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignUp } from './src/screens/SignUp';

const Stack = createNativeStackNavigator();
function App(): JSX.Element {
  return (
    <NavigationContainer>
      <StatusBar translucent backgroundColor="transparent" />
      <AuthenticateStack />
    </NavigationContainer>
  );
}

function AuthenticateStack(): JSX.Element {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={SignUp} name='SignUp' />
    </Stack.Navigator>
  )
}

export default App;
