import React from "react";
import styled from "styled-components/native";
import { ActivityIndicator,
    Button,
    Clipboard,
    Image,
    Share,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    CameraRoll,Alert } from "react-native";
//import { Button } from "../../components";
import * as firebase from 'firebase';
import { useEffect } from "react";
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import {Expo} from 'expo';
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
import 'react-native-get-random-values'
import * as uuid from 'uuid';


const url =
  'https://firebasestorage.googleapis.com/v0/b/blobtest-36ff6.appspot.com/o/Obsidian.jar?alt=media&token=93154b97-8bd9-46e3-a51f-67be47a4628a';

  const firebaseConfig = {
    apiKey: 'AIzaSyBfmKQp29VusnyoGS3uc3pcHK8Yb3rXVgw',
    authDomain: 'refrigerator-a0395.firebaseapp.com',
    databaseURL: "https://refrigerator-a0395.firebaseio.com",
    projectId: "refrigerator-a0395",
    storageBucket: "refrigerator-a0395.appspot.com",
    messagingSenderId: "557127833528"  
  };
  
const google_key = 'AIzaSyAmryerLsmDmXm_zIfwR3IxstfaxUWxsMw'

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

export default class OCR extends React.Component {
  state = {
    image: null,
    uploading: false,
    googleResponse: null,
    base: null
  };
  
  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }

  _handleRest = () =>{
    console.log('handle rest')
    let {googleResponse } = this.state;
    //Alert.alert(googleResponse)
    Alert.alert(
      `유통기한 : ${googleResponse}이 맞습니까?`,
      "My Alert Msg",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () =>  this.props.navigation.navigate('InsertItem',{OCRresponse : googleResponse})}
      ],
      { cancelable: false }
    );
    // Alert.alert(
    //     `유통기한 : ${googleResponse}\n`,
    //     [
    //     //   {
    //     //     text: "다시 인식하기",
    //     //     onPress: () => {
    //     //       setScanned(false)
    //     //       console.log("Cancel Pressed")},
    //     //     style: "cancel"
    //     //   },
    //       { text: "OK", onPress: () => navigation.navigate('InsertItem')}
    //     ]
    //   );
  }

  submitToGoogle = async () => {
    try {
      this.setState({ uploading: true });
      let { image } = this.state;
      let {base} = this.state;
      console.log('image uri : '+image);
      //var imageFile = fs.readFileSync(image);
      //var encoded = Buffer.from(imageFile).toString('base64');
      var https = firebase.storage().refFromURL(image);

    //   var lasturl = `gs://${firebaseConfig.storageBucket}/${https.name}`;
    //   lasturl += String.fromCharCode(92);
    //   console.log('url : '+lasturl);
    //   console.log('encode : '+encoded)
    //console.log('url : '+image.base64);
      let body = JSON.stringify({
        requests: [
          {
            features: [
                { type: "TEXT_DETECTION" }
            ],
            image: {
                content: base
            }
          }
        ]
      });
      let response = await fetch(
        "https://vision.googleapis.com/v1/images:annotate?key=" +
          google_key,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: body
        }
      );
      let responseJson = await response.json();
      //console.log(responseJson)
      const regex = /\d{2}.\d{2}.\d{2}/;
      var line_txt = ''
      for(var a=0;a<responseJson.responses.length;a++){
          let brake = false
          if(brake) break;
          for(var b=0;b<responseJson.responses[a].fullTextAnnotation.pages.length;b++){
            if(brake) break;
            for(var c=0;c<responseJson.responses[a].fullTextAnnotation.pages[b].blocks.length;c++){
                if(brake) break;
                for(var d=0;d<responseJson.responses[a].fullTextAnnotation.pages[b].blocks[c].paragraphs.length;d++){
                    if(brake) break;
                    for(var e=0;e<responseJson.responses[a].fullTextAnnotation.pages[b].blocks[c].paragraphs[d].words.length;e++){
                        if(brake) break;
                        var test_txt = ''
                        for(var f=0;f<responseJson.responses[a].fullTextAnnotation.pages[b].blocks[c].paragraphs[d].words[e].symbols.length;f++){
                            if(brake) break;
                            //console.log(responseJson.responses[a].fullTextAnnotation.pages[b].blocks[c].paragraphs[d].words[e].symbols[f].text);
                            test_txt +=responseJson.responses[a].fullTextAnnotation.pages[b].blocks[c].paragraphs[d].words[e].symbols[f].text
            }
            //console.log(line_txt)
            if(regex.test(test_txt)){
            
                console.log('text 통과 : '+test_txt)
                console.log('data 타입은...'+typeof(test_txt))
                line_txt += test_txt;
                if(line_txt.length==8){
                  var temp = '20'
                  temp+=line_txt
                  line_txt = temp
                }
                var regexForB = /./gi;
                line_txt = line_txt.split('.')
                line_txt = line_txt.join('-')
                brake = true;
            }
        }
    }}}}

      this.setState({
        googleResponse: line_txt,
        uploading: false
      });
    } catch (error) {
      console.log(error);
    } 
    
    this._handleRest()
  };
 



  render() {
    let { image } = this.state;
    let {googleResponse} = this.state;
    return (
      <View 
        ref={ref => (this.screenshotIt = ref)}
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {image ? null : (
          <Text
            style={{
              fontSize: 20,
              marginBottom: 20,
              textAlign: 'center',
              marginHorizontal: 15,
            }}>
            Example: Upload ImagePicker result
          </Text>
        )}

        {googleResponse ? !null : (
            <Text>
            {this.state.googleResponse}
            </Text>
        )}
        
        <Button
          onPress={this._pickImage}
          title="Pick an image from camera roll"
        />

        <Button onPress={this._takePhoto} title="Take a photo" />

        <Button onPress={this._takeScreenshot} title="Take a screenshot" />

        <Button
  style={{ marginBottom: 10 }}
  onPress={() => this.submitToGoogle()}
  title="Analyze!"
/>
        {this._maybeRenderImage()}
        {this._maybeRenderUploadingOverlay()}
        <Button title="Back" onPress={()=> this.props.navigation.navigate('InsertItem')}/>

        <StatusBar barStyle="default" />
      </View>
    );
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };
  
  
  _maybeRenderImage = () => {
    let { image } = this.state;
    if (!image) {
      return;
    }

    return (
      <View
        style={{
          marginTop: 30,
          width: 250,
          borderRadius: 3,
          elevation: 2,
        }}>
        <View
          style={{
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            shadowColor: 'rgba(0,0,0,1)',
            shadowOpacity: 0.2,
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 5,
            overflow: 'hidden',
          }}>
          <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
        </View>

        <Text
          onPress={this._copyToClipboard}
          onLongPress={this._share}
          style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
          {image}
        </Text>
      </View>
    );
  };

  _share = () => {
    Share.share({
      message: this.state.image,
      title: 'Check out this photo',
      url: this.state.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied image URL to clipboard');
  };

  _takeScreenshot = async () => {
    console.log("pre..");
    this.screenshotIt;
    console.log(this.screenshotIt);
    console.log("pre.2");
    let ss = await Expo.takeSnapshotAsync(this.screenshotIt, {
      format: 'png',
      quality: 0.6,
      result: 'file',
      // width: Dimensions.get('screen').width,
      // height: Dimensions.get('screen').height,
      // snapshotContentContainer: true,
    });
    console.log("taking a snap");
    await CameraRoll.saveToCameraRoll(ss, 'photo');
    this._handleImagePicked(ss);
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    });
    console.log("taking a photo");
    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    });
    console.log("just picking... ");  
    this._handleImagePicked(pickerResult);
    //this._
  };

  _handleImagePicked = async pickerResult => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
          console.log('uri : '+pickerResult.uri);
          console.log('base64 : ' + pickerResult.base64)
        const uploadUrl = await uploadImageAsync(pickerResult.uri);
        this.setState({ image: uploadUrl });
        this.setState({base : pickerResult.base64});
      }
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({ uploading: false });
    }
  };
}
async function uploadImageAsync(uri) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
    console.log('before ref')
    const ref = firebase
      .storage()
      .ref()
      .child(uuid.v4());
    const snapshot = await ref.put(blob);
    
    console.log('after ref')
    // We're done with the blob, close and release it
    blob.close();
  
    return await snapshot.ref.getDownloadURL();
  }