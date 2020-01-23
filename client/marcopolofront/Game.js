import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, YellowBox, Vibration } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, Surface } from 'react-native-paper';
//import  RNQuiet  from 'react-native-quiet'
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
	const [button, setButton] = useState(true)
	//const [direction, setDirection] = useState('')
	const ENDPOINT = 'http://10.9.110.112:5000/'
    // const ENDPOINT = 'https://marcopolo-marcopoloforreal.azurewebsites.net'
	useEffect(() => {
		console.log("component mounted")
		setUserID(props.username)
		let s = io(ENDPOINT)
		setSocket(s)
		s.connect()
	}, [])
    
    useEffect(() => {
		findCoordinates()
		if (socket !== null ){
			console.log("anything???")
			console.log("location", location)
			console.log("userId", userId)
			console.log("distance", distance)
			console.log("rate", rate)
				socket.emit('dataToServer', {userId, location} )	
				socket.on('broadcast', (obj) => {
					setDistance(obj["dist"])
					vibrationFunction(obj)
				})
		}
	}, [ button ])
	

	// findDirection = () =>{
	// 	Magnetometer.addListener(result => {
	// 		setDirection({ direction: result })
	// 	})
	// }


// Start listening. (This will ask for microphone permissions!)
// RNQuiet
//   .start('ultrasonic-experimental')
//   .then(
//     () => {
//       // Listen for Messages.
// 	  const { unsubscribe } = RNQuiet.addListener(msg => console.log("listening", msg)
// 		/* do something with received message */);
//       // Send Messages. (Careful; you can hear your own!)
//       RNQuiet.send(
// 		console.log("sending", distance),
//         {distance},
//       );
//       // Stop listening.
//       RNQuiet.stop();
//       // Release the observer.
//       unsubscribe();
//     },
//   )
//   .catch((error)=>{
// 	console.log("eroor hitting the front end");
// 	alert(error.message);
//  });


	const vibrationFunction = () => {
		console.log("its working ITS WORKING!!")
		let newRate = 100*(Math.log(100*distance))
		setRate(newRate)
		Vibration.vibrate([rate, 200], true)
	}


	const findCoordinates = () => {
		console.log("hitting findCoordinates")
			navigator.geolocation.getCurrentPosition(
				position => {
					const coord = JSON.stringify(position);
					setLocation(coord);
				},
				error => Alert.alert(error.message),
				{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
			);
	};
	console.log("rate", rate)
	console.log("button", button)
	console.log("distance", distance)
	console.log("location", location)
	console.log("userID", userId)

		return (
			<Surface style={styles.surface}>	
					<Title>Thanks for playing Marcopolo </Title>
					<Paragraph>Welcome {userId} </Paragraph>		
					<TouchableOpacity onPress={() => setButton(!button)} >	
						<Text> Click here to update Location!</Text>
						<Text> Distance: {distance} </Text>
					</TouchableOpacity>
			</Surface>
		);
	}
	
	//<Text>How far out is the other player?</Text>
	//<Text>Distance: {distance} </Text>
	//

export default Game


const styles = StyleSheet.create({
	surface: {
	  backgroundColor: '#fff6ac', 
	  padding: 1,
	  height: '75%',
	  width: '75%',
	  marginHorizontal: 80,
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