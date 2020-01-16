import React, {useState} from 'react';
import { Alert, Button, TextInput, View, StyleSheet } from 'react-native';

const LoginForm = (props) => {

    const [user, setUser] = useState('') 

    handleSubmit = e => {
        props.onUserChange(user)
    }
    return (
      <View style={styles.container}>
        <TextInput
          value={user}
          onChange={(e) => {
              setUser( e.nativeEvent.text )
            }}
          placeholder={'Username'}
          style={styles.input}
        />       
        <Button
          title={'Login'}
          style={styles.input}
          onPress={handleSubmit}
        />
      </View>
    );
  }

export default LoginForm

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});