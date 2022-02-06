import { StyleSheet, Text, View  } from 'react-native';
import PaginaInicial from './components/PaginaInicial';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatPage from './components/chat';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const Stack = createBottomTabNavigator();
const MyTheme = {
  colors: {
    primary: '#20232A',
     background: '#20232A',
     text: '#61DAFB',
     card: '#20232A',
     border:'#20232A'
  },
};

export default function App() {
  return (
        <SafeAreaProvider>
          <NavigationContainer theme={MyTheme}>
            <Stack.Navigator initialRouteName='ChatPage'>
              <Stack.Screen name="PaginaInicial" component={PaginaInicial} options={{title:'Pagina Inicial'}}/>
              <Stack.Screen name="ChatPage" component={ChatPage} options={{ title: 'Chat Page' }}/>
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
  );
}


