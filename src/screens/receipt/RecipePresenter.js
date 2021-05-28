import React, { useContext, Component } from 'react';
import { Text, View} from 'react-native';
//import { withNavigation } from 'react-navigation';
import RecipeList from './ReceiptList'

class SimpleViewPresenter extends Component{

    //static contextType = UserContext;


    constructor(props){
        super(props);
        //this.state = {clicked:false, data: [], data2:[], clicked2:false, user:user};
        this.state = { data : []};
        
    
        Promise.all(fetch('http://172.30.1.26:3344/recipe/getRecipe',{
        method: "post",
        headers :{
            "content-Type" : "application/json",
        },
        body : JSON.stringify({
            id : 3 
        }),
    })).then(response=>{console.log('response:'+response.json())
         response.json()}).then(response => console.log('response : '+response));
    
    //.then((response=>this.setState({data:response.main})));
    
        //console.log(user);
    }

    render(){
        console.log('recipe data:');
        //console.log(this.state.data);
        return <View>
        <Text style={{fontSize: 20}} >Hello</Text>
        </View>
        
    }

    
}

export default SimpleViewPresenter;