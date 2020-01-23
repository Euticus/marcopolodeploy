import React, {useState} from 'react';
import { StyleSheet, Button } from 'react-native';
import { Card, Surface, Title, Paragraph, TextInput } from 'react-native-paper';

const LoginForm = (props) => {

    const [user, setUser] = useState('') 

    handleSubmit = e => {
        props.onUserChange(user)
    }
    return (
        <Surface style={styles.surface}>
                <TextInput
                    value={user}
                    onChange={(e) => {
                        setUser( e.nativeEvent.text )
                        }}
                    placeholder={'Username'}
                /> 
                <Card.Actions>
                    <Button
                        title={'Login'}
                        onPress={handleSubmit}
                    />
                </Card.Actions>      
        </Surface>
    );
  }

export default LoginForm


const styles = StyleSheet.create({
    surface: {
      backgroundColor: '#fff6ac', 
      padding: 1,
      height: '75%',
      width: '75%',
      marginHorizontal: 70,
      marginVertical: 110,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 8,
      borderColor: '#7e78d2',
      borderWidth: 1,
      shadowColor: '#aa3d2c',
      letterSpacing: 4, 
      
    },
  });