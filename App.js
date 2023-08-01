import React, { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './pages/home.js';
import Settings from './pages/settings.js';
import { RoomDataProvider } from './components/utils/roomDataProvider.js';
import { OptionsDataProvider } from './components/utils/optionsDataProvider.js';

const Stack = createStackNavigator();





const App = () => {



  return (
    <RoomDataProvider>
      <OptionsDataProvider>
        <NavigationContainer>


          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Inställningar" component={Settings} options={{ title: 'Inställningar', headerShown: true }} />
          </Stack.Navigator>


        </NavigationContainer>
      </OptionsDataProvider>
    </RoomDataProvider>
  );
}

export default App;