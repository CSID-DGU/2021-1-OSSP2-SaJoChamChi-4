import React, { useContext, Component } from 'react';
import { Text, View} from 'react-native';
import { UserContext } from '../../contexts';



class ProfilePresenter extends Component{

    static contextType = UserContext;

    constructor(props){
        super(props);
        this.state = {clicked:false, data: [] };
    }

    componentDidMount(){
        const user = this.context;
        console.log("didmount log",user.user);
        this.click(user.user.usr_Id);
        console.log("presenter user info : ", this.state.data);
    }

click =  (user)  => {
    fetch('http://172.30.1.21:3344/login/Profile',{
        method: "post",
        headers :{
            "content-Type" : "application/json",
        },
        body : JSON.stringify({
            id : user, 
        }),
    }).then(response=>response.json()).then((response=>this.setState({data:response})));
};
  ToDate = text => {
    return String(text).substr(0,10);
  };

  render() {
    return this.state.data.map((data) => (
      <View>
        <Text style={{ fontSize: 15 }}>이름 : {data.usr_Name}</Text>
        <Text style={{ fontSize: 15 }}>닉네임 : {data.usr_Nickname}</Text>
        <Text style={{ fontSize: 15 }}>Email : {data.usr_Email}</Text>
        <Text style={{ fontSize: 15 }}>생일 : {data.usr_Birth}</Text>
        <Text style={{ fontSize: 15 }}>주소 : {data.usr_Address}</Text>
        <Text style={{ fontSize: 15 }}>ID : {data.user_Id}</Text>
        <Text style={{ marginBottom: 30, fontSize: 15 }}>
          생성일자 : {this.ToDate(data.usr_Rdate)}
        </Text>
      </View>
    ));
  }
}

export default ProfilePresenter;
