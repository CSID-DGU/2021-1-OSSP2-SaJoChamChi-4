import React from "react";
import styled from "styled-components/native";
import { Text, View, Alert, StyleSheet } from "react-native";
import { Button } from "../../components";
import * as firebase from 'firebase';
import { useEffect } from "react";
import * as Permissions from 'expo-permissions';
import {Environment} from '../../../config/environment'
import Constants from 'expo-constants';
import {Expo} from 'expo';
import * as asdf from 'expo'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { useState } from "react";
import * as uuid from 'uuid';

const firebaseConfig = {
    apiKey: 'AIzaSyBfmKQp29VusnyoGS3uc3pcHK8Yb3rXVgw',
    authDomain: 'refrigerator-a0395.firebaseapp.com',
    databaseURL: "https://refrigerator-a0395.firebaseio.com",
    projectId: "refrigerator-a0395",
    storageBucket: "refrigerator-a0395.appspot.com",
    messagingSenderId: "557127833528"  
  };
  
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

const OCR  = ({navigation}) => {
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [googleResponse, setGoogleResponse] = useState(null);

    useEffect(()=>{
        const init = async() =>{
            //await Permissions.askAsync(Permissions.CAMERA_ROLL);
            await Permissions.askAsync(Permissions.CAMERA);    
        }
        init();
    },[])

    var submitToGoogle = async () => {
        try {
          this.setState({ uploading: true });
          let { image } = this.state;
          let body = JSON.stringify({
            requests: [
              {
                features: [
                  { type: "LABEL_DETECTION", maxResults: 10 },
                  { type: "LANDMARK_DETECTION", maxResults: 5 },
                  { type: "FACE_DETECTION", maxResults: 5 },
                  { type: "LOGO_DETECTION", maxResults: 5 },
                  { type: "TEXT_DETECTION", maxResults: 5 },
                  { type: "DOCUMENT_TEXT_DETECTION", maxResults: 5 },
                  { type: "SAFE_SEARCH_DETECTION", maxResults: 5 },
                  { type: "IMAGE_PROPERTIES", maxResults: 5 },
                  { type: "CROP_HINTS", maxResults: 5 },
                  { type: "WEB_DETECTION", maxResults: 5 }
                ],
                image: {
                  source: {
                    imageUri: image
                  }
                }
              }
            ]
          });
          let response = await fetch(
            "https://vision.googleapis.com/v1/images:annotate?key=" +
              Environment["GOOGLE_CLOUD_VISION_API_KEY"],
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
          console.log(responseJson);
          this.setState({
            googleResponse: responseJson,
            uploading: false
          });
        } catch (error) {
          console.log(error);
        }
      };

      _takePhoto = async () => {
        let pickerResult = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
        console.log("taking a photo");
        this._handleImagePicked(pickerResult);
      };
    
      _pickImage = async () => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
        console.log("just picking... ");  
        this._handleImagePicked(pickerResult);
      };
    
      _handleImagePicked = async pickerResult => {
        try {
          this.setState({ uploading: true });
    
          if (!pickerResult.cancelled) {
            const uploadUrl = await uploadImageAsync(pickerResult.uri);
            this.setState({ image: uploadUrl });
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
      
        const ref = firebase
          .storage()
          .ref()
          .child(uuid.v4());
        const snapshot = await ref.put(blob);
      
        blob.close();
      
        return await snapshot.ref.getDownloadURL();
    }
    
    return (
      <View style={styles.container}>
        <Text>OCR TEST</Text>
        <Button
          onPress={this._pickImage}
          title="Pick an image from camera roll"
        />

        <Button onPress={this._takePhoto} title="Take a photo" />
        <Button
            style={{ marginBottom: 10 }}
            onPress={() => submitToGoogle()}
            title="Analyze!"
        />
      </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default OCR;