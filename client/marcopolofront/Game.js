import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, YellowBox, Vibration } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, Surface } from 'react-native-paper';


import io from 'socket.io-client'


YellowBox.ignoreWarnings([
	'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
])


const Game = (props) => {
	const [userId, setUserID] = useState('')
	const [location, setLocation] = useState('')
	const [distance, setDistance] = useState(1)
	const [rate, setRate] = useState(1)
	const [socket, setSocket] = useState(null)
	//const [direction, setDirection] = useState('')
	const ENDPOINT = 'http://10.9.106.100:5000/'
    // const ENDPOINT = 'https://marcopolo-marcopoloforreal.azurewebsites.net'
	useEffect(() => {
		setUserID(props.username)
		let s = io(ENDPOINT)
		setSocket(s)
		s.connect()
	}, [])
    
    useEffect(() => {
		if (socket !== null ){
			console.log("location", location)
			console.log("userId", userId)
				socket.emit('dataToServer', {userId, location} )	
				socket.on('broadcast', (obj) => {
					console.log("dist", obj["dist"])
					vibrationFunction(obj["dist"])
				})
		}
	}, [location, distance, rate])
	
	// findDirection = () =>{
	// 	Magnetometer.addListener(result => {
	// 		setDirection({ direction: result })
	// 	})

	// }

	const vibrationFunction = (dist) => {
		console.log("its working ITS WORKING!!")
		setDistance(dist)
		setRate(1000)
	    if (dist < 0.001){
			setRate(50)
			Vibration.vibrate([50, 200], true)
		} else if( dist < 0.01){
			setRate(150)
			Vibration.vibrate([150, 200], true)
		} else if( dist < 0.1){
			setRate(450)
			Vibration.vibrate([450, 200], true)
		} else if( dist < 1){
			setRate(1000)
			Vibration.vibrate([1000, 200], true)
		}
	}


	const findCoordinates = () => {
		navigator.geolocation.getCurrentPosition(
			position => {
				const coord = JSON.stringify(position);
				setLocation(coord);
			},
			error => Alert.alert(error.message),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
	};

		return (
			<Surface style={styles.surface}>	
					<Title>thanks for playing marcopolo </Title>
					<Paragraph>welcome {userId} </Paragraph>		
					<TouchableOpacity onPress={findCoordinates}>
						<Text >How far outis the other player?</Text>
						<Text>Distance: {distance}  </Text>
						<Text>Rate: {rate}  </Text>
					</TouchableOpacity>
						
			</Surface>
		);
	}


export default Game


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