import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Game from './Game'
import LoginForm from './LoginForm';

export default function App () {

 const [users, setUsers] = useState('') 
 const [username, setUsername] = useState('')
 const [password, setPassword] = useState('')
 const [trueLogin, setTrueLogin] = useState(false)

 useEffect(() => {
   fetch('http://localhost:3000/users')
   .then(res => res.json())
   .then(data => setUsers(data))
   }, [])

  useEffect(() => {
    handleUsername(username)
  }, [username])




 handleUsername = (username) => {
 if ( username && username.length > 2 ){
   setTrueLogin(true)
 } else{
   alert("you gotta enter a username")
 }
 }
    return (
      <View style={styles.container}>
       {trueLogin ?
          <Game username={username} /> :
            <LoginForm onUserChange={(username) => setUsername(username)}/>
          } 
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
