import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Icons from "react-native-vector-icons/FontAwesome5";
import ModalDropdown from "react-native-modal-dropdown";

const Explore = () => {
  [data, setData] = useState([]);
  useEffect(() => {
    if (showResults) {
      setShowResults(false);
      setSearchResults([]);
    }
  }, [showResults]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", () => {
      setSearchTerm("");
      setShowResults(false);
      setSearchResults([]);
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let baseQuery = collection(db, "Food");

        if (selectedCuisine !== "All") {
          baseQuery = query(baseQuery, where("Cuisine", "==", selectedCuisine));
        }

        if (selectedRating !== "All") {
          baseQuery = query(
            baseQuery,
            where("rating", ">=", parseInt(selectedRating))
          );
        }

        if (selectedVegType !== "All") {
          baseQuery = query(
            baseQuery,
            where("isVegetarian", "==", selectedVegType === "Veg")
          );
        }

        const querySnapshot = await getDocs(baseQuery);
        const FoodData = querySnapshot.docs.map((doc) => doc.data());

        setData(FoodData);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [selectedCuisine, selectedRating, selectedVegType]);

  const navigation = useNavigation();

  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }

    q = query(
      collection(db, "Food"),
      where("tags", "array-contains", searchTerm.toLowerCase())
    );

    const querySnapshot = await getDocs(q);

    const results = querySnapshot.docs.map((doc) => doc.data());
    setSearchResults(results);
  };

  const handleSearchFocus = () => {
    setShowResults(true);
  };

  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [selectedVegType, setSelectedVegType] = useState("All");

  const handleCuisineChange = (value) => {
    setSelectedCuisine(value);
  };

  const handleRatingChange = (value) => {
    setSelectedRating(value);
  };

  const handleVegTypeChange = (value) => {
    setSelectedVegType(value);
  };

  const handleSendtoFoodPage = (element) => {
    navigation.navigate("Food", { element });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Explore</Text>
      <View style={styles.inputContainer}>
        <Icon
          name="search"
          size={20}
          color="#828282"
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search..."
          placeholderTextColor="#4E4E4E"
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
          onSubmitEditing={handleSearch}
          onFocus={handleSearchFocus}
          style={styles.textInput}
        />
      </View>
      <View style={styles.dropdowntags}>
        <ModalDropdown
          options={["All", "Indian", "Italian", "Chinese", "Japanese"]}
          defaultValue="Cuisine"
          textStyle={styles.dropdownText}
          dropdownStyle={styles.dropdown}
          onSelect={(index, value) => handleCuisineChange(value)}
        />

        <ModalDropdown
          options={["All", "1", "2", "3", "4", "5"]}
          defaultValue="Ratings"
          textStyle={styles.dropdownText}
          dropdownStyle={styles.dropdown}
          onSelect={(index, value) => handleRatingChange(value)}
        />

        <ModalDropdown
          options={["All", "Veg", "Non-Veg"]}
          defaultValue="Veg/Non-Veg"
          textStyle={styles.dropdownText}
          dropdownStyle={styles.dropdown}
          onSelect={(index, value) => handleVegTypeChange(value)}
        />
      </View>
      {showResults ? (
        <View style={styles.herocards}>
          {searchResults.map((element, key) => (
            <TouchableOpacity
              style={styles.card}
              key={key}
              onPress={() => handleSendtoFoodPage(element.name)}
            >
              <Image
                source={require("../assets/paneer.png")}
                style={styles.image}
                resizeMode="contain"
              />
              <Text style={styles.cardTitle}>{element.name}</Text>
              <Text style={styles.cardContent}>{element.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <ScrollView>
          <View style={styles.herocards}>
            {data &&
              data.map((element, key) => (
                <TouchableOpacity
                  style={styles.card}
                  key={key}
                  onPress={() => handleSendtoFoodPage(element)}
                >
                  <Image
                    source={require("../assets/paneer.png")}
                    style={styles.image}
                    resizeMode="contain"
                  />
                  <Text style={styles.cardTitle}>{element.name}</Text>
                  <Text style={styles.cardContent}>{element.description}</Text>
                </TouchableOpacity>
              ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Explore;

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
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#1c1c1c",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    width: "45%",
    height: 200,
    marginVertical: 10,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "400",
    fontSize: 20,
  },
  cardContent: {
    color: "#a6a6a6",
    textAlign: "center",
    fontWeight: "400",
    fontSize: 15,
  },
  subTitle: {
    color: "#00ADB5",
    fontWeight: "400",
    fontSize: 22,
    marginTop: 28,
    paddingLeft: 3,
    paddingBottom: 10,
  },
  image: {
    height: 65,
    aspectRatio: 1,
    alignSelf: "center",
    marginBottom: 5,
  },
  dropdown: {
    maxHeight: 200,
    color: "#fff",
  },
  dropdowntags: {
    marginBottom: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dropdownText: {
    fontSize: 16,
    padding: 10,
    color: "#fff",
    borderRadius: 20,
    borderColor: "#1c1c1c",
    borderWidth: 2,
    marginHorizontal: 5,
  },
});
