import React, { useContext, Component } from 'react';
import { Text, View, Button, Alert} from 'react-native';
import { UserContext, ProgressContext } from '../../contexts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



class RefriListPresenter extends Component{

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
    componentDidUpdate(prevProps) {
        if (this.props.userID !== prevProps.userID) {
          this.fetchData(this.props.userID);
        }
      }
click =  (user)  => {
    fetch('http://192.168.0.143:3344/refri/getList',{
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
    return "D-"+String(result);
 }
 getdate = text=>{
    var Dday = new Date(text);  
    var now = new Date();                    
    var gap = now.getTime() - Dday.getTime();   
    var result = Math.floor(gap / (1000 * 60 * 60 * 24)) * -1;
    return result;
 }

// 삭제 임시 저장
//  delItem = (item) => {
//     fetch('http://172.30.1.21:3344/refri/delete',{
//         method: "post",
//         headers :{
//             "content-Type" : "application/json",
//         },
//         body : JSON.stringify({
//             Pname : item, 
//         }),
//     });
//     Alert.alert(item,"이 삭제되었습니다!");
//  };

    render(){
        var date = new Date();
        return this.state.data.map((data)=> <View style={{flexDirection: 'row', width : '100%'}} >
        <Text style={{fontSize: 15,width : '25%', textAlign: 'center'}}>{data.rf_Pname}</Text>
        <Text style={{fontSize: 15, width : '15%', textAlign: 'center'}}>{data.rf_Number}</Text>
        <Text style={{fontSize: 15, width : '25%', textAlign: 'center'}}>{this.ToDate(data.rf_Indate)}</Text>
        {this.getdate(data.rf_Epdate)<=5   ?      
        <Text style={{fontSize: 15, width : '25%', textAlign: 'center', color:'red'}}>{this.getDDay(data.rf_Epdate)}</Text>
        :  <Text style={{fontSize: 15, width : '25%', textAlign: 'center' }}>{this.getDDay(data.rf_Epdate)}</Text>}
        <Text style={{marginBottom : 30, fontSize : 15, width : '10%', textAlign: 'center'}}>{data.rf_Frozen==0 ? '냉장' : '냉동'}</Text>
        </View>)
    }

    
}

export default RefriListPresenter;