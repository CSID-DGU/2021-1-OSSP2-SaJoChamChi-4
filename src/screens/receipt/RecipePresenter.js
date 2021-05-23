// import React, { useContext, Component } from 'react';
// import { Text, View} from 'react-native';

// class RecipePresenter extends Component{

//     constructor(props){
//         super(props);
//         this.state = {clicked:false, data: [] };
//     }

//     componentDidMount(){
//         this.click(3);
//         console.log("Test : ", this.state.data);
//     }

//   click = (num) =>{
//     fetch('http://192.168.0.190:3344/recipe/getRecipe',{
//         method: "post",
//         headers :{
//             "content-Type" : "application/json",
//         },
//         body : JSON.stringify({
//             id : num,
//         }),
//     }).then(response=>response.json()).then((response=>this.setState({data:response[0]})));
//         //console.log(user);
//   }
//     render(){
//         console.log('recipe data:');
//         return <Text>test</Text>

//     }

// }
// // this.state.data[0][0].map((data)=> <View style={{flexDirection: 'row', width : '100%'}} >
// //         <Text style={{fontSize: 20,width : '50%', textAlign: 'center'}}>{data.name}</Text>
// //         </View>)
// export default RecipePresenter;
