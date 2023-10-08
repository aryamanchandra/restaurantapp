import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
  } from "react-native";
  import React, { useState } from "react";
  import Icon from "react-native-vector-icons/Feather";
  import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
  import Icons from "react-native-vector-icons/FontAwesome5";
  import { useNavigation } from "@react-navigation/native";
  
  const Filter = () => {
    // const { element } = route.params;
    const navigation = useNavigation();
    const [searchTerm, setSearchTerm] = useState("");
  
    const [data, setData] = useState(["Monument 1", "Monument 2", "Monument 3"]);
  
    const handleChange = (text) => {
      setSearchTerm(text);
    };
  
    const handleBack = () => {
      navigation.goBack();
    };
  
    const [isChecked, setIsChecked] = useState(false);
  
    const toggleCheckbox = () => {
      setIsChecked(!isChecked);
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={handleBack} style={styles.button}>
              <Icons
                name="angle-left"
                size={30}
                color={"#fff"}
                style={styles.icon1}
              />
            </TouchableOpacity>
            <View style={styles.rightButtons}>
              <Text style={styles.title}>Filter</Text>
            </View>
          </View>
          <View>
            <Text style={styles.heading}>Type</Text>
            <TouchableOpacity onPress={toggleCheckbox} style={styles.butston}>
              <MaterialIcons
                name={isChecked ? "checkbox-blank" : "checkbox-blank-outline"}
                size={20}
                color={"#fff"}
              //   style={styles.icon1}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleCheckbox} style={styles.buttosn}>
              <MaterialIcons
                name={isChecked ? "checkbox-blank" : "checkbox-blank-outline"}
                size={20}
                color={"#fff"}
              //   style={styles.icon1}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleCheckbox} style={styles.bsutton}>
              <MaterialIcons
                name={isChecked ? "checkbox-blank" : "checkbox-blank-outline"}
                size={20}
                color={"#fff"}
              //   style={styles.icon1}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default Filter;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000",
      padding: 30,
      paddingBottom: 10,
      paddingTop: 60,
    },
    title: {
      fontSize: 30,
      fontWeight: "700",
      color: "#00ADB5",
      marginTop: 15,
      textAlign: "center",
    },
    subtitle: {
      color: "#00ADB5",
      fontWeight: "400",
      fontSize: 22,
      paddingLeft: 3,
      textAlign: "center",
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
      marginTop: 20,
      borderColor: "#3c3c3c",
      borderWidth: 2,
      borderRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    searchIcon: {
      marginRight: 10,
    },
    textInput: {
      flex: 1,
      color: "#fff",
    },
    icon: {
      textAlign: "center",
      padding: 3,
    },
    icon1: {
      textAlign: "center",
    },
    icon2: {
      textAlign: "center",
      paddingTop: 1,
    },
    buttonRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
    },
    rightButtons: {
      flexDirection: "row",
      alignItems: "center",
    },
    button: {
      backgroundColor: "#1c1c1c",
      width: 47,
      padding: 7,
      borderRadius: 30,
      marginHorizontal: 5,
      textAlign: "center",
    },
    card: {
      backgroundColor: "#1c1c1c",
      paddingVertical: 20,
      paddingHorizontal: 10,
      borderRadius: 20,
      height: 175,
      width: "100%",
      marginRight: 12,
      marginBottom: 20,
    },
    cardTitle: {
      color: "#fff",
      textAlign: "center",
      fontWeight: "400",
      fontSize: 20,
    },
    heading: {
      color: "#fff",
      fontSize: 25,
      fontWeight: "700",
      marginTop: 10,
    },
  });
  