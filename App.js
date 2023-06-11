import React, { useState, useEffect } from 'react';
import { Text, View, StatusBar } from 'react-native';
import styles from './styles/App.module.js';

const App = () => {
  const [clock, setClock] = useState(new Date());
  let currentTime = clock.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' });
  let upcomingBookings = [];


  //hide status bar
  useEffect(() => {
    StatusBar.setHidden(true, 'none');
  });


  useEffect(() => {
    const interval = setInterval(
      () => setClock(new Date()), 1000);
    return () => {
      clearInterval(interval);
    }
  }, []);

  if (upcomingBookings.length > 0) return (
    <View className={styles.App}>
      <View className={styles.left}>
        <Text className={styles.clock}>{currentTime}</Text>
        <Text>Kommande bokningar</Text>
      </View>
      <View className={styles.right}>
      </View>
    </View>
  )
  else return (
    <View className={styles.App}>
      <Text>Det finns inga kommande bokningar.</Text>
    </View>
  );
}

export default App;