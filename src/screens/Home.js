import React, { Component } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import EpdatePresenter from "./HomePresenter";

export default function Home({ navigation }) {
  const [items, setItems] = React.useState([
    { title: "게시판", name: "Board", code: "#1abc9c" },
    { title: "내정보", name: "Profile", code: "#2ecc71" },
    { title: "레시피추천", name: "RecipeList", code: "#3498db" },
    { title: "냉장고", name: "MyRefri", code: "#5498ab" },
  ]);

  return (
    <View>
      <View height={"70%"}>
        <TouchableOpacity
          style={[styles.container, { backgroundColor: "#1abc9c" }]}
          onPress={() => navigation.navigate("MyRefri")}
        >
          <Text style={styles.buttonText}>냉장고</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.container, { backgroundColor: "#2ecc71" }]}
          onPress={() => navigation.navigate("RecipeList")}
        >
          <Text style={styles.buttonText}>레시피추천</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.container, { backgroundColor: "#3498db" }]}
          onPress={() => navigation.navigate("Board")}
        >
          <Text style={styles.buttonText}>게시판</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.container, { backgroundColor: "#5498ab" }]}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={styles.buttonText}>내정보</Text>
        </TouchableOpacity>
      </View>
      <View height={"5%"}>
        <Text style={[styles.foodtitle]}>유통기한 임박식품</Text>
      </View>
      <ScrollView height={"25%"}>
        <EpdatePresenter></EpdatePresenter>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  foodtitle: {
    textAlign: "center",
    color: "white",
    backgroundColor: "#c0392b",
    fontSize: 20,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    padding: 40,
    fontSize: 50,
    margin: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "#3143e8",
  },
});
