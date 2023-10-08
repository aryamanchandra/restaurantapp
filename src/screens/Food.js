import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import Icons from "react-native-vector-icons/FontAwesome5";
import HeartIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  query,
  doc,
  where,
  getDocs,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Food = ({ route }) => {
  const { element } = route.params;
  const navigation = useNavigation();
  const [data, setData] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const handleBack = () => {
    navigation.goBack();
  };

  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const saved = async () => {
    const email = auth.currentUser?.email;
    const docRef = doc(db, "User-Data", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      if (!isHeartFilled) {
        await updateDoc(doc(db, "User-Data", email), {
          savedfooditem: arrayUnion(element),
        });
        setIsHeartFilled(true);
      } else {
        if ("savedfooditem" in data) {
          await updateDoc(doc(db, "User-Data", email), {
            savedfooditem: arrayRemove(element),
          });
          setIsHeartFilled(false);
        }
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "Food", element);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const dataref = docSnap.data();

        setData(dataref);
        await AsyncStorage.setItem(element, JSON.stringify(dataref));
      }
    };

    fetchData();
  }, [element]);

  useEffect(() => {
    const fetchFoodSuggestions = async () => {
      q = query(
        collection(db, "Food"),
        where("tags", "array-contains", "mughlai")
      );
      const querySnapshot = await getDocs(q);
      const displayresults = querySnapshot.docs.map((doc) => doc.data());
      setSuggestion(displayresults);
    };

    fetchFoodSuggestions();
  }, [element]);

  const removeCachedData = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      console.log(`Successfully removed ${key} from AsyncStorage`);
    } catch (error) {
      console.error(`Error removing ${key} from AsyncStorage:`, error);
    }
  };

  const handleRemoveCachedData = async () => {
    try {
      // Replace 'element' with the appropriate key you used to cache the data
      await removeCachedData(element);
    } catch (error) {
      console.error("Error removing cached data:", error);
    }
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
            <TouchableOpacity onPress={saved} style={styles.button}>
              <HeartIcons
                name={isHeartFilled ? "cards-heart" : "cards-heart-outline"}
                size={30}
                color={"#fff"}
                style={styles.icon2}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleRemoveCachedData}
              style={styles.button}
            >
              <Icons
                name="share"
                size={25}
                color={"#fff"}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.title}>{element}</Text>

        <Image
          source={require("../assets/paneer.png")}
          style={styles.image}
          resizeMode="contain"
        />

        <View style={styles.cardcontainer}>
          <View style={styles.cardWrapper}>
            <Image
              source={require("../assets/glass.png")}
              style={styles.glass}
              resizeMode="contain"
            />
            <View style={styles.card}>
              <View style={styles.column}>
                <Text style={styles.cardTitle}>Price</Text>
                <Text style={styles.cardcontent}>Rs {data.Price}</Text>
                <Text style={styles.cardTitle}>Type</Text>
                <Text style={styles.cardcontent}>{data.Type}</Text>
                <Text style={styles.cardTitle}>Origin</Text>
                <Text style={styles.cardcontent}>{data.Origin}</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.cardTitle}>Rating</Text>
                <Text style={styles.cardcontent}>{data.Ratings}</Text>
                <Text style={styles.cardTitle}>Cuisine</Text>
                <Text style={styles.cardcontent}>{data.Cuisine}</Text>
                <Text style={styles.cardTitle}>Spice</Text>
                <Text style={styles.cardcontent}>{data.Spice}</Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.content}>{data.description}</Text>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={styles.heading}>Reviews</Text>

          {data.Reviews &&
            data.Reviews.map((element, key) => (
              <View key={key}>
                <Text style={styles.content}>{element}</Text>
              </View>
            ))}

          <View style={styles.reviewrow}>
            <Text style={styles.seemore2}>Write a review</Text>
            <View>
              <TouchableOpacity
                onPress={handleBack}
                style={styles.seemorebutton}
              >
                <Text style={styles.seemore}>
                  See More{" "}
                  <Icon
                    name="chevron-down"
                    size={15}
                    color={"#00ADB5"}
                    style={styles.seemoreicon}
                  />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Text style={styles.heading}>Other Food Items</Text>
        <ScrollView
          horizontal
          snapToAlignment={"center"}
          style={styles.tertiarycards2}
        >
          {suggestion &&
            suggestion.map((element, key) => (
              <View style={styles.tertiarycard2} key={key}>
                <Text style={styles.tertiarycardTitle2}>{element.name}</Text>
              </View>
            ))}
        </ScrollView>
        <Text style={styles.heading}>Tags</Text>
        <View horizontal snapToAlignment={"center"} style={styles.tags}>
          {data.tags &&
            data.tags.length > 0 &&
            data.tags.map((element, key) => (
              <View style={styles.tagcont} key={key}>
                <Text style={styles.tagname}>{element}</Text>
              </View>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Food;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 30,
    paddingBottom: 10,
    paddingTop: 60,
  },
  title: {
    fontSize: 50,
    fontWeight: "700",
    color: "#F8F8F8",
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
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  rightButtons: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#1c1c1c",
    width: 47,
    padding: 7,
    borderRadius: 30,
    marginHorizontal: 5,
    textAlign: "center",
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
  image: {
    height: 300,
    aspectRatio: 1,
    alignSelf: "center",
    bottom: -35,
  },
  glass: {
    height: 325,
    aspectRatio: 1,
    alignSelf: "center",
    opacity: 0.95,
  },
  card: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    height: 325,
    width: "100%",
    marginRight: 12,
    top: -30,
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    marginTop: "7%",
  },
  column: {
    flex: 1,
    paddingHorizontal: 25,
  },
  cardTitle: {
    color: "#838383",
    fontWeight: "400",
    fontSize: 19,
  },
  cardcontent: {
    paddingBottom: 20,
    color: "#dfdfdf",
    fontSize: 21,
  },
  content: {
    paddingBottom: 8,
    color: "#838383",
    fontSize: 17,
    textAlign: "justify",
  },
  seemore: {
    color: "#00ADB5",
    textAlign: "right",
    marginBottom: 15,
  },
  seemore2: {
    color: "#00ADB5",
    textAlign: "left",
    marginBottom: 15,
  },
  seemorebutton: {
    textAlign: "center",
  },
  seemoreicon: {
    textAlign: "center",
    top: 3,
  },
  tertiarycards: {
    marginTop: 10,
    flex: 1,
  },
  tertiarycard: {
    backgroundColor: "#1c1c1c",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    height: 100,
    width: 150,
    marginRight: 12,
  },
  heading: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "700",
    marginTop: 10,
  },
  reviewglass: {
    height: 155,
    alignSelf: "center",
    opacity: 0.95,
    marginVertical: 10,
  },
  reviewrow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  text: {
    fontSize: 17,
    color: "#7a7a7a",
  },
  tertiarycards2: {
    marginBottom: 10,
    marginTop: 5,
    flex: 1,
  },
  tertiarycard2: {
    backgroundColor: "#1c1c1c",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    height: 175,
    width: 175,
    marginRight: 12,
    marginTop: 5,
  },
  tertiarycardTitle2: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "400",
    fontSize: 20,
  },
  tags: {
    marginBottom: 10,
    marginTop: 5,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tagcont: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 20,
    height: 35,
    width: 100,
    marginRight: 5,
    borderColor: "#1c1c1c",
    borderWidth: 2,
    marginBottom: 5,
    marginTop: 5,
  },
  tagname: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "400",
    fontSize: 15,
  },
});
