import React, { useContext, Component } from "react";
import { Text, View } from "react-native";
//import { withNavigation } from 'react-navigation';
import DetailView from "./DetailView";

class SimpleViewPresenter extends Component {
  //static contextType = UserContext;

  constructor(props) {
    super(props);
    //this.state = {clicked:false, data: [], data2:[], clicked2:false, user:user};
    this.state = { data: [] };
    fetch("http://192.168.0.190:3344/board/allBoard", {
      method: "post",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        //id : 3,
      }),
    })
      .then((response) => response.json())
      .then((response) => this.setState({ data: response }));
    //console.log(user);
  }

  onPressHandle = (data) => {
    //console.log("hi");
    //const navigation = useNavigation();
    //navigation.goBack();
    //console.log(title);
    console.log(data);
    this.props.navigation.navigate("Board", {
      screen: "DetailView",
      params: { data: data },
    });
  };

  ToDate = (text) => {
    return String(text).substr(2, 8);
  };

  render() {
    return this.state.data.map((data) => (
      <View style={{ flexDirection: "row", width: "100%" }}>
        <Text
          style={{ fontSize: 20, width: "50%", textAlign: "center" }}
          onPress={this.onPressHandle.bind(this, data)}
        >
          {data.b_Title}
        </Text>
        <Text
          style={{ fontSize: 15, width: "20%", textAlign: "center" }}
          onPress={this.onPressHandle.bind(this, data)}
        >
          {data.usr_Name}
        </Text>
        <Text
          style={{ fontSize: 15, width: "20%", textAlign: "center" }}
          onPress={this.onPressHandle.bind(this, data)}
        >
          {this.ToDate(data.b_Time)}
        </Text>
        <Text
          style={{
            fontSize: 15,
            width: "13%",
            textAlign: "center",
            marginBottom: 30,
          }}
          onPress={this.onPressHandle.bind(this, data)}
        >
          {data.b_Hits}
        </Text>
      </View>
    ));
  }
}

export default SimpleViewPresenter;
