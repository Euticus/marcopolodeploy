import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, YellowBox, Vibration } from 'react-native';
import io from 'socket.io-client'


YellowBox.ignoreWarnings([
	'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
])
let socket;

const Game = () => {
	const [userId, setUserID] = useState('')
	const [location, setLocation] = useState('')
    const ENDPOINT = '10.9.104.222:5000'

    
    useEffect(() => {

		socket = io(ENDPOINT)
		console.log(location)
		socket.on('connection', () => console.log('connected yo'))

        socket.emit('dataToServer', {location} )

    }, [location])



	vibrationFunction = (dist) => {
		rate = (dist^(-1))^2
		Vibration.vibrate([rate, rate], true)
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