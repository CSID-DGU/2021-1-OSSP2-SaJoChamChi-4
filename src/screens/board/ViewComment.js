import React, { useContext, Component } from "react";
import { Text, View } from "react-native";

class ViewComment extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    fetch("http://172.30.1.34:3344/comment/getComment", {
      method: "post",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        c_bid: this.props.route.params.data.b_Id,
      }),
    })
      .then((response) => response.json())
      .then((response) => this.setState({ data: response }));
    //console.log(user);
  }

  render() {
    return this.state.data.map((data) => (
      <View style={{ flexDirection: "row", width: "100%" }}>
        <Text style={{ fontSize: 15, width: "20%", textAlign: "center" }}>
          {this.props.route.params.data.usr_Nickname}
        </Text>
        <Text style={{ fontSize: 15, width: "60%", marginBottom: 30 }}>
          {data.co_Content}
        </Text>
        <Text style={{ fontSize: 15, width: "20%", textAlign: "center" }}>
          {data.co_Time}
        </Text>
      </View>
    ));
  }
}

export default ViewComment;
