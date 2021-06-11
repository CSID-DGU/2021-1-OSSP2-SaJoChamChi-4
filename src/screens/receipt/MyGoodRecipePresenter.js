import React, { useContext, Component } from 'react';
import { Text, View, Button, Dimensions ,TouchableOpacity, Image} from 'react-native';
import { UserContext } from '../../contexts';


class MyGoodRecipePresenter extends Component{

    static contextType = UserContext;

    constructor(props){
        super(props);
        this.state = {clicked:false, data: [], info :[], ingre:[], recipedetail:[], good:[] };
    }

    componentDidMount(){
        const user = this.context;
        console.log("MYGOOD TEST", user);
        this.click(user.user.usr_Id);
    }

  click = (num) =>{
    fetch('http://172.30.1.21:3344/recipe/MyGoodRecipe',{
        method: "post",
        headers :{
            "content-Type" : "application/json",
        },
        body : JSON.stringify({
            usr_Id : num, 
        }),
    }).then(response=>response.json()).then((response=>this.setState({data:response})));
        //console.log(user);
  } 
  
  getinfo = async (num) =>{
   res = await fetch('http://172.30.1.21:3344/recipe/getinfo',{
        method: "post",
        headers :{
            "content-Type" : "application/json",
        },
        body : JSON.stringify({
            id : num, 
        }),
    }).then(response=>response.json());
        //console.log(user);
        return res;
  } 
  getingre =  async (num) =>{
   res2 = await fetch('http://172.30.1.21:3344/recipe/getingre',{
        method: "post",
        headers :{
            "content-Type" : "application/json",
        },
        body : JSON.stringify({
            id : num, 
        }),
    }).then(response=>response.json());
        //console.log(user);
        return res2;
  } 
  
  getdetailrecipe = async (num) =>{
   res3 = await fetch('http://172.30.1.21:3344/recipe/getdetailrecipe',{
        method: "post",
        headers :{
            "content-Type" : "application/json",
        },
        body : JSON.stringify({
            id : num, 
        }),
    }).then(response=>response.json());
        //console.log(user);
        return res3;
  } 

  getGoodInfo = async (data) =>{
    const user = this.context;
    await fetch('http://172.30.1.21:3344/recipegood/IsGood',{
        method: "post",
        headers :{
            "content-Type" : "application/json",
        },
        body : JSON.stringify({
            rno : data,
            usr_Id : user.user.usr_Id  
        }),
    }).then(response=>response.json()).then((response=>this.setState({good:response})));
}

  onPressHandle = async (data, data2) => {
    await this.getGoodInfo(data)
    detailrecipe = await this.getdetailrecipe(data);
    info = await this.getinfo(data);
    ingre = await this.getingre(data);
    console.log("test",ingre);
    if(this.state.good.length==0){
        this.props.navigation.navigate('RecipeDetail', {params:{id:data, summary:data2, detailrecipe:detailrecipe, info:info, ingre:ingre, data2:null}})
    }
    else this.props.navigation.navigate('RecipeDetail', {params:{id:data, summary:data2, detailrecipe:detailrecipe, info:info, ingre:ingre, data2:this.state.good}})
}

    render(){
        var {height, width} = Dimensions.get('window');
        console.log(this.state.data);
        return this.state.data.map((data)=>
        <View style={{height:220, textAlign: 'center', marginBottom:15}} >
            <TouchableOpacity onPress ={this.onPressHandle.bind(this,data.id, data.summary)}>
            <Image source={{uri:data.img}} style={{width:width,height:200}} ></Image>
            </TouchableOpacity>
        <Text style={{fontSize: 15,height:20, textAlign: 'center', fontWeight:'bold'}} onPress ={this.onPressHandle.bind(this,data.id, data.summary)}>{data.name}</Text>
        </View>
)

    }
   

    ToDate = text => {
        return String(text).substr(2,8);
      };


}

export default MyGoodRecipePresenter;