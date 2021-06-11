import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';


const Barcode =  ({navigation}) =>{
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');//camera access
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    let fkind, fname;
    var arr = await fetch('http://172.30.1.21:3344/barcode/getBarcode',{
          method: "post",
          headers :{
              "content-Type" : "application/json",
          },
          body : JSON.stringify({
              barcodeNumber : 8802039211424
          })
     }).then(response=>response.json()).then((response) => {console.log("response",response[0].BAR_CD);
    fkind = response[0].PRDLST_DCNM
    fname = response[0].PRDLST_NM})

     console.log(arr);
    //  arr = arr.json();
    //  console.log(arr);
    
    Alert.alert(
      "바코드 정보",
      `바코드 숫자 :  ${data} \n 상품 이름 :  ${fname} \n 상품군 :  ${fkind} `,
      [
        {
          text: "다시 인식하기",
          onPress: () => {
            setScanned(false)
            console.log("Cancel Pressed")},
          style: "cancel"
        },
        { text: "OK", onPress: () => navigation.navigate('InsertItem',{fname : fname, fkind : fkind})}
      ]
    );
    };
    
    //alert(`바코드 숫자 출력 : " ${data} "`);
    
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );

};
    
 


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default Barcode;