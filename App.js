import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './pages/main.js';
import Settings from './pages/settings.js';
import { RoomDataProvider } from './components/utils/roomDataProvider.js';
import { useKeepAwake } from 'expo-keep-awake';

const Stack = createStackNavigator();

const App = () => {
  useKeepAwake();
  return (
    <RoomDataProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Main} options={{ headerShown: false }} />
          <Stack.Screen name="Inställningar" component={Settings} options={{ title: 'Inställningar', headerShown: true }} />
        </Stack.Navigator>
      </NavigationContainer>
    </RoomDataProvider>
  );
}

export default App;