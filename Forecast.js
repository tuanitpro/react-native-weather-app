'use strict';
import React,{Component} from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
} from 'react-native';

export default class Forecast extends Component{
	
	render(){
		var getIcon = this.props.icon;
		var getImage=null;
		if(getIcon != null && getIcon !=undefined){
			getImage = <Image 
			style={styles.imageIcon}
        	source={{uri: 'http://openweathermap.org/img/w/'+getIcon+'.png'}} />
		}
		return (
		<View>
        
        <View style={styles.viewImageIcon}>
        {getImage}

        </View>
        <Text style={styles.mainText}>
          	Current conditions: {this.props.description}          	
        </Text>
        <Text style={styles.tempText}>
          	{this.props.temp}°C
        </Text>
      </View>
		


		)
	}
}

const styles = StyleSheet.create({
	bigText: {
    
	    fontSize: 28,
	    textAlign: 'center',
	    margin: 10,
	    color: '#FFFFFF'
  	},
  	mainText: {    
	    fontSize: 16,
	    textAlign: 'center',
	    color: '#FFFFFF'
  	},
  	tempText: {
  		fontSize: 60,
  		color: '#FFFFFF',
  		textAlign: 'center',
  	},
  	viewImageIcon:{
		justifyContent: 'center',
    	alignItems: 'center',

  	},
  	imageIcon: {
  		width: 64,
  		height: 64,  		
  	},
})


module.exports = Forecast;