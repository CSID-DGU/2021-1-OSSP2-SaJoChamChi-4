import React, { useContext, Component } from 'react';
import { Text, View} from 'react-native';
import { UserContext } from '../../contexts';



class ProfilePresenter extends Component{

    static contextType = UserContext;
    
    constructor(props){
        super(props);
        const user = this.context;
        this.state = {clicked:false, data: [], data2:[], clicked2:false, user:user};
        console.log(user);
    }

    componentDidMount(){
        this.click();
    }

click =  ()  => {
    fetch('http://192.168.0.5:3344/login/Profile',{
        method: "post",
        headers :{
            "content-Type" : "application/json",
        },
        body : JSON.stringify({
            id : 1, 
        }),
    }).then(response=>response.json()).then((response=>this.setState({data:response})));
    console.log(this.state.data);
};
  ToDate = text => {
    return String(text).substr(0,10);
  };

    render(){
        return this.state.data.map((data)=> <View >
        <Text style={{fontSize: 15}}>이름 : {data.usr_Name}</Text>
        <Text style={{fontSize: 15}}>닉네임 : {data.usr_Nickname}</Text>
        <Text style={{fontSize: 15}}>Email : {data.usr_Email}</Text>
        <Text style={{fontSize: 15}}>생일 : {data.usr_Birth}</Text>
        <Text style={{fontSize: 15}}>주소 : {data.usr_Address}</Text>
        <Text style={{fontSize: 15}}>ID : {data.user_Id}</Text>
        <Text style={{marginBottom : 30, fontSize : 15}}>생성일자 : {this.ToDate(data.usr_Rdate)}</Text>
        </View>)
    }

    
}

export default ProfilePresenter;