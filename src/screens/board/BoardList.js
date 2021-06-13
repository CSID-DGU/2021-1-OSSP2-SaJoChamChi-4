import React, { useState, useRef, useEffect, useContext } from "react";
import { ProgressContext, UserContext } from "../../contexts";
import styled from "styled-components/native";
import { Button } from "../../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Alert, Text, View } from "react-native";

import SimpleViewPresenter from "./SimpleViewPresenter";

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

const BoardList = ({ navigation }) => {
  return (
    <View>
        
      <View height={"10%"} backgroundColor={"#3498db"}>
        <Text
          style={{
            fontSize: 30,
            textAlign: "center",
            color: "white",
          }}
        >
          BoardList
        </Text>
      </View>
      <View height={"10%"} style={{ flexDirection: "row", width: "100%" }}>
        <Text
          style={{
            fontSize: 15,
            width: "45%",
            textAlign: "center",
            marginTop: 10,
          }}
        >
          제목
        </Text>
        <Text
          style={{
            fontSize: 15,
            width: "20%",
            textAlign: "center",
            marginTop: 10,
          }}
        >
          작성자
        </Text>
        <Text
          style={{
            fontSize: 15,
            width: "20%",
            textAlign: "center",
            marginTop: 10,
          }}
        >
          작성일자
        </Text>
        <Text
          style={{
            fontSize: 15,
            width: "15%",
            textAlign: "center",
            marginTop: 10,
          }}
        >
          추천
        </Text>
      </View>
      <KeyboardAwareScrollView extraScrollHeight={20} style={{marginBottom:30, width:'100%'}}>
      <SimpleViewPresenter navigation={navigation} />
      </KeyboardAwareScrollView>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-around",
          //position: "absolute",
          bottom: "10%",
        }}
      >
        <Button
          title="insertRecipe"
          onPress={() =>
            navigation.navigate("Board", { screen: "insertRecipe" })
          }
          containerStyle={{ width: "45%" }}
        />
        <Button
          title="Home"
          onPress={() => navigation.navigate("Home")}
          containerStyle={{ width: "45%" }}
        />
      </View>
    </View>
  );
};

export default BoardList;