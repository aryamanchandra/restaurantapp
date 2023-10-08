import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import Icons from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Feather";

const Home = () => {
  const [email, setEmail] = useState("");
  const [userinfo, setUser] = useState([]);
  const [data, setData] = useState([
    "New Dishes",
    "Best of Today",
    "Most Selling",
  ]);
  const [food, setFood] = useState([
    "Paneer Tikka",
    "Chicken Tikka",
    "Dahi Kebab",
    "Soya Chaap",
  ]);
  const [cuisine, setCuisine] = useState(["Mughalai", "Italian", "Mexican","American"]);
  const navigation = useNavigation();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      setEmail(user.email);
    } else {
      console.log("No user signed in");
    }

    const fetchData = async () => {
          const docRef = await doc(db, "User-Data", user.email);
          try {
            const docSnap = await getDoc(docRef);
            const querySnapshot = await getDocs(collection(db, "Food"));
            const newFoodData = [];
            querySnapshot.forEach((doc) => {
              newFoodData.push(doc.id);
            });

            if (docSnap.exists()) {
              const data = docSnap.data();
              setUser(data);
              setFood(newFoodData);
            }
          } catch (e) {
            console.log(e);
          }
    };

    fetchData();
  }, [user]);

  const handleSendtoFoodPage = (element) => {
    navigation.navigate("Food", { element });
  };

  const handleSendtoExplore = (element) => {
    navigation.navigate("Explore", { element });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>
          Hi, {"\n"}
          <Text style={{ textTransform: "capitalize" }}>
            {userinfo.firstname}{" "}
          </Text>
        </Text>
        <View>
          <ScrollView
            horizontal
            snapToAlignment={"center"}
            style={styles.herocards}
          >
            {data.map((element, key) => (
              <TouchableOpacity
                style={styles.card}
                key={key}
                onPress={() => handleSendtoExplore(element)}
              >
                <Text style={styles.cardTitle}>{element}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View>
            <View style={styles.header}>
              <Text style={styles.subTitle}>Food to try</Text>
              <TouchableOpacity
                style={styles.seemoreheader}
                onPress={handleSendtoExplore}
              >
                <Text style={styles.seemore}>See More</Text>
                <Icons name="angle-right" style={styles.icon1} />
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              snapToAlignment={"center"}
              style={styles.secondarycards}
              flexDirection="row"
              flex={2}
            >
              {food.map((element, key) => (
                <TouchableOpacity
                  style={styles.secondarycard}
                  key={key}
                  onPress={() => handleSendtoFoodPage(element)}
                >
                  <Image
                    source={require("../assets/paneer.png")}
                    style={styles.image}
                    resizeMode="contain"
                  />
                  <Text style={styles.secondarycardTitle}>{element}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <Text style={styles.subTitle}>Something New</Text>
          <ScrollView
            horizontal
            snapToAlignment={"center"}
            style={styles.quaternarycards}
          >
            {cuisine.map((element, key) => (
              <TouchableOpacity
                style={styles.quaternarycard}
                key={key}
                onPress={() => handleSendtoExplore(element)}
              >
                <Text style={styles.quaternarycardTitle}>{element}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 30,
    paddingBottom: 10,
    paddingTop: 60,
  },
  title: {
    fontSize: 40,
    fontWeight: "700",
    color: "#F8F8F8",
    paddingBottom: 20,
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
  herocards: {
    marginBottom: 10,
    flex: 1,
  },
  card: {
    flex: 1,
    backgroundColor: "#1c1c1c",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    height: 175,
    width: 300,
    marginRight: 12,
  },
  cardTitle: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "400",
    fontSize: 20,
  },
  header: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 28,
  },
  subTitle: {
    color: "#00ADB5",
    fontWeight: "400",
    fontSize: 22,
    paddingLeft: 3,
  },
  seemoreheader: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  seemore: {
    paddingTop: 5,
    color: "#00ADB5",
  },
  icon1: {
    paddingLeft: 3,
    paddingTop: 5,
    fontSize: 20,
    color: "#00ADB5",
  },
  secondarycards: {
    marginTop: 18,
    flex: 1,
    marginBottom: 35,
  },
  secondarycard: {
    backgroundColor: "#000",
    borderRadius: 20,
    width: 100,
    marginRight: 12,
    justifyContent: "flex-start",
    alignContent: "center",
  },
  secondarycardTitle: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "400",
    fontSize: 15,
    paddingTop: 5,
  },
  image: {
    height: 65,
    aspectRatio: 1,
    alignSelf: "center",
  },
  tertiarycards: {
    marginBottom: 35,
    marginTop: 15,
    flex: 1,
  },
  tertiarycard: {
    backgroundColor: "#1c1c1c",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    height: 175,
    width: 175,
    marginRight: 12,
  },
  tertiarycardTitle: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "400",
    fontSize: 20,
  },
  quaternarycards: {
    marginBottom: 10,
    marginTop: 10,
    flex: 1,
  },
  quaternarycard: {
    backgroundColor: "#1c1c1c",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    height: 175,
    width: 200,
    marginRight: 12,
  },
  quaternarycardTitle: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "400",
    fontSize: 20,
  },
});
