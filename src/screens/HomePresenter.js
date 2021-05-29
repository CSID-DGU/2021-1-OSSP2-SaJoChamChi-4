import React, { useContext, Component } from 'react';
import { Text, View, Button, Alert} from 'react-native';
import { UserContext } from '../contexts';


class EpdatePresenter extends Component{

    static contextType = UserContext;

    constructor(props){
        super(props);
        this.state = {clicked:false, data: [], del:false, item:null };
    }

    componentDidMount(){
        const user = this.context;
        console.log("didmount log",user.user);
        this.click(user.user.usr_Id);
        console.log("presenter user info : ", this.state.data);
    }

click =  (user)  => {
    fetch('http://172.30.1.55:3344/refri/getList',{
        method: "post",
        headers :{
            "content-Type" : "application/json",
        },
        body : JSON.stringify({
            usr_id : user, 
        }),
    }).then(response=>response.json()).then((response=>this.setState({data:response})));
};
  ToDate = text => {
    return String(text).substr(2,8);
  };
 getDDay = text=>{
    var Dday = new Date(text);  
    var now = new Date();                    
    var gap = now.getTime() - Dday.getTime();   
    var result = Math.floor(gap / (1000 * 60 * 60 * 24)) * -1;
    return " (D-"+String(result)+")";
 }
 getdate = text=>{
    var Dday = new Date(text);  
    var now = new Date();                    
    var gap = now.getTime() - Dday.getTime();   
    var result = Math.floor(gap / (1000 * 60 * 60 * 24)) * -1;
    return result;
 }
    render(){
        return this.state.data.map((data)=> <View style={{flexDirection: 'row', width : '100%'}} >
        {this.getdate(data.rf_Epdate)<=5   ?      
        <Text style={{fontSize: 15,width : '40%', textAlign: 'center'}}>{data.rf_Pname}</Text>
        :  null}
        {this.getdate(data.rf_Epdate)<=5   ?      
        <Text style={{fontSize: 15, width : '20%', textAlign: 'center'}}>{data.rf_Number}</Text>
        :  null}
        {this.getdate(data.rf_Epdate)<=5   ?      
        <Text style={{fontSize: 15, width : '40%', textAlign: 'center', color:'red', marginBottom:10}}>{this.ToDate(data.rf_Epdate)}{this.getDDay(data.rf_Epdate)}</Text>
        :  null}
        </View>)
}
}

export default EpdatePresenter;