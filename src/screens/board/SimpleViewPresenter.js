import React, { useContext, Component } from 'react';
import { Text, View} from 'react-native';
//import { withNavigation } from 'react-navigation';
import DetailView from './DetailView'

class SimpleViewPresenter extends Component{

    //static contextType = UserContext;

    constructor(props){
        super(props);
        //this.state = {clicked:false, data: [], data2:[], clicked2:false, user:user};
        this.state = { data: []};
        fetch('http://192.168.0.145:3344/board/allBoard',{
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

    onPressHandle = (data) => {
        //console.log("hi");
        //const navigation = useNavigation();
        //navigation.goBack();
        //console.log(title);
        console.log(data);
        this.props.navigation.navigate('Board',{screen:'DetailView',params : {data : data}});
    }

    render(){
        return this.state.data.map((data)=> <View>
        <Text style={{fontSize: 20}} onPress ={this.onPressHandle.bind(this,data)} >타이틀 : {data.b_Title}{"\n"}
        닉네임 : {data.b_Writer}, 추천수 : {data.b_Hits}</Text>
        </View>)
    }

    
}

export default SimpleViewPresenter;