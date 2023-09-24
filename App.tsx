import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignUp } from './src/screens/SignUp';
import { Login } from './src/screens/Login';
import { AuthContext, AuthContextProvider } from './src/store/AuthContext';

const Stack = createNativeStackNavigator();
function App(): JSX.Element {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <StatusBar translucent backgroundColor="transparent" />
        <RootStack />
      </NavigationContainer>
    </AuthContextProvider>
  );
}

function RootStack(): JSX.Element {
  const authCtx = useContext(AuthContext);
  return (
    authCtx.isAuthenticated ? <Text>AAAAAAAAAAAA {authCtx.user?.displayName}</Text> : <AuthenticateStack />
  )
}

function AuthenticateStack(): JSX.Element {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={Login} name='Login' />
      <Stack.Screen component={SignUp} name='SignUp' />
    </Stack.Navigator>
  )
}

export default App;
