import React, { useContext, Component } from "react";
import { Text, TouchableOpacity, View, Alert } from "react-native";
import { CommonActions } from "@react-navigation/native";

class ViewComment extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    fetch("http://192.168.0.190:3344/comment/getComment", {
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
    console.log("====================", this.props.route.params.data.b_Id);
  }

  ToDate = (text) => {
    return String(text).substr(2, 8);
  };

  delete = (cid) => {
    fetch("http://192.168.0.190:3344/comment/deleteComment", {
      method: "post",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        c_id: cid,
      }),
    });
    Alert.alert("댓글 삭제되었습니다!");
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "BoardList" }, { name: "DetailView" }],
      })
    );
  };

  render() {
    return this.state.data.map((data) => (
      <View style={{ flexDirection: "row", width: "100%" }}>
        <Text style={{ fontSize: 15, width: "10%", textAlign: "center" }}>
          {this.props.route.params.data.usr_Nickname}
        </Text>
        <Text style={{ fontSize: 15, width: "60%", marginBottom: 30 }}>
          {data.co_Content}
        </Text>
        <Text style={{ fontSize: 15, width: "20%", textAlign: "center" }}>
          {this.ToDate(data.co_Time)}
        </Text>
        <TouchableOpacity
          onPress={this.delete.bind(this, data.co_Id)}
          style={{ width: "10%", backgroundColor: "white", borderRadius: 20 }}
        >
          <Text
            style={{
              fontSize: 14,
              color: "blue",
              width: "100%",
              textAlign: "center",
            }}
          >
            삭제
          </Text>
        </TouchableOpacity>
      </View>
    ));
  }
}

export default ViewComment;
