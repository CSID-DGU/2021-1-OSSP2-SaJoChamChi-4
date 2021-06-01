import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

class Test extends Component {
  

    constructor(props){
        super(props);
        this.state = {clicked:false, data: [], data2:[], clicked2:false, clicked3:false};
    }
    
click =  ()  => {
    this.setState(({clicked: true}));
  fetch('http://172.30.1.21:3344/test/getUser',{
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
}).then(response=>response.json()).then((response) => this.setState({data:response}));

console.log(this.state.data);
};

click2 = ()  => {
    this.setState(({clicked2: true}));
     fetch('http://172.30.1.21:3344/login/Login',{
        method: "post",
        headers :{
            "content-Type" : "application/json",
        },
        body : JSON.stringify({
            id : "cajun7",
            pwd : "1234",
        })
   }).then(response=>response.json()).then((response) => this.setState({data2:response}));
   console.log(this.state.data2);
};

  click2 = () => {
    this.setState({ clicked2: true });
    fetch("http://172.30.1.21:3344/login/Login", {
      method: "post",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        id: "cajun7",
        pwd: "1234",
      }),
    })
      .then((response) => response.json())
      .then((response) => this.setState({ data2: response }));
    console.log(this.state.data2);
  };

  renderCategories() {
    return this.state.data.map((data) => (
      <View>
        <Text>{data.usr_Name}</Text>
        <Text>{data.usr_Email}</Text>
        <Text>{data.usr_Nickname}</Text>
      </View>
    ));
  }

  renderCategories2() {
    console.log("data2");
    console.log(this.state.data2);
    return this.state.data2.map((data) => (
      <View>
        <Text>UserId : {data.usr_Id}</Text>
        <Text>Name : {data.usr_Name}</Text>
      </View>
    ));
  }

  unclick = () => {
    this.setState({ clicked: false, clicked2: false });
    console.log(this.state.data, this.state.clicked, this.state.clicked2);
  };

  render() {
    return (
      <Container>
        <Text>GET TEXT BUTTON </Text>
        {!this.state.clicked ? (
          <Button title="get" onPress={this.click} />
        ) : (
          this.renderCategories()
        )}
        {!this.state.clicked2 ? (
          <Button title="get2" onPress={this.click2} />
        ) : (
          this.renderCategories2()
        )}
        {this.state.clicked ? (
          <Button title="cancle" onPress={this.unclick} />
        ) : (
          <Text>PUSH BUTTON!</Text>
        )}
      </Container>
    );
  }
}

export default Test;
