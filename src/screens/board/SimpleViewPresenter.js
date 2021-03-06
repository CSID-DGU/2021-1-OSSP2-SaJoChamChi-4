import React, { useContext, Component } from 'react';
import { Text, View, Button} from 'react-native';
import { UserContext } from '../../contexts';
import {CommonActions} from "@react-navigation/native";
//import { withNavigation } from 'react-navigation';
import DetailView from './DetailView'
import { array } from 'prop-types';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';
import { ThemeConsumer } from 'styled-components';

class SimpleViewPresenter extends Component{

    static contextType = UserContext;

    constructor(props){
        super(props);
        this.state = { data: [], data2 :[]};
        fetch('http://34.64.235.196:3344/board/allBoard',{
        method: "post",
        headers :{
            "content-Type" : "application/json",
        },
        body : JSON.stringify({
            //id : 3, 
        }),
    }).then(response=>response.json()).then((response=>this.setState({data:response})));
        //console.log(user);
    }

    onPressHandle = async (data) => {
        //console.log("hi");
        //const navigation = useNavigation();
        //navigation.goBack();
        //console.log(title);
        console.log(data);
        res = await this.getGoodInfo(data)
        console.log("isgoodInfo check", res);
        if(this.state.data2.length==0){
            this.props.navigation.navigate('Board',{screen:'DetailView',params : {data : data, data2 : null}});
        }
        else this.props.navigation.navigate('Board',{screen:'DetailView',params : {data : data, data2 : this.state.data2}});
    }

    getGoodInfo = async (data) =>{
        const user = this.context;

     res = await fetch('http://34.64.235.196:3344/good/IsGood',{
            method: "post",
            headers :{
                "content-Type" : "application/json",
            },
            body : JSON.stringify({
                bno : data.b_Id,
                usr_Id : user.user.usr_Id  
            }),
        }).then(response=>response.json()).then((response=>this.setState({data2:response})));
        console.log("getGoodInfo check", res)
        if(res===undefined) return null;
        else return true;
    }

    ToDate = text => {
        return String(text).substr(2,8);
      };

    render(){
        return this.state.data.map((data)=> <View style={{flexDirection: 'row', width : '100%'}} >
         <Text style={{fontSize: 20,width : '50%', textAlign: 'center'}} onPress ={this.onPressHandle.bind(this,data)}>{data.b_Title}</Text>
         <Text style={{fontSize: 15, width : '20%', textAlign: 'center'}} onPress ={this.onPressHandle.bind(this,data)}>{data.usr_Name}</Text>
         <Text style={{fontSize: 15, width : '20%', textAlign: 'center'}} onPress ={this.onPressHandle.bind(this,data)}>{this.ToDate(data.b_Time)}</Text>
         <Text style={{fontSize: 15, width : '13%', textAlign: 'center',marginBottom : 30}} onPress ={this.onPressHandle.bind(this,data)}>{data.b_Hits}</Text>
         </View>)
    }
    
    
}

export default SimpleViewPresenter;