import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { DATA_DUMMY } from "../../service";

const List = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(DATA_DUMMY);

    return () => {};
  }, []);

  const updateTotal = (id, type) => {
    const newArray = [...data]; // membuat copy array
    const index = newArray.findIndex((item) => item.id === id); // mencari index dari object dengan id yang sesuai

    if (type == "like") {
      newArray[index].total = newArray[index].total + 1; // mengubah nilai total pada object tersebut
    } else {
      newArray[index].total = newArray[index].total - 1; // mengubah nilai total pada object tersebut
    }
    setData(newArray); // mengirim array baru ke fungsi setArray
  };

  const updateAllTotal = (type) => {
    let newArray;
    if (type == "like") {
      newArray = data.map((item) => ({ ...item, total: item.total + 1 })); // membuat array baru dengan nilai total yang ditambahkan 1 pada setiap object
    } else if (type == "dislike") {
      newArray = data.map((item) => ({
        ...item,
        total: item.total > 0 ? item.total - 1 : 0
      })); // membuat array baru dengan nilai total yang dikurangi 1 pada setiap object
    } else {
      newArray = data.map((item) => ({ ...item, total: 0 })); // mereset array dengan nilai total menjadi 0 pada setiap object
    }
    setData(newArray); // mengirim array baru ke fungsi setArray
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <View>
          <Image
            source={item.image}
            style={{ height: 180, width: "100%" }}
            resizeMode={"stretch"}
          />
        </View>
        <View style={styles.btnContainerCard}>
          <View style={styles.totalLike}>
            <Text style={{ color: "#707070" }}>{item.total} Like</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.likeInCard}
              onPress={() => updateTotal(item.id, "like")}
            >
              <Text style={{ color: "white" }}>Like</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.dislikeInCard}
              onPress={() => updateTotal(item.id, "dislike")}
              disabled={item.total === 0}
            >
              <Text style={{ color: "white" }}>Dislike</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header} />

      <View style={styles.filter}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btnLikeAll}
          onPress={() => updateAllTotal("like")}
        >
          <Text style={{ color: "white" }}>Like All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btnResetAll}
          onPress={() => updateAllTotal("reset")}
        >
          <Text style={{ color: "#5F5F5F" }}>Reset All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btnDislikeAll}
          onPress={() => updateAllTotal("dislike")}
        >
          <Text style={{ color: "white" }}>Dislike All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default List;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10
  },
  header: {
    paddingTop: getStatusBarHeight()
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  textHeader: {
    fontSize: 20,
    fontWeight: "bold"
  },
  filter: {
    flexDirection: "row",
    marginVertical: 10
  },
  btnLikeAll: {
    flex: 1,
    backgroundColor: "#2B72C4",
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  btnResetAll: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 15
  },
  btnDislikeAll: {
    flex: 1,
    backgroundColor: "#DB2C2C",
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  card: {
    borderRadius: 10,
    backgroundColor: "white",
    marginBottom: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5
  },
  dislikeInCard: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#DB2C2C",
    justifyContent: "center",
    alignItems: "center",
    width: "30%"
  },
  likeInCard: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#2B72C4",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    width: "30%"
  },
  totalLike: {
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: "#D5D5D5",
    justifyContent: "center",
    alignItems: "center"
  },
  btnContainerCard: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between"
  }
});
