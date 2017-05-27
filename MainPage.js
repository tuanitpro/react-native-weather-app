'use strict';

import React, { Component } from 'react';

import {
 
  Image,
  Text,
  TextInput,
  View, 
  StyleSheet,
} from 'react-native';
import Forecast from './Forecast';
const API_KEY='17b3ac29ca8c3bbdc427123e277b022e';

export default class MainPage extends Component{

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	zip: '700000',
	  	city: 'Ho Chi Minh',
	 	country: '', 	
	  	forecast:{
	  		main:'',
	  		description: '',
	  		temp: '',
	  		icon: ''
	  	},
	  };
	}
	_handleTextChange(event){
			var getCity = this.state.city;
			if(getCity !=''){
			fetch('http://api.openweathermap.org/data/2.5/weather?q='+getCity+'&units=Metric&appid='+API_KEY)
					.then((response) => response.json())
					.then((responseJSON) => {					 
							this.setState({
							country:responseJSON.sys.country,
							forecast: {
								main: responseJSON.weather[0].main,
								description: responseJSON.weather[0].description,
								temp: responseJSON.main.temp,
								icon: responseJSON.weather[0].icon,
							}
						});
					})
					.catch((error) => {
						console.warn(error);
					}); 
			}
	}
	componentWillMount() {
    		this._handleTextChange(); 
  	}
	render(){
		var content = null;
	    if (this.state.forecast !== null) {
	      content = <Forecast 
	                  main={this.state.forecast.main}
	                  description={this.state.forecast.description}
	                  temp={this.state.forecast.temp}
					  icon={this.state.forecast.icon}
	                  />;
	    }

	return (
			<View style={styles.container}>

			<Image source={require('./flowers.jpg')}  style={styles.backgroundImage} />
				<View style={styles.overlay}>
					<View style={styles.row}>							
						<Text style={styles.bigText}>
							City {this.state.city}, {this.state.country}
						</Text>
						{content}
						<TextInput style={styles.cityInput} placeholder="Your City!" value={this.state.city}
	         				onChangeText={(city) => this.setState({city})} 
	          				onSubmitEditing={()=>this._handleTextChange()} />
					</View>
				</View>
			</View>
		)
	}
}

  
const styles = StyleSheet.create({
	container: {
    flex:1,     
    alignItems: 'center',    
  	},
  	backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
       
        position  : 'absolute',
		top       : 0,
		bottom    : 0,
		left      : 0,
		right     : 0,
    },
  	overlay:{
    	position  : 'absolute',
     	top       : 0,
		
		left      : 0,
		right     : 0,

    	backgroundColor: '#000000',
    	opacity: 0.5,
    	flexDirection: 'column',
    	alignItems: 'center',
  
  	},
	row: {
    
      paddingTop: 10,
      paddingBottom: 10,
  	},
   	bigText: {
    
	    fontSize: 32,
	    textAlign: 'center',
	    margin: 10,
	    color: '#FFFFFF'
  	},
  	cityInput:{  	
  		color: '#FFFFFF'
  }
});
