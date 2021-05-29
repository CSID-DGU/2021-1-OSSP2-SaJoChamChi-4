import React ,{useState, useContext} from 'react';
import styled from 'styled-components/native'
import {StyleSheet, Text,View, AppState, Button } from 'react-native'
import { ProgressContext, UserContext } from '../contexts'
import { useEffect,useRef } from 'react';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { bool } from 'prop-types';
import {FlatGrid} from 'react-native-super-grid'
import EpdatePresenter from './HomePresenter'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const PUSH_REGISTRATION_ENDPOINT = 'http://f3c8a471ccab.ngrok.io/token';
const MESSAGE_ENDPOINT = 'http://f3c8a471ccab.ngrok.io/pushMessage';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

const Container = styled.View`
    flex : 1;
    background-color: ${({theme}) => theme.background};
    justify-content: center;
    align-items: center;
    padding: 0 20px;
`;





const Home = ({navigation}) => {
    
    

    const { dispatch } = useContext(UserContext);
    //const theme = useContext(ThemeContext);
    const user = useContext(UserContext);

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const [dday,setDday] = useState([]);
    const [isToken,setToken] = useState([-1]);
    const notificationListener = useRef();
    const responseListener = useRef();
    const [tvalue, setTvalue] = useState('');

    const getDDay = text=>{
        var Dday = new Date(text);  
        var now = new Date();                    
        var gap = now.getTime() - Dday.getTime();   
        var result = Math.floor(gap / (1000 * 60 * 60 * 24)) * -1;
        return result;
     }
    
//
    //const promise = getday();
    useEffect(() => {
      const  getday = () =>{
        const d = fetch('http://172.30.1.55:3344/token',{
            method: "post",
            headers :{
                "content-Type" : "application/json",
            },
            body : JSON.stringify({
                id : user.user.usr_Id
            })
       }).then(response => response.json()).then(response => {
        var isPush = false;
         var idx;
         var arr = [];
         for(idx=0; idx<response.length;idx++){
             if(getDDay(response[idx].rf_Epdate)<7){
                 isPush = true;
                 arr.push(response[idx].rf_Pname);
             }
         }
         console.log('array : '+arr);
         setToken(arr);
       });
       //setDday(data);
        //return data;
    }
    getday();
    //AppState.addEventListener('change', getday);
         //console.log('hi:' + isToken);
        //promise.then(data => setDday(data));

        // console.log('길이는? '+ dday.length);
        // var isPush = false;
        // var idx;
        // for(idx=0; idx<dday.length;idx++){
        //     if(getDDay(dday[idx].rf_Epdate)<7)
        //         isPush = true;
        // }
        // console.log('정답:'+isPush);
        
        registerForPushNotificationsAsync().then(token => {setExpoPushToken(token)
          setTvalue(token.data)});
        
        
        // This listener is fired whenever a notification is received while the app is foregrounded
            notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
        });
    
        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          console.log(response);
        });
    
        
        
        
        
     return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
        //AppState.removeEventListener('change', getday);
         };
        
      }, []);
    
      async function registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          console.log('final status : '+finalStatus);
           token = (await Notifications.getExpoPushTokenAsync()).data;
           await setTvalue(token);
          // Notifications.getExpoPushTokenAsync().then(response => {setTvalue(response.data)
          // console.log('token : '+response.data)});
          console.log('token : '+token);
        } else {
          alert('Must use physical device for Push Notifications!');
        }
      
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
      
        return token;
      }

      useEffect(() =>{
        console.log('useeffect 호출!');
        if(isToken[0]!==-1 && isToken.length>0&& expoPushToken!==undefined){
          console.log('보냄 ')
           var str = '';
           var idx;
           for(idx=0;idx<isToken.length;idx++){
             str += isToken[idx];
             str += ', ';
           }
           str = str.substr(0,str.length-2);
           str+= '의 유통기한이 얼마 남지 않았습니다!';
           console.log('tostring : '+str)
           console.log('token value : '+expoPushToken);
           //const asdf = [];
            sendPushNotification(expoPushToken,str);
          //setToken(-1);
        }
        else{
          console.log('is tokken is false!');
        }
      },[isToken,expoPushToken])

    return(
        <Container>
            <Text style={{fontSize: 24, textAlign : 'center'}}> HOME </Text>
            <Text style={{fontSize: 20, textAlign : 'center',marginBottom : 50}}>{user.user.usr_Id}님 반갑습니다.</Text>
            <Button title="BoardList" onPress={()=>navigation.navigate('Board')}/>
            <Button title="Profile" onPress={()=>navigation.navigate('Profile')}/>
            <Button title="ReceiptList" onPress={()=>navigation.navigate('RecipeMain')}/>
            <Button title="MyRefri" onPress={()=>navigation.navigate('MyRefri',{})}/>
            <Button title="Test" onPress={()=>navigation.navigate('Test')}/>
            <Button
        title="Press to Send Notification"
        onPress={async () => {
          await sendPushNotification(expoPushToken,'nothing','fortest');
        }}
      />
        </Container>
    )
}

async function sendPushNotification(expoPushToken,data) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: '광고',
    body: data,
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

  


export default Home;