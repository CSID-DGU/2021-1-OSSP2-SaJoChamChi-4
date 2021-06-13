import React, { useContext, useState, useEffect } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { Alert, SliderComponent, Text } from "react-native";
import { UserContext, ProgressContext } from "../../contexts";
import { Button } from "../../components";
import ProfilePresenter from "./profilePresneter";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { View } from "react-native";

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

const Profile = ({ navigation }) => {
  const { dispatch } = useContext(UserContext);
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  const { spinner } = useContext(ProgressContext);
  const [profile, setProfile] = useState([
    {
      user_Id: null,
      usr_Address: null,
      usr_Birth: null,
      usr_Day: null,
      usr_Email: null,
      usr_Id: null,
      usr_Name: null,
      usr_Nickname: null,
      usr_Pwd: null,
      usr_Rdate: null,
    },
  ]);

  const _handleLogoutButtonPress = async () => {
    try {
      spinner.start();
    } catch (e) {
      console.log("[Profile] logout: ", e.message);
    } finally {
      dispatch({ usr_Id: null, usr_Name: null });
      spinner.stop();
    }
  };

  click = (user) => {
    fetch("http://34.64.235.196:3344/login/Goodbye", {
      method: "post",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        id: user,
      }),
    }).then((response) => response.json());
  };

  const _handleGoodbyeButtonPress = async () => {
    try {
      spinner.start();
      console.log("test", user.user.usr_Id);
      click(user.user.usr_Id);
    } catch (e) {
      console.log("[Profile] logout: ", e.message);
    } finally {
      Alert.alert("회원탈퇴가 되었습니다");
      dispatch({ usr_Id: null, usr_Name: null });
      spinner.stop();
    }
  };

  click3 = (user) => {
    fetch("http://34.64.235.196:3344/login/Profile", {
      method: "post",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        id: user,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("Edit data check", response);
        navigation.navigate("editProfile", { data: response[0] });
      });
  };

  const editProfile = async () => {
    try {
      spinner.start();
      console.log("test", user.user.usr_Id);
      click3(user.user.usr_Id);
    } catch (e) {
      console.log("[Profile] logout: ", e.message);
    } finally {
      spinner.stop();
    }
  };

  return (
    <KeyboardAwareScrollView
      extraScrollHeight={20}
      style={{ marginBottom: 30, width: "100%" }}
    >
      <Container>
        <View
          style={{
            width: "100%",
            backgroundColor: "#5498ab",
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              fontSize: 50,
              textAlign: "center",
              marginBottom: 10,
              marginTop: 10,
            }}
          >
            {" "}
            Profile{" "}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 30,
            marginBottom: 30,
          }}
        >
          {user.user.usr_Name}님 반갑습니다.
        </Text>
        <ProfilePresenter />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Button
            title="Home"
            onPress={() => navigation.navigate("Home")}
            containerStyle={{ marginTop: 50, width: 100 }}
          />
          <Button
            title="logout"
            onPress={_handleLogoutButtonPress}
            containerStyle={{
              marginTop: 50,
              backgroundColor: theme.buttonLogout,
              width: 100,
            }}
          />
          <Button
            title="프로필 수정"
            onPress={editProfile}
            containerStyle={{
              marginTop: 50,
              backgroundColor: "black",
              width: 100,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Button
            title="좋아요게시물"
            onPress={() => navigation.navigate("MyGoodBoard")}
            containerStyle={{
              marginTop: 50,
              backgroundColor: "green",
              width: 100,
            }}
          />
          <Button
            title="좋아요레시피"
            onPress={() => navigation.navigate("MyGoodRecipe")}
            containerStyle={{
              marginTop: 50,
              backgroundColor: "green",
              width: 100,
            }}
          />

          <Button
            title="회원탈퇴"
            onPress={_handleGoodbyeButtonPress}
            containerStyle={{
              marginTop: 50,
              backgroundColor: theme.buttonLogout,
              width: 100,
            }}
          />
        </View>
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default Profile;