import React from 'react'
import { StyleSheet, Text, View  } from 'react-native';
import PaginaInicial from './components/PaginaInicial';
import { NavigationContainer } from '@react-navigation/native';
import ChatPage from './components/Chat';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DiReact } from 'react-icons/fa'


const Stack = createBottomTabNavigator();
const MyTheme = {
  colors: {
    primary: '#61DAFB',
    background: '#20232A',
    text: '#61DAFB',
    card: '#20232A',
    border:'#20232A'
  },
};

export default function App() {
  return (
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator initialRouteName='PaginaInicial'>
          <Stack.Screen 
            name="PaginaInicial" 
            component={PaginaInicial} 
            options={{title:'Pagina Inicial'}}/>
          <Stack.Screen 
            name="ChatPage" 
            component={ChatPage} 
            options={{ title: 'Chat Page' }}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}


