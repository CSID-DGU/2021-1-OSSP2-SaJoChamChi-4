import React, { Component } from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

class Test extends Component{

    constructor(props){
        super(props);
        this.state = {clicked:false, data: []};
    }
click = async ()  => {
    this.setState(({clicked: true}));
 await fetch('http://localhost:3344/test/getUser',{
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
}).then(response=>response.json()).then((response) => this.setState({data:response}));
console.log(this.state.data);
};

renderCategories(){
    return this.state.data.map((data)=> <View><Text>{data.usr_Name}</Text>
    <Text>{data.usr_Email}</Text>
    <Text>{data.usr_Nickname}</Text></View>)
}
    

    unclick =() => {this.setState(({clicked: false})); console.log(this.state.data, this.state.clicked)};

    render(){
        return(
            <View >
                <Text>GET TEXT BUTTON </Text>
                {
                    !this.state.clicked ? <Button title="get" onPress={this.click} /> : this.renderCategories()
                }
                {
                    this.state.clicked ? <Button title="cancle" onPress={this.unclick} /> : <Text>PUSH BUTTON!</Text>
                }
            </View>
        )
    }
}

export default Test;