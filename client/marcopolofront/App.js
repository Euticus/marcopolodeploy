import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, Surface } from 'react-native-paper';
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
    setTrueLogin(true)}
  }
    return (
      <Surface style={styles.surface}>
          {trueLogin ?
            <Game username={username} /> :
            <LoginForm onUserChange={(username) => setUsername(username)}/>
          } 
      </Surface>
    );
}


const styles = StyleSheet.create({
  surface: {
    backgroundColor: '#fff6ac', 
    padding: 8,
    height: '100%',
    width: '100%',
    marginHorizontal: 130,
    marginVertical: 220,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    borderColor: '#7e78d2',
    borderWidth: 1,
    shadowColor: '#aa3d2c',
    letterSpacing: 4, 
    
  },
});