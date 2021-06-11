import React, { useContext, Component } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity} from 'react-native';
import { UserContext } from '../../contexts';

class RecipePresenter extends Component{

    static contextType = UserContext;

    constructor(props){
        super(props);
        this.state = {clicked:false, data: [], info :[], ingre:[], recipedetail:[],good:[] };
    }

    componentDidMount(){
        this.click(3);
        console.log("Test : ", this.state.data);
    }

  click = (num) =>{
    fetch('http://172.30.1.21:3344/recipe/RecipeList',{
        method: "post",
        headers :{
            "content-Type" : "application/json",
        },
        body : JSON.stringify({
            id : num, 
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
     res = await fetch('http://172.30.1.21:3344/recipegood/IsGood',{
        method: "post",
        headers :{
            "content-Type" : "application/json",
        },
        body : JSON.stringify({
            rno : data,
            usr_Id : user.user.usr_Id  
        }),
    }).then(response=>response.json()).then((response=>this.setState({good:response})));
    console.log("getRecipeGoodInfo check", res)
    return res;
}

  onPressHandle = async (data, data2) => {
    res = await this.getGoodInfo(data);
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
    
}
// this.state.data[0][0].map((data)=> <View style={{flexDirection: 'row', width : '100%'}} >
//         <Text style={{fontSize: 20,width : '50%', textAlign: 'center'}}>{data.name}</Text>
//         </View>)
export default RecipePresenter;
