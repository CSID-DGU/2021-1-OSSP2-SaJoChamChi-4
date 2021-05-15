import React, { useContext, Component } from 'react';
import { Text, View} from 'react-native';
import { UserContext } from '../../contexts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



class RefriListPresenter extends Component{

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
    fetch('http://172.30.1.21:3344/refri/getList',{
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
    return String(text).substr(0,10);
  };

    render(){
        var date = new Date();
        return this.state.data.map((data)=> <View style={{flexDirection: 'row', width : '100%'}} >
        <Text style={{fontSize: 15,width : '25%', textAlign: 'center'}}>{data.rf_Pname}</Text>
        <Text style={{fontSize: 15, width : '15%', textAlign: 'center'}}>{data.rf_Number}</Text>
        <Text style={{fontSize: 15, width : '25%', textAlign: 'center'}}>{this.ToDate(data.rf_Indate)}</Text>
        <Text style={{fontSize: 15, width : '25%', textAlign: 'center'}}>{this.ToDate(data.rf_Epdate)}</Text>
        <Text style={{marginBottom : 30, fontSize : 15, width : '10%', textAlign: 'center'}}>{data.usr_Frozen==0 ? '냉장' : '냉동'}</Text>
        </View>)
    }

    
}

export default RefriListPresenter;