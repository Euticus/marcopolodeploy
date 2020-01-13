import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Game from './Game'

export default function App () {
 // useEffect(() => {
 //   fetch('http://localhost:3000/users')
 //   .then(res => res.json())
 //   .then(data => console.log(data))
 // }, [])

    return (
      <View style={styles.container}>
        <Game />
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
