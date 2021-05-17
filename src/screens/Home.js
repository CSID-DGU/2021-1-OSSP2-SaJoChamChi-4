import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {StyleSheet,Text, View, Button } from 'react-native'
import {FlatGrid} from 'react-native-super-grid'
import EpdatePresenter from './HomePresenter'



export default function Home({navigation}){
    const [ items, setItems] = React.useState([
        
        { title : '게시판', name : 'Board', code : '#1abc9c'},
        { title : '내정보', name : 'Profile', code : '#2ecc71'},
        { title : '레시피추천',name : 'RecipeList', code : '#3498db'},
        { title : '냉장고',name : 'MyRefri', code : '#5498ab'},
        
    ]);
    return(
        <>
        <FlatGrid
            itemDimension = {130}
            data={items}
            style={styles.gridView}
            spacing={10}
            renderItem={({item}) =>(
                <View style={[styles.itemContainer,{backgroundColor : item.code}]}>
                    <Text style={styles.itemName}>{item.title}</Text>
                    <Button title='press'
                    color='#841584'
                    onPress={() => navigation.navigate(item.name)}

                    />
                </View>
            )}
        >   
        </FlatGrid>
        <Text style={{fontSize: 20,marginBottom:50, textAlign:'center',marginBottom :15}}>유통기한 임박 상품</Text>
            <View style={{flexDirection: 'row', width : '100%'}} >
            <Text style={{fontSize: 15,width : '40%', textAlign: 'center'}}>식품명</Text>
            <Text style={{fontSize: 15, width : '20%', textAlign: 'center'}}>수량</Text>
            <Text style={{fontSize: 15, width : '40%', textAlign: 'center', marginBottom:10}}>유통기한</Text>
        </View>
        <EpdatePresenter/>
        <Text style={{marginBottom:30}}></Text>
        </>
    );
   
}


const styles = StyleSheet.create({
    gridView:{
        
        marginTop : 10,
        flex :1,
    },
    itemContainer:{
        justifyContent : 'flex-end',
        borderRadius : 5,
        padding : 35,
        height:'100%',
    },
    itemName:{
        textAlign: 'center',
        top : '-45%',
        fontSize:16,
        color : '#fff',
        fontWeight: '600',
    },
    itemCode : {
        fontWeight : '600',
        fontSize:12,
        color:'#fff',
    },
});