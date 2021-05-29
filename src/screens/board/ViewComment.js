import React, { useContext, Component } from 'react';
import { Text, View} from 'react-native';

class ViewComment extends Component{

    constructor(props){
        super(props);
        this.state = { data: []};
        fetch('http://192.168.0.184:3344/comment/getComment',{
        method: "post",
        headers :{
            "content-Type" : "application/json",
        },
        body : JSON.stringify({
            c_bid : this.props.route.params.data.b_Id
        }), 
    }).then(response=>response.json()).then((response=>this.setState({data:response})));
        //console.log(user);
    }

    ToDate = text => {
        return String(text).substr(2,8);
    };

    render(){
        return this.state.data.map((data)=> <View style={{flexDirection: 'row', width : '100%'}} >
         <Text style={{fontSize: 15, width : '20%', textAlign: 'center'}} >{this.props.route.params.data.usr_Nickname}</Text>
         <Text style={{fontSize: 15, width : '60%', marginBottom : 30}}>{data.co_Content}</Text>
         <Text style={{fontSize: 15, width : '20%', textAlign: 'center'}} >{this.ToDate(data.co_Time)}</Text>
         </View>)
    }
    
    
}

export default ViewComment;