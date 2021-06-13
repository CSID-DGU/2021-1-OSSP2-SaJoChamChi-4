import React, { useState, useContext, Component } from "react";
import styled from "styled-components/native";
import { Text, View, Alert } from "react-native";
import { Button } from "../../components";
import RefriListPresenter from "./RefriListPresenter";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

const MyRefri = ({ navigation }) => {
  return (
    <KeyboardAwareScrollView
      extraScrollHeight={20}
      style={{ marginBottom: 30 }}
    >
      <Container>
        <View
          style={{
            width: "100%",
            backgroundColor: "#1abc9c",
            marginBottom: 30,
          }}
        >
          <Text
            style={{
              fontSize: 30,
              color: "white",
              textAlign: "center",
              marginTop: 10,
              marginBottom: 10,
              fontWeight: "bold",
            }}
          >
            냉장고 품목 리스트{" "}
          </Text>
        </View>
        <View style={{ flexDirection: "row", width: "100%" }}>
          <Text
            style={{
              fontSize: 14,
              width: "10%",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            수정
          </Text>
          <Text
            style={{
              fontSize: 14,
              width: "40%",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            식품명
          </Text>
          <Text
            style={{
              fontSize: 14,
              width: "10%",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            수량
          </Text>
          <Text
            style={{
              fontSize: 14,
              width: "20%",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            유통기한
          </Text>
          <Text
            style={{
              fontSize: 14,
              width: "10%",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            보관
          </Text>
          <Text
            style={{
              marginBottom: 20,
              fontSize: 14,
              width: "10%",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            삭제
          </Text>
        </View>
        <RefriListPresenter navigation={navigation} />
        <View
          style={{
            flexDirection: "row",
            marginBottom: 30,
            alignContent: "center",
          }}
        >
          <Button
            title="추가하기"
            onPress={() => navigation.navigate("InsertItem")}
            containerStyle={{
              width: 130,
              borderRadius: 20,
              marginHorizontal: 30,
            }}
          />
          <Button
            title="Home"
            onPress={() => navigation.navigate("Home")}
            containerStyle={{
              width: 130,
              borderRadius: 20,
              marginHorizontal: 30,
            }}
          />
        </View>
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default MyRefri;