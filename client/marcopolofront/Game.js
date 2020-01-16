import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, YellowBox, Vibration } from 'react-native';
import { Magnetometer } from 'expo-sensors'

import io from 'socket.io-client'


YellowBox.ignoreWarnings([
	'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
])


const Game = (props) => {
	const [userId, setUserID] = useState('')
	const [location, setLocation] = useState('')
	const [distance, setDistance] = useState(1)
	const [socket, setSocket] = useState(null)
	//const [direction, setDirection] = useState('')
	const ENDPOINT = 'http://10.9.107.113:5000'

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
	}, [location, distance])
	
	findDirection = () =>{
		Magnetometer.addListener(result => {
			setDirection({ direction: result })
		})

	}

	vibrationFunction = (dist) => {
		console.log("its working ITS WORKING!!")
		setDistance(dist)
		let rate = (dist + 1)^4 + 100
		Vibration.vibrate([rate, 200], true)
	}


	findCoordinates = () => {
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
			<View style={styles.container}>
				<TouchableOpacity onPress={findCoordinates}>
					<Text style={styles.welcome}>Find My Coords?</Text>
					<Text>Location: {location}</Text>
			
				</TouchableOpacity>
			
			</View>
		);
	}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF'
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10
	}
})

export default Game